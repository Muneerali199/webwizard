import React, { useState } from 'react';
import Editor from "@monaco-editor/react";
import { Code2, Eye } from 'lucide-react';

const sampleCode = `import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <h1>Hello World</h1>
    </div>
  );
}

export default App;`;

export function CodePreviewTabs() {
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');

  return (
    <div className="flex-1 bg-slate-900/50 border-l border-slate-700">
      <div className="flex border-b border-slate-700">
        <button
          className={`flex items-center space-x-2 px-6 py-3 ${
            activeTab === 'code'
              ? 'bg-slate-800 text-purple-400 border-b-2 border-purple-400'
              : 'text-slate-400 hover:text-slate-300'
          }`}
          onClick={() => setActiveTab('code')}
        >
          <Code2 className="w-4 h-4" />
          <span>Code</span>
        </button>
        <button
          className={`flex items-center space-x-2 px-6 py-3 ${
            activeTab === 'preview'
              ? 'bg-slate-800 text-purple-400 border-b-2 border-purple-400'
              : 'text-slate-400 hover:text-slate-300'
          }`}
          onClick={() => setActiveTab('preview')}
        >
          <Eye className="w-4 h-4" />
          <span>Preview</span>
        </button>
      </div>

      <div className="h-[calc(100vh-48px)]">
        {activeTab === 'code' ? (
          <Editor
            height="100%"
            defaultLanguage="typescript"
            defaultValue={sampleCode}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              readOnly: false,
              automaticLayout: true,
            }}
          />
        ) : (
          <iframe
            title="Preview"
            className="w-full h-full bg-white"
            srcDoc={`
              <!DOCTYPE html>
              <html>
                <head>
                  <script src="https://cdn.tailwindcss.com"></script>
                </head>
                <body>
                  <div class="min-h-screen bg-gray-100">
                    <h1>Hello World</h1>
                  </div>
                </body>
              </html>
            `}
          />
        )}
      </div>
    </div>
  );
}