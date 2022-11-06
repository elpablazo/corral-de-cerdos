export default function Logo({ className }: any) {
  return (
    <p
      className={`text-shadow-light text-3xl font-bold tracking-tighter  ${className}`}
    >
      <span className="text-mud dark:text-pig/75">Corral</span>{" "}
      <span className="text-dark dark:text-pig/75">de</span>{" "}
      <span className="text-pig dark:text-pig/75">cerdos</span>
    </p>
  );
}
