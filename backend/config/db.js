import mongoose from 'mongoose';

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://nguyenhoang13062004bg_db_user:Kzg3n5Mn3cDUFFBa@cluster0.tcglrjn.mongodb.net/Expense")
    .then(() => {
        console.log("Connected to MongoDB");
    });
}