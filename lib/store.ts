import create from "zustand";

interface GlobalStore {
  isModalOpen: boolean;
  modalContent: React.ReactNode;
  setModalContent: (modalContent: React.ReactNode) => void;
  toggleModal: () => void;
  closeModal: () => void;
  openModal: () => void;
}

export const useGlobalStore = create<GlobalStore>()((set) => ({
  isModalOpen: false,
  modalContent: null,
  setModalContent: (content: React.ReactNode) =>
    set(() => ({ modalContent: content })),
  toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
  closeModal: () => set(() => ({ isModalOpen: false })),
  openModal: () => set(() => ({ isModalOpen: true })),
}));
