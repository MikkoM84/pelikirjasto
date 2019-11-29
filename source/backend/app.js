const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userModel = require("./models/user");
const apiRouter = require("./routes/apirouter");
const bcrypt = require("bcrypt");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const session = require("express-session");
const mongoStore = require("connect-mongo")(session);

let config = require('./config');

let app = express();

let ttl_diff = 1000*60*60;

let port = process.env.PORT || 3001;

mongoose.connect("mongodb+srv://"+config.mongouser+":"+config.mongopassword+"@"+
		config.mongoaddress+config.mongoDB+config.options, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(
	() => {console.log("Success in connecting Mongodb")},
	error => {console.log("Error in connecting Mongodb: " + error)}
);
	
//app.use(express.static(__dirname+"/public"));

//SESSION MANAGEMENT
app.use(session({
	name:"gamelibrary-id",
	resave:false,
	secret:"myBestSecret",
	saveUninitialized:false,
	cookie:{maxAge:ttl_diff},
	store: new mongoStore({
			collection:"session",
			mongooseConnection:mongoose.connection,
			ttl:3600
	})
}));

// PASSPORT MANAGEMENT

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user,done){
	console.log("serialize user:"+JSON.stringify(user));
	done(null,user._id);
});

passport.deserializeUser(function(_id,done) {
	console.log("deserialize user:"+_id);
	userModel.findById(_id,function(err,user) {
		if(err) {
			return done(err);
		}
		if(!user) {
			return done(null,false);
		}
		return done(null,user);
	});
});

passport.use("local-login", new localStrategy({
	usernameField:"username",
	passwordField:"password",
	passReqToCallback:true
}, function(req,username,password,done) {
	if(!username || !password) {
		return done(null,false,{"message":"wrong credentials"});		
	}
	if(username.length < 4 || password.length < 8) {
		return done(null,false,{"message":"wrong credentials"});		
	}
	userModel.findOne({"username":username}, function(err,user) {
		if(err) {
			return done(err);
		}
		if(!user) {
			return done(null,false,{"message":"wrong credentials"});			
		}
		if(bcrypt.compareSync(password, user.password)) {
			let token = createToken();
			req.session.token = token;
			req.session.username = user.username;
			return done(null,user);			
		} else {
			return done(null,false,{"message":"wrong credentials"});			
		}
		
	});	
}))

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
	if(req.isAuthenticated()) {
		if(token === req.session.token) {
			return next();
		}
	}
	return res.status(403).json({"message":"forbidden"});
}

app.use("/api",isUserLogged, apiRouter);

//login api

app.post("/register", function(req,res) {
	if(!req.body) {
		return res.status(422).json({"message":"provide credentials"});
	}
	if(!req.body.username || !req.body.password) {
		return res.status(422).json({"message":"provide credentials"});		
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(422).json({"message":"provide credentials"});		
	}
	bcrypt.hash(req.body.password,10,function(err,hash) {
		if(err) {
			return res.status(422).json({"message":"failed to hash password"})
		}
		let user = new userModel({
			username:req.body.username,
			password:hash
		})
		user.save(function(err,user) {
			if(err) {
				console.log("Register failed. Reason:"+err);
				return res.status(422).json({"message":"Käyttätunnus on jo käytössä."})
			} else {
				console.log("Register success:"+user.username);
				return res.status(200).json({"message":"Tunnus rekisteröity."});
			}
		});
	});
});

app.post("/login", function(req,res,next) {
 passport.authenticate("local-login", function(err,user,info) {
	if(err || !user) {
		return res.status(422).json({message:"Väärä käyttäjätunnus tai salasana!"})
	}
	req.login(user, function(err) {
		if(err) {
			return res.status(422).json({message:"Väärä käyttäjätunnus tai salasana!"})			
		}
		return res.status(200).json({message:"success",token:req.session.token});
	});

	})(req,res,next);
});

app.post("/logout", function(req,res) {
	req.logout();
	if(req.session) {
		req.session.destroy();
	}
	return res.status(200).json({"message":"success"})

})

app.listen(port);

console.log("Running in port "+port);