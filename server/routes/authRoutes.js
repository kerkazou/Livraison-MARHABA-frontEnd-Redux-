const router = require('express').Router();

const authController = require('../controllers/authControllers');
const tryCatch = require('../middlewares/tryCatch');
const errorHandller = require('../middlewares/errorHandller');
const permission = require('../middlewares/Permission');


router.post('/login', permission.authPermission, tryCatch(authController.login));
router.post('/register', permission.authPermission, tryCatch(authController.register));
router.get('/verify-email/:token', tryCatch(authController.verifyEmail));
router.get('/logout',permission.userPermission, tryCatch(authController.logout));

router.use(errorHandller);


module.exports = router;