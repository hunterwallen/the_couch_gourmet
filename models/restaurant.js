const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Posts = require('./posts.js')


const restaurantSchema = new Schema ({
  name:{type:String, unique: true, required: true, validate: {
                          validator: (str) => {
                            let length = str.length
                            if(length < 5 || length > 16) {
                              return false
                            } else {
                              return true
                            }}, message: 'Your username must be between 5 and 16 characters long.'}},
  password:{type:String, required:true, validate: {
                          validator: (str) => {
                            let length = str.length
                            if(length < 7 || length > 16) {
                              return false
                            } else {
                              return true
                            }}, message: 'Your password must be between 7 and 16 characters.'}},
  about:{type:String, required:true}
})


const Restaurant = mongoose.model('Restaurant', restaurantSchema)

module.exports = Restaurant