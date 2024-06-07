const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const employeeSchema = new Schema({

  firstName:{ 
    type:String,
    required:true,

  },
  lastName:{
    type:String,
    required:true,
  },
  age:{
    type:Number,
    required:true,
  }
})

module.exports = mongoose.model('Employee', employeeSchema)