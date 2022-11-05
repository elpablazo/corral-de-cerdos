import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

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

  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [userScroll, setUserScroll] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > 100) {
        // if scroll down hide the navbar
        setIsNavbarHidden(true);
      } else {
        // if scroll up show the navbar
        setIsNavbarHidden(false);
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
    <motion.nav className="fixed flex w-full justify-center space-x-4 bg-white text-dark shadow md:justify-end">
      <Link href="/">Inicio</Link>
      <Link href="/#nosotros">Nosotros</Link>
      <Link href="/#contacto">Contacto</Link>
    </motion.nav>
  );
}
