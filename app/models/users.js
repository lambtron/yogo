'use strict';

(function () {

  var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

  var UserSchema = new Schema({
      id: ObjectId,
      yo_name: String, // Yo username
      spots: Array // array of go's
  });

  // Array:
  // [
  //   {
  //     lat: xxx,
  //     lng: yyy,
  //     msg: "HAI THERE"
  //   },
  //   {
  //     ...
  //   }
  // ]

  var User = mongoose.model("User", UserSchema);

  module.exports = {
    create: User,

    // add spots to array
    addSpots: function addSpots () {

    },

    upsertUser: function (phone_number, type, cb) {
      // var error = function (err) {
      //   if (err)
      //     throw err;

      //   cb();
      // };

      User.update( {phone_number: phone_number}, {
        $set: {
          type: type
        }
      },
      {upsert: true},
      cb);
    }
  };

}());