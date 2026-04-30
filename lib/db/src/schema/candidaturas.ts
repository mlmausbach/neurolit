import { pgTable, text, integer, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const candidaturasTable = pgTable("candidaturas", {
  id: serial("id").primaryKey(),
  nome: text("nome").notNull(),
  instagram: text("instagram"),
  email: text("email").notNull(),
  whatsapp: text("whatsapp").notNull(),
  empresa: text("empresa").notNull(),
  estagio: text("estagio").notNull(),
  desafio: text("desafio").notNull(),
  cerebro: text("cerebro").notNull(),
  impactoRotina: text("impacto_rotina").notNull(),
  escalaMetodos: integer("escala_metodos").notNull(),
  tarefaDrena: text("tarefa_drena").notNull(),
  isolamento: text("isolamento").notNull(),
  travaPrincipal: text("trava_principal").notNull(),
  porqueFundador: text("porque_fundador").notNull(),
  expectativa: text("expectativa").notNull(),
  disposicao: text("disposicao").notNull(),
  criadoEm: timestamp("criado_em").defaultNow().notNull(),
});

export const insertCandidaturaSchema = createInsertSchema(candidaturasTable).omit({
  id: true,
  criadoEm: true,
});

export type InsertCandidatura = z.infer<typeof insertCandidaturaSchema>;
export type Candidatura = typeof candidaturasTable.$inferSelect;
