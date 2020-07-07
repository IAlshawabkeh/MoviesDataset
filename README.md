### Movie dataset POC template


### Running

# npm run start to fire up local server with default PORT: 3000 (http://localhost:3000/)

# MoviesDataset
This a NodeJs with Hapi, MongoDB via mongoose and integrated with ElasticSearch via mongoosastic.



# [DatasetLoader](server/helpers/datasetLoader.js)
This file loads all the data from [the csv dataset file](server/assets/dataset.csv) and then processes it then inseting it to both mongoDB and elasticSearch.

Currently the data is populated to cloud MongoDB and cloud elastic search.

In case you want t initiate the datasetLoader function later on, hit the follow GET request:  http://localhost:3000/api/dataset/load


# Routes strutre
Hapi server gets all the routes using [routesLoader](server/helpers/routesLoader.js) which reads all routes inside [routesFolder](server/routes) and combin them in an array of a Hapy... I mean Hapi (I know its a common joke but I couldn't resesit it lol!) route objects which then gets injected in the server.route() function.

## Note that elastic search count route (/api/movie/count) in order to count by imdb_score YOU must follow this pattern (imdb_score=0+TO+20), you have to keep the '+TO+' between the starting range and the ending range.