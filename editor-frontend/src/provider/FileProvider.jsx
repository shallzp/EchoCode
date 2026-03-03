import { createContext, useContext, useState } from 'react';
import { v4 } from 'uuid';

import { EditorContext } from './EditorProvider';

export const FileContext = createContext(null);

const defaultCodes = {
  cpp: `#inlude <iostream>
using namespace std;
int main() {
    cout << "Hello World";
    return 0;
}`,
  java: `public class Main() {
    public static void main(String[] args){
        System.out.println("Hello World");
    }
}`,
  python: `print("Hello World")`,
  javascript: `console.log("Hello World")`,
  typescript: ``,
};

const FileProvider = ({ children }) => {
  const { setFolders } = useContext(EditorContext);

  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [editingFile, setEditingFile] = useState(null);

  const addFile = (folderId, fileData) => {
    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === folderId
          ? {
              ...folder,
              files: [
                ...folder.files,
                { id: v4(), code: defaultCodes[fileData.language], ...fileData },
              ],
            }
          : folder
      )
    );
  };

  const editFile = (folderId, fileId, updatedData) => {
    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === folderId
          ? {
              ...folder,
              files: folder.files.map((file) =>
                file.id === fileId ? { ...file, ...updatedData } : file
              ),
            }
          : folder
      )
    );
  };

  const deleteFile = (folderId, fileId) => {
    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === folderId
          ? {
              ...folder,
              files: folder.files.filter((file) => file.id !== fileId),
            }
          : folder
      )
    );
  };

  return (
    <FileContext.Provider
      value={{
        addFile,
        editFile,
        deleteFile,
        currentFolderId,
        setCurrentFolderId,
        editingFile,
        setEditingFile,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

export default FileProvider;
