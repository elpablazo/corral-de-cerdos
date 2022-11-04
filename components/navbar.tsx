import Link from "next/link";
import Logo from "./logo";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  return (
    <div className="fixed flex w-full justify-center space-x-4 bg-white text-dark shadow md:justify-end">
      <Link href="/">Inicio</Link>
      <Link href="/#nosotros">Nosotros</Link>
      <Link href="/#contacto">Contacto</Link>
    </div>
  );
}
