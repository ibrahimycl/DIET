import React, { useState, useEffect } from 'react';
import Layout from "../../layout";
import { apiService } from '../../api/apiService';

function FoodPage() {
  const [foodName, setFoodName] = useState('');
  const [foods, setFoods] = useState([]);
  const [todayFoods, setTodayFoods] = useState([]);

  useEffect(() => {
    fetchAllFoods();
    fetchTodayFoods();
  }, []);

  const fetchAllFoods = async () => {

    await apiService.get("/food/getAllFoods")
    .then(res =>{
      setFoods(response.data);
    })
  };

  const fetchTodayFoods = async () => {

    await apiService.get("/food/getTodayFood")
    .then(res =>{
      setTodayFoods(response.data);
    })
  };

  const handleAddFood = async () => {

    await apiService.post("/food/addedFood",{foodName: foodName})
    .then(res =>{
      if(res.success){
        fetchAllFoods(); 
        fetchTodayFoods(); 
      }
    })
    
  
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-start min-h-screen bg-lighterGreen p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-first mb-4 sm:mb-6">Yemek Listesi</h1>

        <div className="w-full max-w-lg sm:max-w-2xl">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
            <input
              type="text"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green"
              placeholder="Yemek adı girin..."
              required
            />
            <button
              onClick={handleAddFood}
              className="bg-first text-white py-2 px-4 sm:px-6 rounded hover:bg-green transition duration-150 ml-2"
            >
              Ekle
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h2 className="text-xl font-bold text-first mb-2">Tüm Yemekler</h2>
              {foods.map((food, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-4">
                  <h3 className="text-lg font-bold">{food.name}</h3>
                  <p className="text-gray-700">Kalori: {food.calories}</p>
                </div>
              ))}
            </div>
            <div>
              <h2 className="text-xl font-bold text-first mb-2">Bugün Eklenen Yemekler</h2>
              {todayFoods.map((food, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-4">
                  <h3 className="text-lg font-bold">{food.name}</h3>
                  <p className="text-gray-700">Kalori: {food.calories}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default FoodPage;
