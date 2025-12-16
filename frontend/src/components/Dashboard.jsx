import React from 'react';

function Dashboard({ user }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user?.name}!</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600 mb-4">Your file sharing dashboard is ready.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold text-blue-700 mb-2">Upload Files</h3>
            <p className="text-sm text-gray-600">Upload PDFs, images, CSV files up to 10MB</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-semibold text-green-700 mb-2">Share Files</h3>
            <p className="text-sm text-gray-600">Share with specific users or generate links</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="font-semibold text-purple-700 mb-2">Access Control</h3>
            <p className="text-sm text-gray-600">Control who can access your files</p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t">
          <p className="text-gray-500 text-sm">
            Logged in as: <span className="font-medium">{user?.email}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;