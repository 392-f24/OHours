import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

export default function StaffPage() {
  const [activeSection, setActiveSection] = useState('current');

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Staff Dashboard</h1>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <Calendar size={20} />
            Create Session
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Sessions */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Current Sessions</h2>
            <div className="space-y-4">
              <div className="p-4 border rounded-md">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Office Hours - CS101</h3>
                    <p className="text-sm text-gray-600">Room: Virtual</p>
                    <p className="text-sm text-gray-600">Time: 2:00 PM - 4:00 PM</p>
                  </div>
                  <span className="px-2 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Queue Management */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Student Queue</h2>
            <div className="space-y-4">
              <div className="p-4 border rounded-md">
                <p className="text-gray-600">No students currently in queue</p>
              </div>
            </div>
          </div>

          {/* Settings Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Quick Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 border rounded-md hover:bg-gray-50 text-left">
                <h3 className="font-medium">Generate Access Code</h3>
                <p className="text-sm text-gray-600">Create new student access code</p>
              </button>
              <button className="p-4 border rounded-md hover:bg-gray-50 text-left">
                <h3 className="font-medium">Manage Schedule</h3>
                <p className="text-sm text-gray-600">View and edit office hours</p>
              </button>
              <button className="p-4 border rounded-md hover:bg-gray-50 text-left">
                <h3 className="font-medium">Session History</h3>
                <p className="text-sm text-gray-600">View past sessions</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}