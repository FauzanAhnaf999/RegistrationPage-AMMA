import React from 'react';
import { BookOpen, Menu, X } from 'lucide-react';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export default function Header({ isMenuOpen, setIsMenuOpen }: HeaderProps) {
  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-emerald-600 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Ihya'ul Quran</h1>
              <p className="text-sm text-emerald-600">Program AMMA</p>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {/* <a href="#beranda" className="text-gray-700 hover:text-emerald-600 transition-colors">Beranda</a>
            <a href="#tentang" className="text-gray-700 hover:text-emerald-600 transition-colors">Tentang</a>
            <a href="#program" className="text-gray-700 hover:text-emerald-600 transition-colors">Program</a> */}
            {/* <a href="#daftar" className="text-emerald-600 font-medium">Daftar</a> */}
          </nav>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-emerald-600"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#beranda" className="block px-3 py-2 text-gray-700 hover:text-emerald-600">Beranda</a>
              <a href="#tentang" className="block px-3 py-2 text-gray-700 hover:text-emerald-600">Tentang</a>
              <a href="#program" className="block px-3 py-2 text-gray-700 hover:text-emerald-600">Program</a>
              <a href="#daftar" className="block px-3 py-2 text-emerald-600 font-medium">Daftar</a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}