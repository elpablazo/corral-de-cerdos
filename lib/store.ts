import create from "zustand";

interface GlobalStore {
  isModalOpen: boolean;
  modalContent: React.ReactNode;
  oink: boolean;
  setOink: (val: boolean) => void;
  setModalContent: (modalContent: React.ReactNode) => void;
  toggleModal: () => void;
  closeModal: () => void;
  openModal: () => void;
}

export const useGlobalStore = create<GlobalStore>()((set) => ({
  oink: false,
  isModalOpen: false,
  modalContent: null,
  setOink: (val: boolean) => set(() => ({ oink: val })),
  setModalContent: (content: React.ReactNode) =>
    set(() => ({ modalContent: content })),
  toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
  closeModal: () => set(() => ({ isModalOpen: false })),
  openModal: () => set(() => ({ isModalOpen: true })),
}));
