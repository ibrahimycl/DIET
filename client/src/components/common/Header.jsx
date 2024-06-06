import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../../api/apiService";
import { setLogout } from "../../stores/auth/actions";
import { useIsLogin } from "../../stores/auth/hooks";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const isLogin = useIsLogin();
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    await apiService.get("/user/logout")
    .then(() => {
      setLogout()
      navigate("/")
    })
  }

  return (
    <nav className="bg-lighterGreen bg-opacity-75 p-4">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a className="text-first font-bold mr-4 text-2xl " href="/">DIYET DOSTUM</a>
            <div className="hidden md:flex">
              <a href="/" className="text-green hover:bg-lightGreen px-3 py-2 rounded-md">Ana Sayfa</a>
              <a href="/community" className="text-green hover:bg-lightGreen px-3 py-2 rounded-md">Topluluk</a>
              <a href="/packages" className="text-green hover:bg-lightGreen px-3 py-2 rounded-md">Paketler</a>
              <a href="/food" className="text-green hover:bg-lightGreen px-3 py-2 rounded-md">Yemek Takibi</a>
            </div>
          </div>
          <div className="flex">
            {isLogin ? (
              <>
                <a href="/profile" className="text-green hover:bg-lightGreen px-3 py-2 rounded-md">Profil</a>
                <a href="/basket" className="text-green hover:bg-lightGreen px-3 py-2 rounded-md">Sepet</a>
                <button onClick={handleLogout} className="text-green hover:bg-lightGreen px-3 py-2 rounded-md">Çıkış</button>
              </>
            ) : (
              <>
                <a href="/auth/login" className="text-green hover:bg-lightGreen px-3 py-2 rounded-md">Giriş</a>
                <a href="/auth/signup" className="text-green hover:bg-lightGreen px-3 py-2 rounded-md">Kaydol</a>
              </>
            )}
          </div>
          <div className="flex md:hidden">
            <button onClick={toggleMenu} className="text-green hover:bg-lightGreen focus:outline-none focus:bg-lightGreen px-3 py-2 rounded-md">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={isMenuOpen ? "block md:hidden" : "hidden md:hidden"} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="/" className="text-green hover:bg-lightGreen block px-3 py-2 rounded-md">Ana Sayfa</a>
          <a href="/community" className="text-green hover:bg-lightGreen block px-3 py-2 rounded-md">Topluluk</a>
          <a href="/packages" className="text-green hover:bg-lightGreen block px-3 py-2 rounded-md">Paketler</a>
          <a href="/food" className="text-green hover:bg-lightGreen block px-3 py-2 rounded-md">Yemek Takibi</a>
          {isLogin ? (
            <>
              <a href="/profile" className="text-green hover:bg-lightGreen block px-3 py-2 rounded-md">Profil</a>
              <a href="/basket" className="text-green hover:bg-lightGreen block px-3 py-2 rounded-md">Sepet</a>
              <button onClick={handleLogout} className="text-green hover:bg-lightGreen block px-3 py-2 rounded-md">Çıkış</button>
            </>
          ) : (
            <>
              <a href="/auth/login" className="text-green hover:bg-lightGreen block px-3 py-2 rounded-md">Giriş</a>
              <a href="/auth/signup" className="text-green hover:bg-lightGreen block px-3 py-2 rounded-md">Kaydol</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
