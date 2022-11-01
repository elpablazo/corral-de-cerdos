export default function Logo({ className }: any) {
  return (
    <p className={`font-bold tracking-tighter text-3xl ${className}`}>
      <span className="text-mud">Corral</span>{" "}
      <span className="text-dark">de</span>{" "}
      <span className="text-pig">cerdos</span>
    </p>
  );
}
