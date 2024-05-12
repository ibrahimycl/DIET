import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Layout from "../../layout";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setFirstName] = useState('');
  const [surname, setLastName] = useState('');
  const [birthday, setBirthdate] = useState('');
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');
  const [userType, setUserType] = useState(0); 
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleBirthdateChange = (e) => {
    setBirthdate(e.target.value);
  };

  const handleExperienceChange = (e) => {
    setExperience(e.target.value);
  };

  const handleEducationChange = (e) => {
    setEducation(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        userType,
        userName,
        email,
        password,
        name,
        surname,
        birthday,
      };

      if (userType === 'dietitian') {
        userData.userType = 1;
        userData.experience = experience;
        userData.education = education;
      }
      console.log(userType);

      const response = await fetch('http://localhost:5000/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (response.status === 200) {
        const data = await response.json();
        console.log('Signup response:', data);
        toast.success('Kayıt Başarılı', { position: "top-right" });
        navigate("/auth/login");
      } else {
        const errorMessage = await response.json();
        console.error('Error:', errorMessage.message);
        toast.error('Kayıt Başarısız', { position: "top-right" });
      }
    } catch (error) {
      console.error('Error:', error.message);
      toast.error('Bir hata oluştu', { position: "top-right" });
    }
  
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-6">Kayıt Ol</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Kullanıcı Adı</label>
            <input
              type="text"
              id="username"
              value={userName}
              onChange={handleUsernameChange}
              maxLength={30} 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Kullanıcı adınızı girin"
              required
            />
          </div>
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
          <div className="mb-4">
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
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">Ad</label>
            <input
              type="text"
              id="firstName"
              value={name}
              onChange={handleFirstNameChange}
              maxLength={30} 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Adınızı girin"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">Soyad</label>
            <input
              type="text"
              id="lastName"
              value={surname}
              onChange={handleLastNameChange}
              maxLength={30} 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Soyadınızı girin"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="birthdate" className="block text-gray-700 font-bold mb-2">Doğum Tarihi</label>
            <input
              type="date"
              id="birthdate"
              value={birthday}
              onChange={handleBirthdateChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          {userType === 'dietitian' && (
            <div>
              <div className="mb-4">
                <label htmlFor="experience" className="block text-gray-700 font-bold mb-2">Tecrübe (Yıl)</label>
                <input
                  type="number"
                  id="experience"
                  value={experience}
                  onChange={handleExperienceChange}
                  min={0} 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Tecrübenizi girin"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="education" className="block text-gray-700 font-bold mb-2">Mezuniyet</label>
                <input
                  type="text"
                  id="education"
                  value={education}
                  onChange={handleEducationChange}
                  maxLength={50} 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Mezun olduğunuz okulu girin"
                  required
                />
              </div>
            </div>
          )}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Kayıt Ol
            </button>
            <div>
              <label htmlFor="userType" className="block text-gray-700 font-bold mb-2">Kullanıcı Türü</label>
              <select
                id="userType"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="0">Normal Kullanıcı</option>
                <option value="1">Diyetisyen</option>
              </select>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </Layout>
  );
}

export default Signup;
