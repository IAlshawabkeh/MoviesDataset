const DB_CN_STRING = 'mongodb://admin:admin@ihab-shard-00-00.12wb7.mongodb.net:27017,ihab-shard-00-01.12wb7.mongodb.net:27017,ihab-shard-00-02.12wb7.mongodb.net:27017/movie_dataset?ssl=true&replicaSet=ihab-shard-0&&authSource=admin&retryWrites=true'
//  'mongodb+srv://admin:admin@ihab.12wb7.mongodb.net/ihab?retryWrites=true&w=majority';

const ELASTIC_SEARCH_CONNECTION = {
    host: '34ad8383650d45518e3a7194961e65d4.us-east-1.aws.found.io',
    port: '9243',
    protocol: 'https',
    auth: 'elastic:a4Zb2AWqkJtiUkqINprIIxjz'
};

module.exports = { DB_CN_STRING, ELASTIC_SEARCH_CONNECTION};