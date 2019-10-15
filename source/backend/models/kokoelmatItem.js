const mongoose = require("mongoose");

let Schema = mongoose.Schema({
	kokoelma:String,
	username:{type:String,indexed:true}
});

module.exports = mongoose.model("KokoelmatItem",Schema);