const mongoose = require("mongoose");

let Schema = mongoose.Schema({
	username:String,
	token:String,
	ttl:Number //timetolive
});

module.exports = mongoose.model("Session",Schema);