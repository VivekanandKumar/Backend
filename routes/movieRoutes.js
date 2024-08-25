import express from 'express'
import { getMoviesList } from '../controllers/MoviesController.js';
const Router = express.Router();
Router.get('/', getMoviesList);
export default Router;