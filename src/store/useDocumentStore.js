import { produce } from "immer";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useDocumentStore = create(
  persist(
    (set, get) => ({
      documents: [],
      archivedDocuments: [],

      addDocument: (file) => {
        set(
          produce((state) => {
            state.documents.push({
              id: Date.now(),
              name: file.name,
              date: new Date().toLocaleString(),
            });
          })
        );
      },

      removeDocument: (id) => {
        set(
          produce((state) => {
            state.documents = state.documents.filter((doc) => doc.id !== id);
            state.archivedDocuments = state.archivedDocuments.filter((doc) => doc.id !== id);
          })
        );
      },

      archiveDocument: (id) => {
        set(
          produce((state) => {
            const docToArchive = state.documents.find((doc) => doc.id === id);
            if (docToArchive) {
              state.documents = state.documents.filter((doc) => doc.id !== id);
              state.archivedDocuments.push(docToArchive);
            }
          })
        );
      },

      restoreDocument: (id) => {
        set(
          produce((state) => {
            const docToRestore = state.archivedDocuments.find((doc) => doc.id === id);
            if (docToRestore) {
              state.archivedDocuments = state.archivedDocuments.filter((doc) => doc.id !== id);
              state.documents.push(docToRestore);
            }
          })
        );
      },
    }),
    { name: "Documents-storage", storage: createJSONStorage(() => localStorage) }
  )
);

export { useDocumentStore };