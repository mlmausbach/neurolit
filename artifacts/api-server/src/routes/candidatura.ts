import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import { db, candidaturasTable, insertCandidaturaSchema } from "@workspace/db";
import { logger } from "../lib/logger";
import { sendNewApplicationAlert } from "../lib/email";

const router: IRouter = Router();

function requireAdminKey(req: Request, res: Response, next: NextFunction) {
  const adminKey = process.env["ADMIN_API_KEY"];

  if (!adminKey) {
    logger.error("ADMIN_API_KEY is not configured");
    res.status(503).json({ error: "Admin access not configured" });
    return;
  }

  const authHeader = req.headers.authorization ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";

  if (token !== adminKey) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  next();
}

router.post("/candidatura", async (req, res) => {
  const parsed = insertCandidaturaSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: "Dados inválidos", details: parsed.error.issues });
    return;
  }

  try {
    const [candidatura] = await db
      .insert(candidaturasTable)
      .values(parsed.data)
      .returning({ id: candidaturasTable.id, criadoEm: candidaturasTable.criadoEm });

    logger.info({ id: candidatura.id, email: parsed.data.email }, "Nova candidatura recebida");

    // Fire-and-forget: email failures must not block or fail the submission response.
    sendNewApplicationAlert({
      nome: parsed.data.nome,
      email: parsed.data.email,
      whatsapp: parsed.data.whatsapp,
      empresa: parsed.data.empresa,
      estagio: parsed.data.estagio,
      porqueFundador: parsed.data.porqueFundador,
    }).catch((err) => {
      logger.error({ err }, "Erro inesperado ao enviar email de notificação");
    });

    res.status(201).json({ success: true, id: candidatura.id });
  } catch (err) {
    logger.error({ err }, "Erro ao salvar candidatura");
    res.status(500).json({ error: "Erro interno ao salvar candidatura" });
  }
});

router.get("/candidaturas", requireAdminKey, async (_req, res) => {
  try {
    const candidaturas = await db
      .select()
      .from(candidaturasTable)
      .orderBy(candidaturasTable.criadoEm);

    res.json({ candidaturas, total: candidaturas.length });
  } catch (err) {
    logger.error({ err }, "Erro ao buscar candidaturas");
    res.status(500).json({ error: "Erro interno ao buscar candidaturas" });
  }
});

export default router;
