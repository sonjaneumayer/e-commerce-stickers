import { faker } from '@faker-js/faker'
import { Item, Order, User } from '../models/model'

import bcrypt from 'bcryptjs'
import { envConfig } from '../config/env_config'

//// SEED THE ITEMS COLLECTION IN DB
export const seedItems = (numOfEntries: number) => {
  for (let i = 0; i < numOfEntries; i++) {
    // randomly choose if the item is reduced or not
    const isReduced = Math.random() <= 0.2

    // create a random amount the item is reduced by
    const createReducedByValue = () => {
      if (isReduced) {
        const reducedBy = Math.floor(Math.random() * 100)
        return reducedBy
      }
      return 0
    }
    const ifReduced = createReducedByValue()

    envConfig.developmentServer

    const fakeItem: object = {
      itemName: faker.commerce.productName(),
      itemPrice: faker.commerce.price({ min: 100, max: 200 }),
      itemCategory: faker.commerce.department(),
      itemDescription:
        'Sees bird in air, breaks into cage and attacks creature.',
      imagePath: `${envConfig.developmentServer}/uploads/three-froggos.png`,
      numOfItems: faker.number.int(100),
      reduced: isReduced,
      percentageReduced: ifReduced,
    }
    Item.create(fakeItem)
  }
  console.log(`${numOfEntries} new items created`)
}

//// SEED USERS COLLECTION IN DB

export const seedUsers = async (
  numOfItemsInCart: number,
  numOfUsers: number
) => {
  const password = 'password'
  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  for (let i = 0; i < numOfUsers; i++) {
    const cartItems = []
    const user = {
      // Define user properties (e.g., name, email, password)
      userName: faker.person.firstName(),
      email: faker.internet.email(),
      password: hashedPassword,
      terms: true,
      shoppingCart: [],
      address: {
        firstName: 'Dieter',
        lastName: 'Bohlen',
        streetName: 'Fake',
        houseNumber: 123,
        postCode: 13357,
        city: 'Berlin',
        country: 'Germany',
      },
      profileImage: null,
    }

    // Create a user and retrieve the generated user object
    const createdUser = await User.create(user)

    // Generate cart items for the user
    for (let j = 0; j < numOfItemsInCart; j++) {
      const isReduced = Math.random() <= 0.2
      const fakeItem = {
        itemName: faker.commerce.productName(),
        itemPrice: faker.commerce.price({ min: 100, max: 200 }),
        itemCategory: faker.commerce.department(),
        numOfItems: faker.number.int(100),
        reduced: isReduced,
        percentageReduced: isReduced ? Math.floor(Math.random() * 100) : 0,
      }
      cartItems.push(fakeItem)
    }

    // Save the user object with the cart
    await createdUser.save()
    console.log('User with cart and items created:', createdUser)
  }
}

// PURGE DB
export const dropCollections = async () => {
  try {
    await Item.deleteMany({})
    await User.deleteMany({})
    await Order.deleteMany({})
    console.log('All collections dropped successfully.')
  } catch (error) {
    console.error('Error dropping collections:', error)
  }
}
