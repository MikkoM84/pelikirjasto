const mongoose = require("mongoose");

let Schema = mongoose.Schema({
	kokoelma:String,
	kategoriat:[String],
	nimi:String,
	kuvaus:String,
	username:{type:String,indexed:true}
});

module.exports = mongoose.model("PelitItem",Schema);