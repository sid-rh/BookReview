const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();

const app=express();
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

app.use('/', authRoutes);
app.use('/books',bookRoutes);
app.use('/reviews',reviewRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('Connected to the Database');
        app.listen(process.env.PORT, () =>
            console.log(`Server running on port ${process.env.PORT}`)
        );

    }).catch(err=>console.error(err));