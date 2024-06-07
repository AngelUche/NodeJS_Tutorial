// const data ={
//   employees: require("../model/employee.json"),
//   setEmployees: function(data){ this.employees=data }
// }

const Employee = require('../model/Employee')

const getAllEmployees= async  (req, res)=>{
  const employee = await Employee.find()
  if(!employee) return res.status(204).json({'message':'No employee found'})
  res.json({employee})
}

// creating a new employee
const createEmployee = async (req, res) => {
  // check for errors
  if (!req.body.firstName || !req.body.lastName) {
    return res.status(400).json({ "message": `first and last Name required` });
  }
  // creating new employee in try and ctach block
  try {
    const result = await Employee.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName
    });
    res.status(201).json({result});

  } catch (error) {
    console.log(error.message);
  }

}

const updateEmployee = async (req, res) => {
   // Find the employee to update
   if(!req?.body.id){
    return res.status(404).json({'message':'iD paramter is required '})
   }
  const employee = await Employee.findOne({ _id:req.body.id}).exec();
  // If employee not found, return 404
  if (!employee) {
    return res.status(204).json({ "message": `No employee matches the ID ${req.body.id}` });
  }
  // Update the employee's properties if provided in the request body
  if (req?.body.firstName) employee.firstName = req.body.firstName;
  if (req.body.lastName) employee.lastName = req.body.lastName;
  const result = await employee.save()
  res.json(result);
}


// deleting an employee
const deleteEmployees =async (req, res)=>{
   // Find the employee to update
   if(!req?.body.id) return res.status(404).json({'message':'iD paramter is required '})
 const employee = await Employee.findOne({ _id:req.body.id}).exec();
  // If employee not found, return 404
  if (!employee) return res.status(204).json({ "message": `No employee matches the ID ${req.body.id}` });
 const result = await employee.deleteOne({_id: req.body.id});
 res.json({result})
}

// geting an employee
const getEmployee=async (req, res)=>{
  if(!req?.params.id) return res.status(404).json({'message':'iD paramter is required '})

    const employee = await Employee.findOne({ _id:req.params.id}).exec();
  // If employee not found, return 404
  if (!employee) return res.status(204).json({ "message": `No employee matches the ID ${req.params.id}` });
  res.json({employee})
}


const deleteEmployeeWithId =(req, res)=>{
  res.json({
    "id":req.params.id
  })
}
module.exports ={getAllEmployees, updateEmployee, createEmployee, deleteEmployees, getEmployee, deleteEmployeeWithId}