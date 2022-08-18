var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/',(req,res)=>{
	res.render('index');
})
router.get('/signUp', function (req, res) {
	return res.render('signUp');
});
router.get('/login', function (req, res, next) {
	return res.render('login');
});

router.post('/signUp', function(req, res) {
	const personInfo = req.body;
	// console.log(personInfo.username);

	if(!personInfo.email || !personInfo.username || !personInfo.password || !personInfo.passwordConf){
		res.send();
	} else {
		if (personInfo.password == personInfo.passwordConf) {

			User.findOne({EmailId:personInfo.email},function(err,data){
				if(!data){
					var c;
					User.findOne({},function(err,data){
						const newPerson = new User({
							EmailId:personInfo.email,
							username: personInfo.username,
							Password: personInfo.password,
							PasswordConf: personInfo.passwordConf,
							userType: personInfo.userType
						});

						newPerson.save(function(err, Person){
							if(err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({_id: -1}).limit(1);
					if(data.userType=="user"){
						res.redirect('/home/'+data.username);
					}else {
						console.log("loged in as admin");
						res.redirect('/admin/'+data.username);
					}
					// res.redirect('/home/'+personInfo.username);
				}else{
					res.render('signUp',{error:"Email is already used."});
				}

			});
		}else{
			res.render('signUp',{error:"password is not matched"});
		}
	}
});
router.post('/login', function (req, res, next) {
	// console.log("log");
	const errors=[]
	console.log(req.body);
	User.findOne({username:req.body.username},function(err,data){
		if(data){
			if(data.Password===req.body.password){
				if(data.userType=="user"){
					res.redirect('/home/'+data.username);
				}else {
					console.log("loged in as admin");
					res.redirect('/admin/'+data.username);
				}
			}else{
				console.log("wrong pasword");
				res.render('login',{errors:"Wrong password!"});
			}
		}else{
			console.log("This user name  Is not regestered!");
			res.render('login',{errors:"This user name  Is not regestered!"});
		}
	});
});
module.exports = router;