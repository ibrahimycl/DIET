import { useState, useEffect } from 'react';
import Layout from "../../layout";
import PackageCard from '../../components/Card/PackageCard';
import { apiService } from '../../api/apiService';
import { useNavigate } from 'react-router-dom';


function Basket() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();


  const GetBasket = async () => {
    try {
      const res = await apiService.post("/package/GetBasket");
      console.log(res);
      setPackages(res.data);
      calculateTotalPrice(res.data);
    } catch (error) {
      console.error('Sepet alınamadı:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalPrice = (packages) => {
    let total = 0;
    packages.forEach((dietPackage) => {
      total += dietPackage.price;
    });
    setTotalPrice(total);
  };

  const handlePurchase = () => {
    navigate("/payment");
  };

  const handleRemoveFromBasket = async (packageId) => {
    await apiService.post("/package/deleteBasket", { _id: packageId })
      .then(() => {
          GetBasket(); 
        })
  };

  useEffect(() => {
    GetBasket();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-lighterGreen p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-first mb-4 sm:mb-6">Sepetim</h1>

        <div className="w-full max-w-lg sm:max-w-2xl lg:max-w-4xl">
          {packages.length === 0 ? (
            <p className="text-center text-black">Sepetiniz boş.</p>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-4">
              {packages.map((dietPackage, index) => (
                <PackageCard
                  key={index}
                  dietPackage={dietPackage}
                  removeFromBasket={handleRemoveFromBasket} // removeFromBasket fonksiyonunu PackageCard bileşenine geçir
                />
              ))}
              <div className="flex justify-center items-center mt-4">
                <p className="text-black">Toplam Fiyat: {totalPrice} TL</p>
                <button
                  onClick={handlePurchase}
                  className="bg-first hover:bg-second text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
                >
                  Ödemeye Geç
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Basket;
