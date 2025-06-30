// GET: Get all products (public)
router.get('/products', productController.getAllProducts); // Limit to 10

// GET: Get single product by ID
router.get('/products/:id', productController.getProductById);

// POST: Create new product (Admin only)
router.post('/products', authController.protect, authController.restrictTo('admin'), productController.createProduct);

// PATCH: Update product (Admin only)
router.patch('/products/:id', authController.protect, authController.restrictTo('admin'), productController.updateProduct);

// DELETE: Delete product (Admin only)
router.delete('/products/:id', authController.protect, authController.restrictTo('admin'), productController.deleteProduct);





