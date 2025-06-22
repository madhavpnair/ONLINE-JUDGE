const express=require('express');
const app=express();
const User = require("./models/User")
const DBConnection= require ('./database/db');
const bcrypt= require("bcryptjs"); //encrypt
const jwt= require("jsonwebtoken");
const dotenv=require('dotenv');
dotenv.config();

DBConnection();

app.use(express.json());
app.use(express.urlencoded({ extended : true}));   //middleware

app.get("/",(req,res)=>(
    res.send("Hello World! from backend")
));

app.post("/register",async(req,res) =>{

    try{

        const { firstname, lastname, email, password}=req.body;

        if(!(firstname && lastname && email && password)){
            return res.status(400).send("Pls enter all the required info!!");
        }

        const existingUser= await User.findOne({email});

        if(existingUser){
            return res.status(400).send("User already exists with the same email");
        }

        const hashedPassword= await bcrypt.hash(password,10);

        const user= await User.create({
            firstname,
            lastname,
            email,
            password:hashedPassword
        });

        const token=jwt.sign({id:user._id,email}, process.env.SECRET_KEY,{
            expiresIn:'1h',
        });

        user.token=token;
        user.password= undefined;
        res.status(200).json({message: "You have successfully registered!",user});

        }

    catch(error){
        console.log(error)
    }
    
});


app.listen(process.env.PORT,() => (
    console.log(`Server is listening on port ${process.env.PORT}!`)
));