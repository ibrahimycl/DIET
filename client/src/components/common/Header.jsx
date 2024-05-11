import React from 'react';

function Header() {
  return (
    <nav className="bg-green-400 bg-opacity-75 p-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-green-800 font-bold mr-4">DIYET DOSTUM</div>
            <div className="hidden md:flex">
              <a href="#" className="text-green-800 hover:bg-green-500 px-3 py-2 rounded-md">Ana Sayfa</a>
              <a href="#" className="text-green-800 hover:bg-green-500 px-3 py-2 rounded-md">Topluluk</a>
              <a href="#" className="text-green-800 hover:bg-green-500 px-3 py-2 rounded-md">Paketler</a>
              <a href="#" className="text-green-800 hover:bg-green-500 px-3 py-2 rounded-md">Görüşmeler</a>
            </div>
          </div>
          <div className="flex">
            <a href="#" className="text-green-800 hover:bg-green-500 px-3 py-2 rounded-md">Giriş</a>
            <a href="#" className="text-green-800 hover:bg-green-500 px-3 py-2 rounded-md">Kaydol</a>
          </div>
          <div className="flex md:hidden">
            <button className="text-green-800 hover:bg-green-500 focus:outline-none focus:bg-green-500 px-3 py-2 rounded-md">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="md:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="#" className="text-green-800 hover:bg-green-500 block px-3 py-2 rounded-md">Ana Sayfa</a>
          <a href="#" className="text-green-800 hover:bg-green-500 block px-3 py-2 rounded-md">Topluluk</a>
          <a href="#" className="text-green-800 hover:bg-green-500 block px-3 py-2 rounded-md">Paketler</a>
          <a href="#" className="text-green-800 hover:bg-green-500 block px-3 py-2 rounded-md">Görüşmeler</a>
          <a href="#" className="text-green-800 hover:bg-green-500 block px-3 py-2 rounded-md">Giriş</a>
          <a href="#" className="text-green-800 hover:bg-green-500 block px-3 py-2 rounded-md">Kaydol</a>
        </div>
      </div>
    </nav>
  );
}

export default Header;
