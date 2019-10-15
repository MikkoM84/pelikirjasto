const express = require("express");
const mongoose = require("mongoose");
const pelitModel = require("../models/pelitItem");
const kokoelmatModel = require("../models/kokoelmatItem");
const kategoriatModel = require("../models/kategoriatItem");

let router = express.Router();

//REST API
router.get("/pelit", function(req, res) {
	let username = req.session.username;
	let list = [];
	pelitModel.find({"username":username}, {"kokoelma":1,"kategoriat":1,"nimi":1,"kuvaus":1}, function(err,items) { 
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
	let item = new pelitModel({
		kokoelma:req.body.kokoelma,
		kategoriat:req.body.kategoriat,
		nimi:req.body.nimi,
		kuvaus:req.body.kuvaus,
		username:req.session.username
	});
	item.save(function(err,item) {
		if(err) {
			return res.status(409).json({"message":"not saved"});
		}
		if(!item) {
			return res.status(409).json({"message":"not saved"});
		}
		return res.status(200).json({"message":"success"});
	});
});

router.delete("/pelit/:id", function(req, res) {
	pelitModel.findById(req.params.id, function(err,item) {
		if(err) {
			return res.status(404).json({"message":"not found"});
		}
		if(!item) {
			return res.status(404).json({"message":"not found"});
		}
		if(req.session.username === item.username) {
			pelitModel.deleteOne({"_id":req.params.id}, function(err) {
				if(err) {
					return res.status(404).json({"message":"not found"});
				}
				return res.status(200).json({"message":"success"});
			});
		} else {
			return res.status(403).json({"message":"not allowed"});
		}
	});
});

router.put("/pelit/:id", function(req, res) {
	pelitModel.findById(req.params.id, function(err,item) {
		if(err) {
			return res.status(404).json({"message":"not found"});
		}
		if(!item) {
			return res.status(404).json({"message":"not found"});
		}
		if(req.session.username === item.username) {
			pelitModel.replaceOne({_id:req.params.id}, {
				kokoelma:req.body.kokoelma,
				kategoriat:req.body.kategoriat,
				nimi:req.body.nimi,
				kuvaus:req.body.kuvaus,
				username:req.session.username
			}, function(err,item) {
				if(err) {
					return res.status(409).json({"message":err});
				}
				return res.status(200).json({"message":"success"});
			});
		} else {
			return res.status(403).json({"message":"not allowed"});
		}
	});
});

router.get("/kokoelmat", function(req, res) {
	let username = req.session.username;
	let list = [];
	kokoelmatModel.find({"username":username}, {"kokoelma":1}, function(err,items) {
		if(err) {
			return res.status(404).json({"message":"not found", "list":[]});
		}
		if(!items) {
			return res.status(404).json({"message":"not found", "list":[]});
		}
		return res.status(200).json(items);
	})
});

router.post("/kokoelmat", function(req, res) {
	let item = new kokoelmatModel({
		kokoelma:req.body.kokoelma,
		username:req.session.username
	});
	item.save(function(err,item) {
		if(err) {
			return res.status(409).json({"message":"not saved"});
		}
		if(!item) {
			return res.status(409).json({"message":"not saved"});
		}
		return res.status(200).json({"message":"success"});
	});
});

router.delete("/kokoelmat/:id", function(req, res) {
	let kokoelmaquery = {};
	kokoelmatModel.findById(req.params.id, function(err,item) {
		if(err) {
			return res.status(404).json({"message":"not found"});
		}
		if(!item) {
			return res.status(404).json({"message":"not found"});
		}
		if(req.session.username === item.username) {
			kokoelmaquery = {kokoelma:item.kokoelma,username:req.session.username};
			kokoelmatModel.deleteOne({"_id":req.params.id}, function(err) {
				if(err) {
					return res.status(404).json({"message":"not found"});
				}
				pelitModel.updateMany(kokoelmaquery,{$set: {kokoelma:""}}, function (err, result) {
					if (err) {
						console.log("update document error");
					} else {
						console.log("update document success");
						console.log(result);
					}
				})
				return res.status(200).json({"message":"success"});
			});
		} else {
			return res.status(403).json({"message":"not allowed"});
		}
	});
});

router.put("/kokoelmat/:id", function(req, res) {
	let kokoelmaquery = {};
	kokoelmatModel.findById(req.params.id, function(err,item) {
		if(err) {
			return res.status(404).json({"message":"not found"});
		}
		if(!item) {
			return res.status(404).json({"message":"not found"});
		}
		if(req.session.username === item.username) {
			kokoelmaquery = {kokoelma:item.kokoelma,username:req.session.username};
			kokoelmatModel.replaceOne({_id:req.params.id}, {
				kokoelma:req.body.kokoelma,
				username:req.session.username
			}, function(err,item) {
				if(err) {
					return res.status(409).json({"message":err});
				}
				pelitModel.updateMany(kokoelmaquery,{$set: {kokoelma:req.body.kokoelma}}, function (err, result) {
					if (err) {
						console.log("update document error");
					} else {
						console.log("update document success");
						console.log(result);
					}
				})
				return res.status(200).json({"message":"success"});
			});
		} else {
			return res.status(403).json({"message":"not allowed"});
		}
	});
});

router.get("/kategoriat", function(req, res) {
	let username = req.session.username;
	let list = [];
	kategoriatModel.find({"username":username}, {"kategoria":1}, function(err,items) {
		if(err) {
			return res.status(404).json({"message":"not found", "list":[]});
		}
		if(!items) {
			return res.status(404).json({"message":"not found", "list":[]});
		}
		return res.status(200).json(items);
	})
});

router.post("/kategoriat", function(req, res) {
	let item = new kategoriatModel({
		kategoria:req.body.kategoria,
		username:req.session.username
	});
	item.save(function(err,item) {
		if(err) {
			return res.status(409).json({"message":"not saved"});
		}
		if(!item) {
			return res.status(409).json({"message":"not saved"});
		}
		return res.status(200).json({"message":"success"});
	});
});

router.delete("/kategoriat/:id", function(req, res) {
	let kategoriaquery = {};
	kategoriatModel.findById(req.params.id, function(err,item) {
		if(err) {
			return res.status(404).json({"message":"not found"});
		}
		if(!item) {
			return res.status(404).json({"message":"not found"});
		}
		if(req.session.username === item.username) {
			kategoriaquery = {kategoriat:item.kategoria,username:req.session.username};
			kategoriatModel.deleteOne({"_id":req.params.id}, function(err) {
				if(err) {
					return res.status(404).json({"message":"not found"});
				}
				pelitModel.updateMany(kategoriaquery,{$pull: {kategoriat:item.kategoria}}, function (err, result) {
					if (err) {
						console.log("update document error");
					} else {
						console.log("update document success");
						console.log(result);
					}
				})
				return res.status(200).json({"message":"success"});
			});
		} else {
			return res.status(403).json({"message":"not allowed"});
		}
	});
});

router.put("/kategoriat/:id", function(req, res) {
	let kategoriaquery = {};
	kategoriatModel.findById(req.params.id, function(err,item) {
		if(err) {
			return res.status(404).json({"message":"not found"});
		}
		if(!item) {
			return res.status(404).json({"message":"not found"});
		}
		if(req.session.username === item.username) {
			console.log(req.session.username);
			console.log(item.username);
			kategoriaquery = {kategoriat:item.kategoria,username:req.session.username};
			kategoriatModel.replaceOne({_id:req.params.id}, {
				kategoria:req.body.kategoria,
				username:req.session.username
			}, function(err,item) {
				if(err) {
					return res.status(409).json({"message":err});
				}
				pelitModel.updateMany(kategoriaquery,{$set: {"kategoriat.$":req.body.kategoria}}, function (err, result) {
					if (err) {
						console.log("update document error");
					} else {
						console.log("update document success");
						console.log(result);
					}
				})
				return res.status(200).json({"message":"success"});
			});
		} else {
			return res.status(403).json({"message":"not allowed"});
		}
	});
});

module.exports = router;