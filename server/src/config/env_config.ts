import dotenv from 'dotenv'

dotenv.config()

export const envConfig = {
  jwtSecret: process.env.JWT_SECRET,
  jwtAccessExpiration: '3s',
  jwtRefreshExpiration: '10s',
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  imagePath: '/uploads',
  developmentServer: 'http://localhost:3000',
  clientUrl: 'http://localhost:5173'
}
