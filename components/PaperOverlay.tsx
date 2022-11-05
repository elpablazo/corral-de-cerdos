export default function PaperOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1000] bg-blend-multiply">
      <img
        src={"/others/paper.jpg"}
        className="h-full w-full object-cover object-center"
      />
    </div>
  );
}
