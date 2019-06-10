const secrets = {
  dbURL : 'mongodb://localhost:27017/this-is-life'
}



const getSecret = key => secrets[key]

module.exports = getSecret