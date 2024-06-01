import React, { useState, useEffect } from 'react';
import Layout from "../../layout";
import PackageCard from '../../components/Card/PackageCard';
import CreatePackageCard from '../../components/Card/CreatePackageCard';
import { apiService } from '../../api/apiService';
import { useUserType } from '../../stores/auth/hooks';

function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const userType = useUserType(); 

  const GetPackages = async () => {
    try {
      const res = await apiService.get("/package");
      setPackages(res.data);
    } catch (error) {
      console.error('Paketler alınamadı:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userType !== undefined) {
      GetPackages();
    }
  }, [userType]);

  if (loading || userType === undefined) {
    return <div>Loading...</div>; 
  }

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row items-start justify-start min-h-screen bg-lighterGreen p-4 sm:p-6">
        <div className="w-full lg:w-2/3 flex flex-col items-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-first mb-4 sm:mb-6">Diyet Paketleri</h1>
          
          {userType == 1 && (
            <div className="mb-6 w-full max-w-lg sm:max-w-2xl lg:max-w-4xl">
              <CreatePackageCard />
            </div>
          )}

          <div className="w-full max-w-lg sm:max-w-2xl lg:max-w-4xl">
            {packages.map((dietPackage, index) => (
              <PackageCard key={index} dietPackage={dietPackage} />
            ))}
          </div>
        </div>
        <div className="w-full lg:w-1/3 flex flex-col items-center mt-10 lg:mt-0 lg:ml-8">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 w-full max-w-xs sm:max-w-sm">
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
