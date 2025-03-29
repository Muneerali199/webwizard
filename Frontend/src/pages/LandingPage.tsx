import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wand2 } from 'lucide-react';
import axios from 'axios';

export default function LandingPage() {
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  const handleSubmit =  (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      navigate('/builder', { state: { prompt } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Wand2 className="h-16 w-16 text-red-800" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
            Create Your Dream Website
          </h1>
          <p className="text-gray-400 text-lg">
            Describe your website vision and let AI bring it to life
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="relative group">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-32 px-4 py-3 bg-gray-800 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-800 transition-all duration-300 shadow-[0_0_15px_rgba(220,38,38,0.1)] focus:shadow-[0_0_20px_rgba(220,38,38,0.2)]"
              placeholder="Describe your website (e.g., 'Create a modern portfolio website with a dark theme...')"
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 px-6 bg-red-800 hover:bg-red-900 text-white font-semibold rounded-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(220,38,38,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!prompt.trim()}
          >
            Generate Website
          </button>
        </form>
      </div>
    </div>
  );
}