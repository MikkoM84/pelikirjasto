const mongoose = require("mongoose");

let Schema = mongoose.Schema({
	collectionName:String,
	username:{type:String,indexed:true}
});

module.exports = mongoose.model("CollectionItem",Schema);