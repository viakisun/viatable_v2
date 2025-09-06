import React from 'react';
import { Link } from 'react-router-dom';

const ViatableLandingPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          Welcome to viatable
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          This is the new landing page for viatable.
        </p>
      </div>
      <div className="mt-8">
        <Link
          to="/samples"
          className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
        >
          View Sample Pages
        </Link>
      </div>
    </div>
  );
};

export default ViatableLandingPage;
