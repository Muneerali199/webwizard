import React from 'react';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';

const steps = [
  { id: 1, name: 'Analyzing Prompt', status: 'completed' },
  { id: 2, name: 'Generating Project Structure', status: 'current' },
  { id: 3, name: 'Creating Components', status: 'upcoming' },
  { id: 4, name: 'Implementing Styles', status: 'upcoming' },
  { id: 5, name: 'Adding Functionality', status: 'upcoming' },
];

export function StepsList() {
  return (
    <div className="w-80 bg-slate-800/50 border-r border-slate-700 p-6">
      <h2 className="text-xl font-semibold mb-6">Generation Progress</h2>
      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.id} className="flex items-center space-x-3">
            {step.status === 'completed' && (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            )}
            {step.status === 'current' && (
              <Loader2 className="w-5 h-5 text-purple-500 animate-spin" />
            )}
            {step.status === 'upcoming' && (
              <Circle className="w-5 h-5 text-slate-500" />
            )}
            <span className={step.status === 'completed' ? 'text-green-500' : 
                           step.status === 'current' ? 'text-purple-500' : 
                           'text-slate-500'}>
              {step.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}