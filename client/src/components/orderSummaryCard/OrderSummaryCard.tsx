import { Card, Button, Box } from '@mantine/core'
import { ShoppingTableItem } from '../shoppingTableItem/ShoppingTableItem'
import { getCartItems } from '../../app/features/cart/cartSlice'
import { useAppSelector } from '../../hooks/hooks'
import { useStripeCheckoutMutation } from '../../app/features/placeOrder/placeOrderApi'
import { selectUser } from '../../app/features/users/userSlice'
import { notifications } from '@mantine/notifications'

export function OrderSummaryCard() {

  const cartItems = useAppSelector(getCartItems)
  const user: any = useAppSelector(selectUser)
  
  const [stripeCheckout, { isLoading, isSuccess }] = useStripeCheckoutMutation()
    if (isLoading) {
        return <p>Loading...</p>
    }

  const handlePayment = async () => {
    if(user.address !== null){
      await stripeCheckout({userId: user?._id, shoppingCart: cartItems})
    }else{
      notifications.show({
        title: 'Sorry',
        message: 'Fill out shipping adress form'
    })
    }
  }

  return (
    <Box m="xl">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <ShoppingTableItem />
        <Button variant="light" fullWidth mt="md" radius="md">
          Paypal
        </Button>
        <Button
          variant="light"
          fullWidth
          mt="md"
          radius="md"
          onClick={() => handlePayment()}
        >
          Debit or Credit Card
        </Button>
      </Card>
    </Box>
  )
}
