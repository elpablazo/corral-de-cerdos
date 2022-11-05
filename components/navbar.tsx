import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "./logo";

// Animaciones
const animations = {
  hover: {
    scale: 1.05,
  },
  tap: {
    scale: 0.95,
  },
};
const smallAnimation = {
  hover: {
    scale: 1.02,
  },
  tap: {
    scale: 0.98,
  },
};

export default function Navbar() {
  // Permite controlar las animaciones del navbar
  const controls = useAnimation();

  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastScrollY]);

  return (
    <motion.nav
      animate={controls}
      variants={smallAnimation}
      className={`fixed flex w-full justify-center space-x-4 bg-white px-4 py-2 text-dark md:justify-end md:text-lg ${
        scrolled ? `shadow` : ``
      }`}
    >
      {scrolled && <Logo className="absolute left-4 hidden text-lg md:flex" />}
      <Link href="/" className="hover:text-pig focus:text-pig">
        Inicio
      </Link>
      <Link href="/#nosotros" className="hover:text-pig focus:text-pig">
        Nosotros
      </Link>
      <Link href="/#contacto" className="hover:text-pig focus:text-pig">
        Contacto
      </Link>
    </motion.nav>
  );
}
