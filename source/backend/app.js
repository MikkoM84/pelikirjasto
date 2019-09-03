const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userModel = require("./models/user");
const sessionModel = require("./models/session");
const apiRouter = require("./routes/apirouter");

let app = express();



let ttl_diff = 1000*60*60;
//let ttl_diff = 1000*10;

let port = process.env.PORT || 3001;

mongoose.connect("mongodb://localhost/pelikirjasto").then(
	() => {console.log("Success in connecting Mongodb")},
	error => {console.log("Error in connecting Mongodb: " + error)}
);
	
//user database
//let registeredUsers = [];
//let loggedUsers = [];

//middleware
app.use(bodyParser.json());

createToken = () => {
	let token = "";
	let letters = "abcdefghijABCDEFGHIJ0123456789";
	for(let i=0;i<1024;i++){
		let temp = Math.floor(Math.random()*30);
		token = token + letters[temp];
	}
	return token;
}

isUserLogged = (req,res,next) => {
	let token = req.headers.token;
	if(!token) {
		return res.status(403).json({"message":"forbidden"});
	}
	sessionModel.findOne({"token":token}, function(err,session) {
		if(err) {
			return res.status(403).json({"message":"forbidden"});
		}
		if(!session) {
			return res.status(403).json({"message":"forbidden"});
		}
		let now = new Date().getTime();
		if(now > session.ttl) {
			sessionModel.deleteOne({"_id":session._id}, function(err) {
				return res.status(403).json({"message":"forbidden"});
			});
		} else {
			req.session = {};
			req.session.username = session.username;
			session.ttl = now + ttl_diff;
			session.save(function(err,session) {
				return next();
			});
		}
	})
}

app.use("/api",isUserLogged, apiRouter);

//login api
app.post("/register", function(req,res) {
	if(!req.body) {
		return res.status(422).json({"message":"provide credentials"});
	}
	if(!req.body.username || !req.body.password){
		return res.status(422).json({"message":"provide credentials"});
	}
	if(req.body.username.length < 4 || req.body.password.length < 8){
		return res.status(422).json({"message":"provide credentials"});
	}
		
	let user = new userModel({
		username:req.body.username,
		password:req.body.password
	})
	user.save(function(err,user){
		if(err) {
			console.log("Register failed. Reason: "+err);
			return res.status(422).json({"message":"username already in use"});
		} else {
			console.log("Register success: "+user.username);
			return res.status(200).json({"message":"success"});
		}
	});
});

app.post("/login", function(req,res){
	if(!req.body) {
		return res.status(422).json({"message":"wrong credentials"});
	}
	if(!req.body.username || !req.body.password){
		return res.status(422).json({"message":"wrong credentials"});
	}
	if(req.body.username.length < 4 || req.body.password.length < 8){
		return res.status(422).json({"message":"wrong credentials"});
	}
	userModel.findOne({"username":req.body.username}, function(err,user) {
		if(err) {
			return res.status(422).json({"message":"wrong credentials"});
		}
		if(!user) {
			return res.status(422).json({"message":"wrong credentials"});
		}
		//TODO: crypted and salted passwords
		if(user.password === req.body.password) {
			let token = createToken();
			let ttl = new Date().getTime()+ttl_diff;
			let session = new sessionModel({
				"username":user.username,
				"ttl":ttl,
				"token":token
			});
			session.save(function(err,session) {
				if(err) {
					return res.status(422).json({"message":"wrong credentials"});
				} 
				return res.status(200).json({"token":token});
			});
		} else {
			return res.status(422).json({"message":"wrong credentials"});
		}
	});
});

app.post("/logout", function(req,res) {
	let token = req.headers.token;
	if(token) {
		sessionModel.findOne({"token":token}, function(err,session) {
			if (err) {
				console.log("Find session failed. Still logging out");
			}
			sessionModel.deleteOne({"_id":session._id}, function(err) {
				if(err) {
					console.log("Remove session failed");
				}
			});
		});
	}
	return res.status(200).json({"message":"success"});
})

app.listen(port);

console.log("Running in port "+port);