import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import RegistrationForm from './components/RegistrationForm';
import ProcessSteps from './components/ProcessSteps';
import Footer from './components/Footer';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} /> */}
      
      <main>
        <HeroSection />
        
        {/* <ProcessSteps /> */}
        
        <section id="daftar" className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <RegistrationForm />
          </div>
        </section>

        {/* Integration Instructions */}
        {/* <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Integrasi Google Sheets</h3>
              <div className="space-y-3 text-blue-800">
                <p>Untuk mengintegrasikan formulir dengan Google Sheets:</p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Buat Google Sheet baru dengan kolom sesuai field formulir</li>
                  <li>Gunakan Google Apps Script atau service seperti SheetDB</li>
                  <li>Ganti URL endpoint di handleSubmit function</li>
                  <li>Tambahkan API key ke environment variables</li>
                </ol>
                <p className="text-sm text-blue-700 mt-4">
                  Contoh endpoint: <code className="bg-blue-100 px-2 py-1 rounded">https://api.sheetdb.io/v1/YOUR_SHEET_ID</code>
                </p>
              </div>
            </div>
          </div>
        </section> */}
      </main>
      
      {/* <Footer /> */}
    </div>
  );
}

export default App;