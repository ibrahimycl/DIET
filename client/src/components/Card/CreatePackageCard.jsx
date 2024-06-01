import React, { useState } from 'react';
import { apiService } from '../../api/apiService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreatePackageCard() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [months, setMonths] = useState('');
  const [isOnlineCall, setIsOnlineCall] = useState(false);
  const [iban, setIban] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountHolderName, setAccountHolder] = useState('');

  const handleSaveClick = async () => {

    await apiService.post('/package/create', 
    {
        name,
        description,
        price: Number(price),
        month: Number(months),
        isOnlineCall,
        iban,
        bankName,
        accountHolderName
    })
    .then(res =>{
        if(res.success){
            toast.success('Paket Başarıyla Oluşturuldu', { position: "top-right" });
            handleCancelClick();
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }
        else{
            toast.error('Paket Oluşturulamadı', { position: "top-right" });
            console.log(res.error);
        }
    })
  };

  const handleCancelClick = () => {
    setName('');
    setDescription('');
    setPrice('');
    setMonths('');
    setIsOnlineCall(false);
    setIban('');
    setBankName('');
    setAccountHolder('');
  };

  return (
    <div className="flex justify-center items-center mb-8">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl relative">
        <div className="text-lg font-semibold text-darkGray mb-4">
          Yeni Paket Oluştur
        </div>
        <div className="text-first mb-4">
          <p>
            Diyetin adı:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-1 rounded w-full"
            />
          </p>
          <p>
            Açıklama:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-1 rounded w-full"
            />
          </p>
          <p>
            Online Görüşme desteği:
            <select
              value={isOnlineCall}
              onChange={(e) => setIsOnlineCall(e.target.value === 'true')}
              className="border p-1 rounded w-full"
            >
              <option value="true">Var</option>
              <option value="false">Yok</option>
            </select>
          </p>
          <p>
            Kaç ay:
            <input
              type="number"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
              className="border p-1 rounded w-full"
            />
          </p>
          <p>
            Fiyat:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border p-1 rounded w-full"
            />
          </p>
          <hr className="my-4 border-gray-300" />
          <div className="text-lg font-semibold text-darkGray mb-4">
            Banka Bilgileri
          </div>
          <p>
            IBAN:
            <input
              type="text"
              value={iban}
              onChange={(e) => setIban(e.target.value)}
              className="border p-1 rounded w-full"
            />
          </p>
          <p>
            Banka Adı:
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="border p-1 rounded w-full"
            />
          </p>
          <p>
            Hesap Sahibi:
            <input
              type="text"
              value={accountHolderName}
              onChange={(e) => setAccountHolder(e.target.value)}
              className="border p-1 rounded w-full"
            />
          </p>
        </div>
        <div className="flex justify-end space-x-2">
          <button onClick={handleSaveClick} className="bg-green text-white px-4 py-2 rounded-md">
            Kaydet
          </button>
          <button onClick={handleCancelClick} className="bg-red-500 text-white px-4 py-2 rounded-md">
            İptal
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePackageCard;
