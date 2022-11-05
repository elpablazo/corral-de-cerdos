import { HTMLMotionProps, motion } from "framer-motion";
import { useGlobalStore } from "../lib/store";
interface ButtonProps extends HTMLMotionProps<"button"> {
  primary?: boolean;
}

export default function Button({
  children,
  disabled,
  className,
  primary = true,
  onClick,
  ...props
}: ButtonProps) {
  // State del ¡oink!
  const setOink = useGlobalStore((state) => state.setOink);

  // Estilos de primario y secundario
  let classType = "";
  if (primary) {
    classType = "bg-pig";
  } else {
    classType = "bg-mud";
  }

  return (
    <motion.button
      disabled={disabled}
      whileHover={{
        scale: 1.1,
      }}
      whileTap={{
        scale: 0.9,
      }}
      className={`font-title rounded-lg border-2 border-transparent py-2 px-4 font-sans text-lg font-bold tracking-normal text-white transition-all ${classType} ${className}`}
      onClick={(e) => {
        // ¡Oink!
        setOink(true);
        if (onClick) {
          return onClick(e);
        }
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
}