import { Express, Response, NextFunction } from 'express';
import jwt_decode from "jwt-decode";
import { ITokenData } from '../types';

export interface TokenRequest extends Request {
    tokenData: ITokenData;
}

// we need to secure all the other protectes endpoints
export const verifyJWT = async (req: any, res: any, next: any) => {
    // we defining the authHeader
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const accessToken = authHeader.split(' ')[1]

    try {
        // than we need to verify the accessToken
        const decoded: ITokenData = jwt_decode(accessToken)
        //console.log("decoded JWT token from refresh", decoded)
        req._id = decoded._id
        req.email = decoded.email
        next()
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token.' });
    }
}

