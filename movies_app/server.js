const express = require("express");
const mongoose = require("mongoose");

/*   
1 - connect to mongodb server -- DONE
2 - create a schema for our data
3 - create a model from the schema
*/

// Step 1
const connect = () => {
  return mongoose.connect("mongodb+srv://naukri:naukri@cluster0.u9tan.mongodb.net/movies_data?retryWrites=true&w=majority",{

    useCreateIndex: true,
    useNewUrlParser: true, 
    useUnifiedTopology: true
  })
}

// Users Mongoose
const movieSchema = new mongoose.Schema(
  {
    movie_name: { type: String, required: true },
    movie_genre: { type: String, required: true },
    production_year: { type: String, required: true },
    budget: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Movie = mongoose.model("movie", movieSchema); // users

const app = express();

app.use(express.json());

/*
  movies
  post = /movies
  get all = /movies
  get one = /movies/:id
  update one = /movies/:id
  delete one = /movies/:id
*/

// MOVIES CRUD
app.post("/movies", async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    console.log(movie)

    return res.status(201).send(movie);
  } catch (e) { //Exception
    console.log("error")
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find().lean().exec();

    return res.send({ movies });
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).lean().exec();

    return res.send(movie);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.patch("/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(201).send(movie);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.delete("/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id).lean().exec();

    return res.status(200).send(movie);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});


app.listen(2345, async () => {
  await connect();
  console.log("listening on port 2345");
});