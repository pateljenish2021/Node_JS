const Movie = require("../models/Movie");

exports.getHomepage = async (req, res) => {
    try {
        const searchQuery = req.query.search || "";
        const query = { recommended: true }; 

        if (searchQuery) {
            query.title = new RegExp(searchQuery, "i"); 
        }

        const movies = await Movie.find(query);
        res.render("index", { movies, searchQuery });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching movies");
    }
};


exports.getAllMovies = async (req, res) => {
    try {
        const searchQuery = req.query.search || "";
        const query = searchQuery ? { title: new RegExp(searchQuery, "i") } : {};

        const movies = await Movie.find(query);
        res.render("allMovies", { movies, searchQuery });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching movies");
    }
};

exports.getMovieDetails = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).send("Movie not found");

        const releaseDate = new Date(movie.releaseDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });

        res.render("movie", { movie, releaseDate });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching movie details");
    }
};

exports.comingSoon = (req, res) => res.render("comingSoon");
