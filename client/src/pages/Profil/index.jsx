import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from "../../layout";
import PostCard from '../../components/Card/PostCard';
import PackageCard from '../../components/Card/PackageCard';
import { useParams } from 'react-router-dom';
import { apiService } from '../../api/apiService';
import { useIsLogin } from '../../stores/auth/hooks';


function Profil() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const login = useIsLogin(); 

  useEffect(() => {
    if (login !== null) {
      setLoading(false);
      fetchUserData();
    }
  }, [login]);

  const fetchUserData = async () => {
    try {
      let requestData = (id) ? { id: id.split('=')[1] } : {};
  
      apiService.post("/profile/id", requestData)
        .then(res => {
          setUser(res.data);  
          const userId = res.data.userId;
  
          apiService.post("/community", { id: userId })
            .then(res => {
              setPosts(res.data);
            })
            .catch(error => console.error('Gönderiler alınırken hata oluştu:', error));
  
          if (res.data.userType === 0) {
            apiService.post("/package/GetPackagesUser", { id: userId })
              .then(res => {
                setPackages(res.data);
              })
              .catch(error => console.error('Kullanıcı paketleri alınırken hata oluştu:', error));
          }
  
          if (res.data.userType === 1) {
            apiService.post("/package/GetPackagesDietitian", { id: userId })
              .then(res => {
                setPackages(res.data);
              })
              .catch(error => console.error('Diyetisyen paketleri alınırken hata oluştu:', error));
          }
        })
        .catch(error => console.error('Kullanıcı verisi alınırken hata oluştu:', error));
    } catch (error) {
      console.error('Veri alınırken hata oluştu:', error);
    }
  };
  

  const handleFileSelect = async (event) => {
    const image = event.target.files[0];
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);

    await apiService.post("/profile/update", formData,{ headers: {'Content-Type': 'multipart/form-data'}})
    .then(res =>{
      if(res.success){
        console.log('Profil resmi başarıyla güncellendi:', res.data);
        fetchUserData();
      }
      else{
        console.error('Profil resmi güncellenirken bir hata oluştu:', res.error);
      }
    })
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

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
              disabled={!!id}
            />
            <label
              htmlFor="fileInput"
              className={`cursor-pointer ${id ? 'pointer-events-none' : ''}`}
              onClick={id ? (e) => e.preventDefault() : null}
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

        <div className="flex flex-col lg:flex-row lg:space-x-8 mt-10">
          <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold ms-16 text-first mb-4">Paylaştığım Gönderiler</h2>
              {posts.length > 0 ? (
                posts.map((post, index) => (
                  <PostCard key={index} post={post} />
                ))
              ) : (
                <p className="text-gray-500">Henüz gönderi paylaşılmadı.</p>
              )}
            </div>
          </div>

          <div className="border-l border-gray-300 mx-4"></div> {/* Vertical line */}

          <div className="w-full lg:w-1/2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-first mb-4 ms-16">Sahip Olduğum Paketler</h2>
              {packages.length > 0 ? (
                <ul className="list-disc list-inside text-black">
                  {packages.map((dietPackage, index) => (
                    <PackageCard key={index} dietPackage={dietPackage} />
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">Henüz sahip olduğunuz bir paket yok.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profil;
