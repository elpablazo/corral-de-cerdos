import Navbar from "./navbar";

import { useGlobalStore } from "../lib/store";
import { AnimatePresence, motion } from "framer-motion";
import PaperOverlay from "./PaperOverlay";

interface PageProps {
  children: React.ReactNode;
}

export default function Layout({ children }: PageProps) {
  const { toggleModal, isModalOpen, modalContent } = useGlobalStore(
    (state) => ({
      toggleModal: state.toggleModal,
      isModalOpen: state.isModalOpen,
      modalContent: state.modalContent,
    })
  );

  return (
    <div>
      {/* MODAL */}
      {isModalOpen && (
        <div
          style={{
            minHeight: "100vh",
            minWidth: "100vw",
            width: "100vw",
            height: "100vh",
            justifyContent: "center",
            justifySelf: "center",
            justifyItems: "center",
          }}
          className="fixed flex h-screen w-full items-center justify-center px-4 text-center md:px-16 lg:mx-auto lg:w-auto"
        >
          <div
            className="fixed h-screen min-h-full w-full min-w-full"
            style={{
              minHeight: "100vh",
              minWidth: "100vw",
              width: "100vw",
              height: "100vh",
              justifyContent: "center",
              justifyItems: "center",
              justifySelf: "center",
              zIndex: 98,
              background: "rgba(0,0,0,.7)",
            }}
            onClick={() => {
              toggleModal();
            }}
          ></div>
          {isModalOpen && (
            <AnimatePresence>
              <motion.div
                className="w-auto rounded bg-white transition-all ease-in dark:bg-dark dark:text-white/60"
                style={{
                  zIndex: 99,
                }}
                key="modal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {modalContent}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      )}

      {/* NAV BAR */}

      <Navbar />

      {/* CONTENT */}
      <div>{children}</div>
    </div>
  );
}
