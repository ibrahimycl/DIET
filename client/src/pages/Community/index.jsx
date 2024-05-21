import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from "../../layout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import Card from '../../components/Card/Card';

function Community() {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/community')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Gönderiler alınırken hata oluştu:', error));
    console.log(posts);
  }, []);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('text', text);
      formData.append('image', image);

      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        .split('=')[1];

      const response = await axios.post('http://localhost:5000/api/community/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        const data = response.data;
        window.location.reload();
      } else {
        console.error('Gönderi oluşturulurken hata oluştu:', response.statusText);
      }
    } catch (error) {
      console.error('Gönderi oluşturulurken hata oluştu:', error);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row items-start justify-start min-h-screen bg-lighterGreen p-4 sm:p-6">
        <div className="w-full lg:w-2/3 flex flex-col items-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-first mb-4 sm:mb-6">Topluluk</h1>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 w-full max-w-lg sm:max-w-2xl">
            <div className="mb-4">
              <textarea
                id="text"
                value={text}
                onChange={handleTextChange}
                className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green"
                rows="4"
                placeholder="Bir şeyler paylaş..."
                required
              ></textarea>
            </div>
            <div className="mb-4 flex items-center justify-between">
              <label htmlFor="image" className="cursor-pointer flex items-center">
                <FontAwesomeIcon icon={faImage} size="2x" className="text-gray-500 hover:text-green transition duration-150" />
                <span className="ml-2 text-gray-500">Resim Yükle</span>
              </label>
              <input
                type="file"
                id="image"
                onChange={handleImageChange}
                className="hidden"
              />
              <button
                type="submit"
                className="bg-first text-white py-2 px-4 sm:px-6 rounded hover:bg-green transition duration-150"
              >
                Paylaş
              </button>
            </div>
            {imagePreview && <img src={imagePreview} alt="Image Preview" className="mt-4 w-full h-auto rounded-lg" />}
          </form>


          <div className="w-full max-w-lg sm:max-w-2xl lg:max-w-4xl">
            {posts.map((post, index) => (
              <Card key={index} post={post} />
            ))}
          </div>
        </div>
        <div className="w-full lg:w-1/3 flex flex-col items-center mt-10 lg:mt-0 lg:ml-8">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 mt-10 w-full max-w-xs sm:max-w-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-first mb-2 sm:mb-4">Sağlıklı Tarifler</h2>
            <p className="text-black mb-2 sm:mb-4">İşte sağlıklı ve lezzetli bir tarif: Avokado ve Tavuk Salatası.</p>
            <ul className="list-disc list-inside text-black">
              <li>1 avokado</li>
              <li>200g haşlanmış tavuk göğsü</li>
              <li>1 domates</li>
              <li>1 salatalık</li>
              <li>Zeytinyağı ve limon suyu</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-xs sm:max-w-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-first mb-2 sm:mb-4">Günlük Motivasyon</h2>
            <p className="text-black">Başarı, her gün tekrar eden küçük çabaların toplamıdır.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Community;
