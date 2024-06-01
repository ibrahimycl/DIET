import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Layout from "../../layout";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiService } from '../../api/apiService';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userData = {
      userType,
      userName,
      email,
      password,
      name,
      surname,
      birthday,
    };

    if (userType === '1') {
      userData.userType = 1;
      userData.experience = experience;
      userData.education = education;
    }
    
    await apiService.post("user/signup", userData)
    .then(res => {
      if (res.success) {
        console.log(res);
        toast.success('Kayıt Başarılı', { position: "top-right" });
        setTimeout(() => {
          navigate("/auth/login");
        }, 1500);
      } else {
        toast.error('Kayıt Başarısız: ' + res.error.message, { position: "top-right" });
      }
    })
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-6">Kayıt Ol</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Kullanıcı Adı</label>
            <input
              type="text"
              id="username"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
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
              onChange={(e) => setFirstName(e.target.value)}
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
              onChange={(e) => setLastName(e.target.value)}
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
              onChange={(e) => setBirthdate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          {userType === "1" && (
            <div>
              <div className="mb-4">
                <label htmlFor="experience" className="block text-gray-700 font-bold mb-2">Tecrübe (Yıl)</label>
                <input
                  type="number"
                  id="experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
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
                  onChange={(e) => setEducation(e.target.value)}
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
              className="bg-green hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
