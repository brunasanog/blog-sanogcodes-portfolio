import Link from "next/link";
import Image from "next/image";

//Variáveis
const SANITY_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET;

// Ícone para o título "Sobre Mim"
const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-neutral-900"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16v-4"></path>
    <path d="M12 8h.01"></path>
  </svg>
);

export default function AboutMeCard() {
  // URLs das imagens
  const frontImageUrl = `https://cdn.sanity.io/images/${SANITY_ID}/${SANITY_DATASET}/da4e59b8525fdee65a2c305bbfb1f63d80cb9df6-300x300.png`;
  const backImageUrl = `https://cdn.sanity.io/images/${SANITY_ID}/${SANITY_DATASET}/43733b5525661608aca620a7ce96f222574e2fcc-300x300.png`;

  return (
    <div className="p-4 bg-white shadow-none border border-neutral-900">
      {/* Título */}
      <h3 className="text-base font-semibold mb-4 border-b pb-2 flex items-center gap-2">
        <InfoIcon />
        Sobre a Autora
      </h3>

      {/* Conteúdo do Sobre Mim */}
      <div className="flex flex-col items-center text-center">
        <div className="relative w-24 h-24 mb-4 perspective-1000 group">
          <div
            className="relative w-full h-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d] 
                      group-hover:rotate-y-180 rounded-full border border-neutral-300"
          >
            <div className="absolute w-full h-full [backface-visibility:hidden] rounded-full overflow-hidden">
              <Image
                src={frontImageUrl}
                alt="Foto de Perfil da Autora (Frente)"
                fill
                sizes="96px"
                unoptimized
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className="absolute w-full h-full [backface-visibility:hidden] rotate-y-180 rounded-full overflow-hidden">
              <Image
                src={backImageUrl}
                alt="Outra Foto da Autora (Verso)"
                fill
                sizes="96px"
                unoptimized
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>

        <h4 className="text-lg font-bold text-neutral-900">Bruna Sanog</h4>

        <p className="text-sm text-neutral-600 mt-2 mb-4">
          ☕︎ Apaixonada por arte e estudante de tecnologia.
        </p>
      </div>
    </div>
  );
}
