import React from 'react';
import { Archive } from 'lucide-react';

const InventoryManagement = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="bg-white border-b border-gray-200 mb-6">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">QO-A009: Inventory Management</h1>
        </div>
      </header>
      <div className="flex flex-col items-center justify-center text-gray-500">
        <Archive className="w-24 h-24 mb-4 text-gray-300" />
        <h2 className="text-xl font-semibold">Content In Progress</h2>
        <p className="mt-2">This page will contain tools for managing inventory across all locations.</p>
      </div>
    </div>
  );
};

export default InventoryManagement;
