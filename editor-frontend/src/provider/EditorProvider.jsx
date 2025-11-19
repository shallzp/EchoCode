import { createContext, useEffect, useState } from "react";
import { v4 } from 'uuid';

export const EditorContext = createContext();

const initialData = [{
    id: v4(),
    title: 'Data Structures & Algorithms',
    files: [
        { 
            id: v4(), 
            name: 'Binary Heap Implementation', 
            language: 'java',
            code: `System.out.println("Hello, World!");`,
            lastModified: '1 week ago' 
        },
        { 
            id: v4(), 
            name: 'Graph Traversal Algorithms', 
            language: 'cpp', 
            code: `cout << "Hello, World!" << endl;`,
            lastModified: '1 day ago' 
        },
        { 
            id: v4(), 
            name: 'Dynamic Programming Solutions', 
            language: 'python',
            code: `print("Hello, World!")`,     
            lastModified: '3 days ago' 
        }
    ]},
    {
    id: v4(),
    title: 'Web Development',
    files: [
        { 
            id: 4, 
            name: 'Responsive Navbar',
            language: 'javascript',
            code: `console.log("Hello, World!");`, 
            lastModified: '2 weeks ago'
        }
    ]}
];

const defaultCodes = {
    ['cpp']: `#inlude <iostream>
using namespace std;
int main() {
    cout << "Hello World";
    return 0;
}`,
    ['java']: `public class Main() {
    public static void main(String[] args){
        System.out.println("Hello World");
    }
}`,
    ['python']: `print("Hello World")`,
    ['javascript']: `console.log("Hello World")`,
    ['typescript']: ``
}

const EditorProvider = ({ children }) => {

    const [folders, setFolders] = useState(() => {
        const localData = localStorage.getItem('data');
        if(localData) {
            return JSON.parse(localData);
        }
        return initialData;
    });
    const [currentFolderId, setCurrentFolderId] = useState(null);
    const [editingFolder, setEditingFolder] = useState(null);
    const [editingFile, setEditingFile] = useState(null);

    // Folder Operations
    const addFolder = (newFolderName) => {
        if (newFolderName.trim()) {
        const newFolder = {
            id: v4(),
            title: newFolderName.trim(),
            files: [],
        };
        setFolders(prev => [...prev, newFolder]);
        }
    };

    const editFolder = (folderId, newTitle) => {
        setFolders(prev =>
            prev.map(folder =>
            folder.id === folderId
                ? { ...folder, title: newTitle }
                : folder
            )
        );
    };

    const deleteFolder = (folderId) => {
        setFolders(folders.filter(folder => folder.id !== folderId));
    };

    // File Operations
    const addFile = (folderId, fileData) => {
        setFolders(prev => prev.map(folder =>
        folder.id === folderId
            ? { ...folder, files: [...folder.files, { id: v4(), code: defaultCodes[fileData.language], ...fileData }] }
            : folder
        ));
    };

    const editFile = (folderId, fileId, updatedData) => {
        setFolders(prev =>
        prev.map(folder =>
            folder.id === folderId
            ? {
                ...folder,
                files: folder.files.map(file =>
                    file.id === fileId
                    ? { ...file, ...updatedData }
                    : file
                ),
                }
            : folder
        ));
    };

    const deleteFile = (folderId, fileId) => {
        setFolders(prev =>
        prev.map(folder =>
            folder.id === folderId
            ? {
                ...folder,
                files: folder.files.filter(file => file.id !== fileId),
                }
            : folder
        ));
    };

    useEffect(() => {
    localStorage.setItem('data', JSON.stringify(folders));
    }, [folders]);


    return (
        <EditorContext.Provider 
            value={{
                folders, 
                addFolder, 
                editFolder, 
                deleteFolder, 
                addFile, 
                editFile, 
                deleteFile, 
                currentFolderId, 
                setCurrentFolderId, 
                editingFolder, 
                setEditingFolder, 
                editingFile, 
                setEditingFile
            }
        }>
            {children}
        </EditorContext.Provider>
    )
}

export default EditorProvider;