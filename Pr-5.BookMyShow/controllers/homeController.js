const Movie = require("../models/Movie");

// Show only recommended movies on homepage
exports.getHomepage = async (req, res) => {
    try {
        let query = { recommended: true };
        let searchQuery = req.query.search || "";

        if (searchQuery) {
            query.title = { $regex: new RegExp(searchQuery, "i") };
        }

        const movies = await Movie.find(query);
        res.render("index", { movies, searchQuery });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching movies");
    }
};

// Show all movies
exports.getAllMovies = async (req, res) => {
    try {
        let searchQuery = req.query.search || "";
        let query = {};

        if (searchQuery) {
            query.title = { $regex: new RegExp(searchQuery, "i") };
        }

        const movies = await Movie.find(query);
        res.render("allMovies", { movies, searchQuery });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching movies");
    }
};

// Show movie details
exports.getMovieDetails = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).send('Movie not found');
        }

        // Format the release date
        const releaseDate = new Date(movie.releaseDate).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });

        res.render('movie', { movie, releaseDate });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching movie details');
    }
};

exports.comingSoon = (req, res) => res.render("comingSoon");