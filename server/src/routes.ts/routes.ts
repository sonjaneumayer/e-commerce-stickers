import express, { Router } from 'express'
import { Request, Response } from 'express'
import { getUserById } from '../controllers/user_controllers/get_user_by_id'
import { createNewUser } from '../controllers/user_controllers/create_user'
import { changeUserPassword } from '../controllers/user_controllers/change_password'
import { userAuth } from '../controllers/user_controllers/user_auth'
import { refreshToken } from '../controllers/user_controllers/refresh_token'
import { userLogOut } from '../controllers/user_controllers/user_log_out'
import { getItemsInCategory } from '../controllers/item_controllers/get_items_in_category'
import { getSpecificItem } from '../controllers/item_controllers/get_specific_item'
import { getReducedItems } from '../controllers/item_controllers/get_reduced_items'
import { getAllItemsFromDb } from '../controllers/item_controllers/get_all_items_from_db'
import { getItemsByCategory } from '../controllers/item_controllers/get_items_by_category'
import { verifyCheckout } from '../controllers/item_controllers/verify_checkout'
import { handleGoogleAuthCallback } from '../middleware/google_auth'
import passport from 'passport'
import { uploadProfileImage } from '../controllers/user_controllers/upload_profile_image'
import { upload } from '../middleware/upload'
import { createCheckoutSession, } from '../controllers/payment_controller/create_stripe_checkout'
import { triggerStripeWebhook } from '../controllers/payment_controller/trigger_stripe_webhook'
import { updateUserAddress } from '../controllers/user_controllers/update_user_address'
import { getUserByEmail } from '../controllers/user_controllers/get_user_by_email'
import { getAllOrdersFromUser } from '../controllers/payment_controller/get_all_orders_from_user'

const router: Router = express.Router()

//// USER ENDPOINTS
router.get('/user/get-user-by-id/:userId', getUserById)
router.post('/user/create-user', createNewUser) //register
router.post('/user/authenticate-user', userAuth) //login
router.get('/user/refresh-token', refreshToken)
router.post('/user/user-log-out', userLogOut)
router.post('/user/create-user', createNewUser)
router.post('/user/authenticate-user', userAuth)
router.get('/user/get-user-by-id', getUserById)
router.get('/user/get-user-by-email', getUserByEmail)
router.get('/user/refresh-token', refreshToken)
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))
router.put('/user/change-user-password', changeUserPassword)
router.put('/user/update-user-address', updateUserAddress)

//// ITEM ENDPOINTS
router.get('/item/get-all-items', getAllItemsFromDb)
router.get('/item/get-items-by-category', getItemsByCategory)
router.get(
  '/item/get-items-in-category/:itemCategory',
  (req: Request, res: Response) => {
    const itemCategory = req.params.itemCategory as string
    console.log('itemCategory:', itemCategory)

    if (typeof itemCategory !== 'string') {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid parameters' })
    }
    getItemsInCategory(res, itemCategory)
  }
)
router.get('/item/get-specific-item/:itemId', getSpecificItem)
router.get('/item/reduced', getReducedItems)
router.post('/item/verify-checkout', verifyCheckout)

//// PAYMENT ENDPOINTS AND ORDERS
//stripe for credit card payment
router.post('/payment/create-checkout-session', createCheckoutSession)
router.post('/payment/stripe/webhook',
  async (req: Request, res: Response) => {
    console.log(req, res)
  try {
    console.log("trigger")
    await triggerStripeWebhook(req, res)
  } catch (err) {
    console.error('Error in handling Stripe webhook:', err.message)
    res.status(500).send('Internal Server Error')
  }
})
router.get('/payment/get-all-orders-from-user/:userId', getAllOrdersFromUser)

// google Authentication Routes
// initialize Google authentication
// when google auth button is clicked, this uri will be fetched
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
)

// once user is authenticated, they will be routed here
router.get('/auth/google/callback', handleGoogleAuthCallback)

// UPLOAD SINGLE FILE
router.post(
  '/user/upload-profile-image',
  upload.single('profileImage'),
  uploadProfileImage
)



export default router
