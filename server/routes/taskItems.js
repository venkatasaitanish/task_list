const router = require('express').Router();
const { addItem, getItemsList, deleteItem, updateItem, getCurrItem } = require('../controllers/taskItems');

router.post('/api/item', addItem);
router.get('/api/item', getItemsList);
router.delete('/api/item/:id', deleteItem);
router.put('/api/item/:id', updateItem);
router.get('/api/item/:id', getCurrItem);

module.exports = router;