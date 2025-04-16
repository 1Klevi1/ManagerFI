import React from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/logo.png'; // Make sure you have this image!

function Dashboard() {
    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl text-center w-full max-w-xl">
                {/* Square logo with rounded corners */}
                <img
                    src={logo}
                    alt="Company Logo"
                    className="mx-auto mb-6 w-40 h-40 object-cover rounded-lg border-8 border-blue-600 shadow-2xl transform transition-all duration-500 hover:scale-105"
                />
                <h1 className="text-4xl font-extrabold text-blue-700 mb-4">Fleet Management</h1>
                <p className="text-lg text-gray-600 mb-6">
                    Manage your construction fleet with ease and precision.
                </p>
                <Link
                    to="/fleet"
                    className="inline-block bg-blue-600 text-white text-lg font-medium px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition-all duration-200"
                >
                    🚗 Enter Fleet Manager
                </Link>
            </div>
        </div>
    );
}

export default Dashboard;
