import { Switch, Route, Router as WouterRouter, Link } from "wouter";
import FormPage from "./FormPage";
import AdminPage from "./AdminPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, useSpring, animate, useReducedMotion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useRef, useEffect, useState } from "react";

import gradientImg from "@assets/Gradiente_Neurolit_1777554171991.png";
import logoVertical from "@assets/Vertical-LOGO-NeurolitSEMTAG@2x_1777554928828.png";
import logoHorizontal from "@assets/Horizontal-LOGO-NeurolitSEMTAG@2x_1777555071333.png";

const queryClient = new QueryClient();

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);
  return isMobile;
}

function Navbar() {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="flex items-center">
        <img src={logoHorizontal} alt="Neurolit" className="hidden md:block h-8 w-auto" />
        <img src={logoVertical} alt="Neurolit" className="block md:hidden h-10 w-auto" />
      </div>
      <Link href="/entrar">
        <Button className="bg-foreground text-background hover:bg-foreground/90 font-medium tracking-tight rounded-full px-6 cursor-pointer" data-testid="button-nav-cta">
          Quero ser um Membro Fundador
        </Button>
      </Link>
    </motion.header>
  );
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const count = useMotionValue(0);
  const rounded = useSpring(count, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, target, { duration: 1.8, ease: "easeOut" });
    return controls.stop;
  }, [inView, target, count]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest) + suffix;
      }
    });
    return unsubscribe;
  }, [rounded, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

function Hero() {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const disableParallax = isMobile || prefersReducedMotion;

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const entryTransition = prefersReducedMotion
    ? { duration: 0.15 }
    : { duration: 0.7, ease: "easeOut" };

  return (
    <section ref={heroRef} className="relative min-h-[90vh] flex flex-col justify-center pt-24 px-6 overflow-hidden">
      {/* Parallax background gradient – disabled on mobile to prevent layout thrash */}
      <motion.div
        style={disableParallax ? {} : { y: bgY, opacity: bgOpacity, willChange: "transform, opacity" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-blue/20 blur-[120px] rounded-full pointer-events-none"
      />
      
      <div className="max-w-5xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...entryTransition, delay: prefersReducedMotion ? 0 : 0.1 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/50 backdrop-blur-sm mb-8">
            <div className="w-2 h-2 rounded-full bg-brand-lime" />
            <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
              Dado do sistema: <AnimatedCounter target={29} suffix="%" /> dos empreendedores têm TDAH.
            </span>
          </div>
        </motion.div>

        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] mb-8 text-foreground"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...entryTransition, delay: prefersReducedMotion ? 0 : 0.2 }}
          style={{ willChange: "opacity, transform" }}
        >
          Pare de empreender{" "}
          <span className="relative whitespace-nowrap">
            <span className="relative z-10 text-transparent bg-clip-text" style={{ backgroundImage: `url(${gradientImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              no vácuo.
            </span>
          </span>
        </motion.h1>

        <motion.p 
          className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-12 leading-relaxed"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...entryTransition, delay: prefersReducedMotion ? 0 : 0.3 }}
          style={{ willChange: "opacity, transform" }}
        >
          O Neurolit nasce para ser o fim do isolamento da mente não linear empreendedora. Sem cursos prontos, sem promessas vazias. Apenas conexão real e sistemas que funcionam para o nosso cérebro.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...entryTransition, delay: prefersReducedMotion ? 0 : 0.4 }}
          style={{ willChange: "opacity, transform" }}
        >
          <Link href="/entrar" className="w-full sm:w-auto">
            <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 font-medium tracking-tight rounded-full px-8 py-6 text-lg w-full sm:w-auto group relative overflow-hidden cursor-pointer" data-testid="button-hero-cta">
              <span className="relative z-10 flex items-center gap-2">
                Quero ser um Membro Fundador
              </span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

const cartaLines = [
  {
    type: "p",
    content: "Eu sou estrategista de marketing, mas também já travei mil vezes porque o método era linear. Já olhei para planilhas por horas sem conseguir começar. Já perdi negócios porque meu cérebro se recusou a seguir o roteiro que todos diziam funcionar.",
    className: ""
  },
  {
    type: "blockquote",
    content: '"Você só precisa de mais disciplina." "Crie um hábito." "Siga o passo a passo."',
    className: "text-muted-foreground italic border-l-2 border-border pl-6"
  },
  {
    type: "p",
    content: "Cansei de ouvir isso. E cansei mais ainda de me sentir sozinho nesse processo. O isolamento da mente não linear empreendedora não é falta de vontade — é falta de tribo.",
    className: ""
  },
  {
    type: "highlight",
    content: '"O Neurolit é onde vamos desenhar nossas próprias regras."',
    className: ""
  },
  {
    type: "p",
    content: "Não é mais um curso. Não é mais uma promessa vazia. É um ecossistema construído por quem vive isso, para quem vive isso. E ele começa agora, com os membros fundadores que vão ajudar a moldá-lo.",
    className: ""
  },
  {
    type: "signature",
    content: "",
    className: ""
  }
];

const lineVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
  })
};

const lineVariantsReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } }
};

function CartaLine({ line, index }: { line: typeof cartaLines[0]; index: number }) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const variants = prefersReducedMotion ? lineVariantsReduced : lineVariants;

  if (line.type === "highlight") {
    return (
      <motion.div
        ref={ref}
        custom={index}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={variants}
        style={{ willChange: "opacity, transform" }}
        className="my-16 py-12 px-8 border border-brand-orange/30 rounded-2xl bg-brand-orange/5 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-1 h-full bg-brand-orange" />
        <p className="text-2xl md:text-4xl font-bold text-foreground leading-tight">
          {line.content}
        </p>
      </motion.div>
    );
  }

  if (line.type === "signature") {
    return (
      <motion.div
        ref={ref}
        custom={index}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={variants}
        style={{ willChange: "opacity, transform" }}
        className="pt-4 border-t border-border"
      >
        <p className="text-foreground font-semibold">Murillo Bacchi</p>
        <p className="text-muted-foreground text-base">Fundador · Neurolit</p>
      </motion.div>
    );
  }

  return (
    <motion.p
      ref={ref}
      custom={index}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      style={{ willChange: "opacity, transform" }}
      className={`text-lg md:text-xl text-foreground/90 font-medium leading-relaxed ${line.className}`}
    >
      {line.content}
    </motion.p>
  );
}

function CartaDoFundador() {
  const prefersReducedMotion = useReducedMotion();
  return (
    <section className="py-32 px-6 bg-card relative">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.8 }}
          style={{ willChange: "opacity, transform" }}
        >
          <div className="text-sm font-mono text-brand-lime uppercase tracking-wider mb-6">A Carta do Fundador</div>
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-brand-yellow">Uma carta honesta.</h2>
        </motion.div>

        <div className="space-y-8">
          {cartaLines.map((line, i) => (
            <CartaLine key={i} line={line} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Guide() {
  const prefersReducedMotion = useReducedMotion();
  return (
    <section className="py-32 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.8 }}
          style={{ willChange: "opacity, transform" }}
          className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-24"
        >
          <div>
            <div className="text-sm font-mono text-brand-lime uppercase tracking-wider mb-4">Quem é o guia?</div>
            <h3 className="text-2xl font-bold mb-2">Murillo Bacchi</h3>
            <p className="text-muted-foreground">Analista de sistemas e estrategista</p>
          </div>
          
          <div className="space-y-8">
            <p className="text-2xl md:text-3xl font-medium leading-tight">
              "Construo frameworks porque preciso deles para sobreviver. Tenho TDAH e construí um negócio que funciona com o meu cérebro, não apesar dele. Não falo de cima para baixo. Falo de dentro."
            </p>
            <p className="text-lg text-muted-foreground">
              Sou fundador do Neurolit porque fui o empreendedor que desistiu várias vezes — e aprendi que a saída não era tentar mais, era tentar diferente.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Pillars() {
  const prefersReducedMotion = useReducedMotion();
  const cards = [
    {
      color: "bg-brand-orange",
      text: "text-white",
      tag: "IDENTIDADE",
      body: "Não é falta de disciplina.",
      italic: "É incompatibilidade de sistema."
    },
    {
      color: "bg-brand-yellow",
      text: "text-[#0C0C0C]",
      tag: "EXECUÇÃO",
      body: "Métodos que funcionam quando você começa,",
      italic: "trava e recomeça."
    },
    {
      color: "bg-brand-blue",
      text: "text-white",
      tag: "SISTEMA",
      body: "O mercado foi desenhado para um padrão",
      italic: "que não é o nosso."
    },
    {
      color: "bg-brand-lime",
      text: "text-[#0C0C0C]",
      tag: "RESULTADO",
      body: "No Neurolit, a arquitetura de negócio",
      italic: "se adapta ao nosso cérebro."
    }
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.5, delay: prefersReducedMotion ? 0 : idx * 0.1 }}
            whileHover={prefersReducedMotion ? undefined : {
              y: -8,
              boxShadow: "0 24px 48px rgba(0,0,0,0.35)",
              transition: { duration: 0.25, ease: "easeOut" }
            }}
            style={{ willChange: "opacity, transform" }}
            className={`${card.color} ${card.text} p-12 md:p-16 rounded-3xl flex flex-col justify-between min-h-[360px] cursor-default`}
          >
            <div className="text-sm font-mono uppercase tracking-widest opacity-80 mb-12">
              {card.tag}
            </div>
            <h3 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
              {card.body} <span className="italic font-serif font-light">{card.italic}</span>
            </h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ThePlan() {
  const prefersReducedMotion = useReducedMotion();
  const steps = [
    {
      title: "Identificar sua trava",
      desc: "Faça o mapeamento de perfil e descubra o que está impedindo seu negócio de decolar."
    },
    {
      title: "Conectar-se com a tribo",
      desc: "Entre na comunidade e encontre empreendedores que falam sua língua."
    },
    {
      title: "Construir o novo padrão",
      desc: "Acesse frameworks e estratégias construídos para mentes não-lineares."
    }
  ];

  return (
    <section className="py-32 px-6 bg-card border-y border-border">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Como funciona</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: prefersReducedMotion ? 0.2 : 0.5, delay: prefersReducedMotion ? 0 : idx * 0.1 }}
              style={{ willChange: "opacity, transform" }}
              className="p-8 border border-border rounded-2xl bg-background hover:border-brand-blue/50 transition-colors"
            >
              <div className="text-5xl font-bold text-border mb-6">0{idx + 1}</div>
              <h3 className="text-xl font-bold mb-4">{step.title}</h3>
              <p className="text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Comparison() {
  const prefersReducedMotion = useReducedMotion();
  return (
    <section className="py-32 px-6 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div 
          className="p-8 md:p-12 rounded-3xl border border-destructive/20 bg-destructive/5"
          initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.6 }}
          style={{ willChange: "opacity, transform" }}
        >
          <h3 className="text-xl font-bold mb-8 text-destructive/80">Continuar tentando o método linear</h3>
          <ul className="space-y-6">
            {["Foguete no chão", "Sentimento de incompetência", "Ciclos de burnout", "Métodos que nunca encaixam"].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-destructive/50" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          className="p-8 md:p-12 rounded-3xl border border-brand-lime/30 bg-brand-lime/5 relative overflow-hidden"
          initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.6 }}
          style={{ willChange: "opacity, transform" }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-lime/10 blur-[60px] rounded-full pointer-events-none" />
          <h3 className="text-xl font-bold mb-8 text-brand-lime relative z-10">Pertencer a uma comunidade que fala sua língua</h3>
          <ul className="space-y-6 relative z-10">
            {["Negócio sustentável", "Clareza sobre suas forças", "Sistemas que respeitam seu ritmo", "Uma tribo que entende você"].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-foreground font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-lime" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

function ForQuem() {
  const prefersReducedMotion = useReducedMotion();

  const paraQuemE = [
    {
      label: "Empreendedores e Visionários",
      desc: "Pessoas de 25 a 45 anos que já possuem ou estão construindo um negócio."
    },
    {
      label: "Mentes Não Lineares",
      desc: "Quem possui TDAH, autismo, dupla excepcionalidade (2e) ou simplesmente não se encaixa nos métodos tradicionais de execução."
    },
    {
      label: "Busca por Sistemas",
      desc: "Quem entende que o problema não é a falta de capacidade, mas a incompatibilidade do método e busca uma nova arquitetura de trabalho."
    }
  ];

  const paraQuemNaoE = [
    {
      label: "Busca por Cura ou Conselhos Médicos",
      desc: "O foco é business e estratégia, não tratamento clínico ou terapêutico."
    },
    {
      label: "Amantes de Métodos Lineares",
      desc: "Pessoas que buscam fórmulas mágicas e rígidas de 'passo a passo' tradicionais que ignoram o funcionamento cerebral."
    },
    {
      label: "Espectadores Passivos",
      desc: "Quem não deseja compartilhar desafios ou cocriar a base da comunidade."
    }
  ];

  return (
    <section className="py-32 px-6 bg-card border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.7 }}
          style={{ willChange: "opacity, transform" }}
          className="text-center mb-16"
        >
          <div className="text-sm font-mono text-brand-lime uppercase tracking-wider mb-4">Clareza antes de começar</div>
          <h2 className="text-3xl md:text-5xl font-bold">Para quem é o Neurolit?</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.6 }}
            style={{ willChange: "opacity, transform" }}
            className="p-8 md:p-12 rounded-3xl border border-brand-lime/30 bg-brand-lime/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-lime/10 blur-[60px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-lime/20 text-brand-lime text-sm font-mono uppercase tracking-wider mb-8">
                <span>✓</span> É para você
              </div>
              <ul className="space-y-8">
                {paraQuemE.map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-lime mt-3 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-foreground mb-1">{item.label}</p>
                      <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.6 }}
            style={{ willChange: "opacity, transform" }}
            className="p-8 md:p-12 rounded-3xl border border-destructive/20 bg-destructive/5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 text-destructive/80 text-sm font-mono uppercase tracking-wider mb-8">
              <span>✕</span> Não é para você
            </div>
            <ul className="space-y-8">
              {paraQuemNaoE.map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-destructive/50 mt-3 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-foreground mb-1">{item.label}</p>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const prefersReducedMotion = useReducedMotion();
  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.6 }}
          style={{ willChange: "opacity, transform" }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Pronto para parar de empreender no vácuo?</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Para entrar no grupo de networking, você passará por um breve mapeamento de perfil. É aqui que nossa construção começa.
          </p>
          <Link href="/entrar" className="w-full sm:w-auto block mb-6">
            <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 font-medium tracking-tight rounded-full px-10 py-8 text-xl w-full sm:w-auto cursor-pointer" data-testid="button-final-cta">
              Quero ser um Membro Fundador
            </Button>
          </Link>
          <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest">
            Gratuito. Sem promessas vazias. Só conexão real.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    {
      q: "O que é o mapeamento de perfil?",
      a: "É uma etapa breve que acontece antes de você entrar no grupo de networking. Ele nos ajuda a entender seu perfil como empreendedor e garante que a comunidade seja formada pelas pessoas certas desde o início — quem realmente vive esse contexto."
    },
    {
      q: "Preciso ter diagnóstico médico de TDAH ou autismo?",
      a: "Não. Se você se identifica com os padrões que descrevemos, você é bem-vindo. O Neurolit é para quem se reconhece no problema, não para quem tem um laudo."
    },
    {
      q: "Como funciona o acesso de Membro Fundador?",
      a: "O acesso está aberto agora para um grupo inicial de membros fundadores — pessoas que entram na fase de construção e ajudam a moldar o ecossistema. Nesta fase, o acesso é gratuito. Não há plano básico nem premium separados: os Membros Fundadores têm acesso completo à tribo, aos frameworks e às conversas que importam."
    },
    {
      q: "Funciona para qualquer tipo de negócio?",
      a: "Sim. O Neurolit foca nos padrões de funcionamento, não no nicho. Temos empreendedores de tecnologia, saúde, criatividade, educação e muito mais."
    },
    {
      q: "E se eu não tiver TDAH, mas me identificar?",
      a: "Então você provavelmente tem algum traço de mente não linear. Muitas pessoas descobrem isso dentro da comunidade. O diagnóstico médico não é pré-requisito para se beneficiar dos métodos."
    }
  ];

  return (
    <section className="py-32 px-6 bg-card border-t border-border">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Perguntas frequentes</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left text-lg md:text-xl font-medium hover:no-underline hover:text-brand-yellow transition-colors py-6">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative bg-background pt-16 pb-8 px-6 border-t border-border">
      <div 
        className="absolute top-0 left-0 w-full h-1"
        style={{ backgroundImage: `url(${gradientImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <img src={logoHorizontal} alt="Neurolit" className="hidden md:block h-8 w-auto" />
          <img src={logoVertical} alt="Neurolit" className="block md:hidden h-12 w-auto" />
          <p className="text-muted-foreground font-mono text-sm">Neurolit · Estratégia e Visão</p>
        </div>
        <div className="flex gap-6">
          {["Instagram", "LinkedIn", "Twitter"].map((social) => (
            <a key={social} href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {social}
            </a>
          ))}
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-border text-center md:text-left text-sm text-muted-foreground/60">
        © 2026 Neurolit · Murillo Bacchi. Todos os direitos reservados.
      </div>
    </footer>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-brand-lime selection:text-[#0C0C0C] font-sans">
      <Navbar />
      <main>
        <Hero />
        <CartaDoFundador />
        <Guide />
        <Pillars />
        <ThePlan />
        <Comparison />
        <ForQuem />
        <FinalCTA />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Switch>
            <Route path="/" component={LandingPage} />
            <Route path="/entrar" component={FormPage} />
            <Route path="/admin" component={AdminPage} />
            <Route path="/:rest*" component={LandingPage} />
          </Switch>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
