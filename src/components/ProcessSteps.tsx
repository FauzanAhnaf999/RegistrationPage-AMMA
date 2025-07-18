import React from 'react';
import { FileText, Users, MessageCircle, Award } from 'lucide-react';

export default function ProcessSteps() {
  const steps = [
    {
      icon: FileText,
      title: 'Isi Formulir',
      description: 'Lengkapi formulir pendaftaran dengan data yang valid'
    },
    {
      icon: MessageCircle,
      title: 'Konfirmasi WhatsApp',
      description: 'Tim kami akan menghubungi Anda melalui WhatsApp'
    },
    {
      icon: Users,
      title: 'Bergabung dengan Grup',
      description: 'Masuk ke grup WhatsApp untuk informasi dan materi'
    },
    {
      icon: Award,
      title: 'Mulai Belajar',
      description: 'Ikuti jadwal dan mulai perjalanan menghafal Al-Qur\'an'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Cara Mendaftar</h2>
          <p className="text-lg text-gray-600">
            Proses pendaftaran yang mudah dan cepat dalam 4 langkah sederhana
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-emerald-200 transition-colors">
                  <step.icon className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}