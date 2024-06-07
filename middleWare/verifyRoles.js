const VerifyRoles =(...allowedRoles) => {
  return (req, res, next) => {
    // console.log(req.body);
    if (!req?.roles) return res.sendStatus(401);
    const rolesOfArrays =[...allowedRoles];
    console.log(rolesOfArrays);
    console.log(req.roles);
    const result =req.roles.map(role=>rolesOfArrays.includes(role)).find(val=>val===true);
    if(!result) return res.sendStatus(401);
    next();
  }
}
module.exports = VerifyRoles