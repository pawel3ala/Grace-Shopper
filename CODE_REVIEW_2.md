# Authenticated User Checkout Checklist

1.  Login
    a. They have a session
    b. Their request now has req.user on it

2.  Add an item to cart
    a. Add a row to cartItems table (or more if they add more items to cart)

3.  Checkout
    a. Select shipping address
    b. Check inventory -- 🚨 if insufficient stock, invalidate order and inform user of error
    c. Create an order O
    d. Copy over each cart item into order items table, associated with O, assigned a static price.
    e. Delete all user's cart items.

# Unuthenticated User Checkout Checklist

<!-- 1. Login
  a. They have a session
  b. Their request now has req.user on it -->

2.  Add an item to cart
    a. Add a row to cartItems table (or more if they add more items to cart)

3.  Checkout
    a. Select shipping address
    b. Check inventory -- 🚨 if insufficient stock, invalidate order and inform user of error
    c. Create an order O
    d. Copy over each cart item into order items table, associated with O, assigned a static price.
    e. Delete all user's cart items.
