import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FolderTree, Code2, ChevronRight, ChevronDown, Code, Eye } from 'lucide-react';
import Editor from "@monaco-editor/react";
import axios from 'axios';

interface FileItem {
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileItem[];
}

type Tab = 'code' | 'preview';

export default function BuilderPage() {
  const location = useLocation();
  const { prompt } = location.state || {};
  const [expandedFolders, setExpandedFolders] = useState<{ [key: string]: boolean }>({});
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('code');

  const mockSteps = [
    'Analyzing requirements...',
    'Setting up project structure...',
    'Creating components...',
    'Implementing styles...',
    'Adding functionality...',
  ];

  const mockFiles: FileItem[] = [
    { 
      name: 'index.html', 
      type: 'file',
      content: '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <title>Generated Website</title>\n  </head>\n  <body>\n    <div id="root"></div>\n  </body>\n</html>'
    },
    { 
      name: 'src', 
      type: 'folder',
      children: [
        { 
          name: 'App.tsx', 
          type: 'file',
          content: 'import React from "react";\n\nfunction App() {\n  return (\n    <div>Hello World</div>\n  );\n}\n\nexport default App;'
        },
        { name: 'components', type: 'folder', children: [] },
        { name: 'styles', type: 'folder', children: [] }
      ]
    },
    { name: 'public', type: 'folder', children: [] }
  ];

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const getFileLanguage = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'html':
        return 'html';
      case 'tsx':
      case 'ts':
        return 'typescript';
      case 'jsx':
      case 'js':
        return 'javascript';
      case 'css':
        return 'css';
      case 'json':
        return 'json';
      default:
        return 'plaintext';
    }
  };
    async function init(){
      const response=await axios.post(`${BACKEND_URL}/template`, {
        messages:prompt.trim()
      })
      const {prompts,uiPrompts}=response.data
      const stepResponse = await axios.post(`${BACKEND_URL}/chat`,{
        messages: [...prompts, {prompt}.map(content=> ({
          role:"user",
          content
        }))
      })
    }
    useEffect(() => {
      init();
    }, [])

  const renderFileTree = (items: FileItem[], path = '') => {
    return items.map((item, index) => {
      const currentPath = path ? `${path}/${item.name}` : item.name;
      const isExpanded = expandedFolders[currentPath];

      return (
        <div key={currentPath} className="relative">
          <div
            className={`p-3 rounded-lg bg-gray-800 border border-gray-700 cursor-pointer transform transition-all duration-300 hover:bg-gray-750 hover:border-red-800/30 hover:translate-y-[-2px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] group ${selectedFile === item ? 'border-red-800 bg-gray-750' : ''}`}
            onClick={() => item.type === 'folder' ? toggleFolder(currentPath) : setSelectedFile(item)}
          >
            <div className="flex items-center space-x-2">
              {item.type === 'folder' ? (
                <>
                  <FolderTree className="h-5 w-5 text-red-800" />
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  )}
                </>
              ) : (
                <Code2 className="h-5 w-5 text-red-800" />
              )}
              <span className="group-hover:text-red-500 transition-colors duration-300">{item.name}</span>
            </div>
          </div>
          {item.type === 'folder' && isExpanded && item.children && (
            <div className="ml-6 mt-2 space-y-2 pl-4 border-l-2 border-gray-700">
              {renderFileTree(item.children, currentPath)}
            </div>
          )}
        </div>
      );
    });
  };

  const renderContent = () => {
    if (!selectedFile) {
      return (
        <div className="h-full flex items-center justify-center text-gray-500">
          <p>Select a file to view its contents</p>
        </div>
      );
    }

    if (activeTab === 'preview') {
      return (
        <div className="h-full w-full">
          <iframe
            src="/preview"
            className="w-full h-full border-none bg-white"
            title="Preview"
          />
        </div>
      );
    }

    return (
      <Editor
        height="calc(100vh - 40px)"
        defaultLanguage={getFileLanguage(selectedFile.name)}
        value={selectedFile.content || ''}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: true },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 20 },
          readOnly: true
        }}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Steps Panel */}
      <div className="w-1/4 border-r border-gray-800 p-6 bg-gray-900">
        <div className="flex items-center space-x-2 mb-6">
          <Code2 className="h-6 w-6 text-red-800" />
          <h2 className="text-xl font-semibold">Build Steps</h2>
        </div>
        <div className="space-y-4">
          {mockSteps.map((step, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-4 rounded-lg bg-gray-800 border border-gray-700 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(220,38,38,0.1)]"
            >
              <ChevronRight className="h-5 w-5 text-red-800" />
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* File Explorer */}
      <div className="w-1/4 p-6 bg-gray-900 border-r border-gray-800">
        <div className="flex items-center space-x-2 mb-6">
          <FolderTree className="h-6 w-6 text-red-800" />
          <h2 className="text-xl font-semibold">File Explorer</h2>
        </div>
        <div className="space-y-2">
          {renderFileTree(mockFiles)}
        </div>
      </div>

      {/* Code Editor and Preview */}
      <div className="flex-1 bg-gray-900 flex flex-col">
        <div className="flex border-b border-gray-800">
          <button
            className={`px-6 py-2 flex items-center space-x-2 transition-all duration-300 ${
              activeTab === 'code'
                ? 'text-red-500 border-b-2 border-red-500'
                : 'text-gray-400 hover:text-red-400'
            }`}
            onClick={() => setActiveTab('code')}
          >
            <Code className="h-4 w-4" />
            <span>Code</span>
          </button>
          <button
            className={`px-6 py-2 flex items-center space-x-2 transition-all duration-300 ${
              activeTab === 'preview'
                ? 'text-red-500 border-b-2 border-red-500'
                : 'text-gray-400 hover:text-red-400'
            }`}
            onClick={() => setActiveTab('preview')}
          >
            <Eye className="h-4 w-4" />
            <span>Preview</span>
          </button>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}