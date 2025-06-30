// GET: About page content
router.get('/about', staticController.getAboutInfo);

// POST: Handle contact form submission
router.post('/contact', staticController.submitContactForm);