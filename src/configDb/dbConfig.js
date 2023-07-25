import mongoose from 'mongoose'

export const connectDb = async() => {
    const conn = await mongoose.connect(process.env.MONGO_URL)

    conn && console.log(`mongo connected!`)
}