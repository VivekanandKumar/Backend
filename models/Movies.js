import { Schema, model } from "mongoose";

const Movies = new Schema({
    plot: String,
    genres: Schema.Types.Mixed,
    runtime: Number,
    cast: Schema.Types.Mixed,
    title: {
        type: String,
        trim: true
    },
    fullplot: {
        type: String,
        trim: true
    },
    languages: Schema.Types.Mixed,
    released: Date,
    directors: Schema.Types.Mixed,
    writers: Schema.Types.Mixed,
    awards: Schema.Types.Mixed,
    lastupdated: String,
    year: Number,
    imdb: Schema.Types.Mixed,
    countries: Schema.Types.Mixed,
    type: String,
    tomatoes: Schema.Types.Mixed,
    num_mflix_comments: Number,
    poster: String,
    rated: String
});

export default model('movie', Movies);