import { db } from "../config/dbConfig.js";
import { execQuery } from "../utils/dbUtil.js";


//*********************************** Register model ****************************************************************************/
// register model for the user registration
export const registerMdl = function (signupdata, callback) {
  // The function arguments Signupdata is passed for req.body stored in the signupdata variable in controller here passed as signupdata
  var QRY_TO_EXEC = `INSERT INTO infrausers (UserEmail,UserMobileNumber,FullName,RoleId,Password,UpdatedBy ) 
   values("${signupdata.userEmail}","${signupdata.userMobileNumber}","${signupdata.fullName}",
  "${signupdata.roleId}","${signupdata.userPassword}","${signupdata.updatedBy}");`
  console.log("QRY_TO_EXEC", QRY_TO_EXEC)
  if (callback && typeof callback == "function")
      execQuery(
          db,
          QRY_TO_EXEC,
          function (err, results) {
              callback(err, results);
              console.log()
              return;
          }
      );
  else return execQuery(db, QRY_TO_EXEC);
  console.log("==========>", QRY_TO_EXEC)
};




// This function is implemented to check wheather the Email and mobile number is already registerd or not
export const UserSignupchk = function (userEmail,userMobileNumber, callback) {
    var QRY_TO_EXEC = `select * from infrausers where 	UserEmail = '${userEmail}' or UserMobileNumber='${userMobileNumber}'; `
    // query to implement to check the email/mobile is registerd or not
    console.log(QRY_TO_EXEC);
    if (callback && typeof callback == "function")
     execQuery(
        db,
        QRY_TO_EXEC,
       
        function (err, results) {
          callback(err, results);
          return;
        }
      );
    else return execQuery(db, QRY_TO_EXEC);
  };


//*********************************** Login *********************************************************************************************/
export const loginMdl = function (signupdata, callback) {
    var QRY_TO_EXEC =  `SELECT *
    FROM infrauserroles
    INNER JOIN infrausers ON infrauserroles.AutoRoleId=infrausers.RoleId  where infrausers.UserEmail = "${signupdata.userEmail}" or 
    infrausers.UserMobileNumber="${signupdata.userEmail}"`
    console.log("QRY_TO_EXEC", QRY_TO_EXEC)
    if (callback && typeof callback == "function")
        execQuery(
            db,
            QRY_TO_EXEC,
            function (err, results) {
                callback(err, results);
                console.log()
                return;
            }
        );
    else return execQuery(db, QRY_TO_EXEC);
    console.log("==========>", QRY_TO_EXEC)
    
};



export const checkUserforRegister = function (signupdata, callback) {
    var QRY_TO_EXEC = `SELECT * FROM infrausers WHERE UserEmail="${signupdata.userEmail}" or UserMobileNumber="${signupdata.userMobileNumber}";`
    console.log(QRY_TO_EXEC);
    if (callback && typeof callback == "function")
        execQuery(
            db,
            QRY_TO_EXEC,
            function (err, results) {
                callback(err, results);
                return;
            }
        );
    else return execQuery(db, QRY_TO_EXEC);
};








export const checkUser = function (signupdata, callback) {
    var QRY_TO_EXEC = `select * from infrausers where AutoUserId = ${signupdata.userId}`
    console.log(QRY_TO_EXEC);
    if (callback && typeof callback == "function")
        execQuery(
            db,
            QRY_TO_EXEC,
            function (err, results) {
                callback(err, results);
                return;
            }
        );
    else return execQuery(db, QRY_TO_EXEC);
};




export const updatePassword = function (signupdata, callback) {
    var QRY_TO_EXEC =     `update infrausers set Password="${signupdata.newPassword}" where AutoUserId=${signupdata.userId}`
    console.log(QRY_TO_EXEC);
    if (callback && typeof callback == "function")
        execQuery(
            db,
            QRY_TO_EXEC,
            function (err, results) {
                callback(err, results);
                return;
            }
        );
    else return execQuery(db, QRY_TO_EXEC);
};





//****************************************************PHASE 2***************************************************************/
// Get Users
// APrrove Users
// Decline Users


//***********************************************Get Users for Approvals *********************************************/


export const getUserApproveMdl = function ( callback) {
    
  var QRY_TO_EXEC = `SELECT *
  FROM infrauserroles
  INNER JOIN infrausers ON infrauserroles.AutoRoleId=infrausers.RoleId  and Status = 'Pending' ORDER BY infrausers.UpdatedTimeStamp DESC;`
 console.log(QRY_TO_EXEC)
  if (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  else return execQuery(db, QRY_TO_EXEC);
};

////**************************************************Approve Users By Admin****************************************************************** */

  export const approveUsersByAdminMdl = function (data, callback) {
    console.log("data", data)
    var QRY_TO_EXEC = `UPDATE infrausers SET Status = "${data.status}" , ProjectId ="${data.projectId}", 
    SubProjectId="${data.subProjectId}" WHERE AutoUserId = "${data.userId}";`
    console.log("data", data)
    if (callback && typeof callback == "function")
      execQuery(
        db,
        QRY_TO_EXEC,
        function (err, results) {
          callback(err, results);
          return;
        }
      );
    else return execQuery(db, QRY_TO_EXEC);
  };

//**************************************************Decline Users By Admin***************************************************************//

export const declineUsersByAdminMdl = function (data, callback) {
  console.log("data", data)
  var QRY_TO_EXEC = `UPDATE infrausers SET Status = "${data.status}" WHERE AutoUserId = "${data.userId}";`
  console.log("data", data)
  if (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  else return execQuery(db, QRY_TO_EXEC);
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const userMatrixchk = function (data, callback) {
  var QRY_TO_EXEC = `SELECT screen_name FROM infra_user_matrix, infrausers where infrausers.UserEmail ='${data.userEmail}'  and  privilage = 'TRUE'
  and infrausers.RoleId = infra_user_matrix.r_id; `
  // query to implement to check the email/mobile is registerd or not
  console.log(QRY_TO_EXEC);
  if (callback && typeof callback == "function")
   execQuery(
      db,
      QRY_TO_EXEC,
     
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  else return execQuery(db, QRY_TO_EXEC);
};



// export const checkmail = function (data, callback) {
//   var QRY_TO_EXEC = `SELECT * FROM infrausers where UserEmail ='${data.to}'`
//   // console.log(QRY_TO_EXEC);
//   if (callback && typeof callback == "function")
//       execQuery(
//           db,
//           QRY_TO_EXEC,
//           function (err, results) {
//               callback(err, results);
//               return;
//           }
//       );
//   else return execQuery(db, QRY_TO_EXEC);
// };




// export const updateOTP = function (data,otp, callback) {
//   // console.log("data", otp)
//   console.log("textttttttttttttttttttttttttttttttt", otp)
//   var QRY_TO_EXEC = `UPDATE infrausers SET otp = "${otp}" where UserEmail = "${data.to}";`
//   console.log("data", data)
//   if (callback && typeof callback == "function")
//     execQuery(
//       db,
//       QRY_TO_EXEC,
//       function (err, results) {
//         callback(err, results);
//         return;
//       }
//     );
//   else return execQuery(db, QRY_TO_EXEC);
// };






// export const verifyOtp = function (data, callback) {
//   var QRY_TO_EXEC = `select otp from infrausers where UserEmail ="${data.userEmail}";  `
//   // console.log(QRY_TO_EXEC);
//   if (callback && typeof callback == "function")
//       execQuery(
//           db,
//           QRY_TO_EXEC,
//           function (err, results) {
//               callback(err, results);
//               return;
//           }
//       );
//   else return execQuery(db, QRY_TO_EXEC);
// };



// export const resetPasswordMdl = function (data, callback) {
//   // console.log("data", otp)
//   // console.log("textttttttttttttttttttttttttttttttt", otp)
//   var QRY_TO_EXEC = `UPDATE infrausers SET Password = "${data.password}" where otp = "${data.otp}";`
//   console.log("data", data)
//   if (callback && typeof callback == "function")
//     execQuery(
//       db,
//       QRY_TO_EXEC,
//       function (err, results) {
//         callback(err, results);
//         return;
//       }
//     );
//   else return execQuery(db, QRY_TO_EXEC);
// };