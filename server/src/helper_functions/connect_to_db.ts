import dotenv from 'dotenv'
// importing mongoose here makes mongoose available globally
import mongoose from 'mongoose'
dotenv.config()

export const connectToDatabase = async () => {
  const dbUsername = process.env.DB_USERNAME
  const dbPassword = process.env.DB_PASSWORD
  try {
    await mongoose.connect(
      `mongodb+srv://${dbUsername}:${dbPassword}@clusterecommerce.cxhrm.mongodb.net/?retryWrites=true&w=majority&appName=ClusterECommerce`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as mongoose.ConnectOptions
    )
    console.log('database connected')
  } catch (error) {
    console.error('connection error:', error)
  }
}
