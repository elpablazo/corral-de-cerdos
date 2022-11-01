import Logo from "./logo";
import Navbar from "./navbar";
import { useRouter } from "next/router";

interface PageProps {
  children: React.ReactNode;
}

export default function Layout({ children }: PageProps) {
  const router = useRouter();

  return (
    <div>
      <div className="flex w-full justify-center md:justify-end pt-2 md:pr-2">
        {router.pathname !== "/" && <Logo />}

        <Navbar />
      </div>
      <div>{children}</div>
    </div>
  );
}
