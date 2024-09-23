import { db } from "../config/dbConfig.js";
import { execQuery } from "../utils/dbUtil.js";
import fs from "fs"
import path from "path";
import moment from "moment"
// const  promisify  from ("util");
import { promisify } from "util";

//*********************************** Get Users **************************************************/



export const getUserMdl = function (callback) {

  var QRY_TO_EXEC = `SELECT AutoRoleId, RoleName FROM infrauserroles order by RoleName asc;`;
  try {
    (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  } catch (error) {
    execQuery(db, QRY_TO_EXEC);
    console.log()
  }
};

//*********************************** Material Category **************************************************/

export const getMaterialMdl = function (callback) {

  var QRY_TO_EXEC = `select distinct MaterialCategory FROM  inframaterials order by MaterialCategory asc`;
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
//*********************************** Vendors **************************************************/


export const getVendors = function (callback) {

  var QRY_TO_EXEC = `select AutoVendorId, VendorName from infravendors order by VendorName asc`;
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


//*********************************** Metrics **************************************************/


export const getMetricsMdl = function (callback) {

  var QRY_TO_EXEC = `SELECT DISTINCT Metrics FROM inframaterials order by Metrics asc`;
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
//*********************************** Project **************************************************/


export const getProjectMdl = function (callback) {

  var QRY_TO_EXEC = `select AutoProjectId,ProjectName from infraprojects order by ProjectName asc `;
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
//*********************************** Sub Project **************************************************/


export const getSubProjectMdl = function (data, callback) {
  console.log("data", data)
  var QRY_TO_EXEC = `SELECT AutoSubProjectId,SubProjectName, AutoProjectId FROM infrasubprojects WHERE AutoProjectId='${data.AutoProjectId}' order by SubProjectName asc `;
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



//*********************************** Sub Category **************************************************/


export const getSubCategoryMdl = function (data, callback) {
  console.log("data", data)
  var QRY_TO_EXEC = `select AutoMaterialId, MaterialSubCategory FROM inframaterials where inframaterials.MaterialCategory = "${data.materialCategory}" order by MaterialSubCategory asc`
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
//*********************************** Receipt List  By Project **************************************************/

export const receiptListByProjectMdl = function (data, callback) {
  // console.log("data", data)
 


  var QRY_TO_EXEC = `SELECT * FROM materialreceiptslist where ProjectName = "${data.ProjectName}" and UpdatedTimeStamp>now() - interval 1 month order by UpdatedTimeStamp desc;`

  // console.log("data", data)
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

//*********************************** Issue List By Project **************************************************/


export const issueListByProjectMdl = function (data, callback) {
  console.log("data", data)
  var QRY_TO_EXEC = `SELECT * FROM materialissuelist where ProjectName = "${data.ProjectName}" and UpdatedTimeStamp>now() - interval 1 month order by UpdatedTimeStamp desc;`
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



export const issueListByProjectMdlforPDF = function (v, callback) {
  // console.log("data", data)
  var QRY_TO_EXEC = `SELECT * FROM materialissuelist  WHERE ProjectName  = "${v.ProjectName}" ORDER BY UpdatedTimeStamp DESC;`
  // console.log("data", data)
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


// ******************************* Material Receipt**************************************************************
export const postMaterialReceiptMdl = function (data, callback) {
  // console.log("data", data)
  console.log("callback", callback)

  var d = String(data.dateReceived);
  var str = String(d.substring(0, d.length - 14));
  console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy", str);
  var QRY_TO_EXEC = `INSERT INTO inframaterialsreceipts
    (MaterialId, PurchaseOrderId1, UserId,ProjectId,
 SubProjectId,  Quantity,    VendorId,  Metrics,  DateReceived,  VoucherDate,  
 InvoiceNo,  VehicleNo,  Location,   InvoiceImg,  ReceivedBy, Notes,  UpdatedBy)
 values("${data.materialId}","${data.PurchaseOrderId}","${data.userId}","${data.projectId}",
      "${data.subProjectId}","${data.quantity}","${data.vendorId}","${data.metrics}",
      "${str}", "${str}", "${data.invoiceNo}", "${data.vehicleNo}", "${data.location}", "${data.InvoiceImg}", 
      "${data.receivedBy}", "${data.notes}", "${data.updatedBy}")`;
  console.log("QQQQQQQQQQQQ", QRY_TO_EXEC);
  if (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  else return execQuery(db, QRY_TO_EXEC)

}


//**************************Approve Material Receipt By Admin********************************************/

export const approveMaterialReceiptByAdminMdl = function (data, callback) {
  console.log("data", data)
  var QRY_TO_EXEC = `UPDATE inframaterialsreceipts SET Status1 = "${data.status}" WHERE AutoMaterialReceiptId = "${data.materialReceiptId}";`
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


// ****************************Issue Material*************************************************


export const postIssueMdl = function (data, callback) {
  console.log("data", data)
  console.log("callback", callback)
  var d = String(data.issuedDate);
  var str = String(d.substring(0, d.length - 14));
  console.log("swdgve'l.", str)
  var QRY_TO_EXEC = `INSERT INTO inframaterialsissue
    (MaterialIssueId, MaterialId, UserId, ProjectId, SubProjectId, Quantity,  IssuedDate,IssuedLocation, InvoiceImg, 
         DeliverLocation, IssueVehicleNo,  ReceivedBy, Metrics, Notes,UpdatedBy)
      values("${data.materialIssueId}","${data.materialId}","${data.userId}","${data.projectId}","${data.subProjectId}","${data.quantity}",
      "${str}","${data.issuedLocation}", "${data.InvoiceImg}","${data.deliverLocation}","${data.issueVehicleNo}","${data.receivedBy}",
      "${data.metrics}", "${data.notes}", "${data.updatedBy}")`;
  console.log("QQQQQQQQQQQQ", QRY_TO_EXEC);
  if (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  else
    return execQuery(db, QRY_TO_EXEC)

}


///****************************************************************Stock************************************************************************ */

export const stock = function (data, callback) {
  console.log("data", data)
  console.log("callback", callback)
  var QRY_TO_EXEC = `SELECT * FROM materialstock where MaterialId in (${data.materialId}) and ProjectId = ${data.projectId}`;
  console.log("QQQQQQQQQQQQ", QRY_TO_EXEC);
  if (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  else
    return execQuery(db, QRY_TO_EXEC)

}




//*********************************** Post and Update Project for settings module  ****************************************************************//

export const postandGetUpdateProjectMdl = function (data, callback) {
  console.log("data", data)
  console.log("callback", callback)

  var QRY_TO_EXEC = ` SELECT infraprojects.AutoProjectId, infraprojects.ProjectName, infrasubprojects.AutoSubProjectId, infrasubprojects.SubProjectName
  FROM infraprojects
  INNER JOIN infrasubprojects ON infraprojects.AutoProjectId = infrasubprojects.AutoProjectId where infraprojects.AutoProjectId = (SELECT ProjectId from infrausers where AutoUserId ="${data.userId}") AND 
  infrasubprojects.AutoSubProjectId = (SELECT SubProjectId from infrausers where AutoUserId ="${data.userId}");`;
  console.log("QQQQQQQQQQQQ", QRY_TO_EXEC);
  if (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  else
    return execQuery(db, QRY_TO_EXEC)

}

//************************************************************** Update Project ********************************************************//
export const updateProjectMdl = function (data, callback) {
  console.log("data", data)
  console.log("callback", callback)
  var QRY_TO_EXEC = `UPDATE infrausers SET ProjectId ="${data.projectId}" , SubProjectId ="${data.SubProjectId}"  WHERE AutoUserId ="${data.userId}"`;
  console.log("QQQQQQQQQQQQ", QRY_TO_EXEC);
  if (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  else
    return execQuery(db, QRY_TO_EXEC)

}

//****************************************************Phase 2*******************************************************************/

//*******************************************Approvals Of Materials Release 2************************************************

// Get Pending Receipt Materail
// Get Pending Issue Materail


//**************************************************Get Pending Material Receipts**************************************************/
export const getPendingReceiptMaterialMdl = function (data, callback) {

  var QRY_TO_EXEC = `SELECT * FROM materialreceiptslist  WHERE ProjectName  ="${data.ProjectName}" and status = 'Pending' ORDER BY UpdatedTimeStamp DESC ;`

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
//**************************************************Get Pending Material Issue**************************************************/

export const getPendingIssueMaterialMdl = function (data, callback) {

  var QRY_TO_EXEC = `SELECT * FROM materialissuelist  WHERE ProjectName  ="${data.ProjectName}" and status = 'Pending' ORDER BY UpdatedTimeStamp DESC ;`

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


//******************************************** Material Receipt Approve By Admin****************************************************/
export const materialReceiptApproveMdl = function (user, callback) {
  var QRY_TO_EXEC = `UPDATE inframaterialsreceipts SET Status = "${user.status}" WHERE AutoMaterialReceiptId = "${user.materialReceiptId}" ORDER BY UpdatedTimeStamp DESC;`
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
}

//************************************************************/

export const materialIssueApproveMdl = function (user, callback) {
  var QRY_TO_EXEC = `UPDATE   inframaterialsissue  SET Status = "${user.status}"
   WHERE AutoMaterialIssueId = "${user.issueReceiptId}" ORDER BY UpdatedTimeStamp DESC;`
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
}

//******************************************Stock Available******************************************/

export const stockMdl = function (stock, callback) {
  // console.log("stock", stock)
  var QRY_TO_EXEC = `select ProjectName, MaterialName, Metrics,stock FROM materialstock WHERE ProjectId= ${stock.projectId};`
  console.log("materialID", stock.materialId)
  console.log(QRY_TO_EXEC)
  if (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC,
      function (err, results) {
        // console.log("results",results)
        callback(err, results);
        return;
      }
    );
  else return execQuery(db, QRY_TO_EXEC);
}

///****************************************Material Sub Category**************************************************///

export const getMaterialSubCategoryMdl = function (callback) {

  var QRY_TO_EXEC = `SELECT MaterialSubCategory, AutoMaterialId FROM inframaterials order by MaterialSubCategory asc;`;
  try {
    (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  } catch (error) {
    execQuery(db, QRY_TO_EXEC);
    console.log()
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const getDefaultStockMdl = function (data, callback) {

  var QRY_TO_EXEC = `SELECT * FROM materialstock where ProjectName = "${data.ProjectName}";`
  try {
    (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  } catch (error) {
    execQuery(db, QRY_TO_EXEC);
    console.log()
  }
};

//******************************Get Default 15 Days Records***************************************************//


export const get15DaysReceiptListMdl = function (data, callback) {
  console.log("data", data)
  var QRY_TO_EXEC = `SELECT  * 
  FROM materialreceiptslist
  WHERE  ProjectName  ="${data.ProjectName}" and DATE(UpdatedTimeStamp) >= DATE_FORMAT(CURDATE() - INTERVAL 1 MONTH,'%Y-%m-01') 
  AND DATE(UpdatedTimeStamp) <= DATE_FORMAT( CURRENT_DATE, '%Y/%m/%d' )  order by UpdatedTimeStamp desc;`
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

//***********************************************Material Receipt List On Date Filter*********************************************************************** */
export const materialReceiptListOnDateFilterMdl = function (user, callback) {
  // console.log("user",user)
  // console.log("user.ProjectName", user.ProjectName)
  // console.log("userrrrrrrrrrrrr", user.toDate)

  var QRY_TO_EXEC = `SELECT * FROM materialreceiptslist WHERE ProjectName = "${user.ProjectName}" and (date(UpdatedTimeStamp) BETWEEN  "${user.fromDate}" AND "${user.toDate}")
  AND  materialId IN  (${user.materialId}) order by UpdatedTimeStamp desc;`
  // AND (MaterialId IN (${user.materialId})) AND (Status = 'approve') and (
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
}

//**************************************************15 Days Issue List****************************************************/


export const get15DaysIssueListMdl = function (data, callback) {
  console.log("data", data)
  var QRY_TO_EXEC = `SELECT  * 
  FROM materialissuelist
  WHERE  ProjectName  ="${data.ProjectName}" and DATE(UpdatedTimeStamp) >= DATE_FORMAT(CURDATE() - INTERVAL 1 MONTH,'%Y-%m-01') 
  AND DATE(UpdatedTimeStamp) <= DATE_FORMAT( CURRENT_DATE, '%Y/%m/%d' )  order by UpdatedTimeStamp desc;`
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



//************************************************Material Issue List On Date Filter Mdl************************************** */
export const materialIssueListOnDateFilterMdl = function (user, callback) {
  var QRY_TO_EXEC = `SELECT * FROM materialissuelist WHERE ProjectName = "${user.ProjectName}" AND (date(UpdatedTimeStamp) BETWEEN  "${user.fromDate}" AND "${user.toDate}")
  AND  materialId IN  (${user.materialId}) order by UpdatedTimeStamp desc;`
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
}


//****************************************************Transaction report************************************************8//






export const getTransactionReportMdl = function (data, callback) {
  console.log("data", data)
  var QRY_TO_EXEC = `select * from(select  MaterialId, MaterialCategory, MaterialName,  ProjectName , UpdatedTimeStamp,
  MaterialSubCategory,   SubProjectName, Quantity,   Metrics,'Issue' AS transactiontype from materialissuelist WHERE ProjectName  ="${data.ProjectName}"
      and DATE(UpdatedTimeStamp) >= DATE_FORMAT(CURDATE() - INTERVAL 1 MONTH,'%Y-%m-01') 
  AND DATE(UpdatedTimeStamp) <= DATE_FORMAT( CURRENT_DATE, '%Y/%m/%d' )
  UNION ALL
   select  MaterialId, MaterialCategory,MaterialName, ProjectName , UpdatedTimeStamp, MaterialSubCategory,
   SubProjectName, Quantity, Metrics, 'Receipt' AS transactiontype from materialreceiptslist  where ProjectName  ="${data.ProjectName}"
    and DATE(UpdatedTimeStamp) >= DATE_FORMAT(CURDATE() - INTERVAL 1 MONTH,'%Y-%m-01') 
  AND DATE(UpdatedTimeStamp) <= DATE_FORMAT( CURRENT_DATE, '%Y/%m/%d' )) AS query order by UpdatedTimeStamp desc;`
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

//*********************************************************Transaction report on Date filter*************************************************************** */


export const allTransactionDateFilterMdl = function (data, callback) {

  var QRY_TO_EXEC = `SELECT * FROM (select MaterialId, MaterialCategory,MaterialName, ProjectName , UpdatedTimeStamp, MaterialSubCategory,
    SubProjectName, Quantity, Metrics, 'Issue' AS transactiontype from materialissuelist where ProjectName ="${data.ProjectName}" 
    and MaterialId in (${data.materialId}) and (Date(UpdatedTimeStamp)>="${data.fromDate}" and Date(UpdatedTimeStamp)<= "${data.toDate}")
    UNION ALL
    select MaterialId, MaterialCategory,MaterialName, ProjectName , UpdatedTimeStamp, MaterialSubCategory,
    SubProjectName, Quantity, Metrics, 'Receipt' AS transactiontype from materialreceiptslist where ProjectName ="${data.ProjectName}"
    and MaterialId in (${data.materialId}) and (Date(UpdatedTimeStamp)>="${data.fromDate}" and Date(UpdatedTimeStamp)<= "${data.toDate}") ) AS query
    order by UpdatedTimeStamp desc;`
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
//////////////////////////////////////////////////////////////////////////////////////////////////
export const allTransactionDateFilterMdlforPDF = function (data, callback) {

  var QRY_TO_EXEC = `SELECT * FROM (select MaterialId, MaterialCategory,MaterialName, ProjectName , UpdatedTimeStamp, MaterialSubCategory,
    SubProjectName, Quantity, Metrics, 'Issue' AS transactiontype from materialissuelist where ProjectName ="${data.ProjectName}" 
    and MaterialId in (${data.materialId}) and (Date(UpdatedTimeStamp)>="${data.fromDate}" and Date(UpdatedTimeStamp)<= "${data.toDate}")
    UNION ALL
    select MaterialId, MaterialCategory,MaterialName, ProjectName , UpdatedTimeStamp, MaterialSubCategory,
    SubProjectName, Quantity, Metrics, 'Receipt' AS transactiontype from materialreceiptslist where ProjectName ="${data.ProjectName}"
    and MaterialId in (${data.materialId}) and (Date(UpdatedTimeStamp)>="${data.fromDate}" and Date(UpdatedTimeStamp)<= "${data.toDate}") ) AS query
    order by UpdatedTimeStamp desc;`
  // console.log("data", data)
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const materialReceiptListOnDateFilterMdlAll = function (user, callback) {
  var QRY_TO_EXEC = `SELECT * FROM materialreceiptslist WHERE  (date (UpdatedTimeStamp) BETWEEN  "${user.fromDate}" AND "${user.toDate}")
  AND MaterialId IN (${user.materialId}) AND (status = 'Approved') order by UpdatedTimeStamp desc;`
  console.log("material", user.materialId)
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
}



//****************************************************WORK PROGRESS MODULE**********************************************************/


///////////////////////////////// Equipment Dropdown API////////////////////////////////////////////////////////////////


export const getEquipmentMdl = function (callback) {

  var QRY_TO_EXEC = `select id, equipment_type from infra_equipment_type order by equipment_type asc;`;
  try {
    (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  } catch (error) {
    execQuery(db, QRY_TO_EXEC);
    console.log()
  }
};

///////////////////////////////////////////////////////////////////////////
export const getWorkTypeMdl = function (callback) {

  var QRY_TO_EXEC = `select id, work_type from infra_work_type order by work_type asc;`;
  try {
    (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  } catch (error) {
    execQuery(db, QRY_TO_EXEC);
    console.log()
  }
};

export const workSubTypeMetrics = function (callback) {
  var QRY_TO_EXEC = `select distinct  metrics  from infra_work_sub_type order by metrics asc;`;
  try {
    (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  } catch (error) {
    execQuery(db, QRY_TO_EXEC);
    console.log()
  }
};

export const equipmentMetrics = function (callback) {
  var QRY_TO_EXEC = `select distinct  metrics  from infra_equipment_type order by metrics asc;`
  try {
    (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  } catch (error) {
    execQuery(db, QRY_TO_EXEC);
    console.log()
  }
};

export const getSubWorkMdl = function (data, callback) {
  console.log("data", data)
  var QRY_TO_EXEC = `SELECT AutoSubProjectId, SubProjectId,SubProjectName, AutoProjectId FROM infrasubprojects WHERE AutoProjectId='${data.AutoProjectId}'`;
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




export const getSubWorkTypeMdl = function (data, callback) {
  // console.log("data", data)
  var QRY_TO_EXEC = `SELECT id,work_sub_type, work_type_id FROM infra_work_sub_type WHERE work_type_id="${data.work_type_id}" order by work_sub_type asc ;`
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










// function arrayConvert(json) {

//   var arr = [];
//   var project_id = json["project_id"]
//   var sub_project_id = json["sub_project_id"]
//   var work_type_id = json["work_type_id"]
//   for (var index0 in json
//     ) {
//     console.log("index0", index0)
//     if (index0 == "sub_work_details") {
//       for (var index1 in json["sub_work_details"]) {
//         var sub_work_seq_id = index1;
//         // console.log("sub_work_seq_id", index1)
//         var sub_work_type_id    = json["sub_work_details"][sub_work_seq_id]["sub_work_type_id"]
//         var sub_work_dimesnions = json["sub_work_details"][sub_work_seq_id]["sub_work_dimesnions"]
//         var sub_work_metrics    = json["sub_work_details"][sub_work_seq_id]["sub_work_metrics"]
//         var sub_work_start_date = json["sub_work_details"][sub_work_seq_id]["sub_work_start_date"]
//         var sub_work_end_date   = json["sub_work_details"][sub_work_seq_id]["sub_work_end_date"]
//         var sub_work_details    = json["sub_work_details"][sub_work_seq_id]["Images"]
//         var sub_work_notes      = json["sub_work_details"][sub_work_seq_id]["notes"]
//         var sub_work_Images     = json["sub_work_details"][sub_work_seq_id]["Images"]
//         var sub_work_updated_by = json["sub_work_details"][sub_work_seq_id]["updated_by"]
//         for (var index2 in json["sub_work_details"][index1]) {
//           // console.log("index2",index2)
//           if (index2 == "resources") {
//             // var each_row = [];
//             for (var index3 in json["sub_work_details"][index1][index2]) {
//               // console.log("index3", index3)
//               if (index3 == "Material") {
//                 var resource_type = "Material"

//                 for (var index4 in json["sub_work_details"][index1][index2][index3]) {
//                   var resource_seq_id = index4
//                   // console.log("resource_seq_id", index4)
//                   var resource_name = json["sub_work_details"][index1][index2][index3][index4]["resource_name"]
//                   var Quantity = json["sub_work_details"][index1][index2][index3][index4]["Quantity"]
//                   var resource_measurement = json["sub_work_details"][index1][index2][index3][index4]["resource_measurement"]
//                   var resource_metrics = json["sub_work_details"][index1][index2][index3][index4]["resource_metrics"]
//                   var resource_image = json["sub_work_details"][index1][index2][index3][index4]["resource_image"]
//                   arr.push({
//                     "project_id": project_id, "sub_project_id": sub_project_id, "work_type_id": work_type_id, "sub_work_seq_id": sub_work_seq_id,
//                     "sub_work_type_id": sub_work_type_id,
//                     "sub_work_dimesnions": sub_work_dimesnions,
//                     "sub_work_metrics": sub_work_metrics,
//                     "sub_work_start_date": sub_work_start_date,
//                     "sub_work_end_date": sub_work_end_date,
//                     "work_details": sub_work_details,
//                     "notes": sub_work_notes,
//                     "Images": sub_work_Images,
//                     "updated_by": sub_work_updated_by,
//                     "resource_seq_id": resource_seq_id,
//                     "resource_type": resource_type,
//                     "resource_name": resource_name,
//                     "Quantity": Quantity,
//                     "resource_measurement": resource_measurement,
//                     "resource_metrics": resource_metrics,
//                     "resource_image": resource_image
//                   })
//                 }
//               }
//               if (index3 == "Equipment") {
//                 var resource_type = "Equipment"
//                 for (var index6 in json["sub_work_details"][index1][index2][index3]) {
//                   // console.log("resource_seq_id", index6)
//                   var resource_seq_id = index4
//                   // console.log("resource_seq_id", index4)
//                   var resource_name = json["sub_work_details"][index1][index2][index3][index6]["resource_name"]
//                   var Quantity = json["sub_work_details"][index1][index2][index3][index6]["Quantity"]
//                   var resource_measurement = json["sub_work_details"][index1][index2][index3][index6]["resource_measurement"]
//                   var resource_metrics = json["sub_work_details"][index1][index2][index3][index6]["resource_metrics"]
//                   var resource_image = json["sub_work_details"][index1][index2][index3][index6]["resource_image"]
//                   arr.push({
//                     "project_id": project_id, 
//                     "sub_project_id": sub_project_id, 
//                     "work_type_id": work_type_id, 
//                     "sub_work_seq_id": sub_work_seq_id,
//                     "sub_work_type_id": sub_work_type_id,
//                     "sub_work_dimesnions": sub_work_dimesnions,
//                     "sub_work_metrics": sub_work_metrics,
//                     "sub_work_start_date": sub_work_start_date,
//                     "sub_work_end_date": sub_work_end_date,
//                     "work_details": sub_work_details,
//                     "notes": sub_work_notes,
//                     "Images": sub_work_Images,
//                     "updated_by": sub_work_updated_by,
//                     "resource_seq_id": resource_seq_id,
//                     "resource_type": resource_type,
//                     "resource_name": resource_name,
//                     "Quantity": Quantity,
//                     "resource_measurement": resource_measurement,
//                     "resource_metrics": resource_metrics,
//                     "resource_image": resource_image
//                   })
//                 }
//               }

//             }
//           }
//         }

//       }es
//     }
//     // arr.push({ 'key': key, 'val': obj });
//   }
//   return arr;
// }

// export const workProgressMdl = function (data, callback) {
//   var data_op = arrayConvert(data)
//   let arr = [];
//   var datetimestamp = Date.now();
//   var random_number = Math.floor(100000 + Math.random() * 900000);
//   var unicnumber = random_number + "" + datetimestamp;
//   var work_progress_id = unicnumber
//   for (var index in data_op) {

//           var arr1 = [work_progress_id, data_op[index].project_id, data_op[index].sub_project_id, data_op[index].work_type_id,data_op[index].sub_work_seq_id
//             ,data_op[index].sub_work_type_id,data_op[index].sub_work_dimesnions,data_op[index].sub_work_metrics,data_op[index].resource_seq_id,
//             data_op[index].resource_type, data_op[index].resource_name,data_op[index].Quantity,data_op[index].resource_measurment,
//             data_op[index].resource_metrics,data_op[index].sub_work_start_date, data_op[index].sub_work_end_date, data_op[index].work_details,
//             data_op[index].notes, data_op[index].Images, data_op[index].updated_by]

//           arr.push([arr1])

//   }

// console.log("arrarrarrarrarrarrarrarrarrarrarrarrarrarrarrarr", arr)

//   //   var QRY_TO_EXEC = `INSERT INTO infra_work_progress
//   // (work_progress_id,  project_id, sub_project_id, work_type_id, work_sub_type_seq_id, 
//   // work_sub_type_id,  sub_work_dimensions, sub_work_metrics, resource_sequence_id, 
//   //   resource_type,  resource_name, quantity, resource_measurment, resource_metrics,
//   //   sub_work_start_date, sub_work_end_date, sub_work_details, sub_work_notes, sub_work_images, sub_work_updated_by)
//   //   values("${work_progress_id}", ${data.project_id}, ${data.sub_project_id}, ${data.work_type_id},${data.sub_work_seq_id}
//   //   ,${data.sub_work_type_id},"${data.sub_work_dimesnions}","${data.sub_work_metrics}",${data.resource_seq_id},
//   //   "${data.resource_type}", "${data.resource_name}",${data.Quantity},"${data.resource_measurment}",
//   //   "${data.resource_metrics}","${data.sub_work_start_date}","${data.sub_work_end_date}","${data.work_details}",
//   //   "${data.notes}","${data.Images}","${data.updated_by}");`;
//   var QRY_TO_EXEC = `INSERT INTO infra_work_progress
//   (work_progress_id,  project_id, sub_project_id, work_type_id, work_sub_type_seq_id, 
//   work_sub_type_id,  sub_work_dimensions, sub_work_metrics, resource_sequence_id, 
//     resource_type,  resource_name, quantity, resource_measurment, resource_metrics,
//     sub_work_start_date, sub_work_end_date, sub_work_details, sub_work_notes, sub_work_images, sub_work_updated_by)
//     values ? [${arr}]`;
//     console.log("QQQQQQQQQQQQ", QRY_TO_EXEC);
//     if (callback && typeof callback == "function") {
//       execQuery(
//         db,
//         QRY_TO_EXEC,
//         function (err, results) {
//           callback(err, results);
//           return;
//         }
//       );
//     }
//     else {
//       return execQuery(db, QRY_TO_EXEC)
//     }


// }


// export const workProgressMdl1o = function (data, callback) {

//     var QRY_TO_EXEC = `INSERT INTO infra_work_progress
//   (work_progress_id,  project_id, sub_project_id, work_type_id, 
//   work_sub_type_id,  sub_work_dimensions, sub_work_metrics, resource_sequence_id, 
//     resource_type,  resource_name, quantity, resource_measurment, resource_metrics,
//     sub_work_start_date, sub_work_end_date, sub_work_details, sub_work_notes, sub_work_images, sub_work_updated_by)
//     values("${data.work_progress_id}", ${data.project_id}, ${data.sub_project_id}, ${data.work_type_id}
//     ,${data.sub_work_type_id},"${data.sub_work_dimesnions}","${data.sub_work_metrics}",${data.resource_seq_id},
//     "${data.resource_type}", "${data.resource_name}",${data.Quantity},"${data.resource_measurment}",
//     "${data.resource_metrics}","${data.sub_work_start_date}","${data.sub_work_end_date}","${data.work_details}","${data.notes}","${data.Images}","${data.updated_by}");`;
//     console.log("QQQQQQQQQQQQ", QRY_TO_EXEC);
//     if (callback && typeof callback == "function") {
//       execQuery(
//         db,
//         QRY_TO_EXEC,
//         function (err, results) {
//           callback(err, results);
//           return;
//         }
//       );
//     }
//     else {
//       return execQuery(db, QRY_TO_EXEC)
//     }


// }

// export const workProgressMdl = function (data, callback) {

//   // console.log("data_op", data_op)
//   // for (var index in data_op) {
//     // console.log("index==================>", index)
//     var datetimestamp = Date.now();
//     var random_number = Math.floor(100000 + Math.random() * 900000);
//     var unicnumber = random_number + "" + datetimestamp;
//     // var data = data_op[index]
//     var work_progress_id = unicnumber
//     var QRY_TO_EXEC = `INSERT INTO infra_work_progress
//   (work_progress_id,  project_id, sub_project_id, work_type_id, work_sub_type_seq_id, 
//   work_sub_type_id,  sub_work_dimensions, sub_work_metrics, resource_sequence_id, 
//     resource_type,  resource_name, quantity, resource_measurment, resource_metrics,
//     sub_work_start_date, sub_work_end_date, sub_work_details, sub_work_notes, sub_work_images, sub_work_updated_by)
//     values("${work_progress_id}", ${data.project_id}, ${data.sub_project_id}, ${data.work_type_id},${data.sub_work_seq_id}
//     ,${data.sub_work_type_id},"${data.sub_work_dimesnions}","${data.sub_work_metrics}",${data.resource_seq_id},
//     "${data.resource_type}", "${data.resource_name}",${data.Quantity},"${data.resource_measurment}",
//     "${data.resource_metrics}","${data.sub_work_start_date}","${data.sub_work_end_date}","${data.work_details}","${data.notes}","${data.Images}","${data.updated_by}");`;
//     console.log("QQQQQQQQQQQQ", QRY_TO_EXEC);
//     if (callback && typeof callback == "function") {
//       execQuery(
//         db,
//         QRY_TO_EXEC,
//         function (err, results) {
//           callback(err, results);
//           return;
//         }
//       );
//     }
//     else {
//       return execQuery(db, QRY_TO_EXEC)
//     }

//   // }
// }




function convert_arr(json) {
  var datetimestamp = Date.now();
  var random_number = Math.floor(100000 + Math.random() * 900000);
  var unicnumber = random_number + "" + datetimestamp;
  var work_progress_id = unicnumber;
  var project_id = json['project_id'];
  console.log('project_id')
  var sub_project_id = json['sub_project_id'];
  var workType = json['workType'];
  var updatedBy = json['updatedBy'];
  var final_arr = [];
  for (var index in json) {
    if (index == 'worktypes') {
      for (var index1 in json["worktypes"]) {
        var work_sub_type_seq_id = Number(index1) + 1;

        var subWorkType = json["worktypes"][index1]["subWorkType"]

        var dimensions = json["worktypes"][index1]["dimensions"]
        var workType_metrics = json["worktypes"][index1]["workType_metrics"]
        var workType_stDate = json["worktypes"][index1]["workType_stDate"]
        var workType_endDate = json["worktypes"][index1]["workType_endDate"]
        var sub_work_details = json["worktypes"][index1]["sub_work_details"]
        var sub_work_notes = json["worktypes"][index1]["sub_work_notes"]
        var sub_work_images = json["worktypes"][index1]['sub_work_images']
        console.log("sub_work_images", sub_work_images)
        if (json["worktypes"][index1]["equipments"].length > 0) {
          for (var index2 in json["worktypes"][index1]["equipments"]) {
            var arr1 = [];
            var resource_sequence_id = Number(index2) + 1;
            // console.log(json["worktypes"][index1]["equipments"][index2])
            var equipment_type = json["worktypes"][index1]["equipments"][index2]["equipment_type"]
            var equipmentTypeName = json["worktypes"][index1]["equipments"][index2]["equipmentTypeName"]
            var equipment_measurements = json["worktypes"][index1]["equipments"][index2]["equipment_measurements"]
            var equipment_quantity = json["worktypes"][index1]["equipments"][index2]["equipment_quantity"]
            var equipmentType_metrics = json["worktypes"][index1]["equipments"][index2]["equipmentType_metrics"]
            var equipment_image = json["worktypes"][index1]["equipments"][index2]["equipment_image"]
            arr1.push(work_progress_id, project_id, sub_project_id, workType, work_sub_type_seq_id,
              subWorkType, `"${dimensions}"`, `"${workType_metrics}"`, resource_sequence_id,
              `"Equipment"`, equipment_type, `"${equipmentTypeName}"`, equipment_quantity,
              `"${equipment_measurements}"`, `"${equipmentType_metrics}"`, `"${equipment_image}"`,
              `"${workType_stDate}"`, `"${workType_endDate}"`,
              `"${sub_work_details}"`, `"${sub_work_notes}"`, `"${sub_work_images}"`, `"${updatedBy}"`)
            final_arr.push(arr1)
          }
        }
        else {
          var arr1 = [];
          var equipment_type = ``
          var equipmentTypeName = ``
          var equipment_measurements = ``
          var equipment_quantity = ``
          var equipmentType_metrics = ``
          var equipment_image = ``
          arr1.push(work_progress_id, project_id, sub_project_id, workType, work_sub_type_seq_id,
            subWorkType, `"${dimensions}"`, `"${workType_metrics}"`, resource_sequence_id,
            `"Equipment"`, equipment_type, equipmentTypeName, equipment_quantity,
            equipment_measurements, equipmentType_metrics, equipment_image, `"${workType_stDate}"`, `"${workType_endDate}"`,
            `"${sub_work_details}"`, `"${sub_work_notes}"`, `"${sub_work_images}"`, `"${updatedBy}"`)
          final_arr.push(arr1)
        }


        // "materialCategery":"Steel","materialSubCategory":"8","material_quantity":"rehyrt","material_metrics":"Kgs"
        if (json["worktypes"][index1]["materials"].length > 0) {
          for (var index2 in json["worktypes"][index1]["materials"]) {
            var arr2 = [];
            var resource_sequence_id = Number(index2) + 1;
            // console.log(json["worktypes"][index1]["materials"][index2])
            var materialCategery = json["worktypes"][index1]["materials"][index2]["materialCategery"]
            var materialSubCategory = json["worktypes"][index1]["materials"][index2]["materialSubCategory"]
            var material_quantity = json["worktypes"][index1]["materials"][index2]["material_quantity"]
            var material_measurement = "null"
            var material_metrics = json["worktypes"][index1]["materials"][index2]["material_metrics"]
            var material_image = json["worktypes"][index1]["materials"][index2]["material_image"]
            // var equipmentType_metrics = json["worktypes"][index1]["materials"][index2]["equipmentType_metrics"]
            arr2.push(work_progress_id, project_id, sub_project_id, workType,
              work_sub_type_seq_id, subWorkType, `"${dimensions}"`, `"${workType_metrics}"`,
              resource_sequence_id, `"Material"`, materialSubCategory, materialCategery,
              material_quantity, material_measurement, `"${material_metrics}"`, `"${material_image}"`, `"${workType_stDate}"`,
              `"${workType_endDate}"`, `"${sub_work_details}"`, `"${sub_work_notes}"`, `"${sub_work_images}"`,
              `"${updatedBy}"`)
            final_arr.push(arr2)
          }
        }
        else {
          var arr2 = [];
          var materialCategery = ``
          var materialSubCategory = ``
          var material_quantity = ``
          var material_metrics = ``
          var material_image = ``
          var material_measurement = ``
          arr2.push(work_progress_id, project_id, sub_project_id, workType,
            work_sub_type_seq_id, subWorkType, `"${dimensions}"`, `"${workType_metrics}"`,
            resource_sequence_id, `"Material"`, materialSubCategory, `"${materialCategery}"`,
            material_quantity, material_measurement, `"${material_metrics}"`, `"${material_image}"`, `"${workType_stDate}"`,
            `"${workType_endDate}"`, `"${sub_work_details}"`, `"${sub_work_notes}"`, `"${sub_work_images}"`,
            `"${updatedBy}"`)
          final_arr.push(arr2)
        }
      }
    }
  }
  return final_arr
}



export const workProgressMdl = function (data, callback) {
  var data_op = convert_arr(data)
  let arr = [];
  var datetimestamp = Date.now();
  var random_number = Math.floor(100000 + Math.random() * 900000);
  var unicnumber = random_number + "" + datetimestamp;
  var work_progress_id = unicnumber
  var recs = [];
  console.log("length oif dataop", data_op.length)
  console.log("length oif dataop", data_op.length)
  var values = ``;
  for (var index in data_op) {
    if (index == 0) {
      var each = `(${data_op[index]})`

      values = values + each;
    }
    else {
      var each = `(${data_op[index]})`

      values = values + ',' + each;
    }

  }
  console.log("=================================>>>>>>>>>>>>>>>", values)
  console.log(recs)
  var QRY_TO_EXEC = `INSERT INTO infra_work_progress
  (work_progress_id,  project_id, sub_project_id, work_type_id, work_sub_type_seq_id, 
  work_sub_type_id,  sub_work_dimensions, sub_work_metrics, resource_sequence_id, 
    resource_type, resource_id, resource_name, quantity, resource_measurment, resource_metrics,resource_images,
    sub_work_start_date, sub_work_end_date, sub_work_details, sub_work_notes, sub_work_images, sub_work_updated_by)
    values ${values}`;
  console.log("QQQQQQQQQQQQ", QRY_TO_EXEC);
  if (callback && typeof callback == "function") {
    execQuery(
      db,
      QRY_TO_EXEC,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  }
  else {
    return execQuery(db, QRY_TO_EXEC)
  }


}


//********************************************************************************************************************* */






export const materialImageCollectionMdl = function (data, callback) {
  // console.log("data images", data.images)
  // console.log("callback", callback)
  var QRY_TO_EXEC = `INSERT INTO material_image (materialcategory,materalsubcategory,quantity,metrics,images,notes,UpdatedBy ) 
  values("${data.materialcategory}","${data.materalsubcategory}","${data.quantity}","${data.metrics}", "${data.mulImages}",
  "${data.notes}", "${data.UpdatedBy}")`;
  // console.log("QQQQQQQQQQQQ", QRY_TO_EXEC);
  if (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  else return execQuery(db, QRY_TO_EXEC)

}




export const equipmentImageCollectionMdl = function (data, callback) {
  // console.log("data images", data.ImagesWithoutLoad)
  //console.log("callback", callback)
  var QRY_TO_EXEC = `INSERT INTO equipment_image (eqipment_type, eqipment_name,vehicle_number,materal_subcategory,material_category,
    quantity, material_metrics,equipment_dist_cam,distance_metrics,image_path, notes,UpdateBy)Values("${data.eqipment_type}","${data.eqipment_name}", "${data.vehicle_number}", "${data.materal_subcategory}", 
    "${data.material_category}", 
   "${data.quantity}", "${data.material_metrics}","${data.equipment_dist_cam}","meters","${data.image_url}"
   ,"${data.notes}","${data.UpdateBy}");`
  // console.log("QQQQQQQQQQQQ", QRY_TO_EXEC);
  if (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  else return execQuery(db, QRY_TO_EXEC)

}


/////////////////////////////////////////////////////////////MIXED DESIGN////////////////////////////////////////////////////////////

export const get_equipment_machinary_type_mdl = function (callback) {

  var QRY_TO_EXEC = `SELECT machinery_type FROM infra_equipment_type order by equipment_type asc;`
  try {
    (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  } catch (error) {
    execQuery(db, QRY_TO_EXEC);
    console.log()
  }
};

export const getWorkComponentType = function (data, callback) {

  var QRY_TO_EXEC = `SELECT distinct work_component_type , work_component, id FROM infra_work_component where Project_Id= ${data.project_id} and sub_project_Id=${data.Sub_Project_id} order by work_component asc`;
  try {
    (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  } catch (error) {
    execQuery(db, QRY_TO_EXEC);
    console.log()
  }
};




export const mixedDesignMaterial = function (data, callback) {
  var QRY_TO_EXEC = `SELECT *  FROM infra_md where mix_design_type = "${data.data1}";`;
  if (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  else return execQuery(db, QRY_TO_EXEC)
};






export const addMaterialDesignTransactionsMdl = function (data, callback) {
  var d = String(data.issuedDate);
  var r = String(d.substring(0, d.length - 14));
  var length = data.mixedMaterials.length;
  console.log("dateeeeeeeeeeeeeeeeeeeeeeeeeeee",r)
  // var data1 = [];
  console.log("111111111111111")
  var keys = [];
  var values = [];
  var data1 = [];
  data.mixedMaterials.forEach((element) => {
    var _key = Object.keys(element);
    var value = Object.values(element)
    var key = parseInt(_key[0])
    var data4 = [data.materialIssueId, key, data.userId, data.project_id, data.sub_project_id, value, "Ton", r,
    data.issue_location, data.InvoiceImg, data.deliver_location, data.vehicle_number, data.received_by, data.notes, data.updatedBy]

    data1.push(data4)
  });

  console.log("data1", data1)

  var d = String(data.issuedDate);
  var date = String(d.substring(0, d.length - 14));
  var QRY_TO_EXEC_1 = `INSERT INTO inframaterialsissue
  (MaterialIssueId, MaterialId, UserId, ProjectId, SubProjectId, Quantity,  Metrics, IssuedDate, IssuedLocation, InvoiceImg, 
       DeliverLocation, IssueVehicleNo,  ReceivedBy,  Notes,UpdatedBy)
       VALUES ? `


  console.log("QRY_TO_EXEC_1QRY_TO_EXEC_1", QRY_TO_EXEC_1)
  db.query(QRY_TO_EXEC_1, [data1], function (err) {
    console.log("data1data1data1data1", data1)
    if (err) throw err;
    console.log("rfvz cfd", err)
    // db.end();
  });




  var datetimestamp = Date.now();
  var random_number = Math.floor(100000 + Math.random() * 900000);
  var unicnumber = random_number + "" + datetimestamp;

  var QRY_TO_EXEC = `INSERT INTO infra_md_issue (mix_design_type,quantity,metrics,project_id,sub_project_id ,userID,
    work_component_id,sub_work_component_id,issue_date,
    issue_location,received_by,notes,InvoiceImg, mixed_design_id,deliver_location,vehicle_number) 
     values("${data.mix_design_type}","${data.quantity}","${data.metrics}",${data.project_id},${data.sub_project_id}, ${data.userId},
     ${data.work_component_id},${data.sub_work_component_id},"${date}","${data.issue_location}","${data.received_by}","${data.notes}",
     "${data.InvoiceImg}",${unicnumber},"${data.deliver_location}", "${data.vehicle_number}")`
  console.log("QQQQQQQQQvvvvvvvvvvvvvvvvQQQ", QRY_TO_EXEC);
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
  console.log("jjjjjjjjjjjjj", data.mixedMaterials[0])

}




export const getMixedDesignMaterialMDL = function (callback) {
  var QRY_TO_EXEC = `SELECT  distinct  mix_design_type from  infra_md;`;
  if (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  else return execQuery(db, QRY_TO_EXEC)
};










export const stockMDdesign = function (data, callback) {
  var stock_list = [];
  data.mixedMaterials.forEach((element) => {
    var _key = Object.keys(element);
    var value = Object.values(element)
    var key = parseInt(_key[0])
    var QRY_TO_EXEC = `SELECT * FROM materialstock where MaterialId= ${key} and ProjectId = ${data.project_id}`;
    // console.log("QQQQQQQQQQQQ", QRY_TO_EXEC);
    // console.log("ppppppppppppppppppp")
    if (callback && typeof callback == "function")
      execQuery(
        db,
        QRY_TO_EXEC,
        function (err, results) {
          stock_list.push(results);
          console.log("999999999999999999999", results)
          callback(err, results);

        }

      );
    else
      return execQuery(db, QRY_TO_EXEC)

  })
  console.log("stock_liststock_liststock_liststock_liststock_liststock_list", stock_list)
  return stock_list;
}





export const getMDsubWorkMDL = function (data, callback) {

  var QRY_TO_EXEC = `SELECT  work_sub_components ,id FROM infra_sub_work_component WHERE Sub_Project_name = "${data.Sub_Project_name}";`;
  try {
    (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  } catch (error) {
    execQuery(db, QRY_TO_EXEC);
    console.log()
  }
};

export const stock_md = function (material_ids, data1, callback) {

  var QRY_TO_EXEC = `SELECT * FROM materialstock where MaterialId in (${material_ids}) and ProjectId = ${data1}`;
  console.log("QQQQQQQQQQQQ", QRY_TO_EXEC);
  if (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  else
    return execQuery(db, QRY_TO_EXEC)

}




//**********************************************************WORK PROGRESS******************************************************************** */











export const workProgressToSelectWork = function (data, callback) {
  // console.log("data images", data.images)
  // console.log("callback", callback)
  var QRY_TO_EXEC = `   INSERT INTO infra_wp (sub_project_id,work_component_id,sub_work_component_id,start_date,end_date,
    user_id,updated_by,project_id)
    VALUES (${data.sub_project_id},${data.work_component_id},${data.sub_work_component_id},
      "${data.start_date}","${data.end_date}",${data.user_id},"${data.updated_by}" ,"${data.project_id}")`;
  // console.log("QQQQQQQQQQQQ", QRY_TO_EXEC);
  if (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  else return execQuery(db, QRY_TO_EXEC)

}














export const getworkProgressMdl = function (callback) {

  var QRY_TO_EXEC = `SELECT * FROM infra_wplist order by updated_timestamp desc;`;
  try {
    (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  } catch (error) {
    execQuery(db, QRY_TO_EXEC);
    console.log()
  }
};

export const getSteelMdl = function (callback) {

  var QRY_TO_EXEC = `SELECT MaterialSubCategory,AutoMaterialId FROM inframaterials WHERE MaterialCategory = 'Steel';`
  try {
    (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  } catch (error) {
    execQuery(db, QRY_TO_EXEC);
    console.log()
  }
};



export const getPOLMdl = function (callback) {

  var QRY_TO_EXEC = `SELECT MaterialSubCategory,AutoMaterialId FROM inframaterials WHERE MaterialCategory = 'pol'`
  try {
    (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  } catch (error) {
    execQuery(db, QRY_TO_EXEC);
    console.log()
  }
};




export const getSteelMetricsMdl = function (callback) {

  var QRY_TO_EXEC = `SELECT distinct Metrics FROM inframaterials where MaterialCategory= 'Steel';`
  try {
    (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  } catch (error) {
    execQuery(db, QRY_TO_EXEC);
    console.log()
  }
};



export const getPOLMetricsMdl = function (data,callback) {

  var QRY_TO_EXEC = `SELECT distinct Metrics FROM inframaterials where AutoMaterialId = "${data.AutoMaterialId}";`
  try {
    (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  } catch (error) {
    execQuery(db, QRY_TO_EXEC);
    console.log()
  }
};



export const getMDMetricsMdl = function (callback) {

  var QRY_TO_EXEC = `SELECT distinct metrics FROM infra_md;`
  try {
    (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  } catch (error) {
    execQuery(db, QRY_TO_EXEC);
    console.log()
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const workProgressStatus = function (row, callback) {
  let data_MD = [];
  let data_steel = [];
  let data_equipment = [];
  let data_status = [];
  console.log("rowwwwwwwwwwwwwwwwww", row)


  var date = row.day_date;
  var newdate = date.split("-").reverse().join("-");

  //md design
  row.MD.forEach((data) => {
    data_MD.push(`( "${data.md_type_id}", "${data.quantity}", "${data.metrics}", "${data.updated_by}", "${data.wp_id}""${data.issued_by}", "${newdate}", "${data.issued_date}")`)
  })


  // equipment

  row.equipment.forEach((data) => {
    data_equipment.push(`("${data.equipment_type_id}", "${data.fuel_consumed}", "${data.metrics}", "${data.updated_by}", "${data.initial_reading}", "${data.end_reading}", "${data.wp_id}", "${data.fuel_issued_by}", "${data.issued_date}", "${newdate}")`
    )
  })

  //steel

  row.steel.forEach((data) => {
    data_steel.push(`("${data.material_id}", "${data.quantity}", "${data.metrics}", "${data.updated_by}", "${data.wp_id}", "${data.metrics}", "${data.updated_by}", "${newdate}")`)
  })



  //status
  // row.status.forEach((data) => {
  //   data_status.push(`("${data.day_date}","${data.work_done_quantity}","${data.metrics}", "${data.mulImages}","${data.updated_by}")`)
  // })


  let QRY_TO_EXEC_MD = `INSERT INTO infra_wp_md (md_type_id,quantity,metrics,updated_by,wp_id,issued_by,day_date,issued_date) VALUES 
   ${data_MD} `
  var QRY_TO_EXEC_equipment = `insert into infra_wp_equipment (equipment_type_id,fuel_consumed,metrics, updated_by, initial_reading, end_reading, wp_id,fuel_issued_by,issued_date,day_date)VALUES
   ${data_equipment} `
  var QRY_TO_EXEC_steel = `INSERT INTO infra_wp_steel (material_id,quantity,metrics,updated_by,wp_id,issued_by,issued_date,day_date) VALUES
  ${data_steel} `
  const QRY_TO_EXEC_status = `INSERT INTO infra_wp_day_status (day_date,work_done_quantity,metrics,images,updated_by,wp_id) VALUES("${newdate}","${row.work_done_quantity}","${row.status_metrics}", "${row.multipleimages}","${row.updated_by}",${row.wp_id}) `



  if (callback && typeof callback == "function")
    execQuery(db, QRY_TO_EXEC_MD, function (err_MD, results_MD) {
      if (err_MD) {
        callback(err_MD, results_MD);
        return;
      }
      execQuery(db, QRY_TO_EXEC_equipment, function (err_equipment, results_equipment) {
        if (err_equipment) {
          callback(err_equipment, results_equipment);
          return;
        }
        execQuery(db, QRY_TO_EXEC_steel, function (err_steel, results_steel) {
          callback(err_steel, results_steel);
          return;
        })
        execQuery(db, QRY_TO_EXEC_status, function (err_status, results_status) {
          callback(err_status, results_status);
          return;
        })
      })

    })

}

// var oldPath = 'uploads/workProgress/sri'
// var newPath = 'uploads/workProgress/bunnu'

// fs.rename(oldPath, newPath, function (err) {
//   if (err) throw err
//   console.log('Successfully renamed - AKA moved!')
// })


// function copy(callback) {
//   var readStream = fs.createReadStream('uploads/workProgress/sri');
//   var writeStream = fs.createWriteStream('uploads/workProgress/bunnu');

//   readStream.on('error', callback);
//   writeStream.on('error', callback);

//   // Do not callback() upon "close" event on the readStream
//   // readStream.on('close', function () {
//   // Do instead upon "close" on the writeStream
//   writeStream.on('close', function () {
//       callback();
//   });

//   readStream.pipe(writeStream);
// }
// var b = ['uploads/workProgress/7327591654841380019/1219551654841380035.jpeg','uploads/workProgress/7327591654841380019/8983741654841380023.jpeg']

// fs.readFile(b, 'utf8', function(err, data) {
//   if (err) throw err;
//   console.log(data);
// });


export const workProgressStatus0 = function (row, callback) {

  var multipleimages = row.mulImages;




  //console.log("mmmmmmmmmmmmmmmmmm",(multipleimages[i].includes("uploads")))
  console.log("multipleimagessssssssssssssssssssssssssssssssssssssssssssssssssss", multipleimages)
  var __dirname = path.resolve();
  // const directoryPath = path.join(__dirname,multipleimages );
  // console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn", readFiles[files])
  // console.log("oldImage exists.", c)
  if (multipleimages != null && multipleimages != undefined && multipleimages != "") {
    // console.log("mulImages", multipleimages)
    var datetimestamp = Date.now();
    var random_number = Math.floor(100000 + Math.random() * 900000);
    var unicnumber = random_number + "" + datetimestamp;
    var base64Data = image_url;
    // console.log("base64Data")
    const __dirname = path.resolve();
    var dynamic_path = '/uploads/workProgress/' + unicnumber
    var upload_path = path.join(__dirname, './uploads/workProgress/' + unicnumber);
    var images_paths_flag = 0;



    for (var i = 0; i < multipleimages.length; i++) {
      if (multipleimages[i].includes("uploads")) {
        images_paths_flag = images_paths_flag + 1;
      }
    }
    s
    if (images_paths_flag == multipleimages.length) {
      //check if all images exist in file system
      //if doesnot exist remove other images


    }
    // else if (multipleimages[i].includes("uploads")){

    // }


    console.log("images_paths_flag", images_paths_flag, multipleimages.length)

    if (!fs.existsSync(upload_path)) {
      fs.mkdirSync(upload_path, { recursive: true });
    }

    var imgPath = "";
    var oldimgesPath = "";
    for (var i = 0; i < multipleimages.length; i++) {
      var image_url = multipleimages[i];
      if (image_url.indexOf("uploads") > 0) {
        imgPath = image_url;
      }
    }
    if (imgPath != "") {
      var imgpt = imgPath.split('/');
      oldimgesPath = "./" + imgpt[1] + "/" + imgpt[2] + "/" + imgpt[3];
    }
    for (var i = 0; i < multipleimages.length; i++) {
      var image_url = multipleimages[i];
      if (image_url.indexOf("uploads") == -1) {

        if (image_url != null && image_url != undefined && image_url != "") {
          image_url = image_url.replace(/^data:image\/jpeg;base64,/, "");
          var datetimestamp = Date.now();
          var random_number = Math.floor(100000 + Math.random() * 900000);
          var unicnumber = random_number + "" + datetimestamp;
          var base64Data = image_url;
          const __dirname = path.resolve();
          if (oldimgesPath == "") {
            try {
              fs.writeFile(
                upload_path + "/" + unicnumber + ".jpeg",
                base64Data,
                "base64",
                function (err) {
                  console.log(err);
                }
              );
            } catch (err) {
              return res.json({ message: "error in fs", err: err });
            }
          }
          else {
            var pt = path.join(__dirname, oldimgesPath);
            try {
              fs.writeFile(
                pt + "/" + unicnumber + ".jpeg",
                base64Data,
                "base64",
                function (err) {
                  console.log(err);
                }
              );
            } catch (err) {
              return res.json({ message: "error in fs", err: err });
            }
          }
        }
        var imageupload = multipleimages + unicnumber + ".jpeg";
        console.log("imageuploadimageuploadimageuploadimageupload", imageupload)
        var oldimagepath1 = oldimgesPath.replace(".", "")
        // var images_paths_flag = 0;
        // for (var i = 0; i < multipleimages.length; i++) {
        //   if ("uploads" in multipleimages[i]){
        //     images_paths_flag = 1;
        //   }
        // }
        console.log("images_paths_flagimages_paths_flag", images_paths_flag)
        if (oldimgesPath == "") {
          row.multipleimages = dynamic_path;
        }


        // else if (images_paths_flag == 1) {
        else if (multipleimages[i].includes("uploads")) {


          row.multipleimages = oldimagepath1
        }
        else {
          row.multipleimages = oldimagepath1
        }
        console.log("data.InvoiceImg", row.multipleimages)
        var data = data
      }


    }
  }





  let data_MD = [];
  let data_steel = [];
  let data_equipment = [];

  // console.log("rowwwwwwwwwwwwwwwwww", row)
  var date = row.day_date;
  var newdate = date.split("-").reverse().join("-");
  // console.log(newdate)
  //md design
  row.MD.forEach((data) => {
    data_MD.push(`( "${data.md_type_id}", "${data.md_quantity}", "${data.md_metrics}", "${row.updated_by}", "${row.wp_id}", "${data.md_issued_by}", "${newdate}", "${data.md_issued_date}")`)
  })


  // equipment

  row.equipment.forEach((data) => {
    data_equipment.push(`("${data.equipment_type_id}", "${data.fuel_consumed}", "${data.metrics}", "${row.updated_by}", "${data.initial_reading}", "${data.end_reading}", "${row.wp_id}", "${data.fuel_issued_by}", "${data.equipment_issued_date}", "${newdate}", ${data.fuel_type})`
    )
  })

  //steel

  row.steel.forEach((data) => {
    data_steel.push(`("${data.material_id}", "${data.steel_quantity}", "${data.steel_metrics}", "${row.updated_by}", "${row.wp_id}", "${data.steel_issued_by}", "${data.steel_issued_date}", "${newdate}")`)
  })




  // console.log("newdatenewdatenewdatenewdate", newdate)
  let QRY_TO_EXEC_MD = `INSERT INTO infra_wp_md (md_type_id,quantity,metrics,updated_by,wp_id,issued_by,day_date,issued_date) VALUES 
   ${data_MD} `
  var QRY_TO_EXEC_equipment = `insert into infra_wp_equipment (equipment_type_id,fuel_consumed,metrics, updated_by, initial_reading, end_reading, wp_id,fuel_issued_by,issued_date,day_date,fuel_type)VALUES
   ${data_equipment} `
  var QRY_TO_EXEC_steel = `INSERT INTO infra_wp_steel (material_id,quantity,metrics,updated_by,wp_id,issued_by,issued_date,day_date) VALUES ${data_steel}`

  const QRY_TO_EXEC_status = `INSERT INTO infra_wp_day_status (day_date,work_done_quantity,metrics,images,updated_by,wp_id) VALUES("${newdate}","${row.work_done_quantity}","${row.status_metrics}", "${row.multipleimages}","${row.updated_by}",${row.wp_id}) `

  // console.log(QRY_TO_EXEC_status)
  if (callback && typeof callback == "function")
    execQuery(db, QRY_TO_EXEC_MD, function (err_MD, results_MD) {
      if (err_MD) {
        callback(err_MD, results_MD);
        return;
      }
      execQuery(db, QRY_TO_EXEC_equipment, function (err_equipment, results_equipment) {
        if (err_equipment) {
          callback(err_equipment, results_equipment);
          return;
        }
        execQuery(db, QRY_TO_EXEC_steel, function (err_steel, results_steel) {
          if (err_steel) {
            callback(err_steel, results_steel);
            return;
          }
          execQuery(db, QRY_TO_EXEC_status, function (err_status, results_status) {
            callback(err_status, results_status);
            return;
          })

        })
      })
    })


}



export const delOldPath = function (data, callback) {
  // console.log("data images", data.images)

  console.log("dataaaaaaaaaaaa", data)
  var date = data.day_date;
  var newdate = date.split("-").reverse().join("-");
  // console.log("callback", callback)
  var QRY_TO_EXEC = ` SELECT images FROM infradev.infra_wp_day_status where day_date = '${newdate}' and wp_id= ${data.wp_id};`;
  // console.log("QQQQQQQQQQQQ", QRY_TO_EXEC);
  if (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  else return execQuery(db, QRY_TO_EXEC)

}


export const workProgressStatus1 = function (row, callback) {

  var multipleimages = row.mulImages;
  // console.log("mmmmmmmmmmmmm", multipleimages.length)

  if (multipleimages != null && multipleimages != undefined && multipleimages != "") {// console.log("mulImages", multipleimages)
    var datetimestamp = Date.now();
    var random_number = Math.floor(100000 + Math.random() * 900000);
    var unicnumber = random_number + "" + datetimestamp;
    var base64Data = image_url;
    // console.log("base64Data")
    const __dirname = path.resolve();
    var dynamic_path = '/uploads/workProgress/' + unicnumber
    var upload_path = path.join(__dirname, './uploads/workProgress/' + unicnumber);
    if (!fs.existsSync(upload_path)) {
      fs.mkdirSync(upload_path, { recursive: true });
    }
    for (var i = 0; i < multipleimages.length; i++) {
      var image_url = multipleimages[i];

      if (image_url != null && image_url != undefined && image_url != "") {
        image_url = image_url.replace(/^data:image\/jpeg;base64,/, "");
        var datetimestamp = Date.now();
        var random_number = Math.floor(100000 + Math.random() * 900000);
        var unicnumber = random_number + "" + datetimestamp;
        var base64Data = image_url;
        const __dirname = path.resolve();
        try {
          fs.writeFile(
            upload_path + "/" + unicnumber + ".jpeg",
            base64Data,
            "base64",
            function (err) {
              console.log(err);
            }
          );
        } catch (err) {
          return res.json({ message: "error in fs", err: err });
        }
        var imageupload = multipleimages + unicnumber + ".jpeg";
        // console.log("imageupload", imageupload)
        row.multipleimages = dynamic_path;
        // console.log("data.InvoiceImg", data.mulImages)
        var data = data
      }
    }
  }
  // }

  // export const image = function(req,res){
  //   fs.readFile('image.jpg', function(err, data) {
  //     if (err) throw err; // Fail if the file can't be read.
  //       res.writeHead(200, {'Content-Type': 'image/jpeg'});
  //       res.end(data); // Send the file data to the browser.
  //   });
  // }



  let data_MD = [];
  let data_steel = [];
  let data_equipment = [];

  // console.log("rowwwwwwwwwwwwwwwwww", row)
  var date = row.day_date;
  var newdate = date.split("-").reverse().join("-");


  //md design
  console.log("mmmmmmmmmmmmmmmmmmmddddddddddd", row.MD != [])
  if (row.MD != [] && row.MD != null && row.MD != "") {
    row.MD.forEach((data) => {
      data_MD.push(`( "${data.md_type_id}", "${data.md_quantity}", "${data.md_metrics}", "${row.updated_by}", "${row.wp_id}", "${data.md_issued_by}", "${newdate}", "${data.md_issued_date}")`)
    })
  }

  // equipment
  if (row.equipment != [] && row.equipment != null && row.equipment != "") {
    row.equipment.forEach((data) => {
      data_equipment.push(`("${data.equipment_type_id}", "${data.fuel_consumed}", "${data.metrics}", "${row.updated_by}", "${data.initial_reading}", "${data.end_reading}", "${row.wp_id}", "${data.fuel_issued_by}", "${data.equipment_issued_date}", "${newdate}", ${data.fuel_type},"${data.equipment_no}","${data.notes}")`
      )
    })
  }

  //steel
  if (row.steel != [] && row.steel != null && row.steel != "") {
    row.steel.forEach((data) => {
      data_steel.push(`("${data.material_id}", "${data.steel_quantity}", "${data.steel_metrics}", "${row.updated_by}", "${row.wp_id}", "${data.steel_issued_by}", "${data.steel_issued_date}", "${newdate}")`)
    })
  }



  // console.log("newdatenewdatenewdatenewdate", newdate)

  if (row.MD != [] && row.MD != null && row.MD != "") {
    var QRY_TO_EXEC_MD = `INSERT INTO infra_wp_md (md_type_id,quantity,metrics,updated_by,wp_id,issued_by,day_date,issued_date) VALUES 
   ${data_MD} `
  }
  if (row.equipment != [] && row.equipment != null && row.equipment != "") {
    var QRY_TO_EXEC_equipment = `insert into infra_wp_equipment (equipment_type_id,fuel_consumed,metrics, updated_by, initial_reading, end_reading, wp_id,fuel_issued_by,issued_date,day_date,fuel_type,equipment_no,notes)VALUES
   ${data_equipment} `
  }
  if (row.steel != [] && row.steel != null && row.steel != "") {
    var QRY_TO_EXEC_steel = `INSERT INTO infra_wp_steel (material_id,quantity,metrics,updated_by,wp_id,issued_by,issued_date,day_date) VALUES ${data_steel}`
  }
  var QRY_TO_EXEC_status = `INSERT INTO infra_wp_day_status (day_date,work_done_quantity,metrics,images,updated_by,wp_id,notes) VALUES("${newdate}","${row.work_done_quantity}","${row.status_metrics}", "${row.multipleimages}","${row.updated_by}",${row.wp_id}, "${row.notes}") `

  // console.log(QRY_TO_EXEC_status)
  if (callback && typeof callback == "function")
    if (QRY_TO_EXEC_MD != [] && QRY_TO_EXEC_MD != null && QRY_TO_EXEC_MD != "") {
      execQuery(db, QRY_TO_EXEC_MD, function (err_MD, results_MD) {
        if (err_MD) {
          callback(err_MD, results_MD);
          return;
        }
      })
    }
  if (QRY_TO_EXEC_equipment != [] && QRY_TO_EXEC_equipment != null && QRY_TO_EXEC_equipment != "") {
    execQuery(db, QRY_TO_EXEC_equipment, function (err_equipment, results_equipment) {
      if (err_equipment) {
        callback(err_equipment, results_equipment);
        return;
      }
    })
  }
  if (QRY_TO_EXEC_steel != [] && QRY_TO_EXEC_steel != null && QRY_TO_EXEC_steel != "") {
    execQuery(db, QRY_TO_EXEC_steel, function (err_steel, results_steel) {
      if (err_steel) {
        callback(err_steel, results_steel);
        return;
      }
    })
  }
  execQuery(db, QRY_TO_EXEC_status, function (err_status, results_status) {
    callback(err_status, results_status);
    return;
  })




}



//////////////////SINGLE ENTRY /////////////////////////


export const updateImagesMdl = function (data, callback) {
  // console.log("data images", data.images)
  // console.log("callback", callback)
  var QRY_TO_EXEC = ` 
  UPDATE infra_wp_day_status  SET images = '${data.mulImages}' WHERE  wp_id = ${data.wp_id};`;
  // console.log("QQQQQQQQQQQQ", QRY_TO_EXEC);
  if (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  else return execQuery(db, QRY_TO_EXEC)

}



export const getWpEquipMdl = function (data, callback) {
  var date = data.day_date;
  console.log("datedate", date)
  var newdate = date.split("-").reverse().join("-");
  console.log("newdate", newdate)
  var QRY_TO_EXEC_GET_EQP = ` SELECT 
  infra_wp_equipment.fuel_consumed,
  infra_wp_equipment.metrics,
  infra_wp_equipment.fuel_type,
  infra_wp_equipment.updated_by,   
  infra_wp_equipment.initial_reading,
  infra_wp_equipment.end_reading,
  infra_wp_equipment.fuel_issued_by,
  infra_wp_equipment.issued_date,
  infra_wp_equipment.equipment_no,
  infra_wp_equipment.day_date,
  infra_equipment_type.equipment_type,
  infra_wp_equipment.equipment_type_id,
   inframaterials.MaterialSubCategory
FROM
  infra_wp_equipment
      INNER JOIN
  infra_equipment_type ON infra_wp_equipment.equipment_type_id = infra_equipment_type.id
      INNER JOIN
  inframaterials ON inframaterials.AutoMaterialId = infra_wp_equipment.fuel_type
WHERE
  infra_wp_equipment.day_date = '${newdate}'
      AND infra_wp_equipment.wp_id = ${data.wp_id}`;
  if (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC_GET_EQP,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  else return execQuery(db, QRY_TO_EXEC)
}





export const getWpMDMdl = function (data, callback) {
  var date = data.day_date;
  var newdate = date.split("-").reverse().join("-");
  console.log(newdate)
  var QRY_TO_EXEC_GET_MD = `  SELECT * FROM infra_wp_md WHERE infra_wp_md.day_date = '${newdate}'AND infra_wp_md.wp_id = ${data.wp_id}`;
  // console.log("QQQQQQQQQQQQ", QRY_TO_EXEC);
  if (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC_GET_MD,
      function (err, resultsmd) {
        callback(err, resultsmd);
        return;
      }
    );
  else return execQuery(db, QRY_TO_EXEC_GET_MD)

}



export const getSteeldataMdl = function (data, callback) {
  // console.log("data images", data.images)
  var date = data.day_date;
  var newdate = date.split("-").reverse().join("-");
  console.log(newdate)
  var QRY_TO_EXEC_GET_STEEL = ` SELECT 
    infra_wp_steel.quantity,
    infra_wp_steel.metrics,
     infra_wp_steel.issued_by,
     infra_wp_steel.issued_date,
     infra_wp_steel.updated_timestamp,
     inframaterials.MaterialSubCategory,
     infra_wp_steel.material_id
 FROM
     infra_wp_steel
        INNER JOIN
    inframaterials ON inframaterials.AutoMaterialId = infra_wp_steel.material_id
 WHERE    infra_wp_steel.day_date = '${newdate}'
         AND infra_wp_steel.wp_id = ${data.wp_id};`
  if (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC_GET_STEEL,
      function (err, resultssteel) {
        callback(err, resultssteel);
        return;
      }
    );
  else return execQuery(db, QRY_TO_EXEC_GET_STEEL)

}




export const getWpstatusMdl = function (data, callback) {
  var date = data.day_date;
  var newdate = date.split("-").reverse().join("-");
  console.log(newdate)
  // var QRY_TO_EXEC_GET_MD =`  SELECT * FROM infra_wp_md WHERE infra_wp_md.day_date = '${data.day_date}'AND infra_wp_md.wp_id = ${data.wp_id}`;
  var QRY_TO_EXEC_GET_STATUS = `select * from infra_wp_day_status where day_date = '${newdate}' and wp_id =${data.wp_id}`
  // console.log("QQQQQQQQQQQQ", QRY_TO_EXEC);
  if (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC_GET_STATUS,
      function (err, resultsstatus) {
        callback(err, resultsstatus);
        return;
      }
    );
  else return execQuery(db, QRY_TO_EXEC_GET_STATUS)

}


/// Update models for work progress


export const delWPMDMdl = function (data, callback) {
  var date = data.day_date;
  var newdate = date.split("-").reverse().join("-");
  // console.log(newdate)
  var QRY_TO_EXEC_UPDATE_MD = ` delete from infra_wp_md where day_date ='${newdate}' and wp_id=${data.wp_id}`

  var QRY_TO_EXEC_UPDATE_STEEL = `   delete from infra_wp_steel where day_date ='${newdate}' and wp_id=${data.wp_id}`

  var QRY_TO_EXEC_UPDATE_EQUIPMENT = `  delete from infra_wp_equipment where day_date ='${newdate}' and wp_id=${data.wp_id}`
  var QRY_TO_EXEC_UPDATE_STATUS = `          
               delete from infra_wp_day_status where day_date ='${newdate}' and wp_id=${data.wp_id}
                `
  // console.log("QQQQQQQQQQQQ", QRY_TO_EXEC);

  if (callback && typeof callback == "function")
    execQuery(db, QRY_TO_EXEC_UPDATE_MD, function (err_MD, results_MD) {
      if (err_MD) {
        callback(err_MD, results_MD);
        return;
      }
      execQuery(db, QRY_TO_EXEC_UPDATE_STEEL, function (err_STEEL, results_steel) {
        if (err_STEEL) {
          callback(err_STEEL, results_steel);
          return;
        }
        execQuery(db, QRY_TO_EXEC_UPDATE_EQUIPMENT, function (err_equipment, results_equipment) {
          if (err_equipment) {
            callback(err_equipment, results_equipment);
            return;
          }
          execQuery(db, QRY_TO_EXEC_UPDATE_STATUS, function (err_status, results_status) {
            callback(err_status, results_status);
            return;
          })

        })
      })
    })
}

export const updateSteelMdl = function (data, callback) {
  var QRY_TO_EXEC_GET_STATUS = `UPDATE infra_wp_steel 
  SET 
      material_id = '${data.material_id}',
      quantity = ${data.steel_quantity},
      metrics = '${data.steel_metrics}',
      updated_by="${data.updated_by}",
      issued_by = '${data.issed_by}',
      issued_date ="${data.issued_date}"
  WHERE
      day_date = '${data.day_date}' AND id = ${data.steel_id}`
  console.log("QQQQQQQQQQQQ", QRY_TO_EXEC_GET_STATUS);
  if (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC_GET_STATUS,
      function (err, resultsstatus) {
        callback(err, resultsstatus);
        return;
      }
    );
  else return execQuery(db, QRY_TO_EXEC_GET_STATUS)

}

export const updateEquipmentMdl = function (data, callback) {
  var QRY_TO_EXEC_GET_STATUS = `UPDATE infra_wp_equipment 
  SET 
      equipment_type_id = '${data.equipment_type_id}',
      fuel_consumed = ${data.fuel_consumed},
      metrics = '${data.metrics}',
      updated_by="${data.updated_by}",
      initial_reading = ${data.initial_reading},
      end_reading = '${data.end_reading}',
      fuel_issued_by = "${data.fuel_issued_by}",
      issued_date ="${data.issued_date}"
  WHERE
      day_date = '${data.day_date}' AND id = ${data.eqp_id};`
  // console.log("QQQQQQQQQQQQ", QRY_TO_EXEC);
  if (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC_GET_STATUS,
      function (err, resultsstatus) {
        callback(err, resultsstatus);
        return;
      }
    );
  else return execQuery(db, QRY_TO_EXEC_GET_STATUS)

}

export const updateStatusMdl = function (data, callback) {
  var QRY_TO_EXEC_GET_STATUS = `          
    UPDATE  infra_wp_day_status
  SET 
      work_done_quantity = '${data.work_done_quantity}',
      metrics = '${data.metrics}',
      images ="${data.images}",
      updated_by="${data.updated_by}"
  WHERE
      day_date = '${data.day_date}' AND id = ${data.status_id};
      `
  // console.log("QQQQQQQQQQQQ", QRY_TO_EXEC);
  if (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC_GET_STATUS,
      function (err, resultsstatus) {
        callback(err, resultsstatus);
        return;
      }
    );
  else return execQuery(db, QRY_TO_EXEC_GET_STATUS)

}




/*************************************************PURCHASE ORDER********************************************************************/
export const purchaseOrderMdl = function (data, callback) {
  // console.log("data images", data.ImagesWithoutLoad)
  //console.log("callback", callback)
  var QRY_TO_EXEC = `INSERT INTO infra_material_purchaseorders (purchase_order_id, material_catergory_id,material_subcategory_id,
    project_id,sub_project_id,
    vendor_id, PO_raised_by,purchaseorder_date,qunatity_ordered,metrics,
     PurchaseOrderCost,OrderPlacedLocation,estiamted_order_deliverydate,Purchase_order_status,
    po_image,notes,updated_by)Values("${data.purchase_order_id}","${data.material_catergory_id}",${data.material_subcategory_id},
    ${data.project_id},${data.sub_project_id},${data.vendor_id},"${data.PO_raised_by}",
    "${data.purchaseorder_date}",${data.qunatity_ordered},"${data.metrics}",
    ${data.PurchaseOrderCost},"${data.OrderPlacedLocation}","${data.estiamted_order_deliverydate}",
    "${data.Purchase_order_status}","${data.InvoiceImg}","${data.notes}","${data.updated_by}");`
  // console.log("QQQQQQQQQQQQ", QRY_TO_EXEC);
  if (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  else return execQuery(db, QRY_TO_EXEC)

}





export const getPurchaseOrderListMdl = function (callback) {


  var QRY_TO_EXEC = `SELECT purchase_order_id FROM infra_material_purchaseorders;`;
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



export const getDatesMdl = function (data, callback) {
  console.log("data", data)
  console.log("callback", callback)

  var QRY_TO_EXEC = `SELECT day_date FROM infra_wp_day_status where wp_id = ${data.wp_id} ORDER BY day_date DESC ;`;
  console.log("QQQQQQQQQQQQ", QRY_TO_EXEC);
  if (callback && typeof callback == "function")
    execQuery(
      db,
      QRY_TO_EXEC,
      function (err, results) {
        callback(err, results);
        return;
      }
    );
  else
    return execQuery(db, QRY_TO_EXEC)

}




export const workProgressStatus12 = function (row, callback) {
  let data_MD = [];
  let data_steel = [];
  let data_equipment = [];
  let data_status = [];
  console.log("rowwwwwwwwwwwwwwwwww", row)
  //md design
  row.MD.forEach((data) => {
    data_MD.push(`( "${data.md_type_id}", "${data.quantity}", "${data.metrics}", "${data.updated_by}", "${data.wp_id}""${data.issued_by}", "${data.day_date}", "${data.issued_date}")`)
  })


  // equipment

  row.equipment.forEach((data) => {
    data_equipment.push(`("${data.equipment_type_id}", "${data.fuel_consumed}", "${data.metrics}", "${data.updated_by}", "${data.initial_reading}", "${data.end_reading}", "${data.wp_id}", "${data.fuel_issued_by}", "${data.issued_date}", "${data.day_date}")`
    )
  })

  //steel

  row.steel.forEach((data) => {
    data_steel.push(`("${data.material_id}", "${data.quantity}", "${data.metrics}", "${data.updated_by}", "${data.wp_id}", "${data.metrics}", "${data.updated_by}", "${data.day_date}")`)
  })



  //status
  row.status.forEach((data) => {
    data_status.push(`("${data.day_date}","${data.work_done_quantity}","${data.metrics}", "${data.mulImages}","${data.updated_by}")`)
  })


  let QRY_TO_EXEC_MD = `INSERT INTO infra_wp_md (md_type_id,quantity,metrics,updated_by,wp_id,issued_by,day_date,issued_date) VALUES 
     ${data_MD} `
  var QRY_TO_EXEC_equipment = `insert into infra_wp_equipment (equipment_type_id,fuel_consumed,metrics, updated_by, initial_reading, end_reading, wp_id,fuel_issued_by,issued_date,day_date)VALUES
     ${data_equipment} `
  var QRY_TO_EXEC_steel = `INSERT INTO infra_wp_steel (material_id,quantity,metrics,updated_by,wp_id,issued_by,issued_date,day_date) VALUES
    ${data_steel} `
  var QRY_TO_EXEC_status = `INSERT INTO infra_wp_day_status (day_date,work_done_quantity,metrics,images,updated_by,wp_id) VALUES
    ${data_status} `



  if (callback && typeof callback == "function")
    execQuery(db, QRY_TO_EXEC_MD, function (err_MD, results_MD) {
      if (err_MD) {
        callback(err_MD, results_MD);
        return;
      }
      execQuery(db, QRY_TO_EXEC_equipment, function (err_equipment, results_equipment) {
        if (err_equipment) {
          callback(err_equipment, results_equipment);
          return;
        }
        execQuery(db, QRY_TO_EXEC_steel, function (err_steel, results_steel) {
          callback(err_steel, results_steel);
          return;
        })
        execQuery(db, QRY_TO_EXEC_status, function (err_status, results_status) {
          callback(err_status, results_status);
          return;
        })
      })

    })

}



export const poListByProjectMdl = function (data, callback) {
  // console.log("data", data)
  var QRY_TO_EXEC = `SELECT  * 
  FROM infra_po_list
  WHERE  ProjectName  ="${data.ProjectName}" and DATE(updated_timestamp) >= DATE_FORMAT(CURDATE() - INTERVAL 1 MONTH,'%Y-%m-01') 
  AND DATE(updated_timestamp) <= DATE_FORMAT( CURRENT_DATE, '%Y/%m/%d' ) ORDER BY updated_timestamp DESC;`
  // console.log("data", data)
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