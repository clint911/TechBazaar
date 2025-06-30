// GET: Get user's wishlist
router.get('/wishlist', authController.protect, wishlistController.getWishlist);

// POST: Add item to wishlist
router.post('/wishlist/:productId', authController.protect, wishlistController.addToWishlist);

// DELETE: Remove item from wishlist
router.delete('/wishlist/:productId', authController.protect, wishlistController.removeFromWishlist);

