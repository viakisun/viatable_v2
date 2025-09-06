import React from 'react';

const HomePage: React.FC = () => {
  console.log('[HomePage.tsx] Rendering TEST version.');
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Tailwind CSS Test</h1>
      <p className="mb-4">If you see a blue box below, Tailwind is working.</p>
      <div className="w-32 h-32 bg-blue-500 text-white flex items-center justify-center">
        Test Box
      </div>
    </div>
  );
};

export default HomePage;
