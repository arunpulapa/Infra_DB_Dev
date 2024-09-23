import express from "express";

import {
    registerCntrl,
    LoginAppCtrl,
    changePasswordCntrl,
    getUsersApproveCntrl,
    approveUsersByAdminCntrl,
    declineUsersByAdminCntrl,
   // sendemailCtrl,
    //aresetPasswordCntrl

} from "../controllers/authenticationController.js";

import Jwt from 'jsonwebtoken';
const {jwt}=Jwt;

function verifyToken(req, res, next) {
    console.log("verify token",req.headers.authorization)
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    console.log("verify token",token)
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = Jwt.verify(token,process.env.SecretKey)
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
  }

const router = express.Router()


router.post("/register", registerCntrl);
router.post("/login", LoginAppCtrl);
router.put("/changePassword", changePasswordCntrl);


//***********************************************Phase 2 APIS*********************************************************************/
//***************************************************Approve Users By admins******************************************************/
router.post("/approveUsers", approveUsersByAdminCntrl);
router.post("/declineUsers", declineUsersByAdminCntrl);
router.get("/getusers", getUsersApproveCntrl);


// router.post("/sendemail", sendemailCtrl);
// router.post("/resetPassword", resetPasswordCntrl)

export default router;