import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import gradientImg from "@assets/Gradiente_Neurolit_1777554171991.png";
import logoImg from "@assets/neurolit-logo-transparent.png";

const queryClient = new QueryClient();

function Navbar() {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="flex items-center gap-2">
        <img src={logoImg} alt="Neurolit" className="h-10 w-auto" />
      </div>
      <Button className="bg-foreground text-background hover:bg-foreground/90 font-medium tracking-tight rounded-full px-6" data-testid="button-nav-cta">
        Entrar na Comunidade
      </Button>
    </motion.header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center pt-24 px-6 overflow-hidden">
      {/* Background gradient blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-blue/20 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/50 backdrop-blur-sm mb-8">
            <div className="w-2 h-2 rounded-full bg-brand-lime" />
            <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Dado do sistema: 29% dos empreendedores têm TDAH.</span>
          </div>
        </motion.div>

        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] mb-8 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          O empreendedorismo tradicional foi construído para um cérebro que{" "}
          <span className="relative whitespace-nowrap">
            <span className="relative z-10 text-transparent bg-clip-text" style={{ backgroundImage: `url(${gradientImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              não é o seu.
            </span>
          </span>{" "}
          E ninguém admite isso.
        </motion.h1>

        <motion.p 
          className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Neurolit: O ponto de encontro para empreendedores neurodivergentes que cansaram de tentar caber em métodos neurotípicos.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 font-medium tracking-tight rounded-full px-8 py-6 text-lg w-full sm:w-auto group relative overflow-hidden" data-testid="button-hero-cta">
            <span className="relative z-10 flex items-center gap-2">
              Fazer o Diagnóstico de Voo & Entrar na Comunidade
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="py-32 px-6 bg-card relative">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-brand-yellow">O problema nunca foi você.</h2>
          
          <div className="space-y-8 text-lg md:text-xl text-foreground/90 font-medium leading-relaxed">
            <p>
              Durante anos, empreendedores neurodivergentes tentaram encaixar seus negócios em sistemas criados por pessoas que acordam cedo, respondem e-mails imediatamente, mantêm planilhas organizadas e sentem prazer em rotinas previsíveis. E quando o sistema não funcionava, a culpa recaía sobre a pessoa.
            </p>
            
            <p className="text-muted-foreground italic border-l-2 border-border pl-6">
              "Você só precisa de mais disciplina." "Crie um hábito." "Siga o passo a passo."
            </p>
            
            <p>
              Mas a verdade, que poucos admitem, é que o problema nunca foi a falta de disciplina. Foi a incompatibilidade do método.
            </p>

            <div className="my-16 py-12 px-8 border border-brand-orange/30 rounded-2xl bg-brand-orange/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-brand-orange" />
              <p className="text-2xl md:text-4xl font-bold text-foreground leading-tight">
                "Você não é o problema. O sistema é que está quebrado."
              </p>
            </div>

            <p>
              O Neurolit existe para empreendedores que cansaram de se adaptar ao que nunca foi feito para eles. Aqui, construímos métodos que respeitam a forma como nossos cérebros realmente funcionam.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Guide() {
  return (
    <section className="py-32 px-6 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
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
  const cards = [
    {
      color: "bg-brand-orange",
      text: "text-white",
      tag: "CALOR · VULNERABILIDADE",
      body: "Eu também desisti.",
      italic: "Várias vezes."
    },
    {
      color: "bg-brand-yellow",
      text: "text-[#0C0C0C]",
      tag: "ATENÇÃO · MANIFESTO",
      body: "TDAH não é",
      italic: "superpoder."
    },
    {
      color: "bg-brand-blue",
      text: "text-white",
      tag: "PROFUNDIDADE · DADO",
      body: "29% dos empreendedores têm",
      italic: "TDAH."
    },
    {
      color: "bg-brand-lime",
      text: "text-[#0C0C0C]",
      tag: "IGNIÇÃO · RESULTADO",
      body: "Construa com o seu cérebro,",
      italic: "não apesar dele."
    }
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`${card.color} ${card.text} p-12 md:p-16 rounded-3xl flex flex-col justify-between min-h-[360px]`}
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
  const steps = [
    {
      title: "Identificar sua trava",
      desc: "Faça o Diagnóstico de Voo e descubra o que está impedindo seu negócio de decolar."
    },
    {
      title: "Conectar-se com a tribo",
      desc: "Entre na comunidade e encontre empreendedores que falam sua língua."
    },
    {
      title: "Construir o novo padrão",
      desc: "Acesse frameworks e estratégias construídos para cérebros neurodivergentes."
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
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
  return (
    <section className="py-32 px-6 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div 
          className="p-8 md:p-12 rounded-3xl border border-destructive/20 bg-destructive/5"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-bold mb-8 text-destructive/80">Continuar tentando o método neurotípico</h3>
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
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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

function FinalCTA() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-12 tracking-tight">Pronto para parar de lutar contra o seu próprio cérebro?</h2>
          <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 font-medium tracking-tight rounded-full px-10 py-8 text-xl w-full sm:w-auto mb-6" data-testid="button-final-cta">
            Fazer o Diagnóstico de Voo & Entrar na Comunidade
          </Button>
          <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest">
            Gratuito. Sem spam. Só o que importa.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    {
      q: "O que é o Diagnóstico de Voo?",
      a: "É uma avaliação gratuita que identifica os principais bloqueios no seu negócio e como eles se relacionam com a sua neurodivergência."
    },
    {
      q: "Preciso ter diagnóstico médico de TDAH ou autismo?",
      a: "Não. Se você se identifica com os padrões que descrevemos, você é bem-vindo. O Neurolit é para quem se reconhece no problema, não para quem tem um laudo."
    },
    {
      q: "A comunidade é paga?",
      a: "O acesso básico é gratuito. Existem recursos premium para quem quer aprofundar, mas o essencial — a tribo, o diagnóstico, os frameworks básicos — você acessa sem pagar nada."
    },
    {
      q: "Funciona para qualquer tipo de negócio?",
      a: "Sim. O Neurolit foca nos padrões de funcionamento, não no nicho. Temos empreendedores de tecnologia, saúde, criatividade, educação e muito mais."
    },
    {
      q: "E se eu não tiver TDAH, mas me identificar?",
      a: "Então você provavelmente tem algum traço neurodivergente. Muitas pessoas descobrem isso dentro da comunidade. O diagnóstico médico não é pré-requisito para se beneficiar dos métodos."
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
          <img src={logoImg} alt="Neurolit" className="h-10 w-auto" />
          <p className="text-muted-foreground font-mono text-sm">Construído por um cérebro como o seu.</p>
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
        © 2025 Neurolit. Todos os direitos reservados.
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
        <Manifesto />
        <Guide />
        <Pillars />
        <ThePlan />
        <Comparison />
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
            <Route path="/:rest*" component={LandingPage} />
          </Switch>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
