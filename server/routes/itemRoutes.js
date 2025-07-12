const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public
router.get('/', itemController.getAllItems);
router.get('/:id', itemController.getItemById);

// Authenticated
router.post('/', authMiddleware, upload.array('images', 5), itemController.createItem);
router.get('/my/items', authMiddleware, itemController.getMyItems);
router.delete('/:id', authMiddleware, itemController.deleteItem);

// Admin
router.get('/admin/pending', authMiddleware, adminMiddleware, itemController.getPendingItems);
router.patch('/admin/approve/:id', authMiddleware, adminMiddleware, itemController.approveItem);
router.delete('/admin/reject/:id', authMiddleware, adminMiddleware, itemController.rejectItem);

module.exports = router; 