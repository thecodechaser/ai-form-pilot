'use client';

import { useState } from 'react';
import AgentForm from './components/AgentForm';
import Copilot from './components/Copilot';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    linkedinProfile: '',
    idea: '',
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      <main className="px-6 py-12 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
            From Idea to{' '}
            <span className="text-blue-600">
              &#123; AI Agent in minutes &#125;
            </span>
          </h1>
        </div>

        <div className="grid max-w-6xl grid-cols-1 gap-12 mx-auto lg:grid-cols-2">
          <div>
            <AgentForm formData={formData} setFormData={setFormData} />
          </div>

          <div className="p-8 bg-white border border-gray-200 shadow-lg rounded-2xl">
            <div className="flex items-center justify-center h-full max-h-[600px]">
              <Copilot formData={formData} setFormData={setFormData} />
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
}
