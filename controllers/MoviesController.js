import Movies from "../models/Movies.js";

const getMoviesList = async (req, res) => {
    try {
        const skip = req.query.skip && !isNaN(req.query.skip) ? Number(req.query.skip) : 0;
        const fetch = req.query.fetch && !isNaN(req.query.fetch) ? Number(req.query.fetch) : 0;
        const conditions = {};
        if (req.query.s) {
            conditions.$or = [
                {
                    title: { $regex: req.query.s, $options: "i" }
                }
            ]

        }
        const pipelines = [
            { $match: conditions },
            {
                $sort: {
                    year: -1
                }
            },
            {
                $facet: {
                    totalCount: [{ $count: "count" }],
                    data: [{ $skip: skip }, { $limit: fetch },
                    {
                        $project: {
                            genres: "$genres",
                            runtime: "$runtime",
                            title: "$title",
                            year: "$year",
                            imdb: "$imdb",
                            poster: "$poster",
                        }
                    }
                    ]
                }
            },
            {
                $project: {
                    totalCount: { $first: "$totalCount.count" },
                    data: "$data"
                }
            }

        ]
        const movies = await Movies.aggregate(pipelines);
        const { data = [], totalCount } = Array.isArray(movies) && movies.length ? movies[0] : {};
        return res.status(200).json({ movies: data, totalCount });
    } catch (error) {
        console.log('Error', error);
        return res.status(500).json({ error: error.message })
    }
}

export { getMoviesList };