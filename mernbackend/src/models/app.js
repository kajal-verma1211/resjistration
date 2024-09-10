const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static and view paths
const staticPath = path.join(__dirname, "../../public");
const viewPath = path.join(__dirname, "../../templates/views");
const partialPath = path.join(__dirname, "../../templates/partials");

app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

// MongoDB connection
mongoose.connect("mongodb+srv://kajalsoni30902:QDfwyImjWJw4LLK9@cluster0.swocahl.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected...');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// User schema and model
const userSchema = new mongoose.Schema({
  username: String,
  email: {type: String, unique: true},
  password: String,
  confirmpassword: String
});

const User = mongoose.model('User', userSchema);
app.use(express.static(staticPath));



// Register route
app.post('/register', async (req, res) => {
  const { username, email, password, confirmpassword } = req.body;

  try {
    const existingUser= await User.findOne({email: email});

    if(existingUser){
      return res.status(400).render('rejister',{
        errorMessage:"Email is already rejistered.",
        username,
        email
      });
    }

    if (password !== confirmpassword) {
      return res.status(400).send('Passwords do not match.');
    }

    const newUser = new User({ username, email, password, confirmpassword });
    await newUser.save();
    res.send('Registered successfully');
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

// Login route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).send("Invalid email and password");
    }

    // Check password
    if (user.password !== password) {
      return res.status(400).send("Invalid password");
    }

    res.send("Login successful");
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
