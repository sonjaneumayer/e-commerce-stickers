import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import session from 'express-session' // Import session middleware here
import passport from './middleware/google_auth' // Import the Passport configuration
import { connectToDatabase } from './helper_functions/connect_to_db'
import router from './routes.ts/routes'
import {
  dropCollections,
  seedItems,
  seedUsers,
} from './helper_functions/seed_db'
import cookieParser from 'cookie-parser'
import path from 'path'
import { corsOptions } from './config/cors_options'

const app: Express = express()
const port = process.env.PORT || 3001

connectToDatabase()

 //dropCollections()
 //seedUsers(2, 2)
 //seedItems(5)

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Middleware to parse raw JSON payloads for this specific route
app.use('/payment/stripe/webhook', express.raw({ type: 'application/json' }));



// built in - middleware: Serve static files from the "uploads" directory
const _dirname = path.resolve()
//console.log(_dirname)
app.use('/uploads', express.static(path.join(_dirname, 'uploads')))


// Initialize Passport.js
app.use(passport.initialize())
// Configure session middleware before Passport.session()
app.use(
  session({
    // change secret to secret in .env file
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true, // Set to true for HTTPS
    },
  })
)

// Use Passport.session() after configuring session middleware
app.use(passport.session())
// Routes
app.use(router)

// START SERVER
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
