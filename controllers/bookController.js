const Book = require('../models/Book');
const Review = require('../models/Review');

const createBook=async(req,res)=>{
    try {
        req.body.createdBy = req.user.id;
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'error'});
    }
    
}

const getBooks=async(req,res)=>{

    try {
        const { page = 1, limit = 10, author, genre } = req.query;
        const filter = {};
        if (author) filter.author = author;
        if (genre)  filter.genre  = genre;
        const books = await Book.find(filter)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        res.status(200).json(books);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'error'});
    }
    
}

const getBookDetails=async(req,res)=>{
    try {
        const bookId = req.params.id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const [book, reviews] = await Promise.all([
        Book.findById(bookId),
        Review.find({ book: bookId })
        .populate('user', 'email')
        .skip((page - 1) * limit)
        .limit(limit)
    ]);
        const avgRatingAgg = await Review.aggregate([
            { $match: { book: book._id } },
            { $group: { _id: null, avg: { $avg: '$rating' } } }
        ]);
        const avgRating = avgRatingAgg[0]?.avg || 0;

        res.status(200).json({ book, averageRating: avgRating, reviews });
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'error'});
    }
}

const searchBooks=async(req,res)=>{
    try {
        const { q } = req.query;
        if(!q) return res.status(400).json({error:'Provide query'});
        const books = await Book.find({
            $or: [
                { title: { $regex: q, $options: 'i' } },
                { author: { $regex: q, $options: 'i' } }
            ]
        });
        res.status(200).json({
            count:books.length,
            data:books
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'error'});
    }
    
}

module.exports={createBook,getBooks,getBookDetails,searchBooks };