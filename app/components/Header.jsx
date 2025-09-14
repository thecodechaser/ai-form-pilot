import { Brain } from 'lucide-react';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="container px-4 py-3 ml-4 lg:ml-10">
        <div className="flex gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-lg font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
            AI Form Pilot
          </h1>
        </div>
      </div>
    </header>
  );
};
