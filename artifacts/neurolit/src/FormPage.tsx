import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

import logoHorizontal from "@assets/Horizontal-LOGO-NeurolitSEMTAG@2x_1777555071333.png";
import logoVertical from "@assets/Vertical-LOGO-NeurolitSEMTAG@2x_1777554928828.png";
import gradientImg from "@assets/Gradiente_Neurolit_1777554171991.png";

interface FormData {
  nome: string;
  instagram: string;
  email: string;
  whatsapp: string;
  empresa: string;
  estagio: string;
  desafio: string;
  cerebro: string[];
  impactoRotina: string;
  escalaMetodos: number;
  tarefaDrena: string;
  isolamento: string;
  travaPrincipal: string;
  porqueFundador: string;
  expectativa: string;
  disposicao: string;
}

const INITIAL: FormData = {
  nome: "",
  instagram: "",
  email: "",
  whatsapp: "",
  empresa: "",
  estagio: "",
  desafio: "",
  cerebro: [],
  impactoRotina: "",
  escalaMetodos: 0,
  tarefaDrena: "",
  isolamento: "",
  travaPrincipal: "",
  porqueFundador: "",
  expectativa: "",
  disposicao: "",
};

const SECTIONS = [
  "Identificação",
  "Seu Negócio",
  "Arquitetura Cognitiva",
  "Dores e Sistemas",
  "Papel de Fundador",
];

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="w-full mb-10">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-mono text-brand-lime uppercase tracking-wider">
          {SECTIONS[step - 1]}
        </span>
        <span className="text-sm font-mono text-muted-foreground">
          {step} / {total}
        </span>
      </div>
      <div className="h-1 bg-border rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundImage: `url(${gradientImg})`, backgroundSize: "cover" }}
          initial={false}
          animate={{ width: `${(step / total) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="mt-1.5 text-sm text-destructive font-mono">{msg}</p>
  );
}

function TextInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground/80 mb-2">
        {label}
        {required && <span className="text-brand-orange ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-card border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-2 focus:ring-brand-blue/50 transition-all ${
          error ? "border-destructive" : "border-border hover:border-brand-blue/30"
        }`}
      />
      <FieldError msg={error} />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  required,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground/80 mb-2">
        {label}
        {required && <span className="text-brand-orange ml-1">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className={`w-full bg-card border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-2 focus:ring-brand-blue/50 resize-none transition-all ${
          error ? "border-destructive" : "border-border hover:border-brand-blue/30"
        }`}
      />
      <FieldError msg={error} />
    </div>
  );
}

function RadioGroup({
  label,
  options,
  value,
  onChange,
  required,
  error,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground/80 mb-3">
        {label}
        {required && <span className="text-brand-orange ml-1">*</span>}
      </label>
      <div className="flex flex-col gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
              value === opt
                ? "border-brand-blue bg-brand-blue/10 text-foreground font-medium"
                : "border-border bg-card text-muted-foreground hover:border-brand-blue/40 hover:text-foreground"
            }`}
          >
            <span
              className={`inline-block w-4 h-4 rounded-full border mr-3 align-middle transition-colors ${
                value === opt ? "border-brand-blue bg-brand-blue" : "border-border"
              }`}
            />
            {opt}
          </button>
        ))}
      </div>
      <FieldError msg={error} />
    </div>
  );
}

function CheckboxGroup({
  label,
  options,
  value,
  onChange,
  required,
  error,
}: {
  label: string;
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
  required?: boolean;
  error?: string;
}) {
  const toggle = (opt: string) => {
    onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt]);
  };
  return (
    <div>
      <label className="block text-sm font-medium text-foreground/80 mb-3">
        {label}
        {required && <span className="text-brand-orange ml-1">*</span>}
      </label>
      <div className="flex flex-col gap-2">
        {options.map((opt) => {
          const selected = value.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                selected
                  ? "border-brand-yellow bg-brand-yellow/10 text-foreground font-medium"
                  : "border-border bg-card text-muted-foreground hover:border-brand-yellow/40 hover:text-foreground"
              }`}
            >
              <span
                className={`inline-block w-4 h-4 rounded mr-3 align-middle border transition-colors ${
                  selected ? "border-brand-yellow bg-brand-yellow" : "border-border"
                }`}
              />
              {opt}
            </button>
          );
        })}
      </div>
      <FieldError msg={error} />
    </div>
  );
}

function ScalePicker({
  label,
  value,
  onChange,
  required,
  error,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground/80 mb-3">
        {label}
        {required && <span className="text-brand-orange ml-1">*</span>}
      </label>
      <div className="flex gap-3">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={`flex-1 py-3 rounded-xl border text-lg font-bold transition-all ${
              value === n
                ? "border-brand-orange bg-brand-orange text-white"
                : "border-border bg-card text-muted-foreground hover:border-brand-orange/50 hover:text-foreground"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-xs text-muted-foreground font-mono">
        <span>Nunca travou</span>
        <span>Travou sempre</span>
      </div>
      <FieldError msg={error} />
    </div>
  );
}

type Errors = Partial<Record<keyof FormData, string>>;

function validateStep(step: number, data: FormData): Errors {
  const e: Errors = {};
  if (step === 1) {
    if (!data.nome.trim()) e.nome = "Campo obrigatório";
    if (!data.email.trim()) e.email = "Campo obrigatório";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "E-mail inválido";
    if (!data.whatsapp.trim()) e.whatsapp = "Campo obrigatório";
  }
  if (step === 2) {
    if (!data.empresa.trim()) e.empresa = "Campo obrigatório";
    if (!data.estagio) e.estagio = "Selecione uma opção";
    if (!data.desafio) e.desafio = "Selecione uma opção";
  }
  if (step === 3) {
    if (data.cerebro.length === 0) e.cerebro = "Selecione ao menos uma opção" as string;
    if (!data.impactoRotina.trim()) e.impactoRotina = "Campo obrigatório";
    if (!data.escalaMetodos) e.escalaMetodos = "Selecione um valor" as unknown as string;
  }
  if (step === 4) {
    if (!data.tarefaDrena.trim()) e.tarefaDrena = "Campo obrigatório";
    if (!data.isolamento) e.isolamento = "Selecione uma opção";
    if (!data.travaPrincipal.trim()) e.travaPrincipal = "Campo obrigatório";
  }
  if (step === 5) {
    if (!data.porqueFundador.trim()) e.porqueFundador = "Campo obrigatório";
    if (!data.expectativa.trim()) e.expectativa = "Campo obrigatório";
    if (!data.disposicao) e.disposicao = "Selecione uma opção";
  }
  return e;
}

function Step1({ data, onChange, errors }: { data: FormData; onChange: (k: keyof FormData, v: string) => void; errors: Errors }) {
  return (
    <div className="space-y-6">
      <TextInput
        label="Qual é o seu nome e como você gosta de ser chamado?"
        value={data.nome}
        onChange={(v) => onChange("nome", v)}
        placeholder="Ex: Rodrigo, Rô"
        required
        error={errors.nome}
      />
      <TextInput
        label="Qual o seu @ do Instagram e/ou LinkedIn?"
        value={data.instagram}
        onChange={(v) => onChange("instagram", v)}
        placeholder="@seu_usuario"
      />
      <TextInput
        label="Qual o seu melhor e-mail?"
        value={data.email}
        onChange={(v) => onChange("email", v)}
        placeholder="seu@email.com"
        type="email"
        required
        error={errors.email}
      />
      <TextInput
        label="Qual o seu WhatsApp?"
        value={data.whatsapp}
        onChange={(v) => onChange("whatsapp", v)}
        placeholder="+55 11 99999-9999"
        required
        error={errors.whatsapp}
      />
    </div>
  );
}

function Step2({ data, onChange, errors }: { data: FormData; onChange: (k: keyof FormData, v: string) => void; errors: Errors }) {
  return (
    <div className="space-y-8">
      <TextInput
        label="Qual o nome do seu projeto ou empresa atual?"
        value={data.empresa}
        onChange={(v) => onChange("empresa", v)}
        placeholder="Nome do negócio"
        required
        error={errors.empresa}
      />
      <RadioGroup
        label="Em qual estágio você está hoje?"
        options={[
          "Ideação / Planejamento",
          "MVP / Início de operação",
          "Empresa consolidada buscando escala",
          "Transição de carreira",
        ]}
        value={data.estagio}
        onChange={(v) => onChange("estagio", v)}
        required
        error={errors.estagio}
      />
      <RadioGroup
        label="Qual o seu maior desafio de negócio hoje?"
        options={[
          "Branding e posicionamento",
          "Vendas e tração",
          "Gestão e processos",
          "Contratação e liderança",
        ]}
        value={data.desafio}
        onChange={(v) => onChange("desafio", v)}
        required
        error={errors.desafio}
      />
    </div>
  );
}

function Step3({
  data,
  onMulti,
  onChange,
  errors,
}: {
  data: FormData;
  onMulti: (k: "cerebro", v: string[]) => void;
  onChange: (k: keyof FormData, v: string | number) => void;
  errors: Errors;
}) {
  return (
    <div className="space-y-8">
      <CheckboxGroup
        label="Como você descreve o funcionamento do seu cérebro?"
        options={[
          "TDAH",
          "Autismo",
          "Dupla Excepcionalidade (2e)",
          "Dislexia",
          "Mente não linear sem diagnóstico fechado",
          "Outros",
        ]}
        value={data.cerebro}
        onChange={(v) => onMulti("cerebro", v)}
        required
        error={errors.cerebro}
      />
      <TextArea
        label="Como você percebe que a sua mente não linear mais impacta a sua rotina empreendedora?"
        value={data.impactoRotina}
        onChange={(v) => onChange("impactoRotina", v)}
        placeholder="Descreva em suas próprias palavras..."
        required
        error={errors.impactoRotina}
      />
      <ScalePicker
        label={'Você já tentou aplicar métodos tradicionais (lineares) e sentiu que "travou" ou que eles não foram feitos para você?'}
        value={data.escalaMetodos}
        onChange={(v) => onChange("escalaMetodos", v)}
        required
        error={errors.escalaMetodos as string | undefined}
      />
    </div>
  );
}

function Step4({ data, onChange, errors }: { data: FormData; onChange: (k: keyof FormData, v: string) => void; errors: Errors }) {
  return (
    <div className="space-y-8">
      <TextArea
        label="Qual tarefa operacional você mais detesta ou mais drena sua energia hoje?"
        value={data.tarefaDrena}
        onChange={(v) => onChange("tarefaDrena", v)}
        placeholder="Ex: Fazer relatórios financeiros, responder e-mails..."
        required
        error={errors.tarefaDrena}
      />
      <RadioGroup
        label="Você se sente isolado na sua jornada empreendedora por sentir que outras pessoas não entendem sua forma de processar ideias?"
        options={["Sim", "Às vezes", "Não"]}
        value={data.isolamento}
        onChange={(v) => onChange("isolamento", v)}
        required
        error={errors.isolamento}
      />
      <TextArea
        label="Se você pudesse ter um sistema que resolvesse apenas UMA trava no seu negócio agora, qual seria?"
        value={data.travaPrincipal}
        onChange={(v) => onChange("travaPrincipal", v)}
        placeholder="Descreva a trava mais urgente..."
        required
        error={errors.travaPrincipal}
      />
    </div>
  );
}

function Step5({ data, onChange, errors }: { data: FormData; onChange: (k: keyof FormData, v: string) => void; errors: Errors }) {
  return (
    <div className="space-y-8">
      <TextArea
        label="Por que você quer ser um dos membros fundadores do Neurolit e não apenas mais um participante no futuro?"
        value={data.porqueFundador}
        onChange={(v) => onChange("porqueFundador", v)}
        placeholder="Fale sobre sua motivação..."
        required
        error={errors.porqueFundador}
      />
      <TextArea
        label="O que você espera encontrar em uma comunidade de mentes não lineares que ainda não encontrou em outros grupos de networking?"
        value={data.expectativa}
        onChange={(v) => onChange("expectativa", v)}
        placeholder="O que seria diferente para você..."
        required
        error={errors.expectativa}
      />
      <RadioGroup
        label="Você está disposto a compartilhar seus desafios e ajudar a cocriar as bases desta comunidade?"
        options={[
          "Sim, com entusiasmo",
          "Sim, com cautela",
          "Preciso entender melhor primeiro",
        ]}
        value={data.disposicao}
        onChange={(v) => onChange("disposicao", v)}
        required
        error={errors.disposicao}
      />
    </div>
  );
}

function Confirmation({ nome }: { nome: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center py-12"
    >
      <div className="w-16 h-16 rounded-full bg-brand-lime/20 border border-brand-lime/40 flex items-center justify-center mx-auto mb-8">
        <span className="text-brand-lime text-2xl font-bold">✓</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Candidatura recebida,{" "}
        <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #F5C518, #BEDE2A)" }}>
          {nome.split(" ")[0]}
        </span>
        !
      </h2>
      <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-4 leading-relaxed">
        Sua candidatura chegou. Em breve, Murillo vai analisar seu perfil e entrar em contato pelo WhatsApp ou e-mail que você indicou.
      </p>
      <p className="text-base text-muted-foreground/70 max-w-lg mx-auto mb-12 leading-relaxed">
        Enquanto isso, fique atento ao Instagram do Neurolit para acompanhar os próximos passos da construção desta comunidade.
      </p>
      <Link href="/">
        <Button className="bg-foreground text-background hover:bg-foreground/90 font-medium tracking-tight rounded-full px-8 py-6 text-lg cursor-pointer">
          Voltar para o início
        </Button>
      </Link>
    </motion.div>
  );
}

export default function FormPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const TOTAL = 5;

  const handleChange = (key: keyof FormData, value: string | number) => {
    setData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleMulti = (key: "cerebro", value: string[]) => {
    setData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const goNext = async () => {
    const e = validateStep(step, data);
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setErrors({});
    if (step < TOTAL) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setIsSubmitting(true);
      setSubmitError(null);
      try {
        const payload = {
          ...data,
          cerebro: data.cerebro.join(", "),
        };
        const res = await fetch("/api/candidatura", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          throw new Error(`Erro ${res.status}`);
        }
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch {
        setSubmitError("Não foi possível enviar sua candidatura. Tente novamente.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const goBack = () => {
    setErrors({});
    setStep((s) => Math.max(1, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const stepProps = { data, onChange: handleChange, errors };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Simplified Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center">
          <img src={logoHorizontal} alt="Neurolit" className="hidden md:block h-8 w-auto" />
          <img src={logoVertical} alt="Neurolit" className="block md:hidden h-10 w-auto" />
        </div>
        <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-mono">
          ← Voltar
        </Link>
      </header>

      <main className="pt-28 pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <Confirmation nome={data.nome || "Fundador"} />
          ) : (
            <>
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-10"
              >
                <div className="text-sm font-mono text-brand-lime uppercase tracking-wider mb-3">
                  Mapeamento de Perfil
                </div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Candidatura a{" "}
                  <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #F5C518, #BEDE2A)" }}>
                    Membro Fundador
                  </span>
                </h1>
                <p className="text-muted-foreground mt-3 leading-relaxed">
                  Responda com honestidade. Não existe resposta certa. Quanto mais real você for, melhor conseguimos construir junto.
                </p>
              </motion.div>

              <ProgressBar step={step} total={TOTAL} />

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-1">{SECTIONS[step - 1]}</h2>
                    <p className="text-sm text-muted-foreground font-mono">
                      Seção {step} de {TOTAL}
                    </p>
                  </div>

                  {step === 1 && <Step1 {...stepProps} />}
                  {step === 2 && <Step2 {...stepProps} />}
                  {step === 3 && (
                    <Step3 data={data} onMulti={handleMulti} onChange={handleChange} errors={errors} />
                  )}
                  {step === 4 && <Step4 {...stepProps} />}
                  {step === 5 && <Step5 {...stepProps} />}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-12 pt-8 border-t border-border">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={goBack}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors font-mono cursor-pointer"
                  >
                    ← Anterior
                  </button>
                ) : (
                  <div />
                )}
                <Button
                  onClick={goNext}
                  disabled={isSubmitting}
                  className="bg-foreground text-background hover:bg-foreground/90 font-medium tracking-tight rounded-full px-8 py-6 text-base cursor-pointer disabled:opacity-60"
                  data-testid={step === TOTAL ? "button-submit" : "button-next"}
                >
                  {isSubmitting ? "Enviando..." : step === TOTAL ? "Enviar candidatura" : "Próximo →"}
                </Button>
              </div>
              {submitError && (
                <p className="text-sm text-destructive font-mono text-center mt-4">{submitError}</p>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
