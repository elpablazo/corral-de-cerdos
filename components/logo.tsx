export default function Logo({ className }: any) {
  return (
    <p className={`text-3xl font-bold tracking-tighter ${className}`}>
      <span className="text-mud">Corral</span>{" "}
      <span className="text-dark">de</span>{" "}
      <span className="text-pig">cerdos</span>
    </p>
  );
}
