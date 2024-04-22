// Import necessary modules
import express from "express"; // Express.js framework for web applications
import bodyParser from "body-parser"; // Middleware to parse request bodies
import pg from "pg"; // PostgreSQL client library

// Initialize Express app
const app = express();
const port = 3000;

// Connect to PostgreSQL database
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world capitals",
  password: "varun",
  port: 5432,
});
db.connect();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static("public")); // Serve static files from the 'public' directory

// Default user ID and user data
let currentUserId = 1;
let users = [
  { id: 1, name: "Varun", color: "teal" },
  { id: 2, name: "Aditya", color: "powderblue" },
];

// Function to retrieve visited countries for the current user from the database
async function checkVisited() {
  const result = await db.query(
    "SELECT country_code FROM visited_countries JOIN users ON users.id = user_id WHERE user_id = $1; ",
    [currentUserId]
  );

  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

// Function to retrieve the current user's data from the database
async function getCurrentUser() {
  const result = await db.query("SELECT * FROM users");
  users = result.rows;
  return users.find((user) => user.id == currentUserId);
}

// Route to render the homepage
app.get("/", async (req, res) => {
  const countries = await checkVisited(); // Retrieve visited countries
  const currentUser = await getCurrentUser(); // Retrieve current user

  // Render the index.ejs template with data
  res.render("index.ejs", {
    countries: countries, // List of visited countries
    total: countries.length, // Total count of visited countries
    users: users, // List of all users
    color: currentUser.color, // Current user's color
  });
});

// Route to handle adding a new visited country
app.post("/add", async (req, res) => {
  const input = req.body["country"]; // Get the country input from the request body
  const currentUser = await getCurrentUser(); // Retrieve current user

  try {
    // Query to find the country code based on the input
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0]; // Extract country code from the result
    const countryCode = data.country_code;

    try {
      // Insert the visited country into the database
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/"); // Redirect to the homepage
    } catch (err) {
      console.log(err); // Log any errors
    }
  } catch (err) {
    console.log(err); // Log any errors
  }
});

// Route to handle switching users or adding a new user
app.post("/user", async (req, res) => {
  if (req.body.add === "new") {
    res.render("new.ejs"); // Render the new user form
  } else {
    currentUserId = req.body.user; // Switch to the selected user
    res.redirect("/"); // Redirect to the homepage
  }
});

// Route to handle adding a new user
app.post("/new", async (req, res) => {
  const name = req.body.name; // Get the new user's name from the request body
  const color = req.body.color; // Get the new user's color from the request body

  // Insert the new user into the database
  const result = await db.query(
    "INSERT INTO users (name, color) VALUES($1, $2) RETURNING *;",
    [name, color]
  );

  const id = result.rows[0].id; // Extract the ID of the new user
  currentUserId = id; // Set the current user ID to the new user's ID

  res.redirect("/"); // Redirect to the homepage
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});