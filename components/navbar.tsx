import { Fragment } from "react";
import { Tab } from "@headlessui/react";

export default function Navbar() {
  return (
    <Tab.Group>
      <Tab.List>
        <Tab as={Fragment}>
          {({ selected }) => (
            /* Use the `selected` state to conditionally style the selected tab. */
            <button
              className={
                selected ? "bg-blue-500 text-white" : "bg-white text-black"
              }
            >
              Tab 1
            </button>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            /* Use the `selected` state to conditionally style the selected tab. */
            <button
              className={
                selected ? "bg-red-500 text-white" : "bg-white text-black"
              }
            >
              Tab 1
            </button>
          )}
        </Tab>
        {/* ...  */}
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>Content 1</Tab.Panel>
        {/* ... */}
      </Tab.Panels>
    </Tab.Group>
  );
}
