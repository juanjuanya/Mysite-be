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
const commentSchema = new Schema({
  post_id: String,
  avatar: String,
  author: String,
  user_id: String,
  content: String,
  created_at: Number,
  updated_at: Number
}, schemaOptions)

commentSchema.statics.addComment = _create
commentSchema.statics.getComments = function (query) {
  return this.find(query).sort('created_at').exec().then(_callback, _callback)
}
commentSchema.statics.delComment = _delById
commentSchema.statics.updateComment = _updateById

module.exports = mongoose.model('Comment', commentSchema)