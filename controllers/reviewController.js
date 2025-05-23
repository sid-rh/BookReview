const Review = require('../models/Review');
const Book=require('../models/Book');

const createReview=async(req,res)=>{
    try {

        const bookId=req.params.id;
        const userId=req.user._id;
        const book = await Book.findById(bookId);

        if(!book) return res.status(404).json({error:'Book not found'});

        const existingReview = await Review.findOne({
            user: userId,
            book: bookId
        });

        if(existingReview) return res.status(400).json({error:'You have already reviewed this book'});

        const review = await Review.create({
            book: bookId,
            user: userId,
            ...req.body
        });
        res.status(201).json(review);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"error"});
    }
};

const updateReview=async(req,res)=>{
    try {

        const reviewId=req.params.id;
        let reviewExists = await Review.findById(reviewId);

        if(!reviewExists) res.status(404).json({error:'Review not found'});

        const review = await Review.findOneAndUpdate(
            { _id: reviewId, user: req.user._id },
            req.body,
            { new: true }
        );
        if (!review) return res.status(404).json({ message: 'Review not found' });
        res.status(200).json(review);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"error"});
    }
}

const deleteReview=async(req,res)=>{
    try {
        const deleted = await Review.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        });
        if (!deleted) return res.status(404).json({ message: 'Review not found' });
        res.status(200).json({ message: 'Review deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"error"});
    }
}

module.exports={createReview,updateReview,deleteReview};