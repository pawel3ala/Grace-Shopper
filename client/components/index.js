/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {Catalog} from './catalog'
export {SingleProduct} from './singleProduct'
export {Cart} from './cart'
export {Checkout} from './checkout'
export {CheckoutForm} from './checkoutForm'
export {CreditCard} from './creditcard'
export {AddressForm} from './address'
