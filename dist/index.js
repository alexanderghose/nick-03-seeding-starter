"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
// ! Movies is our compiled model
// ! We use it to run mongoose methods
// ! like Movies.create() or Movies.find()
const movies_1 = __importDefault(require("./models/movies"));
const movieController_1 = require("./controllers/movieController");
const app = (0, express_1.default)();
const movieData = [
    { name: 'Diehard', movieId: 1 },
    { name: 'The Grinch', movieId: 2 },
    { name: 'Home Alone', movieId: 3 }
];
const router = express_1.default.Router();
// ! getting my movies
router.route('/api/movies').get(movieController_1.indexCtrl);
// ! Getting an individual movie
router.route('/api/movies/:movieId').get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movieId = req.params.movieId; // ! Get the id you're asking for, as a number
        console.log(movieId);
        const obtainedMovie = yield movies_1.default.findById(movieId);
        console.log("movie obtained", obtainedMovie);
        res.send(obtainedMovie); // send movie obj to frontend as JSON
        // ! the catch part "catches" the error that was thrown.
        // ! we can handle errors in this catch block
        // ? e is a variable that is filled in by nodeJS, containing details abt error
    }
    catch (e) {
        if (e instanceof Error) {
            console.log(e.message);
        }
        else {
            console.log(e);
        }
        res.send({ message: "Movie not found. Did you provide a valid movieId?" });
    }
}));
// ! Posting a movie
router.route('/api/movies').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // ? If I sent a movie, how do I get what I sent in here?
    console.log('USER HAS SENT US:', req.body);
    const incomingMovie = req.body;
    let savedMovie = yield movies_1.default.create(incomingMovie); // save to DB
    console.log("Just added", savedMovie);
    res.send(savedMovie); // send over the saved movie to frontend as JSON
}));
// ! To get POSTing to work, we need to add this line:
app.use(express_1.default.json());
app.use(router);
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect("mongodb://127.0.0.1:27017/moviesdb");
        console.log("Connected to the database!");
        app.listen(8000, () => {
            console.log('Express API is running on http://localhost:8000');
        });
    });
}
start();
