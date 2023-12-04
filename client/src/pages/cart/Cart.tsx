import { ActionIcon, Anchor, Badge, Button, Flex, Grid, Group, Stack, Modal, NumberInput, Portal, Table, Title, rem } from "@mantine/core"
import { ArrowBack } from "../../components/backToArrow/ArrowBack"
import { cartStyles } from "./cart_styles"
import { IconX } from '@tabler/icons-react'
import { useAppSelector, useUserDetails } from "../../hooks/hooks"
import { changeQuantityItemFromCart, getCartItems, getTotalPrice, removeItemFromCart } from "../../app/features/cart/cartSlice"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { useVerifyCheckoutMutation } from "../../app/features/placeOrder/placeOrderApi"
import { CartItem, IItemResponse } from "../../app/api/types"
import { notifications } from '@mantine/notifications'
import { Link } from "react-router-dom"
import dogSleeping from '../../assets/dog_sleeping.png'
import { useNavigate } from 'react-router-dom'

export const Cart = () => {
    const dispatch = useDispatch()
    const { classes } = cartStyles()
    const [user] = useUserDetails()
    const [itemAmount, setItemAmount] = useState<number>(0)
    const [maxAmountOfItems, setMaxAmountOfItems] = useState<number>(0)
    const cartItems = useAppSelector(getCartItems)
    const totalPrice = useAppSelector(getTotalPrice)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        //sets the quantity from item single page
        if (getCartItems.length > 0) {
            cartItems.forEach(element => {
                setItemAmount(element.quantity)
                handleMaxAmountOfItems(element)
            })
        }
    }, [cartItems])

    const [verifyCheckout, { isLoading, isSuccess }] = useVerifyCheckoutMutation()
    if (isLoading) {
        return <p>Loading...</p>
    }

    const checkOut = async (cartItems: CartItem[]) => {
        const modifiedCartItems: IItemResponse[] = cartItems.map((item) => ({
            ...item,
            numOfItems: item.quantity,
        }))
        if (user.user?._id !== undefined) {
            if (cartItems.length === 0) {
                notifications.show({
                    title: 'Sorry',
                    message: 'Your cart is empty'
                })
            } else {
                await verifyCheckout({ userId: user.user._id, shoppingCart: modifiedCartItems })
                navigate('/order-summary')
            }
        } else {
            openModal()
        }
    }

    const removeFromCart = (itemId: string) => {
        dispatch(removeItemFromCart(itemId))
    }

    const handleItemAmountChange = (item: any, selectedItemAmount: number) => {
        setItemAmount(selectedItemAmount);
        dispatch(changeQuantityItemFromCart({ addedItem: item!, amount: selectedItemAmount }))
    }

    const handleMaxAmountOfItems = (item: any) => {
        let restItems = 0
        const id = item._id
        const itemIndex = cartItems.findIndex(item => item._id === id)
        if (itemIndex !== -1 && cartItems.length === 0) {
            restItems = maxAmountOfItems - itemAmount
            setMaxAmountOfItems(restItems)
        }
        if (itemIndex !== -1 && cartItems.length !== 0) {
            setMaxAmountOfItems(item!.numOfItems)
        }
    }

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const navigateToProducts = () => {
        navigate('/products')
    }

    const rows = cartItems.map((item) => (
        <tr key={item._id}>
            <td>
                <img className={classes.image} src={item.imagePath} alt="frog waterfall" width="100%" height="auto" />
            </td>
            <td>{item.itemName}</td>
            <td className={classes.itemPrice}>{item.itemPrice}</td>
            <td className={classes.itemAmount}>
                <NumberInput
                    key={item._id}
                    value={item.quantity}
                    max={item.numOfItems}
                    min={0}
                    onChange={(amount) => handleItemAmountChange(item, Number(amount))}
                />
            </td>
            <td className={classes.itemPrice}>{(item?.quantity * Number(item?.itemPrice)).toFixed(2)}</td>
            <td>
                <ActionIcon aria-label="Remove Item from Cart">
                    <IconX onClick={() => removeFromCart(item._id)} />
                </ActionIcon>
            </td>
        </tr>
    ))

    return (
        <>
            <Portal>
                {isModalOpen && (
                    <Modal
                        opened={isModalOpen}
                        onClose={closeModal}
                        title="log in to proceed to checkout">
                        <Group position="center">
                            <img src={dogSleeping} alt="dog-sleeping" width="50%" height="auto" />
                            <Button component={Link} to="/login" radius="xl">
                                Login
                            </Button>
                        </Group>
                    </Modal>
                )}
            </Portal>
            <Title mb={rem(50)} ml={rem(150)}>Shopping Cart</Title>
            <Grid>
                <Grid.Col xs={2} sm={2} md={1}>
                    <ArrowBack />
                </Grid.Col>
                <Grid.Col xs={8} sm={8} md={5} lg={5}>
                    <Table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th></th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </Table>
                </Grid.Col>
                <Grid.Col xs={8} offsetXs={2} sm={8} offsetSm={2} md={5} offsetMd={1} lg={5} offsetLg={1}>
                    <Table
                        className={classes.table}
                        striped
                        highlightOnHover
                        mt={rem(20)}
                    >
                        <tbody>
                            <tr>
                                <td>Shipping</td>
                                <td></td>
                                <td></td>
                                <td className={classes.itemPrice}><Badge size="lg">FREE</Badge></td>
                            </tr>
                            <tr className={classes.total}>
                                <td>Subtotal</td>
                                <td></td>
                                <td></td>
                                <td className={classes.itemPrice}>{totalPrice}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Stack>
                        <Flex justify="center" mt={rem(50)}>
                            <Button
                                onClick={() => checkOut(cartItems)}
                                size="md"
                                type="button"
                            >
                                Checkout
                            </Button>
                        </Flex>
                        <Anchor
                            component="button"
                            type="button"
                            color="dimmed"
                            onClick={() => navigateToProducts()}
                            size="sm">
                            &#8592; Continue Shopping
                        </Anchor>
                    </Stack>
                </Grid.Col>
            </Grid>
        </>
    )
}

