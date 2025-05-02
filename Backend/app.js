const dotenv = require ('dotenv')
dotenv.config();
const express= require('express')
const cors = require ('cors');
const cookieParser = require('cookie-parser');
const app = express();
const connectToDb = require ('./db/db');
const userRoutes = require('./Routes/user.routes');
const captainRoutes = require('./Routes/captainRoutes');
const mapsRoutes = require('./Routes/maps.routes');
const rideRoutes = require('./Routes/ride.routes');

 connectToDb();
 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());



app.get('/', (req,res)=>{
    res.send("hello world");
});
 app.use('/users', userRoutes);
 app.use('/captains', captainRoutes);
//  app.use('/get-coordinates', mapsRoutes);
app.use('/maps', mapsRoutes);
app.use('/rides', rideRoutes);


module.exports= app;