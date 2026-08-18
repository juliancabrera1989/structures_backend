const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);

// router.get('/user', authMiddleware, async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id).select('username email');
//         console.log(user);
//         res.json(user);
//     }
//     catch(error){
//         res.status(500).json({ message: 'Server error'});

//     }
// });


module.exports = router;