import Link from "next/link";
import { FaInstagram, FaTiktok, FaGithub } from "react-icons/fa";

export default function SocialLinks() {
  return (
    <div className="flex justify-center sm:justify-end w-full text-sm">
      <ul className="flex gap-4">
        <li>
          <Link
            href="https://www.instagram.com/sanogbruna"
            target="_blank"
            className="hover:text-gray-700 transition duration-300"
            aria-label="Instagram"
          >
            {/* O ícone do Instagram */}
            <FaInstagram size={24} />
          </Link>
        </li>
        <li>
          <Link
            href="https://www.tiktok.com/@sanogbruna"
            target="_blank"
            className="hover:text-gray-700 transition duration-300"
            aria-label="TikTok"
          >
            {/* O ícone do TikTok */}
            <FaTiktok size={24} />
          </Link>
        </li>
        <li>
          <Link
            href="https://github.com/brunasanog"
            target="_blank"
            className="hover:text-gray-700 transition duration-300"
            aria-label="GitHub"
          >
            {/* O ícone do GitHub */}
            <FaGithub size={24} />
          </Link>
        </li>
      </ul>
    </div>
  );
}
