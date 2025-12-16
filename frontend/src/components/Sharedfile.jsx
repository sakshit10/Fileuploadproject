import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function SharedFile({ currentUser, onLogin }) {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    // Simulate loading shared file
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [currentUser, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading shared file...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Shared File Access</h1>
        
        <div className="border rounded-lg p-6 mb-6">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl font-semibold">Shared File</h2>
              <p className="text-gray-600 mt-2">Share token: {token}</p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm text-gray-500">Access Granted To</p>
                  <p className="font-medium">{currentUser?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Access Via</p>
                  <p className="font-medium">Share Link</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => navigate('/')}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700"
          >
            Go to Dashboard
          </button>
          
          <button
            onClick={() => window.open('/dashboard', '_blank')}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Open Dashboard in New Tab
          </button>
        </div>
      </div>
    </div>
  );
}

export default SharedFile;