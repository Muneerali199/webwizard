import React from 'react';
import { File, Folder } from 'lucide-react';

const files = [
  {
    name: 'src',
    type: 'folder',
    children: [
      { name: 'components', type: 'folder', children: [
        { name: 'Header.tsx', type: 'file' },
        { name: 'Footer.tsx', type: 'file' },
      ]},
      { name: 'App.tsx', type: 'file' },
      { name: 'index.tsx', type: 'file' },
    ]
  },
  { name: 'public', type: 'folder', children: [
    { name: 'index.html', type: 'file' },
  ]},
  { name: 'package.json', type: 'file' },
];

function FileItem({ item, depth = 0 }: { item: any; depth?: number }) {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div>
      <div 
        className={`flex items-center space-x-2 px-4 py-2 hover:bg-slate-700/50 cursor-pointer rounded`}
        style={{ paddingLeft: `${depth * 16 + 16}px` }}
        onClick={() => item.type === 'folder' && setIsOpen(!isOpen)}
      >
        {item.type === 'folder' ? (
          <Folder className="w-4 h-4 text-purple-400" />
        ) : (
          <File className="w-4 h-4 text-slate-400" />
        )}
        <span>{item.name}</span>
      </div>
      {item.type === 'folder' && isOpen && item.children?.map((child: any, index: number) => (
        <FileItem key={index} item={child} depth={depth + 1} />
      ))}
    </div>
  );
}

export function FileExplorer() {
  return (
    <div className="w-64 bg-slate-900/50 border-r border-slate-700 p-6">
      <h2 className="text-xl font-semibold mb-6">File Explorer</h2>
      <div className="bg-slate-800/50 rounded-lg border border-slate-700">
        {files.map((file, index) => (
          <FileItem key={index} item={file} />
        ))}
      </div>
    </div>
  );
}