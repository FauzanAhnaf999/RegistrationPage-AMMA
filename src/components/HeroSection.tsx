import React from 'react';
import { Star, Users, Clock, Award } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-emerald-50 to-green-100 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Pendafataran <span className="text-emerald-600">AMMA</span> Batch 27
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-6">

            Bersama AMMA, Raih Kemuliaan Al-Qur’an.
          </p>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto mb-8">
            Bergabunglah dengan ribuan peserta dalam program tahfidz dan tahsin Al-Qur'an.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <Users className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">70+</p>
              <p className="text-sm text-gray-600">Penghafal Quran KB & PAUD</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <Star className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">38+</p>
              <p className="text-sm text-gray-600">Penghafal Quran Remaja</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <Award className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">101+</p>
              <p className="text-sm text-gray-600">Penghafal Quran MI</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md">
              <Clock className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">2500+</p>
              <p className="text-sm text-gray-600">Penghafal Quran Dewasa</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}