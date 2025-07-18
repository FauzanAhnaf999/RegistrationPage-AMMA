import React from 'react';
import { BookOpen, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-emerald-600 rounded-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Ihya'ul Quran</h3>
                <p className="text-emerald-400">Program AMMA</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Bergabunglah dengan ribuan muslimin dan muslimat dalam perjalanan menghafal 
              dan memahami Al-Qur'an dengan metode yang telah terbukti efektif.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <MessageCircle className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Program</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Tahfidz Al-Qur'an</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Tahsin Tilawah</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Tafsir Al-Qur'an</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Bahasa Arab</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Kontak</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-emerald-400" />
                <span>+62 812-3456-789</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-emerald-400" />
                <span>info@ihyaulquran.id</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-emerald-400 mt-0.5" />
                <span>Jakarta, Indonesia</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Ihya'ul Quran - Program AMMA. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}