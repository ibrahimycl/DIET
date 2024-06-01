import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons'; 
import { apiService } from '../../api/apiService';
import { useUserType } from '../../stores/auth/hooks';
import { useAuthData } from '../../stores/auth/hooks';
import { ToastContainer, toast } from 'react-toastify';

function PackageCard({ dietPackage, removeFromBasket }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(dietPackage.name);
  const [editedDescription, setEditedDescription] = useState(dietPackage.description);
  const [editedPrice, setEditedPrice] = useState(dietPackage.price);
  const [editedMonths, setEditedMonths] = useState(dietPackage.month);
  const [editedOnlineCall, setEditedOnlineCall] = useState(dietPackage.isOnlineCall);
  const userType = useUserType();
  const user = useAuthData();

  const handleUsernameClick = () => {
    navigate(`/profile/id=${dietPackage.dietitianId._id}`);
  };

  const handlePurchaseClick = async () => {
    await apiService.post("/package/addedBasket", { _id: dietPackage._id })
      .then(res => {
        if (res.success) {
          toast.success('Paket Başarıyla Sepete Eklendi', { position: "top-right" });
          window.location.reload();
        }
        else {
          toast.error('Paket Eklenmedi', res.error, { position: "top-right" });
        }
      })
  };

  const handleRemoveFromBasket = async () => {
    removeFromBasket(dietPackage._id); // removeFromBasket fonksiyonunu çağırarak paketi sepetten kaldır
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    await apiService.post(`/package/update/${dietPackage._id}`,
      {
        name: editedName,
        description: editedDescription,
        price: editedPrice,
        month: editedMonths,
        isOnlineCall: editedOnlineCall,
        dietitianId: dietPackage.dietitianId._id
      })
      .then(res => {
        if (res.success) {
          dietPackage.name = editedName;
          dietPackage.description = editedDescription;
          dietPackage.price = editedPrice;
          dietPackage.month = editedMonths;
          dietPackage.isOnlineCall = editedOnlineCall;
          setIsEditing(false);
        }
        else {
          console.error('Paket Güncellenemedi:', res.error);
        }
      })
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedName(dietPackage.name);
    setEditedDescription(dietPackage.description);
    setEditedPrice(dietPackage.price);
    setEditedMonths(dietPackage.month);
    setEditedOnlineCall(dietPackage.isOnlineCall);
  };

  return (
    <div className="flex justify-center items-center mb-8">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl relative">
        {location.pathname === '/basket' && (
          <FontAwesomeIcon icon={faTimes} className="absolute top-2 right-2 cursor-pointer" onClick={handleRemoveFromBasket} />
        )}
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-semibold text-darkGray">
            {isEditing ? (
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="border p-1 rounded"
              />
            ) : (
              dietPackage.name
            )}
          </div>
          {location.pathname === '/profile' && (
            <div className="flex space-x-2">
              <FontAwesomeIcon icon={faEdit} className="cursor-pointer" onClick={handleEditClick} />
            </div>
          )}
        </div>
        <div className="text-first mb-4">
          <p>Diyetin adı: {isEditing ? (
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="border p-1 rounded"
            />
          ) : (
            dietPackage.name
          )}
          </p>
          {(dietPackage.description || isEditing) && (
            <p>Açıklama: {isEditing ? (
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="border p-1 rounded w-full"
              />
            ) : (
              dietPackage.description
            )}
            </p>
          )}
          <p>Online Görüşme desteği: {isEditing ? (
            <select
              value={editedOnlineCall}
              onChange={(e) => setEditedOnlineCall(e.target.value === 'true')}
              className="border p-1 rounded"
            >
              <option value="true">Var</option>
              <option value="false">Yok</option>
            </select>
          ) : (
            dietPackage.isOnlineCall ? 'Var' : 'Yok'
          )}
          </p>
          <p>Kaç ay: {isEditing ? (
            <input
              type="number"
              value={editedMonths}
              onChange={(e) => setEditedMonths(Number(e.target.value))}
              className="border p-1 rounded"
            />
          ) : (
            `${dietPackage.month} ay`
          )}
          </p>
          <p>Fiyat: {isEditing ? (
            <input
              type="number"
              value={editedPrice}
              onChange={(e) => setEditedPrice(Number(e.target.value))}
              className="border p-1 rounded"
            />
          ) : (
            `${dietPackage.price} TL`
          )}
          </p>
          <p>Diyetisyen adı: {dietPackage.dietitianId.name} {dietPackage.dietitianId.surname}</p>
          <p>Diyetisyen kullanıcı adı:
            <span className="text-green cursor-pointer" onClick={handleUsernameClick}>
              @{dietPackage.dietitianId.userName}
            </span>
          </p>
        </div>
        {isEditing ? (
          <div className="flex justify-end space-x-2">
            <button onClick={handleSaveClick} className="bg-green text-white px-4 py-2 rounded-md">
              Kaydet
            </button>
            <button onClick={handleCancelEdit} className="bg-red-500 text-white px-4 py-2 rounded-md">
              İptal
            </button>
          </div>
        ) : (
          (userType !== 1 && user && 
            !user.basket.includes(dietPackage._id) &&
            !user.ownedPackages.some(pkg => pkg._id === dietPackage._id)) && (
            <div className="flex justify-end">
              <button
                onClick={handlePurchaseClick}
                className="bg-green text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-150"
              >
                Sepete Ekle
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default PackageCard;
