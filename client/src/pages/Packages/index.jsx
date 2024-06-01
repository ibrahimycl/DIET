import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from "../../layout";
import PackageCard from '../../components/Card/PackageCard';
import { apiService } from '../../api/apiService';

function Packages() {
  const [packages, setPackages] = useState([]);

  const GetPackages = async () => {

    await apiService.get("/package")
    .then(res => setPackages(res.data))
  
  };

  useEffect(() => {
    GetPackages();
  }, []);



  return (
    <Layout>
      <div className="flex flex-col lg:flex-row items-start justify-start min-h-screen bg-lighterGreen p-4 sm:p-6">
        <div className="w-full lg:w-2/3 flex flex-col items-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-first mb-4 sm:mb-6">Diyet Paketleri</h1>
          
          <div className="w-full max-w-lg sm:max-w-2xl lg:max-w-4xl">
            {packages.map((dietPackage, index) => (
              <PackageCard key={index} dietPackage={dietPackage} />
            ))}
          </div>
        </div>
        <div className="w-full lg:w-1/3 flex flex-col items-center mt-10 lg:mt-0 lg:ml-8">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 mt-10 w-full max-w-xs sm:max-w-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-first mb-2 sm:mb-4">Özel Paketler</h2>
            <p className="text-black mb-2 sm:mb-4">Kişisel ihtiyaçlarınıza uygun özel diyet paketlerini keşfedin.</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-xs sm:max-w-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-first mb-2 sm:mb-4">Sağlıklı Yaşam İpuçları</h2>
            <p className="text-black">Her gün sağlıklı bir yaşam için küçük adımlar atın.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Packages;
