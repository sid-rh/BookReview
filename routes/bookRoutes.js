const express = require('express');
const {
  createBook, getBooks, getBookDetails, searchBooks
} = require('../controllers/bookController');
const {createReview}=require('../controllers/reviewController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/',protect,createBook);
router.get('/',getBooks);
router.get('/search',searchBooks);
router.get('/:id',getBookDetails);
router.post('/:id/reviews',protect,createReview);

module.exports = router;
