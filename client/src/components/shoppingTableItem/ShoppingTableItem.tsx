import {
  Text,
  Table,
  Badge
} from '@mantine/core'
import { shoppingTableStyles } from './shopping_table_styles'
import { getCartItems, getTotalPrice } from '../../app/features/cart/cartSlice'
import { useAppSelector } from '../../hooks/hooks'

export interface Item {
  itemId: string
  itemImage: string
  itemName: string
  itemAmount: string
  itemPrice: string
}

export const ShoppingTableItem = () => {

  const { classes } = shoppingTableStyles()
  const cartItems = useAppSelector(getCartItems)
  const totalPrice = useAppSelector(getTotalPrice)

  const rows = cartItems.map((item) => (
    <tr key={item._id}>
      <td>
        <img src={item.imagePath} alt="item image" width="100%" height="auto" />
      </td>
      <td className={classes.itemName}>{item.itemName}</td>
      <td className={classes.itemAmount}>
        <Text>Quantity: {item.quantity}</Text>
      </td>
      <td className={classes.itemPrice}>{item.itemPrice}</td>
    </tr>
  ))

  return (
    <Table className={classes.table} striped highlightOnHover>
      <tbody>
        {rows}
        <tr>
          <td>Shipping</td>
          <td></td>
          <td></td>
          <td className={classes.itemPrice}><Badge size="lg">FREE</Badge></td>
        </tr>
        <tr className={classes.total}>
          <td>Total</td>
          <td></td>
          <td></td>
          <td className={classes.itemPrice}>{totalPrice}</td>
        </tr>
      </tbody>
    </Table>
  )
}
