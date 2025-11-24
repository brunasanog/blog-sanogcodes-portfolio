import Image from "next/image";

//Variáveis
const SANITY_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET;

const BANNER_IMAGE_URL = `https://cdn.sanity.io/images/${SANITY_ID}/${SANITY_DATASET}/b995eff1afc2be1d985d4f916f1d5bfcf5d55be0-1181x797.png`;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full relative h-30">
      <Image
        src={BANNER_IMAGE_URL}
        alt="Banner de tecnologia"
        fill
        style={{ objectFit: "cover" }}
        priority
      />

      <div className="absolute inset-0 bg-black/80 z-0 flex items-center justify-center">
        <p className="text-white text-sm text-center px-4 py-2">
          © {currentYear} Todos os direitos reservados. | Feito por Bruna
          Sanog.
        </p>
      </div>
    </footer>
  );
}
