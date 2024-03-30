const cron = require("node-cron");
const User = require("../model/userModel");

// Günlük işlem: Kullanıcıların sahip olduğu paketleri kontrol eder ve geçerlilik tarihi bugün olanları kaldırır.
cron.schedule('0 0 * * *',async () =>{

    const currentDate = new Date();

    const usersWithOwnedPackages = await User.find({ ownedPackages: { $ne: null } });
    
    for (const user of usersWithOwnedPackages) {
        for (const pkg of user.ownedPackages) {
            const month = pkg.month;
            const buyDate = new Date(pkg.buyDate);
            const newBuyDate = new Date(pkg.buyDate);
            newBuyDate.setMonth(newBuyDate.getMonth() + month);

            if (
                currentDate.getDate() === newBuyDate.getDate() &&
                currentDate.getMonth() === newBuyDate.getMonth() &&
                currentDate.getFullYear() === newBuyDate.getFullYear()
            ) {
                await User.updateOne({ _id: user._id }, { $pull: { ownedPackages: {_id,month,buyDate} } });
            }
        }
    }
});