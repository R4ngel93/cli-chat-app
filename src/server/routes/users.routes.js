/* Router */
const router = require('express').Router();

/* Controller */
const UsersCtrl = require('../controllers/users.ctrl');

/* Routes */
router.post('/signup', UsersCtrl.createUser);

router.post('/login', UsersCtrl.loginUser);

router.get('/', UsersCtrl.getUsers);


/* Export */
module.exports = router;