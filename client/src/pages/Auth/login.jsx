import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Layout from "../../layout";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.status === 200) {
        const data = await response.json();
        console.log('Login response:', data);
        toast.success('Giriş Başarılı', { position: "top-right" });
        navigate("/");
      } else {
        const errorMessage = await response.json();
        console.error('Error:', errorMessage);
        toast.error('Hatalı Email veya Şifre', { position: "top-right" });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Bir hata oluştu', { position: "top-right" });
    }
  
    setEmail('');
    setPassword('');
  };
  

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-6">Giriş Yap</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">E-posta Adresi</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              maxLength={60} 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="E-posta adresinizi girin"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Şifre</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              maxLength={30} 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Şifrenizi girin"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Giriş Yap
            </button>
            <a
              href="#"
              className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-800"
            >
              Henüz Bir Hesabın Yoksa Kayıt Olunuz
            </a>
          </div>
        </form>
      </div>
      <ToastContainer />
    </Layout>
  );
}

export default Login;
