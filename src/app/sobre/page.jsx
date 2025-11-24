import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

//Variáveis
const SANITY_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET;
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

const GLITCH_IMAGE_URL = `https://cdn.sanity.io/images/${SANITY_ID}/${SANITY_DATASET}/20cc8e556bd22c859b35674a67ac16fbdaf40aee-3000x2000.png`;

export default function AboutMeMinimalPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex flex-col flex-grow relative bg-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={GLITCH_IMAGE_URL}
            alt="Foto de Perfil Estilizada com Efeito Glitch"
            fill
            style={{ objectFit: "cover" }}
            sizes="100vw"
            priority
            className="opacity-20 md:opacity-30 object-[25%_50%] md:object-center"
          />
        </div>

        <section className="relative z-10 w-full flex-grow flex items-center justify-center py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-6 md:px-10 lg:px-12 text-white">
            <div className="mb-10 w-full max-w-sm">
              <h1 className="text-xl font-bold mb-4 border-l-4 border-white-500 pl-4">
                Bruna, a mente por trás do Sanog Codes
              </h1>
              <p className="text-base space-y-2">
                <span className="block italic text-gray-300">
                  "Coragem é ser você mesmo todos os dias em um mundo que
                  insiste em dizer que você deve ser outra pessoa."
                </span>
                <span className="block mt-4 text-xs font-light text-neutral-400">
                  — Um lembrete diário.
                </span>
              </p>
            </div>

            <div className="space-y-6 text-lg text-white leading-relaxed max-w-xl md:ml-auto">
              <p>
                Olá! Meu nome é Bruna. Minha jornada começou na Publicidade e
                Propaganda, mas em 2023, realizei uma transição de carreira para
                a área de tecnologia. Atualmente, estou cursando Análise e
                Desenvolvimento de Sistemas, buscando unir a criatividade do
                passado com a lógica do futuro.
              </p>

              <p>Sou um mix de arte, tecnologia e reflexão.</p>

              <p>
                Por natureza, sou introvertida e um tanto melancólica, mas
                carrego uma grande resiliência e uma busca constante por levar a
                vida com leveza e calma. Minha paixão reside na arte,
                especialmente na música.
              </p>

              <p>
                Sou uma observadora atenta do mundo e dedico tempo para refletir
                sobre a vida. Criei este blog justamente para compartilhar meus
                estudos em tecnologia, as reflexões que me movem e outras
                curiosidades que considero interessantes.
              </p>

              <div className="pt-4">
                <p className="text-sm pt-4 text-neutral-400">
                  Se você deseja entrar em contato ou compartilhar ideias, por
                  favor, envie um e-mail.
                </p>
              </div>
            </div>

            <div className="mt-10 text-left">
              <p className="text-md font-bold text-white tracking-wide mb-1">
                E-mail para Contato:
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-lg text-white-400 hover:text-red-300 transition-colors underline break-all"
              >
                {CONTACT_EMAIL}
              </a>
              <a
                href="https://linkedin.com/in/brunasanog"
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-3 text-sm text-neutral-400 hover:text-white transition-colors"
              >
                ou veja meu LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
