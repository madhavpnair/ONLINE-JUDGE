const express=require('express');
const app=express();
const User = require("./models/User")
const Problem = require("./models/Problem");
const DBConnection= require ('./database/db');
const bcrypt= require("bcryptjs"); //encrypt
const jwt= require("jsonwebtoken");
const dotenv=require('dotenv');
dotenv.config();

DBConnection();

app.use(express.json());
app.use(express.urlencoded({ extended : true}));   //middleware


const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173', // your React dev server
  credentials: true
}));


app.get("/",(req,res)=>(
    res.send("Hello World! from backend")
));

//message to check if the server is running
app.get("/api", (req, res) => {
  res.send("Connected to Express via Vite proxy!");
});

app.get("/home",(req,res)=>(
    res.send(`Welcome {username} to the home page!`, {username: req.query.username})
));

app.post("/register",async(req,res) =>{

    try{

        const { firstname, lastname, email, username, password}=req.body;

        if(!(firstname && lastname && email && username && password)){
            return res.status(400).send("Pls enter all the required info!!");
        }

        const existingUser= await User.findOne({email});
        const existingUsername= await User.findOne({username});

    
        if(existingUser){
            return res.status(400).send("User already exists with the same email");
        }
        if(existingUsername){
            return res.status(400).send("User already exists with the same username");
        }

        const hashedPassword= await bcrypt.hash(password,10);

        const user= await User.create({
            firstname,
            lastname,
            email,
            username,
            password:hashedPassword
        });

        //await newUser.save();


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


app.post("/login",async(req,res) =>{

    try{

        const { username, password}=req.body;
        if(!(username && password)){
            return res.status(400).send("Pls enter all the required info!!");
        }

        const existingUser= await User.findOne({username});
        if(!existingUser){
            return res.status(400).send("Invalid username!!");
        }

        const isPasswordValid= await bcrypt.compare(password,existingUser.password);
        if(!isPasswordValid){
            return res.status(400).send("Invalid password!!");
        }
        
        res.status(200).json({message: "You have successfully logged in!",username});

        }

    catch(error){
        console.log(error)
    }
    
});

// Problem routes
app.get('/problems', async (req, res) => {
  const problems = await Problem.find();
  res.json(problems);
});

// Get a specific problem by ID
//here we use /api/problems/:id to get the problem by id unlike /problems to avoid confusion with the react routing
app.get('/api/problems/:id', async (req, res) => {
  const { id } = req.params;
  const problem = await Problem.findById(id);
  if (!problem) {   
    return res.status(404).json({ error: 'Problem not found' });
  }
    res.json(problem);  
});    
    

// all routes and middlewares should be defined before this line
//the server starts here
app.listen(process.env.PORT,() => (
    console.log(`Server is listening on port ${process.env.PORT}!`)
));




