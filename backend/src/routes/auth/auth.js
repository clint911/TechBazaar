// POST: Create new user
router.post('/auth/signup', authController.signup);

// POST: Authenticate the user
router.post('auth/login', authController.login);

