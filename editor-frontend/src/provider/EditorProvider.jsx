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

const EditorProvider = ({ children }) => {

    const [folders, setFolders] = useState(() => {
        const localData = localStorage.getItem('data');
        if(localData) {
            return JSON.parse(localData);
        }
        return initialData;
    });

    useEffect(() => {
    localStorage.setItem('data', JSON.stringify(folders));
    }, [folders]);


    return (
        <EditorContext.Provider 
            value={{
                folders, 
                setFolders
            }
        }>
            {children}
        </EditorContext.Provider>
    )
}

export default EditorProvider;
