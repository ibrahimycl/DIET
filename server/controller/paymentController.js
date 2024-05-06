const User = require("../model/userModel");
const Package = require("../model/packageModel");
const Payment = require("../model/paymentModel");
var Iyzipay = require('iyzipay');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');


//Sepetteki paketin satın alınmasını ve kullanıcıya tanımlanmasını sağlar
exports.addPayment = async (req, res) => {
    const { userId, cardUserName, cardNumber, expireDate, cvc, city, country,adress } = req.body;
    const paymentUser = await User.findById(userId);
    if (paymentUser.basket.length > 0) {

        const id = uuidv4();
        var totalPrice = 0;
        var isPayment = false;
        let ownedPackages = [];
        const buyDate = new Date();

        const packages = await Package.find({ _id: { $in: paymentUser.basket } });

        var iyzipay = new Iyzipay({
            apiKey: process.env.PAYMENT_API_KEY,
            secretKey: process.env.PAYMENT_SECRET_KEY,
            uri: 'https://sandbox-api.iyzipay.com'
        });


        var data = {
            locale: Iyzipay.LOCALE.TR,
            conversationId: id,
            price: '0', 
            paidPrice: '0', 
            currency: Iyzipay.CURRENCY.TRY,
            installment: '1',
            paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
            paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
            paymentCard: {
                cardHolderName: cardUserName,
                cardNumber: cardNumber,
                expireMonth: expireDate ? expireDate.split("/")[0] : null,
                expireYear: expireDate && expireDate.split("/")[1] ? "20" + expireDate.split("/")[1] : null,
                cvc: cvc,
                registerCard: '0'
            },
            buyer: {
                id: paymentUser._id.toString(),
                name: paymentUser.name,
                surname: paymentUser.surname,
                gsmNumber: '+905350000000',
                email: paymentUser.email,
                identityNumber: paymentUser._id.toString(),
                registrationAddress: adress,
                city: city,
                country: country,
            },
            shippingAddress: {
                contactName: paymentUser.name,
                city: city,
                country: country,
                address: adress,
            },
            billingAddress: {
                contactName: paymentUser.name,
                city: city,
                country: country,
                address: adress,
            },
            basketItems: []
        };

        // Tüm paketlerin öğelerini tek bir listeye ekleyelim
        packages.forEach(package => {
                totalPrice += parseFloat(package.price);

                data.basketItems.push({
                    id: package._id.toString(),
                    name: package.name,
                    category1: "Diyet Paketi",
                    itemType:  Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
                    price: package.price
                });
                ownedPackages.push({
                    _id: package._id.toString(),
                    month: package.month,
                    buyDate: buyDate
                });
        });

        data.price = totalPrice.toFixed(2); 
        data.paidPrice = (totalPrice * 1.2).toFixed(2); 

        const isPaymentSuccessful = new Promise((resolve, reject) => {
            iyzipay.payment.create(data, async function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });

        try {
            const paymentResult = await isPaymentSuccessful;    
            if (paymentResult.status === "success") {
                await User.updateOne({ _id: userId }, { $push: { ownedPackages: { $each: ownedPackages } }, basket: [] }, { new: true });
                res.status(200).json({ success: 'Payment created successfully', result: paymentResult });
            } else {
                res.status(500).json({ error: 'Payment creation failed', result: paymentResult.errorMessage });
            }
            const payment = new Payment({
                sendData: data,
                resultData: paymentResult,
                isSuccess: paymentResult.status
            });
            await payment.save();
        } catch (error) {
            res.status(500).json({ error: error.message || 'An error occurred' });
        }
       
    } else {
        res.status(400).json({ error: 'Basket is empty' });
    }
};

