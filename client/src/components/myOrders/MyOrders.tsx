import { Card, Divider, Grid, Group, Text, Title } from '@mantine/core'
import { useGetAllOrdersFromUserQuery } from '../../app/features/placeOrder/placeOrderApi'
import { selectUser } from '../../app/features/users/userSlice'
import { useAppSelector } from '../../hooks/hooks'
import dayjs from 'dayjs'

export function MyOrders() {
  const user: any = useAppSelector(selectUser)
  const { data: orders } = useGetAllOrdersFromUserQuery(user?._id)
  const userAddress = user?.address
  //console.log("Orders: ",orders)
  
  if (!orders) {
    return null
  }
  return (
    <>
      <Title mb="lg">My Orders</Title>
      {orders?.map((order:any) =>
      (
        <Card key={order._id} mb="lg" shadow="sm" padding="lg" radius="md" withBorder>
          <Group>
            <Text size="lg" weight="bold">customer name: </Text>
            <Text>{user.userName}</Text>
          </Group>
          <Group>
            <Text size="lg" weight="bold">Order number: </Text>
            <Text>{order.paymentIntentId}</Text>
          </Group>
          <Group>
            <Text size="lg" weight="bold">Order date: </Text>
            <Text>{dayjs(order.createdAt).format('DD-MM-YYYY')}</Text>
          </Group>
          <Group>
            <Text size="lg" weight="bold">Payment method: </Text>
            <Text>Credit Card</Text>
          </Group>
          {order.products.map((product:any) => (
            <div key={product._id}>
              <Grid justify="flex-start" align="center" mt={60}>
                <Grid.Col xs={4}>
                  <img src={product.imagePath} alt="Duck" width="50%" height="auto" />
                </Grid.Col>
                <Grid.Col xs={4}>
                  <Text>{product.itemName}</Text>
                  <Text>quantity: {product.quantity}</Text>
                </Grid.Col>
                <Grid.Col xs={4}>
                  <Text align='right'>{product.itemPrice}</Text>
                </Grid.Col>
              </Grid>
            </div>
          ))}
          <Divider my="sm" /><Grid mt={20}>
            <Grid.Col sm={8}></Grid.Col>
            <Grid.Col sm={2}>
              <Text>Subtotal:</Text>
              <Text>Delivery:</Text>
              <Text weight={"bold"}>Total:</Text>
            </Grid.Col>
            <Grid.Col sm={2}>
              <Text align='right'>{(order.subtotal / 100).toFixed(2)}</Text>
              <Text align='right'>0.00</Text>
              <Text weight={"bold"} align='right'>{(order.total / 100).toFixed(2)}</Text>
            </Grid.Col>
          </Grid>
          <Divider my="sm" />
          <Grid mt={20}>
            <Grid.Col sm={6}>
              <Title size="h4">Delivery address</Title>
              <Group>
                <Text>{userAddress.firstName} {userAddress.lastName}</Text>
              </Group>
              <Group>
                <Text>{userAddress.streetName} {userAddress.houseNumber}</Text>
              </Group>
              <Group>
                <Text>{userAddress.postCode}, {userAddress.city}, {userAddress.country}</Text>
                <Text></Text>
              </Group>
            </Grid.Col>
            {/* <Grid.Col sm={6}>
              <Title size="h4">Billing address</Title>
              <Text>Name</Text>
              <Text>Street Nr.</Text>
              <Text>Post Code, City, Country</Text>
            </Grid.Col> */}
          </Grid>
        </Card>
      )
      )}
    </>
  )
}
