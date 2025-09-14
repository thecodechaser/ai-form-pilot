'use client';

import { Dispatch, SetStateAction } from 'react';

interface FormData {
  name: string;
  email: string;
  linkedinProfile: string;
  idea: string;
}

export default function AgentForm({
  formData,
  setFormData,
}: {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="p-8 bg-white border border-gray-200 shadow-lg rounded-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            className="w-full px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="linkedinProfile" className="block mb-2 text-sm font-medium text-gray-700">
            LinkedIn Profile
          </label>
          <input
            type="url"
            id="linkedinProfile"
            name="linkedinProfile"
            value={formData.linkedinProfile}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/your-profile"
            className="w-full px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="idea" className="block mb-2 text-sm font-medium text-gray-700">
            Describe your AI agent idea
          </label>
          <textarea
            id="idea"
            name="idea"
            value={formData.idea}
            onChange={handleChange}
            placeholder="Describe the AI agent you want to build..."
            rows={6}
            className="w-full px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors duration-200 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="flex items-center justify-center w-full px-6 py-3 space-x-2 font-medium text-white transition-colors duration-200 bg-gray-900 rounded-lg hover:bg-gray-800"
        >
          <span>Submit my idea</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Or use the AI copilot on the right to help you fill out this form automatically
        </p>
      </div>
    </div>
  );
} 
