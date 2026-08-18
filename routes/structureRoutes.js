// const express = require('express');
// const { createStructure } = require('../controllers/structureController');
// const authMiddleware = require('../middleware/authMiddleware');
// const router = express.Router();

// router.post('/', authMiddleware, createStructure);

// module.exports = router;


// routes/structureRoutes.js
const express = require('express');
const router = express.Router();
const { createStructure, getUserStructures ,deleteStructure } = require('../controllers/structureController');
const authMiddleware = require('../middleware/authMiddleware'); // Tu middleware de JWT

router.get('/', authMiddleware, getUserStructures);
router.post('/', authMiddleware, createStructure);
router.delete('/:id', authMiddleware, deleteStructure);


module.exports = router;


