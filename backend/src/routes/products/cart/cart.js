// GET: Get user's cart
router.get('/cart', authController.protect, cartController.getCart);

// POST: Add item to cart
router.post('/cart/:productId', authController.protect, cartController.addToCart);

// PATCH: Update cart item quantity
router.patch('/cart/:itemId', authController.protect, cartController.updateCartItem);

// DELETE: Remove item from cart
router.delete('/cart/:itemId', authController.protect, cartController.removeFromCart);

// POST: Process checkout
router.post('/cart/checkout', authController.protect, cartController.checkout);

