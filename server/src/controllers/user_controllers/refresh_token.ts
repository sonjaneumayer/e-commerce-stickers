import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { User } from '../../models/model'
import dotenv from 'dotenv'
import jwt_decode from 'jwt-decode'
import { ITokenData } from '../../types'

dotenv.config()

// ////// USER Auth refresh
// to check if User still has the cookie/token
export const refreshToken = async (req: Request, res: Response) => {
  //we expecting a cookie with the request
  const cookies = req.cookies

  try {
    if (!cookies?.jwt) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const refreshToken = cookies.jwt

    // then we need to verify this token
    const decoded: ITokenData = jwt_decode(refreshToken)

    const { _id } = decoded._id
    const user = await User.findOne(_id).exec()

    if (!user) return res.status(401).json({ message: 'Unauthorized' })

    //console.log('foundUser', user)

    //issue a new accessToken if the refreshToken is valid
    const accessToken = jwt.sign(
      {
        UserInfo: {
          _id: user._id,
          email: user.email,
        },
      },
      `${process.env.ACCESS_TOKEN_SECRET}`,
      { expiresIn: '7min' }
    )

    res.json({ accessToken, user })
  } catch (error) {
    console.error('Error refresh Token:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
