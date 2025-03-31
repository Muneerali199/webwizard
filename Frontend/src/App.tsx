import React, { useState } from 'react';
import { ChevronRight, Code2, Files, Terminal, Sparkles } from 'lucide-react';
import { FileExplorer } from './components/FileExplorer';
import { StepsList } from './components/StepsList';
import { CodePreviewTabs } from './components/CodePreviewTabs';
import Waves from './background';

function App() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 text-white perspective-1000">
      <Waves
        lineColor="rgba(168, 85, 247, 0.2)"
        backgroundColor="transparent"
        waveSpeedX={0.02}
        waveSpeedY={0.01}
        waveAmpX={40}
        waveAmpY={20}
        friction={0.9}
        tension={0.01}
        maxCursorMove={120}
        xGap={12}
        yGap={36}
      />
      
      <div className="relative z-10">
        {!isGenerating ? (
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-3xl mx-auto text-center space-y-12 transform-gpu">
              <div className="relative transform hover:scale-105 transition-transform duration-300 rotate-x-1 hover:rotate-x-2">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <div className="relative px-8 py-8 bg-slate-900/90 backdrop-blur-xl ring-1 ring-purple-500/50 rounded-xl leading-none flex items-center justify-center space-x-6 shadow-2xl shadow-purple-500/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent rounded-xl"></div>
                  <Sparkles className="w-12 h-12 text-purple-300 animate-pulse relative drop-shadow-lg" />
                  <span className="text-5xl font-bold relative">
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-300 via-fuchsia-200 to-pink-300 bg-clip-text text-transparent blur-sm transform translate-y-0.5"></span>
                    <span className="relative bg-gradient-to-r from-purple-200 via-fuchsia-100 to-pink-200 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                      Website Builder AI
                    </span>
                  </span>
                </div>
              </div>
              
              <p className="text-2xl font-light relative">
                <span className="absolute inset-0 text-purple-100 blur-sm transform translate-y-0.5"></span>
                <span className="relative text-white drop-shadow-[0_2px_10px_rgba(168,85,247,0.5)]">
                  Transform your ideas into beautiful websites with just a prompt
                </span>
              </p>

              <form onSubmit={handleGenerate} className="space-y-6">
                <div className="relative group transform-gpu hover:scale-[1.02] transition-all duration-300 rotate-x-1">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your dream website..."
                    className="relative w-full px-8 py-6 bg-slate-900/90 backdrop-blur-xl rounded-xl border border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/80 text-xl text-white shadow-xl shadow-purple-500/20 placeholder-purple-200/70"
                  />
                </div>
                
                <button
                  type="submit"
                  className="relative px-10 py-5 rounded-xl font-semibold text-xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-3 mx-auto transform-gpu hover:rotate-x-2 overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-600"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-fuchsia-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">Generate Website</span>
                  <ChevronRight className="relative w-6 h-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
                </button>
              </form>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                {[
                  { icon: Code2, title: 'Smart Code Generation', desc: 'Generate clean, production-ready code with best practices' },
                  { icon: Files, title: 'File Management', desc: 'Organized file structure with easy navigation' },
                  { icon: Terminal, title: 'Step-by-Step Guide', desc: 'Clear instructions for every generation step' }
                ].map((feature, i) => (
                  <div key={i} className="group relative p-8 bg-slate-900/90 backdrop-blur-xl rounded-xl border border-purple-500/50 transform-gpu hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 rotate-x-1 hover:rotate-x-2">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-xl"></div>
                    <feature.icon className="w-12 h-12 text-purple-300 mb-6 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                    <h3 className="relative text-2xl font-semibold mb-3">
                      <span className="absolute inset-0 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent blur-sm transform translate-y-0.5"></span>
                      <span className="relative bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                        {feature.title}
                      </span>
                    </h3>
                    <p className="text-white/90 text-lg drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-screen backdrop-blur-xl">
            <StepsList />
            <div className="flex flex-1">
              <FileExplorer />
              <CodePreviewTabs />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;