import { Grid, Button, Text, Title, Paper, rem, NumberInput } from "@mantine/core"
import { itemStyles } from "./item_styles"
import { useParams } from "react-router-dom"
import { useGetItemByIdQuery } from "../../app/features/items/itemsApiSlice"
import { useEffect, useState } from "react"
import { ArrowBack } from "../../components/backToArrow/ArrowBack"
import { useDispatch } from "react-redux"
import { addItemToCart, getCartItems } from "../../app/features/cart/cartSlice"
import { IItemResponse } from "../../app/api/types"
import { useAppSelector } from "../../hooks/hooks"

export const Item = () => {

    const { classes } = itemStyles()
    const { id } = useParams<{ id: string }>()
    const idParam: string = id ?? ""
    const { data, isSuccess } = useGetItemByIdQuery(idParam)

    const cartItems = useAppSelector(getCartItems)
    //console.log("Cart Items:", cartItems)

    const [item, setItem] = useState<IItemResponse | null>(null);
    const [itemAmount, setItemAmount] = useState<number>(0)
    const [maxAmountOfItems, setMaxAmountOfItems] = useState<number>(0)
    const [disabled, setDisabled] = useState<boolean>(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (data?._id) {
            setItem(data)
            handleMaxAmountOfItems(data)
            setDisabled(false)
        }
    }, [data]);

    const handleItemAmountChange = (selectedItemAmount: number) => {
        setItemAmount(selectedItemAmount);
    }

    const handleAddItemToCart = (item: IItemResponse, amount: number) => {
        dispatch(addItemToCart({ addedItem: item!, selectedAmount: amount }))
        handleMaxAmountOfItems(item)
    }

    const handleMaxAmountOfItems = (item: any) => {
        let restItems = 0
        const id = item._id
        //find item in cart
        const itemIndex = cartItems.findIndex(item => item._id === id)
        if (itemIndex !== -1) {
            restItems = maxAmountOfItems - itemAmount
            setMaxAmountOfItems(restItems)
            if (restItems <= 0) {
                setDisabled(true)
                setItemAmount(0)
            }
        }
        else {
            //itemMaxAmount gets initialized when item is not in cart
            restItems = item!.numOfItems - itemAmount
            setMaxAmountOfItems(restItems)
            if (restItems <= 0) {
                setDisabled(true)
                setItemAmount(0)
            }
        }
    }

    if (isSuccess) {

        return (
            <>
                <Grid>
                    <Grid.Col span={2}>
                        <ArrowBack />
                    </Grid.Col>
                    <Grid.Col span={10}>
                        <Paper my={rem(60)}>
                            <Title>{item?.itemName}</Title>
                            <Grid justify="space-between" align="center">
                                <Grid.Col xs={10} sm={5}>
                                    <img src={item?.imagePath} alt="frog waterfall" width="100%" height="auto"></img>
                                </Grid.Col>
                                <Grid.Col xs={10} sm={6}>
                                    <Text mt={rem(30)} fw="bold">€ {item?.itemPrice}</Text>
                                    <Text fs="italic" mt={rem(10)}>{item?.itemCategory}</Text>
                                    <Text mt={rem(20)} mb={rem(20)}>{item?.itemDescription}</Text>
                                    <NumberInput
                                        key={item?._id}
                                        value={itemAmount}
                                        max={maxAmountOfItems}
                                        min={0}
                                        onChange={(amount) => handleItemAmountChange(Number(amount))}
                                        className={classes.itemAmount}
                                    />
                                    {disabled ?
                                        <p className={classes.error}>No items left in stock</p>
                                        :
                                        ""
                                    }
                                    <Button
                                        onClick={() => handleAddItemToCart(item!, itemAmount)}
                                        type="button"
                                        mt={rem(40)}
                                        disabled={disabled}
                                    >Add to cart</Button>
                                </Grid.Col>
                            </Grid>
                        </Paper>
                    </Grid.Col>
                </Grid>
            </>
        )
    }
}
