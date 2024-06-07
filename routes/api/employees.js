const express =require("express")
const router =express.Router()
const {getAllEmployees,getEmployee, deleteEmployees, updateEmployee, createEmployee, deleteEmployeeWithId} = require("../../controllers/employeesController")
const  ROLES_LIST = require('../../config/roles')
const VerifyRoles =require('../../middleWare/verifyRoles')

router.route('/')
  .get(getAllEmployees)
  // to modify data
  .put(VerifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateEmployee)
  // to post new data
  .post(VerifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), createEmployee)
  // deleting an employeeS
  .delete(VerifyRoles(ROLES_LIST.Admin),deleteEmployees);

  // using params to make a request
router.route("/:id")
  .get(getEmployee)
  
  // deleting an employee
  // .delete(deleteEmployeeWithId)

module.exports =router;