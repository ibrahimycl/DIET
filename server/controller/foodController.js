const axios = require('axios');
const Food = require("../model/foodModel");

//Kullanıcının yemek eklemesi sağlandı
exports.addedFood = async (req, res) => {
    const { userId, foodName } = req.body;
    try {
        const response = await axios.get('https://api.edamam.com/api/food-database/v2/parser', {
            params: {
                app_id: '2571ce76',
                app_key: 'f5155adf496744f5e8ade1be21b2c50e',
                ingr: foodName 
            }
        });

        const food = response.data.parsed[0].food;
        const name = food.label;
        const calories = food.nutrients.ENERC_KCAL;

        try {
            const newFood = await Food.create({ userId, name, calories });
            res.status(200).json("Food Added Successfully");
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    } catch (error) {
        console.error('Error fetching data from Edamam API:', error);
        res.status(500).json({ error: 'An error occurred while fetching data from Edamam API' });
    }
}

// Kullanıcının eklediği tüm yemeklerini getirir
exports.getAllFoods = async (req, res) => {
    try {
        const { userId } = req.body;
        
        const allFoods = await Food.find({ userId: userId });

        res.status(200).json(allFoods);
    } catch (error) {
        console.error('Hata:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

//Kullanıcın gün içerisindeki eklediği yemekleri getirir
exports.getTodayFood = async (req, res) => {

    try {
        const { userId } = req.body;
        
        const today = new Date();
        const timezoneOffset = today.getTimezoneOffset(); 
        const todayInUTC = new Date(today.getTime() + timezoneOffset * 60000); 

        const startOfTodayUTC = new Date(todayInUTC);
        startOfTodayUTC.setUTCHours(0, 0, 0, 0);

        const startOfTomorrowUTC = new Date(todayInUTC);
        startOfTomorrowUTC.setUTCHours(0, 0, 0, 0);
        startOfTomorrowUTC.setDate(startOfTomorrowUTC.getDate() + 1);


        const todayFoods = await Food.find({ 
            userId: userId, 
            createdAt: { 
                $gte: startOfTodayUTC, 
                $lt: startOfTomorrowUTC 
            } 
        });

        res.status(200).json(todayFoods);
    } catch (error) {
        console.error('Hata:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

