import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../api/apiService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Payment() {
  const [cardUserName, setCardUserName] = useState('John Doe');
  const [cardNumber, setCardNumber] = useState('5528790000000008');
  const [expireDate, setExpireDate] = useState('12/30');
  const [cvc, setCvc] = useState('123');
  const [city, setCity] = useState('Istanbul');
  const [country, setCountry] = useState('Turkey');
  const [adress, setAddress] = useState('Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1');

  const navigate = useNavigate();

  const handleSaveClick = async () => {
    try {
      const response = await apiService.post('/package/addPayment', {
        cardUserName,
        cardNumber,
        expireDate,
        cvc,
        city,
        country,
        adress
      });

      if (response.success) {
        toast.success('Ödeme başarıyla yapıldı', { position: 'top-right' });
        setTimeout(() => {
            navigate("/profile");
        }, 1500);
      } else {
        toast.error('Ödeme yapılamadı', { position: 'top-right' });
        console.error('Ödeme yapılamadı:', response.error);
      }
    } catch (error) {
      toast.error('Ödeme işlemi sırasında bir hata oluştu', { position: 'top-right' });
      console.error('Ödeme işlemi sırasında bir hata oluştu:', error);
    }
  };

  return (
    <div className="flex justify-center items-center mb-8">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl relative">
        <div className="text-lg font-semibold text-darkGray mb-4">
          Ödeme Bilgileri
        </div>
        <div className="text-first mb-4">
          <p>
            Kart Üzerindeki İsim:
            <input
              type="text"
              value={cardUserName}
              onChange={(e) => setCardUserName(e.target.value)}
              className="border p-1 rounded w-full"
            />
          </p>
          <p>
            Kart Numarası:
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="border p-1 rounded w-full"
            />
          </p>
          <p>
            Son Kullanma Tarihi:
            <input
              type="text"
              value={expireDate}
              onChange={(e) => setExpireDate(e.target.value)}
              className="border p-1 rounded w-full"
            />
          </p>
          <p>
            CVC:
            <input
              type="text"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              className="border p-1 rounded w-full"
            />
          </p>
          <p>
            Şehir:
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border p-1 rounded w-full"
            />
          </p>
          <p>
            Ülke:
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="border p-1 rounded w-full"
            />
          </p>
          <p>
            Adres:
            <input
              type="text"
              value={adress}
              onChange={(e) => setAddress(e.target.value)}
              className="border p-1 rounded w-full"
            />
          </p>
        </div>
        <div className="flex justify-end space-x-2">
          <button onClick={handleSaveClick} className="bg-green text-white px-4 py-2 rounded-md">
            Ödemeyi Tamamla
          </button>
          <button onClick={() => navigate(-1)} className="bg-red-500 text-white px-4 py-2 rounded-md">
            İptal
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Payment;
