import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from "../../layout";
import Card from '../../components/Card/Card';


function Profil() {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [packages, setPackages] = useState([]);
  const [token, setToken] = useState();

  const fetchUserData = async () => {
    try {
      let token;

      const cookieString = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='));

      if (cookieString) {
        token = cookieString.split('=')[1];
      }

      const response = await axios.post('http://localhost:5000/api/profile/id', { id: '660822f023f96fd18bce54f6' }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const responsePost = await axios.post('http://localhost:5000/api/community', { id: '660822f023f96fd18bce54f6' }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      setUser(response.data);
      setPosts(responsePost.data);
      setPackages(response.data.packages);


    } catch (error) {
      console.error('Veri alınırken hata oluştu:', error);
    }
  };

  const handleFileSelect = async (event) => {

    let token;

    const cookieString = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='));

    if (cookieString) {
      token = cookieString.split('=')[1];
    }
    const image = event.target.files[0];
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/api/profile/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response);
      console.log('Profil resmi başarıyla güncellendi:', response.data);
      fetchUserData();
    } catch (error) {
      console.error('Profil resmi güncellenirken bir hata oluştu:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-lighterGreen p-4 sm:p-6">
        <div className="flex justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6 flex flex-col md:flex-row items-center w-1/2">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="fileInput"
              onChange={handleFileSelect}
            />
            <label
              htmlFor="fileInput"
              className="cursor-pointer"
            >
              <img
                src={`/images/profile_images/${user.imagePath}`}
                alt="Profil Fotoğrafı"
                className="w-52 h-52 rounded-full mb-4 md:mb-0 md:mr-6"
              />
            </label>
            <div className="text-center md:text-left md:w-1/2">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-first mb-2">{user.name} {user.surname}</h2>
              <p className="text-gray-500 text-lg md:text-xl lowercase">@{user.username}</p>
              <p className="text-gray-500 text-lg md:text-xl">{user.email}</p>
              <p className="text-gray-500 text-lg md:text-xl">{user.birthday ? new Date(user.birthday).toLocaleDateString("tr-TR") : ""}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <div className="w-full lg:w-2/3 mb-6 lg:mb-0">
            <h2 className="text-2xl sm:text-3xl font-bold text-first mb-4">Paylaştığım Gönderiler</h2>
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <Card key={index} post={post} />
              ))
            ) : (
              <p className="text-gray-500">Henüz gönderi paylaşılmadı.</p>
            )}
          </div>

          <div className="w-full lg:w-1/3">
            <h2 className="text-2xl sm:text-3xl font-bold text-first mb-4">Sahip Olduğum Paketler</h2>
            {packages.length > 0 ? (
              <ul className="list-disc list-inside text-black">
                {packages.map((pkg, index) => (
                  <li key={index} className="mb-2">{pkg.name}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Henüz sahip olduğunuz bir paket yok.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profil;
