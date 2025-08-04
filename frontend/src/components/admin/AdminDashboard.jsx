import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import ConsultantForm from './ConsultantForm';
import AddTImeSlots from './AddTImeSlots';
import AllConsultant from './AllConsultant';
import AllUsers from './AllUsers';

const Sidebar = ({ isOpen, onMenuClick, activePage }) => {
  const getClass = (page) =>
    `p-2 rounded cursor-pointer ${
      activePage === page ? 'bg-purple-400 text-white-100' : 'hover:text-purple-200'
    }`;

  return (
    <div
      style={{ backgroundColor: "#70467e" }}
      className={`
         text-white p-4 w-64 h-screen fixed top-0 left-0 z-40
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}
    >
      {/* Mobile Close Button */}
      <div className="flex justify-end md:hidden mb-4">
        <button
          onClick={() => onMenuClick(activePage)}
          className="text-white hover:text-gray-300"
        >
          <X size={24} />
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <ul className="space-y-2">
        <li onClick={() => onMenuClick('dashboard')} className={getClass('dashboard')}>Dashboard</li>
        <li onClick={() => onMenuClick('students')} className={getClass('students')}>Students</li>
        <li onClick={() => onMenuClick('allconsultant')} className={getClass('allconsultant')}>All Consultant</li>
        <li onClick={() => onMenuClick('alluser')} className={getClass('alluser')}>All User</li>


        <li onClick={() => onMenuClick('applications')} className={getClass('applications')}>Applications</li>
        <li onClick={() => onMenuClick('consultants')} className={getClass('consultants')}>Create Consultants</li>
        <li onClick={() => onMenuClick('addTimeSlots')} className={getClass('addTimeSlots')}>Add Time Slots</li>

        <li onClick={() => onMenuClick('settings')} className={getClass('settings')}>Settings</li>
      </ul>
    </div>
  );
};

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onMenuClick={(page) => {
          setActivePage(page);
          setSidebarOpen(false);
        }}
        activePage={activePage}
      />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 min-h-screen bg-gray-100 transition-all duration-300 md:ml-64">
        {/* Header */}
        <div className="flex items-center justify-between bg-white p-4 shadow-md sticky top-0 z-30">
          <button
            className="md:hidden text-purple-700"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-xl font-bold text-purple-700">Student Consultancy Admin</h1>
        </div>

        {/* Page Content */}
        <div className="p-6 space-y-6">
          {activePage === 'dashboard' && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Welcome to the Dashboard</h2>
              <p className="text-gray-600">
                This is your control center for managing students, applications, and more.
              </p>
            </>
          )}

          {activePage === 'consultants' && <ConsultantForm />}
          {activePage === 'addTimeSlots'  && <AddTImeSlots/>}
          {activePage === 'allconsultant'  && <AllConsultant/>}
          {activePage === 'alluser'  && <AllUsers/>}



        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
