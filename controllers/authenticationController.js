
import {
  registerMdl,
  loginMdl,
  updatePassword,
  UserSignupchk,
  checkUser,
  getUserApproveMdl,
  approveUsersByAdminMdl,
  declineUsersByAdminMdl,
  userMatrixchk,
  // checkmail,
  // updateOTP,
  // verifyOtp,
  // resetPasswordMdl

} from "../models/authenticationModel.js"

import nodemailer from "nodemailer";
import Jwt from "jsonwebtoken";
import e from "cors";
const { jwt } = Jwt;
// *****************************************User Register*********************************************//
export const registerCntrl = function (req, res) {
  var signupdata = req.body;
  var userEmail = req.body.userEmail;
  var userMobileNumber = req.body.userMobileNumber
  console.log(signupdata);
  UserSignupchk(userEmail, userMobileNumber, function (err, results) {
    try {
      console.log(results.length);
      if (err) {
        res.send({ status: 400, message: "Not able to process the request,  please try again" });
        return;
      }
      if (results.length == 0 || results.length == "") {
        console.log("Not Exists");

        registerMdl(signupdata, function (err, resultss) {
          if (err) {
            res.send({ msg: "failed" });
            return;
          }
          res.send({ status: 200, message: "User registerd successfully".toString() });
        });
      } else {
        console.log("Already");
        res.send({ status: 404, message: "Email/ Mobile number already exists" });
      }
    } catch (err) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });
};

//***********************************************************login****************************************//

export const LoginAppCtrl = function (req, res) {
  var data = req.body;

  userMatrixchk(data, function (err, matrixresults) {
    console.log("matrixxxxxxxxxxxxxxxxxxxx", matrixresults)


    loginMdl(data, function (err, results) {
      try {
        if (err) {
          res.send({ status: 400, message: "Not able to process the request, please try again" });
          return;
        }
        console.log(results.length > 0);
        if (results.length <= 0) {
          res.send({ status: 404, message: "Email/Mobile number not exist" });
        } else if (results.length > 0) {
          const validPass = (
            req.body.Password === results[0].Password
          )



          if (validPass) {
            console.log('Jwttttttttttttttttt', Jwt.sign);
            var secretKey = process.env.SecretKey
            let payload = { subject: req.body.userEmail };
            let token = Jwt.sign(payload, secretKey, { expiresIn: "60s" });
            console.log("token", token)
            if (results[0].Status == "Approved") {
              res.send({
                status: 200, message: "", user: { name: results[0], matrixresults, token: token },
              });
            }
            else if (results[0].Status == "Declined") {
              res.send({
                status: 508, message: "Admin has declined you"
              });
            } else {
              res.send({
                status: 504, message: "User approval pending, please contact your administrator"
              })
            }

          } else {
            res.send({ status: 400, message: "Invalid password" })
          }
        }
      } catch (err) {
        console.log("=======================>", err)
        res.send({ status: 500, message: "Internal server error" })
      }
    });
  })
};




//***************************************************************change password**************************//

export const changePasswordCntrl = function (req, res) {
  var signupdata = req.body;
  checkUser(signupdata, function (err, results) {
    try {
      if (err) {
        res.send({ status: 400, message: "Not able to process the request, at the moment please try again" });
      }
      if (results.length <= 0) {
        res.send({ status: 404, message: "User not exist" });
      }
      else {
        console.log("res", results)
        const validPass = (

          signupdata.oldPassword === results[0].Password
        );
        if (!validPass) {
          res.send({ status: 402, message: "Invalid Password" });
        } else {
          updatePassword(signupdata, function (err, results) {
            if (err) {
              throw err;
            }
            if (results) {
              console.log(results)
              res.send({ status: 200, message: "Password updated successfully" });
            }
          })
        }
      }
    } catch (err) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });

};


//********************************************************Phase 2*************************************************************/
// Get Users
// APrrove Users
// Decline Users

//***********************************************Get Users for Approvals *********************************************/



export const getUsersApproveCntrl = function (req, res) {

  getUserApproveMdl(function (err, results) {
    console.log(results)
    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 400, message: "Not able to process the request,please try again" });
        return;
      }
      res.send({ status: 200, user: results, message: "Success" });
      console.log("resul", results)
    } catch (err) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });
};

//**************************************************Approve Users By Admin******************************************* */
export const approveUsersByAdminCntrl = function (req, res) {
  console.log("approve")
  var user = req.body;
  approveUsersByAdminMdl(user, function (err, results) {
    console.log("results", results)
    if (err) {
      console.log("err", err)
      res.redirect({ status: 400, message: "Not able to process the request, at the moment please try again" });
      return;
    }
    res.send({ status: 200, message: "success" });
  });
};


//***************************************Decline Users By Admin*****************************************************
export const declineUsersByAdminCntrl = function (req, res) {
  console.log("approve")
  var user = req.body;
  declineUsersByAdminMdl(user, function (err, results) {
    console.log("results", results)
    if (err) {
      console.log("err", err)
      res.redirect({ status: 400, message: "Not able to process the request, at the moment please try again" });
      return;
    }
    res.send({ status: 200, message: "success" });
  });
};



// export const sendemailCtrl = function (req, res) {

//   var data = req.body

//   checkmail(data, function (err, results) {
//     // console.log("results", results)
//     if (err) {
//       console.log("err", err)
//       res.redirect({ status: 400, message: "Not able to process the request, at the moment please try again" });
//       return;
//     }
//     // res.send({ status: 200, message: "success" });

//     if (results.length <= 0) {
//       res.send({ status: 600, message: "your not signed up with this mail account" });
//     }
//     // var to = req.body.to
//     // var subject = req.body.subject
//     // var message = req.body.message

//     else {

//       var transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: 'kuntamukkalasrija14@gmail.com',
//           pass: 'rwmoilakglkpgszx'
//         }
//       })

//       function random4DigitNumberNotStartingWithZero() {
//         // I did not include the zero, for the first digit
//         var digits = "123456789".split(''),
//           first = shuffle(digits).pop();
//         // Add "0" to the array
//         digits.push('0');
//         return parseInt(first + shuffle(digits).join('').substring(0, 3), 10);
//       }

//       function shuffle(o) {
//         for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
//         return o;
//       }

//       console.log(random4DigitNumberNotStartingWithZero());
//       const otp = random4DigitNumberNotStartingWithZero()
//       let text = otp.toString();

//       // console.log("ooooooooooooooooooooottttttttttttttpppppppp", text)



//       var mailOptions = {
//         to: data.to,
//         // subject: subject,
//         // text: message

//         subject: "Forget password", // Subject line
//         // html: '<h2 style="color:#ff6600;">Hello People!,  Welcome to Bacancy!</h2>', // plain text body
//         html: text,
//       }


//       transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//           console.log(error)
//         } else {
//           console.log("Email Sent: " + info.response)

//         }


//       })

//       // if (info.length > 0) {
//       //   console.log("came here")
//       console.log("textttttttttttttttttttttttttttttttt", otp)
//       updateOTP(data, otp, function (err, results) {
//         console.log("otpotpotpotpotpotpotpotpotpotpotpotpotp", otp)
//         console.log("results", results)
//         if (err) {
//           console.log("err", err)
//           res.redirect({ status: 400, message: "Not able to process the request, at the moment please try again" });
//           return;
//         }
//         // res.send({ status: 200, message: "success" });
//       });
//     }

//     // }

//     res.send({ status: 200, message: "Success" });
//   });
// };


// export const resetPasswordCntrl = function (req, res) {

//   var data = req.body;
//   console.log("approve", data.otp)
//   verifyOtp(data, function (err, results) {

//     var otpString = JSON.stringify(results);



//     const otpMap = JSON.parse(otpString).map(otp => otp.otp)


//     // var permittedValues = results.map(otp => otp.valu);
//     // var y = parseInt(t)

//     // console.log("oooooooooooooooooo", permittedValues)
//     if (err) {
//       console.log("err", err)
//       res.redirect({ status: 400, message: "Not able to process the request, at the moment please try again" });
//       return;
//     }

//     var y = otpMap == data.otp

//     console.log(y)
//     if (y == true) {
//       resetPasswordMdl(data, function (err, results) {
//         console.log("results", results)
//         if (err) {
//           console.log("err", err)
//           res.redirect({ status: 400, message: "Not able to process the request, at the moment please try again" });
//           return;
//         }

//       });
//       res.send({ status: 200, message: "Your password reset is done" });
//     }

//     else {
//       res.send({ status: 900, message: "Enterd OTP is incorrect" });
//     }



//   });


// };