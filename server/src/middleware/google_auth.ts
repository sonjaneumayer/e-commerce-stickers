import passport from "passport";
import jwt from "jsonwebtoken";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Request, Response } from "express";
import { envConfig } from "../config/env_config";

import dotenv from "dotenv";

dotenv.config();
const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: clientId,
      clientSecret: clientSecret,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

// serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// data type received from google api
interface IUserData {
  id: string;
  displayName: string;
  name: {
    familyName: string;
    givenName: string;
  };
}

// callback that is triggered when user successfully authenticates themself with google
export const handleGoogleAuthCallback = (req: Request, res: Response) => {
  passport.authenticate(
    "google",
    { failureRedirect: "/login" },
    (err, user) => {
      if (err) {
        console.error(err);
        return res.redirect("/login");
      }
      if (!user) {
        return res.redirect("/login");
      }
      const userData: IUserData = user as IUserData;
      // create payload for jwt
      const payload = {
        id: userData.id,
        name: userData.displayName,
      };
      // create jwt
      const token = jwt.sign(payload, clientSecret, {
        expiresIn: envConfig.jwtRefreshExpiration,
      });
      // send the jwt to the client in a chocolate chip cookie
      res.cookie("chocolateChipCookie", token, {
        httpOnly: true,
        maxAge: 3600000,
      });
      res.status(201).json({ userData, token });
    }
  )(req, res);
};

export default passport;
