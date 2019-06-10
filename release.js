const mongoose = require('mongoose')
const Schema = mongoose.Schema //命名空间



const _callback = function (result) {
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
const releaseSchema = new Schema({
  user_id: String,
  author: String,
  title: String,
  content: String,
  created_at: Number,
  updated_at: Number,
  avatar: String
}, schemaOptions)

releaseSchema.statics.addRelease = _create
releaseSchema.statics.getReleases = function (direction, lastFetch, limit, query = {}) {
  const compare = direction === 'b' ? 'lt' : 'gt'  //判断重新定位的网址
  return this.find(query)
    .exec()
    .then(_callback, _callback)
}
releaseSchema.statics.updateRelease = _updateById

module.exports = mongoose.model("Release", releaseSchema) 