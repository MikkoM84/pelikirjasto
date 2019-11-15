const express = require("express");
const mongoose = require("mongoose");
const gameModel = require("../models/gameItem");
const collectionModel = require("../models/collectionItem");
const categoryModel = require("../models/categoryItem");

let router = express.Router();

//REST API
router.get("/pelit", function(req, res) {
	let username = req.session.username;
	//let list = [];
	gameModel.find({"username":username}, {"collectionName":1,"categories":1,"game":1,"description":1}, function(err,items) { 
		if(err) {
			return res.status(404).json({"message":"not found", "list":[]});
		}
		if(!items) {
			return res.status(404).json({"message":"not found", "list":[]});
		}
		return res.status(200).json(items);
	})
});

router.post("/pelit", function(req, res) {
	let item = new gameModel({
		collectionName:req.body.collectionName,
		categories:req.body.categories,
		game:req.body.game,
		description:req.body.description,
		username:req.session.username
	});
	if(!item || item.game.length < 1 || item.collectionName.length < 1) {
		return res.status(409).json({"message":"Ei tallennettu."});
	}
	item.save(function(err) {
		if(err) {
			return res.status(409).json({"message":"Ei tallennettu."});
		}
		return res.status(200).json({"message":"Peli lisätty."});
	});
});

router.delete("/pelit/:id", function(req, res) {
	gameModel.findById(req.params.id, function(err,item) {
		if(err) {
			return res.status(404).json({"message":"Ei löytynyt."});
		}
		if(!item) {
			return res.status(404).json({"message":"Ei löytynyt."});
		}
		if(req.session.username === item.username) {
			gameModel.deleteOne({"_id":req.params.id}, function(err) {
				if(err) {
					return res.status(404).json({"message":"Ei löytynyt."});
				}
				return res.status(200).json({"message":"onnistui"});
			});
		} else {
			return res.status(403).json({"message":"Ei sallittu."});
		}
	});
});

router.put("/pelit/:id", function(req, res) {
	gameModel.findById(req.params.id, function(err,item) {
		if(err) {
			return res.status(404).json({"message":"Ei löytynyt."});
		}
		if(!item) {
			return res.status(404).json({"message":"Ei löytynyt."});
		}
		if( req.body.game < 1 ) {
			return res.status(409).json({"message":"Ei tallennettu."});
		}
		if(req.session.username === item.username) {
			gameModel.replaceOne({_id:req.params.id}, {
				collectionName:req.body.collectionName,
				categories:req.body.categories,
				game:req.body.game,
				description:req.body.description,
				username:req.session.username
			}, function(err,item) {
				if(err) {
					return res.status(409).json({"message":err});
				}
				return res.status(200).json({"message":"Muutokset tallennettu."});
			});
		} else {
			return res.status(403).json({"message":"Ei sallittu."});
		}
	});
});

router.get("/kokoelmat", function(req, res) {
	let username = req.session.username;
	//let list = [];
	collectionModel.find({"username":username}, {"collectionName":1}, function(err,items) {
		if(err) {
			return res.status(404).json({"message":"Ei löytynyt.", "list":[]});
		}
		if(!items) {
			return res.status(404).json({"message":"Ei löytynyt.", "list":[]});
		}
		return res.status(200).json(items);
	})
});

router.post("/kokoelmat", function(req, res) {
	let item = new collectionModel({
		collectionName:req.body.collectionName,
		username:req.session.username
	});
	if(!item || item.collectionName.length < 1) {
		return res.status(409).json({"message":"Ei tallennettu."});
	}
	item.save(function(err) {
		if(err) {
			return res.status(409).json({"message":"Ei tallennettu."});
		}
		return res.status(200).json({"message":"Kokoelma lisätty."});
	});
});

router.delete("/kokoelmat/:id", function(req, res) {
	let collectionquery = {};
	collectionModel.findById(req.params.id, function(err,item) {
		if(err) {
			return res.status(404).json({"message":"Ei löytynyt."});
		}
		if(!item) {
			return res.status(404).json({"message":"Ei löytynyt."});
		}
		if(req.session.username === item.username) {
			collectionquery = {collectionName:item.collectionName,username:req.session.username};
			collectionModel.deleteOne({"_id":req.params.id}, function(err) {
				if(err) {
					return res.status(404).json({"message":"Ei löytynyt."});
				}
				gameModel.updateMany(collectionquery,{$set: {collectionName:""}}, function (err, result) {
					if (err) {
						console.log("update document error");
					} else {
						console.log("update document success");
						console.log(result);
					}
				})
				return res.status(200).json({"message":"onnistui"});
			});
		} else {
			return res.status(403).json({"message":"Ei sallittu."});
		}
	});
});

router.put("/kokoelmat/:id", function(req, res) {
	let collectionquery = {};
	collectionModel.findById(req.params.id, function(err,item) {
		if(err) {
			return res.status(404).json({"message":"Ei löytynyt."});
		}
		if(!item) {
			return res.status(404).json({"message":"Ei löytynyt."});
		}
		if(req.body.collectionName.length < 1 ) {
			return res.status(409).json({"message":"Ei tallennettu."});
		}
		if(req.session.username === item.username) {
			collectionquery = {collectionName:item.collectionName,username:req.session.username};
			collectionModel.replaceOne({_id:req.params.id}, {
				collectionName:req.body.collectionName,
				username:req.session.username
			}, function(err,item) {
				if(err) {
					return res.status(409).json({"message":err});
				}
				gameModel.updateMany(collectionquery,{$set: {collectionName:req.body.collectionName}}, function (err, result) {
					if (err) {
						console.log("update document error");
					} else {
						console.log("update document success");
						console.log(result);
					}
				})
				return res.status(200).json({"message":"Muutokset tallennettu."});
			});
		} else {
			return res.status(403).json({"message":"Ei sallittu."});
		}
	});
});

router.get("/kategoriat", function(req, res) {
	let username = req.session.username;
	//let list = [];
	categoryModel.find({"username":username}, {"category":1}, function(err,items) {
		if(err) {
			return res.status(404).json({"message":"Ei löytynyt.", "list":[]});
		}
		if(!items) {
			return res.status(404).json({"message":"Ei löytynyt.", "list":[]});
		}
		return res.status(200).json(items);
	})
});

router.post("/kategoriat", function(req, res) {
	let item = new categoryModel({
		category:req.body.category,
		username:req.session.username
	});
		if(!item || item.category < 1) {
			return res.status(409).json({"message":"Ei tallennettu."});
		}
	item.save(function(err,item) {
		if(err) {
			return res.status(409).json({"message":"Ei tallennettu."});
		}
		return res.status(200).json({"message":"Kategoria lisätty."});
	});
});

router.delete("/kategoriat/:id", function(req, res) {
	let categoryquery = {};
	categoryModel.findById(req.params.id, function(err,item) {
		if(err) {
			return res.status(404).json({"message":"Ei löytynyt."});
		}
		if(!item) {
			return res.status(404).json({"message":"Ei löytynyt."});
		}
		if(req.session.username === item.username) {
			categoryquery = {category:item.category,username:req.session.username};
			categoryModel.deleteOne({"_id":req.params.id}, function(err) {
				if(err) {
					return res.status(404).json({"message":"Ei löytynyt."});
				}
				gameModel.updateMany(categoryquery,{$pull: {categories:item.category}}, function (err, result) {
					if (err) {
						console.log("update document error");
					} else {
						console.log("update document success");
						console.log(result);
					}
				})
				return res.status(200).json({"message":"onnistui"});
			});
		} else {
			return res.status(403).json({"message":"Ei sallittu."});
		}
	});
});

router.put("/kategoriat/:id", function(req, res) {
	let categoryquery = {};
	categoryModel.findById(req.params.id, function(err,item) {
		if(err) {
			return res.status(404).json({"message":"Ei löytynyt."});
		}
		if(!item) {
			return res.status(404).json({"message":"Ei löytynyt."});
		}
		if(req.body.category.length < 1 ) {
			return res.status(409).json({"message":"Ei tallennettu."});
		}
		if(req.session.username === item.username) {
			categoryquery = {categories:item.category,username:req.session.username};
			categoryModel.replaceOne({_id:req.params.id}, {
				category:req.body.category,
				username:req.session.username
			}, function(err,item) {
				if(err) {
					return res.status(409).json({"message":err});
				}
				gameModel.updateMany(categoryquery,{$set: {"categories.$":req.body.category}}, function (err, result) {
					if (err) {
						console.log("update document error");
					} else {
						console.log("update document success");
						console.log(result);
					}
				})
				return res.status(200).json({"message":"Muutokset tallennettu."});
			});
		} else {
			return res.status(403).json({"message":"Ei sallittu."});
		}
	});
});

module.exports = router;