import { useEffect, useState } from 'react'

import {
  Accordion,
  Button,
  Divider,
  Grid,
  Paper,
  Text,
  Title,
  rem,
} from '@mantine/core'
import { useStyles } from './profile_styles'
import { UpdatePassword } from '../../components/form/updatePassword/UpdatePassword'
import { ShippingInfoForm } from '../../components/form/shippingInfoForm/ShippingInfoForm'
import { MyOrders } from '../../components/myOrders/MyOrders'
import { UploadProfileImage } from '../../components/uploadProfileImage/UploadProfileImage'
import { useUserDetails } from '../../hooks/hooks'

import { ConfirmAddressDetails } from '../../components/confirmAddressDetails/ConfirmAddressDetails'

export function Profile() {
  const { classes } = useStyles()

  const [addressExists, setAddressExists] = useState<boolean>()

  const [user] = useUserDetails()
  //console.log('user:', user)

  useEffect(() => {
    // check for address on initial render, depending on if the user has an address, it will render either the ShippingInfoForm or the ConfirmAddresDetails
    user && user.user?.hasOwnProperty('address')
      ? setAddressExists(true)
      : setAddressExists(false)
  }, [user])
  // when this is called it will set the addressExists state to false, this will render the ShippingInfoForm
  const handleAddressChange = () => {
    setAddressExists(false)
  }
  // this will be triggered when the user submits the form in the ShippingInfoForm, this will set the addressExists state to true in turn rendering the ConfirmAddressInfo component
  const handleAddessUpdated = (hasChanged: boolean) => {
    setAddressExists(hasChanged)
  }
  return (
    <>
      <Paper className={classes.form} radius={0}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Settings
        </Title>
        <Accordion>
          <Accordion.Item value="Account">
            <Accordion.Control>Account</Accordion.Control>
            <Accordion.Panel mt={rem(10)}>
              <Paper p={rem(20)}>
                <Title mb="lg">Account</Title>
                <UploadProfileImage></UploadProfileImage>
                <Divider my="sm" />
                <UpdatePassword></UpdatePassword>
                <Divider my="sm" />
                <Grid justify="space-around" align="center">
                  <Grid.Col sm={6}>
                    <Text size="md">Danger Zone</Text>
                  </Grid.Col>
                  <Grid.Col sm={6}>
                    <Button radius="xl">Delete Account</Button>
                  </Grid.Col>
                </Grid>
              </Paper>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="Shipping Information">
            <Accordion.Control>Shipping Information</Accordion.Control>
            <Accordion.Panel mt={rem(10)}>
              {!addressExists ? (
                <ShippingInfoForm onAddressUpdate={handleAddessUpdated} />
              ) : (
                <ConfirmAddressDetails
                  firstName={user.user.address.firstName}
                  lastName={user.user.address.lastName}
                  streetName={user.user.address.streetName}
                  houseNumber={user.user.address.houseNumber}
                  postCode={user.user.address.postCode}
                  city={user.user.address.city}
                  country={user.user.address.country}
                  handleAddressChange={handleAddressChange}
                />
              )}
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="My Orders">
            <Accordion.Control>My Orders</Accordion.Control>
            <Accordion.Panel mt={rem(10)}>
              <MyOrders></MyOrders>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Paper>
    </>
  )
}
