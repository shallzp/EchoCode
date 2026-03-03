import { createContext, useContext, useState } from 'react';
import { v4 } from 'uuid';

import { EditorContext } from './EditorProvider';

export const FolderContext = createContext(null);

const FolderProvider = ({ children }) => {
  const { folders, setFolders } = useContext(EditorContext);

  const [editingFolder, setEditingFolder] = useState(null);

  const addFolder = (newFolderName) => {
    if (!newFolderName.trim()) return;

    const newFolder = {
      id: v4(),
      title: newFolderName.trim(),
      files: [],
    };

    setFolders((prev) => [...prev, newFolder]);
  };

  const editFolder = (folderId, newTitle) => {
    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === folderId ? { ...folder, title: newTitle } : folder
      )
    );
  };

  const deleteFolder = (folderId) => {
    setFolders((prev) => prev.filter((folder) => folder.id !== folderId));
  };

  return (
    <FolderContext.Provider
      value={{
        folders,
        addFolder,
        editFolder,
        deleteFolder,
        editingFolder,
        setEditingFolder,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
};

export default FolderProvider;
