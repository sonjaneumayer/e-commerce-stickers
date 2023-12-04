import crypto from 'crypto'
import dotenv from 'dotenv'
export const config = {
  jwtSecret: process.env.JWT_SECRET,
  //jwtExpiration: "1h",
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
}
