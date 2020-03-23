/* eslint-disable complexity */
'use strict'

const db = require('../server/db')
const {
  User,
  Country,
  Category,
  Product,
  Review,
  CartItems,
  Merchant,
  Address,
  Order
} = require('../server/db/models')
const faker = require('faker')

// eslint-disable-next-line max-statements
async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  //Creates countries
  let continents = [
    'Asia',
    'Africa',
    'North America',
    'South America',
    'Antarctica',
    'Australia'
  ]
  let allCountries = []
  for (let i = 0; i < 300; i++) {
    let newCountry = await Country.create({
      name: faker.address.country(),
      continentName: faker.random.arrayElement(continents)
    })
    allCountries.push(newCountry)
  }

  // Creates random Users
  let allUsers = []
  for (let i = 0; i < 120; i++) {
    let newCustomer = await User.create({
      fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
      email: faker.internet.email(),
      password: faker.internet.password()
    })
    allUsers.push(newCustomer)
    newCustomer.setCountry(allCountries[i])
  }

  // Creating extra user that will be used in e2e tests
  await User.create({
    fullName: 'Joe Smith',
    email: 'joe.smith@gmail.com',
    password: '$ecret_p4ssw0rd'
  })

  // Creates Categories
  const categories = await Promise.all([
    Category.create({name: 'Grapefruit'}),
    Category.create({name: 'Grapefruit Trees'}),
    Category.create({name: 'Grapefruit Seeds'}),
    Category.create({name: 'Grapefruit Books'}),
    Category.create({name: 'Grapefruit Movies'}),
    Category.create({name: 'Grapefruit Hybrids'})
  ])

  // Creates random Products
  let allProductsPromise = []
  for (let i = 0; i < 1200; i++) {
    let newProduct = Product.create({
      name: `${faker.commerce.productMaterial()} ${faker.commerce.productAdjective()} Grapefruit`,
      quantity: Math.floor(Math.random() * 100),
      price: Number(faker.commerce.price()) + 100,
      image: `https://source.unsplash.com/collection/${i}/480x480`,
      description: faker.lorem.paragraph()
    })
    allProductsPromise.push(newProduct)
  }

  const allProducts = await Promise.all(allProductsPromise)

  for (let i = 0; i < 1200; i++) {
    allProducts[i].addCategory(faker.random.arrayElement(categories))
  }

  // Creates random Reviews
  for (let i = 0; i < 500; i++) {
    let contentAmount = Math.floor(Math.random() * 2 + 2)
    let newReview = await Review.create({
      content: faker.lorem.paragraphs(contentAmount),
      stars: Math.ceil(Math.random() * 5),
      title: faker.lorem.sentence(contentAmount + 3)
    })
    newReview.setUser(faker.random.arrayElement(allUsers))
    newReview.setProduct(faker.random.arrayElement(allProducts))
  }

  //Creates random Addresses
  // const shipTypes = ['BILL_TO', 'SHIP_TO']
  const aptSuite = ['Apt', 'Suite']
  for (let i = 0; i < 120; i++) {
    let newAddress = await Address.create({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      street1: faker.address.streetAddress(false),
      street2: `${faker.random.arrayElement(aptSuite)} ${Math.ceil(
        Math.random() * 998
      )}`,
      city: faker.address.city(),
      state: faker.address.state(),
      zip: faker.address.zipCode(),
      type: 'BILL_TO',
      default: true
    })
    newAddress.setUser(allUsers[i])
  }
  for (let i = 0; i < 120; i++) {
    let newAddress = await Address.create({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      street1: faker.address.streetAddress(false),
      street2: `${faker.random.arrayElement(aptSuite)} ${Math.ceil(
        Math.random() * 998
      )}`,
      city: faker.address.city(),
      state: faker.address.state(),
      zip: faker.address.zipCode(),
      type: 'SHIP_TO',
      default: true
    })
    newAddress.setUser(allUsers[i])
  }
  // for (let i = 0; i < 300; i++) {
  //   let newAddress = await Address.create({
  //     name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  //     street1: faker.address.streetAddress(false),
  //     street2: `${faker.random.arrayElement(aptSuite)} ${Math.ceil(
  //       Math.random() * 998
  //     )}`,
  //     city: faker.address.city(),
  //     state: faker.address.state(),
  //     zip: faker.address.zipCode(),
  //     type: faker.random.arrayElement(shipTypes),
  //     default: false
  //   })
  //   newAddress.setUser(faker.random.arrayElement(allUsers))
  // }

  // Creates random Carts
  for (let i = 0; i < 120; i++) {
    await CartItems.create({
      quantity: Math.floor(Math.random() * 500),
      userId: i + 1,
      productId: 1
    })
    await CartItems.create({
      quantity: Math.floor(Math.random() * 500),
      userId: i + 1,
      productId: 2
    })
    await CartItems.create({
      quantity: Math.floor(Math.random() * 500),
      userId: i + 1,
      productId: 3
    })
  }

  // Creates random Orders
  let statusArr = ['PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELED']
  for (let i = 0; i < 40; i++) {
    await Order.create({
      status: faker.random.arrayElement(statusArr),
      totalPrice:
        Number(faker.commerce.price()) + Math.floor(Math.random() * 2000),
      shipToAddressId: i + 1,
      billToAddressId: i + 121,
      userId: i + 1
    })
  }
  // Creates random CartItems as OrderItems
  for (let i = 0; i < 40; i++) {
    await CartItems.create({
      quantity: Math.floor(Math.random() * 500),
      price: Number(faker.commerce.price()),
      orderId: i + 1,
      productId: 4,
      userId: i + 1
    })
    await CartItems.create({
      quantity: Math.floor(Math.random() * 500),
      price: Number(faker.commerce.price()),
      orderId: i + 1,
      productId: 5,
      userId: i + 1
    })
    await CartItems.create({
      quantity: Math.floor(Math.random() * 500),
      price: Number(faker.commerce.price()),
      orderId: i + 1,
      productId: 6,
      userId: i + 1
    })
  }

  //Creates random Merchants
  for (let i = 0; i < 10; i++) {
    let newMerchant = await Merchant.create({
      merchantName: faker.company.companyName()
    })
    newMerchant.setUser(allUsers[i])
    newMerchant.setCountry(allCountries[i])
  }

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
