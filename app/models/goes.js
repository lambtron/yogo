'use strict';

(function () {

  var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

  var GoSchema = new Schema({
      id: ObjectId,
      message: String,
      lat: Number,
      lng: Number
  });

  var Go = mongoose.model("Go", GoSchema);

  module.exports = {
    create: Go
  };

}());