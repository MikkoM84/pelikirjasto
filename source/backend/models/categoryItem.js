const mongoose = require("mongoose");

let Schema = mongoose.Schema({
	category:String,
	username:{type:String,indexed:true}
});

module.exports = mongoose.model("CategoryItem",Schema);