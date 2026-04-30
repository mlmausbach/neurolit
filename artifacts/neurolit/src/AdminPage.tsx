import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";

const BASE_URL = import.meta.env.BASE_URL ?? "/";

type Candidatura = {
  id: number;
  nome: string;
  instagram: string | null;
  email: string;
  whatsapp: string;
  empresa: string;
  estagio: string;
  desafio: string;
  cerebro: string;
  impactoRotina: string;
  escalaMetodos: number;
  tarefaDrena: string;
  isolamento: string;
  travaPrincipal: string;
  porqueFundador: string;
  expectativa: string;
  disposicao: string;
  criadoEm: string;
};

const FIELD_LABELS: { key: keyof Candidatura; label: string }[] = [
  { key: "instagram", label: "Instagram" },
  { key: "estagio", label: "Estágio do negócio" },
  { key: "desafio", label: "Maior desafio" },
  { key: "cerebro", label: "Como o cérebro funciona" },
  { key: "impactoRotina", label: "Impacto na rotina" },
  { key: "escalaMetodos", label: "Escala de métodos (1–10)" },
  { key: "tarefaDrena", label: "Tarefa que drena" },
  { key: "isolamento", label: "Isolamento" },
  { key: "travaPrincipal", label: "Trava principal" },
  { key: "porqueFundador", label: "Por que membro fundador?" },
  { key: "expectativa", label: "Expectativa" },
  { key: "disposicao", label: "Disposição" },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function LoginScreen({ onLogin }: { onLogin: (key: string) => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    setLoading(true);
    setError(false);
    try {
      const apiBase = BASE_URL.replace(/\/$/, "");
      const res = await fetch(`${apiBase}/api/candidaturas`, {
        headers: { Authorization: `Bearer ${value.trim()}` },
      });
      if (res.ok) {
        onLogin(value.trim());
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="text-sm font-mono text-brand-lime uppercase tracking-wider mb-2">Admin</div>
          <h1 className="text-2xl font-bold text-foreground">Neurolit · Candidaturas</h1>
          <p className="text-muted-foreground text-sm mt-2">Digite a chave de acesso para continuar.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Chave de acesso"
            className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition"
            autoFocus
          />
          {error && (
            <p className="text-sm text-destructive">Chave incorreta. Tente novamente.</p>
          )}
          <Button
            type="submit"
            disabled={loading || !value.trim()}
            className="w-full bg-foreground text-background hover:bg-foreground/90 font-medium rounded-xl py-3"
          >
            {loading ? "Verificando…" : "Entrar"}
          </Button>
        </form>
      </div>
    </div>
  );
}

function ExpandedRow({ candidatura }: { candidatura: Candidatura }) {
  return (
    <div className="bg-card border-t border-border px-6 py-6 grid md:grid-cols-2 gap-x-8 gap-y-4">
      {FIELD_LABELS.map(({ key, label }) => (
        <div key={key}>
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
          <p className="text-sm text-foreground leading-relaxed">
            {candidatura[key] !== null && candidatura[key] !== undefined
              ? String(candidatura[key])
              : <span className="text-muted-foreground italic">—</span>}
          </p>
        </div>
      ))}
    </div>
  );
}

function AdminTable({ candidaturas }: { candidaturas: Candidatura[] }) {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const toggle = useCallback((id: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  if (candidaturas.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        Nenhuma candidatura encontrada.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border overflow-hidden">
      <div className="hidden md:grid grid-cols-[1fr_1.2fr_1fr_1fr_1fr_auto] gap-4 px-6 py-3 bg-card border-b border-border text-xs font-mono text-muted-foreground uppercase tracking-wider">
        <span>Nome</span>
        <span>E-mail</span>
        <span>WhatsApp</span>
        <span>Empresa</span>
        <span>Enviado em</span>
        <span />
      </div>

      {candidaturas.map((c) => (
        <div key={c.id} className="border-b border-border last:border-b-0">
          <button
            onClick={() => toggle(c.id)}
            className="w-full text-left px-6 py-4 md:grid md:grid-cols-[1fr_1.2fr_1fr_1fr_1fr_auto] gap-4 items-center hover:bg-card/60 transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50"
          >
            <span className="font-medium text-foreground block md:truncate">{c.nome}</span>
            <span className="text-muted-foreground text-sm block md:truncate mt-0.5 md:mt-0">{c.email}</span>
            <span className="text-muted-foreground text-sm block md:truncate">{c.whatsapp}</span>
            <span className="text-muted-foreground text-sm block md:truncate">{c.empresa}</span>
            <span className="text-muted-foreground text-sm block md:truncate">{formatDate(c.criadoEm)}</span>
            <span className="text-xs font-mono text-brand-lime mt-2 md:mt-0 ml-auto md:ml-0 inline-flex items-center gap-1">
              {expanded.has(c.id) ? "▲ Fechar" : "▼ Ver"}
            </span>
          </button>
          {expanded.has(c.id) && <ExpandedRow candidatura={c} />}
        </div>
      ))}
    </div>
  );
}

export default function AdminPage() {
  const [apiKey, setApiKey] = useState<string | null>(() =>
    sessionStorage.getItem("admin_key")
  );
  const [candidaturas, setCandidaturas] = useState<Candidatura[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const loadData = async (key: string) => {
    setLoading(true);
    setFetchError(false);
    try {
      const apiBase = BASE_URL.replace(/\/$/, "");
      const res = await fetch(`${apiBase}/api/candidaturas`, {
        headers: { Authorization: `Bearer ${key}` },
      });
      if (!res.ok) throw new Error("unauthorized");
      const data = await res.json();
      setCandidaturas(data.candidaturas ?? []);
    } catch {
      setFetchError(true);
      setCandidaturas(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (apiKey) {
      loadData(apiKey);
    }
  }, []);

  const handleLogin = useCallback(async (key: string) => {
    sessionStorage.setItem("admin_key", key);
    setApiKey(key);
    await loadData(key);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_key");
    setApiKey(null);
    setCandidaturas(null);
  };

  const handleRefresh = () => {
    if (apiKey) loadData(apiKey);
  };

  if (!apiKey) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (loading && candidaturas === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground font-mono text-sm">Carregando candidaturas…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <div>
          <div className="text-xs font-mono text-brand-lime uppercase tracking-wider">Admin</div>
          <h1 className="text-xl font-bold text-foreground">Candidaturas · Neurolit</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={loading}
            className="rounded-full text-xs font-mono"
          >
            {loading ? "Atualizando…" : "↺ Atualizar"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="rounded-full text-xs font-mono text-muted-foreground"
          >
            Sair
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {fetchError && (
          <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            Erro ao carregar dados. Verifique a conexão e tente novamente.
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            {candidaturas !== null
              ? `${candidaturas.length} candidatura${candidaturas.length !== 1 ? "s" : ""} no total`
              : ""}
          </p>
        </div>

        {candidaturas !== null && <AdminTable candidaturas={candidaturas} />}
      </main>
    </div>
  );
}
