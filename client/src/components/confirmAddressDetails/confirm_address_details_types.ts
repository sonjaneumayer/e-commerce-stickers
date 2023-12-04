export interface IShippingAddressInfo {
  firstName: string
  lastName: string
  streetName: string
  houseNumber: string
  postCode: string
  city: string
  country: string
}

export interface IConfirmAddressProps extends IShippingAddressInfo {
  handleAddressChange: () => void
}
