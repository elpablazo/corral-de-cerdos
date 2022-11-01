import { Fragment } from "react";
import { Tab } from "@headlessui/react";
import Link from "next/link";
import Logo from "./logo";

interface PageProps {
  children: React.ReactNode;
}

export default function Layout({ children }: PageProps) {
  return (
    <div className="">
      <div className="flex w-full justify-center md:justify-between mx-auto md:px-12 py-12 md:py-4">
        <div className="">
          <Logo />
        </div>
        <Tab.Group>
          <Tab.List className="hidden md:flex space-x-4">
            <Link href="/adios">
              <Tab as={Fragment}>
                {({ selected }) => (
                  /* Use the `selected` state to conditionally style the selected tab. */
                  <button className={""}>Inicio</button>
                )}
              </Tab>
            </Link>

            <Link href="/adios">
              <Tab as={Fragment}>
                {({ selected }) => (
                  /* Use the `selected` state to conditionally style the selected tab. */
                  <button className={""}>Nosotros</button>
                )}
              </Tab>
            </Link>
            <Link href="/adios">
              <Tab as={Fragment}>
                {({ selected }) => (
                  /* Use the `selected` state to conditionally style the selected tab. */
                  <button className={""}>Nosotros</button>
                )}
              </Tab>
            </Link>
            {/* ...  */}
          </Tab.List>
        </Tab.Group>
      </div>
      <div>{children}</div>
    </div>
  );
}
