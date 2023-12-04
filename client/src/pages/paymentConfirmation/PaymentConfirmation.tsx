import { Box, Button, Text, Stack, Title, rem, Anchor } from '@mantine/core'
import { IconCircleCheckFilled } from '@tabler/icons-react'
import { usePaymentConfirmationStyles } from './payment_confirmation_styles'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearCart } from '../../app/features/cart/cartSlice'


export function PaymentConfirmation() {
    const { classes } = usePaymentConfirmationStyles()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    dispatch(clearCart())

    const navigateToProducts = () => {
        navigate('/products')
    }

    return (
        <>
            <Box className={classes.box}>
                <IconCircleCheckFilled
                    className={classes.icon}
                    size={100}
                    strokeWidth={2}
                />
                <Title mt={rem(20)} mb={rem(80)}>Payment Successful</Title>
                <Stack>
                    <Button component={Link} to="/profile" radius="xl">My Orders</Button>
                    <Anchor
                            component="button"
                            type="button"
                            color="dimmed"
                            onClick={() => navigateToProducts()}
                            size="sm">
                            &#8592; Continue Shopping
                        </Anchor>
                </Stack>
            </Box>
        </>
    )
}