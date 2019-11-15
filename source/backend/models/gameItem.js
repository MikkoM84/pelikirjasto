const mongoose = require("mongoose");

let Schema = mongoose.Schema({
	collectionName:String,
	categories:[String],
	game:String,
	description:String,
	username:{type:String,indexed:true}
});

module.exports = mongoose.model("GameItem",Schema);