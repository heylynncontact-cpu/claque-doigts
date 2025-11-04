import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://raw.githubusercontent.com/heylynncontact-cpu/claque-doigts/main/assets/images/IMG1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Content Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex justify-between items-center p-6 md:p-8">
          {/* Logo */}
          <div className="w-48 md:w-64">
            <img 
              src="https://raw.githubusercontent.com/heylynncontact-cpu/claque-doigts/main/assets/icons/Lettermark.svg"
              alt="Claque Doigts"
              className="w-full h-auto"
            />
          </div>
          
          {/* Connexion Button - Desktop only */}
          <button className="hidden md:block bg-blue-500 text-black font-medium px-6 py-2 rounded-md border border-black hover:bg-blue-400 transition-colors">
            Connexion
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
          {/* Decorative Icon Mobile */}
          <div className="md:hidden mb-8 w-12 h-12">
            <img 
              src="https://raw.githubusercontent.com/heylynncontact-cpu/claque-doigts/main/assets/icons/Sigle.svg"
              alt=""
              className="w-full h-auto"
            />
          </div>

          {/* Decorative Blob - Desktop */}
          <div className="hidden md:block absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-20 w-20 h-20 opacity-90">
            <img 
              src="https://raw.githubusercontent.com/heylynncontact-cpu/claque-doigts/main/assets/icons/Element.svg"
              alt=""
              className="w-full h-auto"
            />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-medium text-center mb-8 md:mb-12 leading-tight">
            Créer ta stratégie<br />
            social media<br />
            facilement !
          </h1>

          {/* CTA Button */}
          <button className="bg-[#CDF667] text-black font-medium px-6 py-3 rounded-md border-2 border-black hover:bg-[#b8e055] transition-colors text-sm md:text-base">
            Commencer
          </button>
        </main>

        {/* Footer */}
        <footer className="py-6 px-6 text-center text-xs md:text-sm text-black/70">
          <p className="mb-2">© 2025 Claque Doigts - Tous droits réservés</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a href="#" className="hover:underline">Mentions légales</a>
            <span>|</span>
            <a href="#" className="hover:underline">Politique de confidentialité</a>
            <span>|</span>
            <a href="#" className="hover:underline">CGV</a>
          </div>
        </footer>
      </div>
    </div>
  );
}