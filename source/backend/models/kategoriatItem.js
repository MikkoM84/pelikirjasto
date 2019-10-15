const mongoose = require("mongoose");

let Schema = mongoose.Schema({
	kategoria:String,
	username:{type:String,indexed:true}
});

module.exports = mongoose.model("KategoriatItem",Schema);