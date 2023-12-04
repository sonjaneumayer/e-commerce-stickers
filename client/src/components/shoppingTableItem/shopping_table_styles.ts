import { createStyles, rem } from '@mantine/core'

export const shoppingTableStyles = createStyles((theme) => ({
  table: {
    tableLayout: "fixed",
    width: "100%"
  },
  itemName: {
    textAlign: "center",
  },
  itemAmount: {
    textAlign: "right",
  },
  itemPrice: {
    textAlign: "right",
  },
  total: {
    fontWeight: "bold"
  }
}))