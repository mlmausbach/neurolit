import { Resend } from "resend";
import { logger } from "./logger";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function getResendClient(): Promise<{ client: Resend; fromEmail: string }> {
  const hostname = process.env["REPLIT_CONNECTORS_HOSTNAME"];
  const xReplitToken = process.env["REPL_IDENTITY"]
    ? "repl " + process.env["REPL_IDENTITY"]
    : process.env["WEB_REPL_RENEWAL"]
    ? "depl " + process.env["WEB_REPL_RENEWAL"]
    : null;

  if (!hostname || !xReplitToken) {
    throw new Error("Replit connector environment not available");
  }

  type ConnectorResponse = {
    items?: { settings: { api_key: string; from_email?: string } }[];
  };

  const response = await fetch(
    "https://" + hostname + "/api/v2/connection?include_secrets=true&connector_names=resend",
    {
      headers: {
        Accept: "application/json",
        "X-Replit-Token": xReplitToken,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Connector fetch failed: ${response.status} ${response.statusText}`);
  }

  const data: ConnectorResponse = await (response.json() as Promise<ConnectorResponse>);
  const settings = data.items?.[0]?.settings;

  if (!settings?.api_key) {
    throw new Error("Resend not connected");
  }

  const fromEmail =
    process.env["EMAIL_FROM"] ??
    settings.from_email ??
    "Neurolit <onboarding@resend.dev>";

  return { client: new Resend(settings.api_key), fromEmail };
}

export async function sendNewApplicationAlert(data: {
  nome: string;
  email: string;
  whatsapp: string;
  empresa: string;
  estagio: string;
  porqueFundador: string;
}): Promise<void> {
  const toEmail = process.env["NOTIFICATION_EMAIL"];

  if (!toEmail) {
    logger.warn("NOTIFICATION_EMAIL not configured — skipping email notification");
    return;
  }

  let resend: Resend;
  let fromEmail: string;
  try {
    ({ client: resend, fromEmail } = await getResendClient());
  } catch (err) {
    logger.warn({ err }, "Resend credentials unavailable — skipping email notification");
    return;
  }

  const html = `
    <h2 style="font-family:sans-serif;">Nova candidatura recebida — Neurolit</h2>
    <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      <tr style="background:#f5f5f5;"><td><strong>Nome</strong></td><td>${escapeHtml(data.nome)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(data.email)}</td></tr>
      <tr style="background:#f5f5f5;"><td><strong>WhatsApp</strong></td><td>${escapeHtml(data.whatsapp)}</td></tr>
      <tr><td><strong>Empresa</strong></td><td>${escapeHtml(data.empresa)}</td></tr>
      <tr style="background:#f5f5f5;"><td><strong>Estágio</strong></td><td>${escapeHtml(data.estagio)}</td></tr>
      <tr><td><strong>Por que fundador?</strong></td><td style="max-width:400px;">${escapeHtml(data.porqueFundador)}</td></tr>
    </table>
  `;

  const text = [
    "Nova candidatura recebida — Neurolit",
    "",
    `Nome: ${data.nome}`,
    `Email: ${data.email}`,
    `WhatsApp: ${data.whatsapp}`,
    `Empresa: ${data.empresa}`,
    `Estágio: ${data.estagio}`,
    `Por que fundador?: ${data.porqueFundador}`,
  ].join("\n");

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    subject: `Nova candidatura: ${data.nome} — ${data.empresa}`,
    html,
    text,
  });

  if (error) {
    logger.error({ error }, "Falha ao enviar email de notificação");
  } else {
    logger.info({ to: toEmail, nome: data.nome }, "Email de notificação enviado");
  }
}
