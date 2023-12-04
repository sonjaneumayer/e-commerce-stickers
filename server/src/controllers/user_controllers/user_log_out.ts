import { Request, Response } from 'express'

//clear cookie if it exists
export const userLogOut = async (req: Request, res: Response) => {
  const cookies = req.cookies

  if (!cookies?.jwt) {
    return res.sendStatus(204) //No content
  }
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: true,
  })
  res.json({ message: 'Cookie cleared - User logged out' })
}
