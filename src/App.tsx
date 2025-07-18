import React, { useState } from 'react';
import HeroSection from './components/HeroSection';
import RegistrationForm from './components/RegistrationForm';


function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <HeroSection />
        <section id="daftar" className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <RegistrationForm />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;