import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "./logo";
import { Switch } from "@headlessui/react";
import { useGlobalStore } from "../lib/store";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";

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
  // Hook para cambiar el tema de la app
  const { setTheme } = useTheme();
  // Switch de dark mode
  const [enabled, setEnabled] = useState(false);
  // Permite controlar las animaciones del navbar
  const controls = useAnimation();

  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const router = useRouter();

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

  useEffect(() => {
    if (enabled) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [enabled, setTheme]);

  return (
    <motion.nav
      animate={controls}
      variants={smallAnimation}
      className={`fixed flex w-full justify-center space-x-4 bg-white px-4 py-2 text-dark transition-all ease-in dark:bg-dark dark:text-white md:justify-end md:text-lg ${
        scrolled ? `shadow` : ``
      }`}
    >
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${
          enabled ? "bg-pig/40" : "bg-gray-200"
        } relative inline-flex h-6 w-11 items-center rounded-full`}
      >
        <span className="sr-only">Enable notifications</span>
        <span
          className={`${
            enabled ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </Switch>
      {scrolled ? (
        <Logo className="absolute left-4 hidden text-lg md:flex" />
      ) : (
        router.pathname !== "/" && (
          <Logo className="absolute left-4 hidden text-lg md:flex" />
        )
      )}
      <Link
        href="/"
        className="font-semibold hover:text-pig focus:text-pig dark:hover:text-pig/75 dark:focus:text-pig/75"
      >
        Inicio
      </Link>
      <Link
        href="/#nosotros"
        className="font-semibold hover:text-pig focus:text-pig dark:hover:text-pig/75 dark:focus:text-pig/75"
      >
        Nosotros
      </Link>
      <Link
        href="/#contacto"
        className="font-semibold hover:text-pig focus:text-pig dark:hover:text-pig/75 dark:focus:text-pig/75"
      >
        Contacto
      </Link>
    </motion.nav>
  );
}
