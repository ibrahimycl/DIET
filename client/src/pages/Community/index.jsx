import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from "../../layout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons';
import Card from '../../components/Card/Card';


function Community() {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Sayfa yüklendiğinde mevcut gönderileri getir
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
        console.log('Post response:', data);
        setPosts([data, ...posts]);
        setText('');
        setImage(null);
        setImagePreview(null);
        document.getElementById('image').value = null;
      } else {
        console.error('Gönderi oluşturulurken hata oluştu:', response.statusText);
      }
    } catch (error) {
      console.error('Gönderi oluşturulurken hata oluştu:', error);
    }
  };


  return (
    <Layout>
      <div className="flex flex-col items-center justify-start min-h-screen bg-lighterGreen p-4">
        <h1 className="text-3xl font-bold text-center text-first mb-4">Topluluk</h1>

        <form onSubmit={handleSubmit} className="bg-gray rounded-lg shadow-md p-4 mb-4 w-full max-w-2xl">
          <div className="mb-2">
            <textarea
              id="text"
              value={text}
              onChange={handleTextChange}
              className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-green"
              rows="3"
              placeholder="Bir şeyler paylaş..."
              required
            ></textarea>
          </div>
          <div className="mb-2">
            <label htmlFor="image" className="cursor-pointer">
              <span>
              <FontAwesomeIcon icon={faImage} size="2x" />
              </span>
            </label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="hidden"
            />
            {imagePreview && <img src={imagePreview} alt="Image Preview" className="mt-2 w-full h-auto rounded" />}
          </div>
          <button
            type="submit"
            className="bg-darkGray text-white py-2 px-4 rounded hover:bg-lightGreen"
          >
            Paylaş
          </button>
        </form>

        <div className="w-full max-w-4xl">
          {posts.map((post, index) => (
            <Card key={index} post={post} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Community;
