import { useState, useEffect } from 'react'
import { Grid, Box } from '@mantine/core'
import { OrderSummaryCard } from '../../components/orderSummaryCard/OrderSummaryCard'
import { ShippingInfoForm } from '../../components/form/shippingInfoForm/ShippingInfoForm'
import { ConfirmAddressDetails } from '../../components/confirmAddressDetails/ConfirmAddressDetails'
import { useUserDetails } from '../../hooks/hooks'

export const ShippingInfoOrderPage = () => {
  const [addressExists, setAddressExists] = useState<boolean>()

  const [user] = useUserDetails()
  //console.log('user:', user)

  useEffect(() => {
    // check for address on initial render, depending on if the user has an address, it will render either the ShippingInfoForm or the ConfirmAddresDetails
    user && user.user.hasOwnProperty('address')
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
    <Grid justify="space-around" gutterSm={25} gutterMd={60}>
      <Grid.Col xs={12} sm={12} lg={5}>
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
      </Grid.Col>
      <Grid.Col xs={12} sm={12} lg={5}>
        <Box>
          <OrderSummaryCard />
        </Box>
      </Grid.Col>
    </Grid>
  )
}
