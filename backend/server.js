require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const confessionRoutes = require('./routes/confession');
const cors = require('cors');
const app = express();
const { connectRedis } = require('./config/redisClient');




// middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});


app.use(express.json());


app.use(cors(
    {
        origin: '*'
    }
));



// routes
app.use('/api', userRoutes);
app.use('/api', confessionRoutes);

// async startup function
(async () => {
    try {
        await connectRedis();
        console.log('Connected to Redis');
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to the database");
        app.listen(process.env.PORT, () => {
            console.log(`server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error('Startup error:', error);
        process.exit(1);
    }
})();