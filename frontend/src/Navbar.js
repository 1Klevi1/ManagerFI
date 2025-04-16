// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/logo.png';  // Import logo image

function Navbar() {
    return (
        <nav className="bg-blue-700 text-white px-6 py-4 flex items-center justify-between shadow-md fixed top-0 left-0 w-full z-50">
            {/* Logo as Brand */}
            <img src={logo} alt="Company Logo" className="h-10" />

            {/* Navbar Links */}
            <div className="space-x-6 flex items-center">
                <Link to="/" className="hover:underline text-lg">Dashboard</Link>
                <Link to="/fleet" className="hover:underline text-lg">Fleet</Link>
            </div>
        </nav>
    );
}

export default Navbar;
