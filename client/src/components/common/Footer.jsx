function Footer() {
  return (
    <footer className="bg-footer bg-opacity-75 p-4">
      <div className="max-w-screen-2xl mx-auto px-4">
        <p className="text-green">
          © 2024 Diet Buddy. Tüm hakları saklıdır.
        </p>
        <div className="flex mt-2">
          <a href="#" className="text-green hover:bg-lightGreen px-2 py-1 rounded-md">İletişim</a>
          <a href="#" className="text-green hover:bg-lightGreen px-2 py-1 rounded-md">Gizlilik Politikası</a>
          <a href="#" className="text-green hover:bg-lightGreen px-2 py-1 rounded-md">Kullanım Şartları</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
