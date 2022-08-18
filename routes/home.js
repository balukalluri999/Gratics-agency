var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Job = require('../models/job');
var Proposal = require('../models/proposal');
router.get('/:name/message=/:message', (req, res) => {
    const username = req.params.name;
    const message = req.params.message;
    Job.find({Owner:username},(err,data)=>{
        // Job.find({},(err,alljobs)=>{
            console.log(data);
            res.render('home', {message:message, username: username,Jobs:data });
        // })
        // console.log(data);
       
    })
    // res.render('home', { username: username });
})
router.get('/:name', (req, res) => {
    const username = req.params.name;
    Job.find({Owner:username},(err,data)=>{
        // Job.find({},(err,alljobs)=>{
            res.render('home', { username: username,Jobs:data });
        // })
        // console.log(data);
       
    })
    // res.render('home', { username: username });
})

router.get('/addJob/:name', (req, res) => {
    const username = req.params.name;
    res.render('addJob', { username: username });
})
router.get('/message/:name', (req, res) => {
    const username = req.params.name;
    res.render('notification', { username: username });
})

router.get('/cv/:name', (req, res) => {
    const username = req.params.name;
    res.render('cv', { username: username });
})
router.post('/addJob/:name', (req, res) => {
    const username = req.params.name;
    const JobInfo = req.body;
    // console.log(JobInfo);

    const newJob = new Job({
        Owner: username,
        JobName: JobInfo.Jobname,
        Price: JobInfo.Price,
        Email: JobInfo.email,
        Experience: JobInfo.Experience,
        Category: JobInfo.category,
        Skills: JobInfo.skills.split(','),
        Discription: JobInfo.discription,
        country: JobInfo.country,
    });
    // console.log(newJob.Skills);
    newJob.save((err) => {
        if (err) console.log(err);
        else {
            console.log('Job details added to database');
            res.redirect('/home/' + username);
        }
    });
    // res.render('jobdiscription',{jobname:newJob.JobName,discription:newJob.Discription,skills:newJob.Skills,country:newJob.country,proposal:newJob.Proposals});
})
router.get('/jobDetails/searchid=/:id/:name', (req, res) => {
    const id = req.params.id;
    const username = req.params.name;
    Job.findOne({ _id: id }, (err, data) => {
        if (data) {
            res.render('jobdiscription', { Job: data, username });
            // res.render('jobdiscription',{jobname:data.JobName,discription:data.Discription,skills:data.Skills,country:data.country,proposal:data.Proposals});
        }
        else {
            console.log("error in rendering page");
        }
    })
})
/////for search bar/////
router.get('/jobDetails/searchname=/:name/:user', (req, res) => {
    const name = req.params.name;
    const user = req.params.user;

    // const name = "Website creation";jobname:data.JobName,discription:data.Discription,skills:data.Skills,country:data.country,proposal:data.Proposals
    Job.findOne({ JobName: name }, (err, data) => {
        if (data) {
            res.render('jobdiscription', { Job: data, username: user });
        }
        else {
            console.log("error in rendering page");
        }
    })
})

router.get('/search/:name', (req, res) => {
    const username = req.params.name;
    Job.find({}, (err, data) => {
        if (data) {
            res.render('search', { output: data, username: username });
        }
        else {
            res.render('search', { error: "No data available in data Base", username: username });
            console.log(err);
        }
    })

    // res.render('search',{output:data,username:username});
})

function searchByskill(skill) {
    Job.find({ Skills: skill }, (err, data) => {
        // console.log(data);
        return data;
    })
}

// router.post('/search/:name/skill=/:skill',(req,res)=>{
//     const username = req.params.name;
//     const skill = req.params.skill;
//     const forminfo = req.body ;

//     res.render('search',{output:searchByskill(skill),username:username});

//     const regex = new RegExp(forminfo.search, 'i') 
//     Job.find({ $or: [ {JobName: {$regex: regex}}, {Category:forminfo.category},{Experience:forminfo.experience},{Jobtype:forminfo.jobType}] } ,       
//         (err,data)=>{
//         console.log(data);
//         if(data){

//         }
//         else{
//             res.render('search',{username:username});
//             console.log(err);
//         }
//     })

//     res.render('search',{output:data,username:username});
// })

router.post('/search/:name/byValue', (req, res) => {
    const username = req.params.name;
    const forminfo = req.body;

    const regex = new RegExp(forminfo.search, 'i')
    Job.find({ JobName: { $regex: regex } },
        (err, data) => {
            console.log(data);
            if (data) {
                res.render('search', { output: data, username: username });
            }
            else {
                res.render('search', { username: username });
                console.log(err);
            }
        })

    // res.render('search',{output:data,username:username});
})

router.post('/proposal/:name/:id', (req, res) => {
    const info = req.body;
    const username = req.params.name;
    const jobid = req.params.id;
    Job.findOne({ _id: jobid }, (err, data) => {
        if (username == data.Owner) {
            // res.render('jobdiscription',{})
            res.render('jobdiscription', { errors: "You are the owner of this project!!", Job: data, username: data.Owner });

        }
        else {
            User.findOne({username:username},(err,userdata)=>{
                if(err) console.log(err.message);
                else{
                    const newproposal = new Proposal({
                        madeby: username,
                        amount: info.amount,
                        discribe: info.discribe,
                        days: info.days,
                        email:userdata.EmailId
                    });
        
                    newproposal.save(err => {
                        if (err) console.log(err);
                        else {
                            const newid = newproposal._id;
                            // res.render('home', { message: "You have made a proposal to '" + data.JobName + "'", username: username });
                            
                            Proposal.findOne({_id:newid},(err,data)=>{
                                Job.updateOne({ _id: jobid},{$push:{Proposals:data}},(err,output)=>{
                                    if(err) console.log(err);
                                    else {
                                        // console.log(output);
                                    }
                                })
                            })
                            console.log(data.JobName);                   
                        }
                    })
                }
            })
            const message = "You have made a proposal to '" + data.JobName + "'";
                                        res.redirect('/home/'+username+'/message=/'+message);
            

        }


    })
})




module.exports = router;
