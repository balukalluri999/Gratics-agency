var express = require('express');
var router = express.Router();
const Job = require('../models/job');
var User = require('../models/user');

router.get('/:name',(req,res)=>{
    const username = req.params.name;
    User.find({},(err,data)=>{
        res.render('allusers',{username:username,rows:data});   
    })
})
router.get('/r=jobs/:name',(req,res)=>{
    const username = req.params.name;
    Job.find({},(err,data)=>{
        return res.render('alljobs',{username:username,rows:data});
    })
})
router.get('/:name/r=user/:id',(req,res)=>{
    const username = req.params.name;
    const id = req.params.id;
    User.findOneAndDelete({_id:id},(err,data)=>{
        res.redirect('/admin/'+username);
    })
})
router.get('/:name/r=job/:id',(req,res)=>{
    const username = req.params.name;
    const id = req.params.id;
    Job.findOneAndDelete({_id:id},(err,data)=>{
        res.redirect('/admin/r=jobs/'+username);

    })
})


module.exports = router;
