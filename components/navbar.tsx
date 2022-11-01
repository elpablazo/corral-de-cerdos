import { Fragment } from "react";
import { Tab } from "@headlessui/react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex font-semibold text-dark space-x-4">
      <Link href="/">Inicio</Link>
      <Link href="/#nosotros">Nosotros</Link>
      <Link href="/#contacto">Contacto</Link>
    </div>
  );
}
