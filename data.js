const mongoose =  require('mongoose')
const Schema = mongoose.Schema  //命名空间


var connectOp = {
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  poolSize: 10,
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4
}


  const _callback = function (result) {
    console.log(result)
    return result
  }
  const _create = function (document) {
    return this.create(document).then(_callback)
  }
  const _delById = function (id) {
    return this.findByIdAndDelete(id).exec().then(_callback, _callback)
  }
  const _updateById = function (id, update) {
    return this.findByIdAndUpdate(id, update).exec().then(_callback, _callback)
  }


const schemaOptions = null
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  avatar: String,
}, schemaOptions)

userSchema.statics.login = function (query) {
  console.log('login。。。。。')
  return this.findOne(query).select({
    password: 0
  }).exec().then(_callback, _callback)
}
userSchema.statics.getInfo = function (id) {
  return this.findById(id).select({
    password: 0
  }).exec().then(_callback, _callback)
}
userSchema.statics.hasUser = function (query) {
  return this.findOne(query).exec().then(_callback, _callback)
}
userSchema.statics.signup = _create

module.exports = mongoose.model("User", userSchema)  //创建Data表