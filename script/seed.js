'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const faker = require('faker')

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
    let newCustomer = await Customer.create({
      name: `${faker.name.firstName()} ${fake.name.lastName()}`,
      email: faker.internet.email(),
      password: faker.internet.password()
    })
    allUsers.push(newCustomer)
    newCustomer.addCountry(allCountries[i])
  }

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
  let allProducts = []
  for (let i = 0; i < 12000; i++) {
    let newProduct = await Product.create({
      name: `${faker.commerce.productName()}`,
      quantity: Math.floor(Math.random() * 1000),
      price: Number(faker.commerce.price(0.1, 1000, 2)),
      image: faker.image.imageUrl(),
      description: faker.lorem.paragraph()
    })
    newProduct.addCategory(faker.random.arrayElement(categories))
    allProducts.push(newProduct)
  }

  // Creates random Reviews
  for (let i = 0; i < 500; i++) {
    let contentAmount = Math.floor(Math.random() * 4)
    let newReview = await Review.create({
      content: faker.lorem.paragraphs(contentAmount),
      stars: Math.ceil(Math.random() * 5),
      title: faker.lorem.sentence(contentAmount + 3)
    })
    newReview.addUser(faker.random.arrayElement(allUsers))
    newReview.addProduct(faker.random.arrayElement(allProducts))
  }

  // Creates random Carts
  for (let i = 0; i < 120; i++) {
    let newCart = await Cart.create({
      quantity: Math.floor(Math.random() * 500)
    })
    newCart.addUser(allUsers[i])
    newCart.addProducts([allProducts[0], allProducts[1], allProducts[2]])
  }

  //Creates random Merchants
  for (let i = 0; i < 100; i++) {
    let newMerchant = await Merchant.create({
      merchantName: faker.company.companyName()
    })
    newMerchant.addUser(allUsers[i])
    newMerchant.addCountry(allCountries[i])
  }
  //Creates random Addresses
  let shipTypes = ['BILL_TO', 'SHIP_TO', 'BOTH']
  for (let i = 0; i < 300; i++) {
    let newAddress = await Address.create({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      street: faker.address.streetAddress(false),
      city: faker.address.city(),
      state: faker.address.state(),
      zip: faker.address.zipCode(),
      type: faker.random.arrayElement(shipTypes)
    })
    newAddress.addUser(allUsers[i])
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
