import React from 'react';

function Footer() {
  return (
    <footer className="bg-green-400 bg-opacity-75 p-4">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-green-800">
          © 2024 Diet Buddy. Tüm hakları saklıdır.
        </p>
        <div className="flex mt-2">
          <a href="#" className="text-green-800 hover:bg-green-500 px-2 py-1 rounded-md">İletişim</a>
          <a href="#" className="text-green-800 hover:bg-green-500 px-2 py-1 rounded-md">Gizlilik Politikası</a>
          <a href="#" className="text-green-800 hover:bg-green-500 px-2 py-1 rounded-md">Kullanım Şartları</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
