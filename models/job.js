const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const proposal = require('./proposal');

const jobDetails  = new Schema({
    Owner:{type:String},
    JobName: {type: String},
    Price:{type:Number},
    Email:{type:String},
    Category:{type:String},
    Experience:{type:String},
    Jobtype:{type:String},
    Skills: [{type: String}],
    Discription: {type: String},
    country:{type: String},
    Proposals:[{type:Object,ref:proposal}]
},{ timestamp: true})

const Job = mongoose.model('jobdetails',jobDetails);
module.exports = Job;
