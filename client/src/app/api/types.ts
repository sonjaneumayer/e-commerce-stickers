// user types
export interface IUser {
  _id: string
  userName: string
  email: string
  password?: string
  shoppingCart: object
  orders: object
  terms: boolean
  profileImage: string
  address?: object
}

export interface IUserAddressInfo {
  firstName: string
  lastName: string
  streetName: string
  houseNumber: number | null | undefined
  postCode: number | null | undefined
  city: string
  country: string
}

export interface IUserAddressInfoWithId {
  _id: string
  address: IUserAddressInfo
}

export interface IUserAddressInfo {
  firstName: string
  lastName: string
  streetName: string
  houseNumber: number | null | undefined
  postCode: number | null | undefined
  city: string
  country: string
}
export interface IUpdateUserAddressAction {
  type: string
  payload: IUserAddressInfoWithId
}
// item types
export interface IItemResponse {
  _id: string
  itemName: string
  itemPrice: string
  itemDescription: string
  imagePath: string
  itemCategory: string
  numOfItems: number
  reduced: boolean
  percentageReduced: number
  createdAt: string
  updatedAt: string
}

//cart type
export interface CartItem extends IItemResponse {
  quantity: number
  restItems?: number
}

//order type
export interface IOrderResponse {
  _id: string
  userId: string
  customerId: string
  paymentIntentId: string
  products: CartItem[]
  subtotal: number
  total: number
  shipping: {
    address: {
      city: string
      country: string
      line1: string
      line2: string
      postal_code: string
      state: string
    }
    email: string
    name: string
    phone: string
    tax_exempt: string
    tax_ids: []
  }
  deliveryStatus: string
  paymentStatus: string
  createdAt: string
}


export interface IShippingInfoFormData {}
