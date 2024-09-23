import fs from "fs"
import path from "path";
import { db } from "../config/dbConfig.js";
// import Excel from 'exceljs';
import { image } from "../config/dbConfig.js";
// import { readFile } from 'fs/promises';
import XLSX from 'xlsx';
import Excel from "exceljs";
import hbs from 'handlebars';

import puppeteer from 'puppeteer';
import moment from 'moment'
// import { stringify } from "querystring";
import console from "console";
// import csv from "fast-csv";
// import { stringify } from "querystring";
import nodemailer from "nodemailer";
import {
  stock_md,
  getUserMdl,
  postMaterialReceiptMdl,
  getVendors,
  getMetricsMdl,
  getMaterialMdl,
  getProjectMdl,
  getSubProjectMdl,
  getSubCategoryMdl,
  receiptListByProjectMdl,
  issueListByProjectMdl,
  postandGetUpdateProjectMdl,
  updateProjectMdl,
  stock,
  materialReceiptApproveMdl,
  materialIssueApproveMdl,
  postIssueMdl,
  getPendingReceiptMaterialMdl,
  getPendingIssueMaterialMdl,
  getMaterialSubCategoryMdl,
  materialReceiptListOnDateFilterMdl,
  materialIssueListOnDateFilterMdl,
  get15DaysReceiptListMdl,
  get15DaysIssueListMdl,
  getTransactionReportMdl,
  allTransactionDateFilterMdl,
  stockMdl,
  // workProgressStatus,
  workProgressMdl,
  allTransactionDateFilterMdlforPDF,
  getMixedDesignMaterialMDL,
  addMaterialDesignTransactionsMdl,
  getEquipmentMdl,
  getWorkTypeMdl,
  getSubWorkMdl,
  getSubWorkTypeMdl,
  equipmentMetrics,
  workSubTypeMetrics,
  workProgressToSelectWork,

  issueListByProjectMdlforPDF,

  materialImageCollectionMdl,
  equipmentImageCollectionMdl,

  getDefaultStockMdl,





  get_equipment_machinary_type_mdl,
  getWorkComponentType,

  mixedDesignMaterial,
  getMDsubWorkMDL,
  // addMaterialDesignTransactionsMdl,



  stockMDdesign,
  getworkProgressMdl,
  workProgressStatus1,
  getSteelMdl,
  getPOLMdl,



  getSteelMetricsMdl,
  getPOLMetricsMdl,
  getMDMetricsMdl,
  // dayCheckMdl,
  // getWpStatusMdl,
  getWpEquipMdl,
  getWpMDMdl,
  getSteeldataMdl,
  getWpstatusMdl,
  delWPMDMdl,
  updateImagesMdl,
  getDatesMdl,
  delOldPath,

  purchaseOrderMdl,
  getPurchaseOrderListMdl,

  poListByProjectMdl
  // workProgressStatus,
  // workProgress
} from "../models/materialModel.js"

// import Jwt from 'jsonwebtoken';
// const { jwt } = Jwt;

// import * as csvformat from '@fast-csv/format';
// import { format } from '@fast-csv/format';
// import {xlsx}  from 'xlsx-writer';
//*********************************** get User Roles **************************************************//

export const getUserCntrl = function (req, res) {

  getUserMdl(function (err, results) {
    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 400, message: "Not able to process the request,please try again" });
        return;
      }
      res.send({ status: 200, data: results, message: "Success" });
      console.log("resul", results)
    } catch (err) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });
};


/////////////////////////////



export const getMaterialStockcntrl = function (req, res) {
  var data = req.params;

  getDefaultStockMdl(data, function (err, results) {
    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 400, message: "Not able to process the request, at the moment please try again" });
        return;
      }
      res.send({ status: 200, data: results, message: "Success" });
      console.log("resul", results)
    } catch (err) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });
};
//*********************************** Get Metrics **************************************************//

export const getMetricsCntrl = function (req, res) {
  getMetricsMdl(function (err, results) {
    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 400, message: "Not able to process the request, at the moment please try again" });
        return;
      }
      res.send({ status: 200, data: results, message: "Success" });
      console.log("resul", results)
    } catch (err) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });
};


//*********************************** Get Vendors**************************************************//

export const getVendorcntrl = function (req, res) {
  getVendors(function (err, results) {
    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 500, message: "Not able to process the request, at the moment please try again" });
        return;
      }
      res.send({ status: 200, data: results, message: "Success" });
      console.log("resul", results)
    } catch (err) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });
};


//***********************************  Get Projects **************************************************//

export const projectCntrl = function (req, res) {
  getProjectMdl(function (err, results) {
    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 400, message: "Not able to process the request, at the moment please try again" });
        return;
      }
      res.send({ status: 200, data: results, message: "Success" });
      console.log("resul", results)
    } catch (err) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });
};







//***********************************  Get Material **************************************************//

export const getMaterialCntrl = function (req, res) {
  getMaterialMdl(function (err, results) {
    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 400, message: "Not able to process the request, at the moment please try again" });
        return;
      }
      res.send({ status: 200, data: results, message: "Success" });
      console.log("resul", results)
    } catch (err) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });
};




//***********************************  Get Sub Category **************************************************//



export const getSubCategoryCntrl = function (req, res) {
  var data = req.params;
  getSubCategoryMdl(data, function (err, results) {
    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 400, message: "Not able to process the request, at the moment please try again" });
        return;
      }
      res.send({ status: 200, data: results, message: "Success" });
      console.log("resul", results)
    } catch (err) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });
};


//*************************************** Post and Update Project for settings module  **************************************************//
export const postandGetUpdateProject = function (req, res) {

  var data = req.body;
  postandGetUpdateProjectMdl(data, function (err, results) {
    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 400, message: "Not able to process the request, at the moment please try again" });
        return;
      }
      res.send({ status: 200, user: { details: results[0] }, message: "Success" });
      console.log("resul", results)
    } catch (error) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });
};

//***********************************  Get Sub Project **************************************************//


export const getSubProjectCntrl = function (req, res) {
  var data = req.params;

  getSubProjectMdl(data, function (err, results) {
    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 400, message: "Not able to process the request, at the moment please try again" });
        return;
      }
      res.send({ status: 200, data: results, message: "Success" });
      console.log("resul", results)
    } catch (err) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });

};




//***********************************  Receipt List **************************************************//
export const receiptListByProject = function (req, res) {

  var data = req.params;
  receiptListByProjectMdl(data, function (err, results) {
    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 400, message: "Not able to process the request, at the moment please try again" });
        return;
      }
      res.send({ status: 200, data: results, message: "Success" });
      // console.log("resul", results)
    } catch (err) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });
};

//************************************************************** Update Project **************************************************//
export const updateProjectCntrl = function (req, res) {
  var user = req.body;

  updateProjectMdl(user, function (err, results) {
    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 400, message: "Not able to process the request, at the moment please try again" });
        return;
      }
      res.send({ status: 200, user: results, message: "Success" });
      console.log("results", results)
    } catch (err) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });
};


//************************************************************ Issue Material  **************************************************//
export const issueMaterialCntrl = function (req, res) {
  var image_url = req.body.InvoiceImg;
  var data = req.body;

  if (image_url != null && image_url != undefined && image_url != "") {

    image_url = image_url.replace(/^data:image\/jpeg;base64,/, "");
    var datetimestamp = Date.now();
    var random_number = Math.floor(100000 + Math.random() * 900000);
    var unicnumber = random_number + "" + datetimestamp;
    var base64Data = image_url;
    const __dirname = path.resolve();
    // var upload_path = path.join(__dirname, './uploads/issuedImages');
    // var image_path = '/uploads/issuedImages' + "/" + unicnumber + ".jpeg"
    // if (!fs.existsSync(upload_path)) {
    //   fs.mkdirSync("./uploads/issuedImages", { recursive: true });
    // }
    var upload_path = path.join(__dirname, './uploads/issuedImages');
    var imagePath = "/uploads/issuedImages" + "/" + unicnumber + ".jpeg";
    if (!fs.existsSync(upload_path)) {
      fs.mkdirSync("./uploads/issuedImages", { recursive: true });
    }
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
    var imageupload = image + unicnumber + ".jpeg";
    // console.log("imageupload", imageupload)
    data.InvoiceImg = imagePath;
    // console.log("data.InvoiceImg", data.InvoiceImg)
    var data = data
  }
  stock(data, function (err, rows) {

    console.log("rowsrows", rows)
    console.log(" data.quantity data.quantity", data.quantity)
    try {
      console.log("================>", data)
      if (err) {
        console.log("error", err)
        res.send({ status: 500, message: "Not able to process the request, at the moment please try again" });

      }

      else if



        ((rows.length == 1) && (rows[0]["stock"] >= data.quantity)) {
        postIssueMdl(data, function (err, results) {
          console.log("results", results)
          console.log("================>", data)
          if (err) {
            res.json({ status: 400, message: "Not able to process the request, at the moment please try again" })
          }
          if (results) {

            res.json({ status: 200, message: "Material issued successfully" })
          }
          ;
        })
      }
      else {
        res.send({ status: 404, message: "Not enough quantity in stock" });
      };

    } catch (err) {
      res.send({ status: 500, message: "Internal server error" })
    }
  })


}
//***********************************  Material Receipt **************************************************//


export const addMaterialReceipt = function (req, res) {
  var image_url = req.body.InvoiceImg;
  var data = req.body;

  if (image_url != null && image_url != undefined && image_url != "") {

    image_url = image_url.replace(/^data:image\/jpeg;base64,/, "");
    var datetimestamp = Date.now();
    var random_number = Math.floor(100000 + Math.random() * 900000);
    var unicnumber = random_number + "" + datetimestamp;
    var base64Data = image_url;
    const __dirname = path.resolve();
    var upload_path = path.join(__dirname, './uploads/materialReceipt');
    var imagePath = "/uploads/materialReceipt" + "/" + unicnumber + ".jpeg";
    if (!fs.existsSync(upload_path)) {
      fs.mkdirSync("./uploads/materialReceipt", { recursive: true });
    }
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
    var imageupload = imagePath;
    console.log("imageupload", imageupload)
    data.InvoiceImg = imageupload;
    console.log("data.InvoiceImg", data.InvoiceImg)
    var data = data
  }
  try {
    postMaterialReceiptMdl(data, function (err, results) {

      console.log("================>", data)
      if (err) {
        res.json({ status: 400, message: "Not able to process the request, please try again" })
      }
      if (results) {

        res.json({ status: 200, message: "Material added successfully" })
      }

    })
  } catch (error) {
    res.send({ status: 500, message: "Internal server error" })
    console.log(error)
  }

}
//****************************************************Phase 2*******************************************************************/

//*******************************************Approvals Of Materials Release 2************************************************

// Get Pending Receipt Materail
// Get Pending Issue Materail


//**************************************************Get Pending Material Receipts**************************************************/
export const getPendingReceiptMaterialCntrl = function (req, res) {
  var data = req.params;
  getPendingReceiptMaterialMdl(data, function (err, results) {
    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 400, message: "Not able to process the request,please try again" });
        return;
      }
      res.send({ status: 200, data: results, message: "Success" });
      console.log("resul", results)
    } catch (err) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });
};
//**************************************************Get Pending Material Issue**************************************************/
export const getPendingIssueMaterialCntrl = function (req, res) {
  var data = req.params
  getPendingIssueMaterialMdl(data, function (err, results) {
    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 400, message: "Not able to process the request,please try again" });
        return;
      }
      res.send({ status: 200, data: results, message: "Success" });
      console.log("resul", results)
    } catch (err) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });
};

//******************************************** Material Receipt Approve By Admin****************************************************/
export const materialReceiptApproveCntrl = function (req, res) {
  console.log("approve")
  var user = req.body;
  materialReceiptApproveMdl(user, function (err, results) {
    console.log("results", results)
    if (err) {
      console.log("err", err)
      res.redirect({ status: 400, message: "Not able to process the request, at the moment please try again" });
      return;
    }
    res.send({ status: 200, message: "Material approved Successfully" });
  });
};


//******************************************Stock Available******************************************/

export const stockCntrl = function (req, res) {
  console.log("approve")
  var user = req.body;
  stockMdl(user, function (err, results) {
    console.log("results", results)
    if (err) {
      console.log("err", err)
      res.redirect({ status: 400, message: "Not able to process the request, at the moment please try again" });
      return;
    }
    res.send({ status: 200, details: results, message: "success" });
  });
};

//*********************************************Material SubCategory*****************************************//

export const getMaterialSubCategoryCntrl = function (req, res) {

  getMaterialSubCategoryMdl(function (err, results) {
    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 400, message: "Not able to process the request,please try again" });
        return;
      }
      res.send({ status: 200, data: results, message: "Success" });
      console.log("resul", results)
    } catch (err) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });
};


//******************************Get Default 15 Days Records*****************************************///

export const get15DaysReceiptListCntrl = function (req, res) {
  var data = req.params;

  get15DaysReceiptListMdl(data, function (err, results) {
    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 400, message: "Not able to process the request, at the moment please try again" });
        return;
      }
      res.send({ status: 200, data: results, message: "Success" });
      console.log("resul", results)
    } catch (err) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });
};


//*************************************************Receipt List On Date Filter************************************************************** */





export const materialReceiptListOnDateFilterCntrl = function (req, res) {
  console.log("approve")
  var user = req.body;
  materialReceiptListOnDateFilterMdl(user, function (err, results) {
    console.log("results", results)
    if (err) {
      console.log("err", err)
      res.redirect({ status: 400, message: "Not able to process the request, at the moment please try again" });
      return;
    }
    res.send({ status: 200, details: results, message: "success" });
  });
};


//**************************************************15 Days Issue List****************************************************/


export const get15DaysIssueListCntrl = function (req, res) {
  var data = req.params;

  get15DaysIssueListMdl(data, function (err, results) {
    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 400, message: "Not able to process the request, at the moment please try again" });
        return;
      }
      res.send({ status: 200, data: results, message: "Success" });
      console.log("resul", results)
    } catch (err) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });
};



//////////////////////////////////////////////////////////////////////////////////////////////////

export const materialIssueListOnDateFilterCntrl = function (req, res) {
  console.log("approve")
  var user = req.body;
  materialIssueListOnDateFilterMdl(user, function (err, results) {
    console.log("results", results)
    if (err) {
      console.log("err", err)
      res.redirect({ status: 400, message: "Not able to process the request, at the moment please try again" });
      return;
    }
    res.send({ status: 200, details: results, message: "success" });
  });
};



//***************************************************Get transaction Reports*********************************************************** */

export const getTransactionReportCntrl = function (req, res) {
  var data = req.params;

  getTransactionReportMdl(data, function (err, results) {
    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 400, message: "Not able to process the request, at the moment please try again" });
        return;
      }
      res.send({ status: 200, data: results, message: "Success" });
      console.log("resul", results)
    } catch (err) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });
};

//************************************All Transaction On Date Filter********************************************* */
export const allTransactionDateFilterCntrl = function (req, res) {
  // console.log("data", data)
  // console.log("approve")
  var data = req.body;
  allTransactionDateFilterMdl(data, function (err, results) {
    // console.log("results", results)
    if (err) {
      console.log("err", err)
      res.redirect({ status: 400, message: "Not able to process the request, at the moment please try again" });
      return;
    }
    res.send({ status: 200, details: results, message: "success" });
  });
};
//***********************************  Issue List **************************************************//


export const issueListByProject = function (req, res) {
  var data = req.params;
  issueListByProjectMdl(data, function (err, results) {
    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 400, message: "Not able to process the request, at the moment please try again" });
        return;
      }
      res.send({ status: 200, data: results, message: "Success" });
      console.log("resul", results)
    } catch (err) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });
};
///////////////////////////////////////////////////////////////////////////////

export const materialIssueApproveCntrl = function (req, res) {
  console.log("approve")
  var user = req.body;
  materialIssueApproveMdl(user, function (err, results) {
    console.log("results", results)
    if (err) {
      console.log("err", err)
      res.redirect({ status: 400, message: "Not able to process the request, at the moment please try again" });
      return;
    }
    res.send({ status: 200, message: "Issue material approved successfully" });
  });
};



//*******************************************************WORK PROGRESS MODULE*************************************************************/



// export const workProgressCntrl = function (req, res) {
//   var data = req.body;


//   workProgressMdl(data, function (err, results) {
//     console.log("results", results)
//     try {
//       if (err) {
//         console.log("err", err)
//         res.send({ status: 400, message: "Not able to process the request, at the moment please try again" });
//         return;
//       }
//       res.send({ status: 200, message: "work" });
//       console.log("resul", results)
//     } catch (err) {
//       res.send({ status: 500, message: "Internal server error" })
//     }


//   });
// }





export const getEquipmentCntrl = function (req, res) {
  getEquipmentMdl(function (err, results) {
    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 400, message: "Not able to process the request, at the moment please try again" });
        return;
      }
      res.send({ status: 200, data: results, message: "Success" });
      console.log("resul", results)
    } catch (err) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });
};



export const getWorkTypeCntrl = function (req, res) {
  getWorkTypeMdl(function (err, results) {
    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 400, message: "Not able to process the request, at the moment please try again" });
        return;
      }
      res.send({ status: 200, data: results, message: "Success" });
      console.log("resul", results)
    } catch (err) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });
};



export const getSubWorkCntrl = function (req, res) {
  var data = req.params;

  getSubWorkMdl(data, function (err, results) {
    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 400, message: "Not able to process the request, at the moment please try again" });
        return;
      }
      res.send({ status: 200, data: results, message: "Success" });
      console.log("resul", results)
    } catch (err) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });

};


export const getSubWorkTypeCntrl = function (req, res) {
  var data = req.params;

  getSubWorkTypeMdl(data, function (err, results) {
    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 400, message: "Not able to process the request, at the moment please try again" });
        return;
      }
      res.send({ status: 200, data: results, message: "Success" });
      console.log("resul", results)
    } catch (err) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });
};

export const equipmentMetricsCntrl = function (req, res) {
  equipmentMetrics(function (err, results) {
    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 400, message: "Not able to process the request, at the moment please try again" });
        return;
      }
      res.send({ status: 200, data: results, message: "Success" });
      console.log("resul", results)
    } catch (err) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });
};

export const workSubTypeMetricsCntrl = function (req, res) {
  workSubTypeMetrics(function (err, results) {
    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 400, message: "Not able to process the request, at the moment please try again" });
        return;
      }
      res.send({ status: 200, data: results, message: "Success" });
      console.log("resul", results)
    } catch (err) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });
};


///////////////////////////////receipt pdf download with filters/////////////
/////////////////////////////////////////////////////////////////

export const materialPDFCntrlwithfilters = async (req, res) => {
  var user = req.body;
  var inp = req.body
  // console.log("date", user.fromDate)
  // console.log("date", user.toDate)
  // console.log("user.toDate.length", user.toDate.length)
  getMaterialSubCategoryMdl(function (err, results) {
    var mat_list = [];
    results.forEach(function (item, index) {
      mat_list.push(item.AutoMaterialId)
    })
    console.log("mat_listmat_listmat_listmat_list", mat_list)
    if (user.materialId.length == 0) {
      user.materialId = mat_list;
    }
    if (user.fromDate.length == 0) {
      var x = new Date();
      x.setDate(1);
      x.setMonth(x.getMonth() - 1);
      user.fromDate = x.toISOString().slice(0, 10)
    }
    if (user.toDate.length == 0) {
      var x = new Date();
      user.toDate = x.toISOString().slice(0, 10)
    }
    console.log("user req body==================", user)
    materialReceiptListOnDateFilterMdl(user, async function (err, user) {
      // console.log("dateMDl", user.fromDate)
      // console.log("dateMDL", user.toDate)
      if (err) {
        console.log("error", err)
        // res.send({ status: 500, message: "Not able to process the request, at the moment please try again" });
      }
      try {
        const compile = async function (templateName, user) {
          // console.log("dateMDlHTML", user.fromDate)
          // console.log("dateMDLHTML", user.toDate)
          //console.log("userrrrrrrrrrrrr", user.UpdatedTimeStamp)
          user.forEach(function (item, index) {
            item.UpdatedTimeStamp = item.UpdatedTimeStamp.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, '-');
            //console.log(item, index);
          });

          // const AutoMaterialReceiptId = user[0].AutoMaterialReceiptId;
          // console.log("oooooooooooooooooooooooo", AutoMaterialReceiptId)
          const filepath = path.join(process.cwd(), 'templates', `${templateName}.hbs`)
          //console.log("filepath", filepath)
          const html = await fs.readFileSync(filepath, 'utf8');
          if (user.length == 0) {
            user = 0;
          }
          var today_date = new Date().toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric'
          }).replace(/ /g, '-');

          var fromdate = inp.fromDate
          var fDate = new Date(fromdate)
          var f_date = fDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, '-');

          var todate = inp.toDate
          var tDate = new Date(todate)
          var t_date = tDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, '-');

          if (user !== 0) {
          user.forEach(function (item, index) {
            item.Quantity = item.Quantity.toLocaleString('en-IN', {
              style: 'currency',
              currency: 'INR'
            }).replaceAll("₹", ' ');
            const num = user[0].Quantity
            console.log("numnumnumnum", num)
          });
        }

          //console.log(item, index);


          // console.log("pdf datapdf datapdf datapdf datapdf datapdf data ",user)
          let user_Arry = []
          for (var each in user) {
            var dict = {};
            dict = user[each];
            each = Number(each) + 1;

            //   user[each].push({
            //     key:   "S.No",
            //     value: each
            // });
            dict["number"] = each;
            // console.log("each++++++++++++++++", dict[0]);
            user_Arry.push(dict)
          };
          user = user_Arry;

          //console.log("pdf datapdf datapdf datapdf datapdf datapdf data ", user)


          return hbs.compile(html)({ "Shots": user, "input": inp, "Date": today_date, "fromDate": f_date, "toDate": t_date })
        }
        hbs.registerHelper('dateFormat', function (value, format) {
          return moment(value).format(format);
        });
        (async function () {
          const browser = await puppeteer.launch();
          // sconsole.log("browser", browser)
          const page = await browser.newPage();
          const content = await compile('short-list', user);
          await page.setContent(content);
          const buffer = await page.pdf({ format: "A4" });
          const base64 = buffer.toString('base64');




          var d = new Date();
          var result = d.toISOString().replace("T", "-").replaceAll(":", "-").substring(0, 19);

          if (user) {
            var d = user;
            var project_name = "";
            Object.keys(d).forEach(function (key) {
              var value = d[key];
              project_name = value.ProjectName
              // console.log("1111111111111111111", y)

            });

            console.log("useruseruseruseruseruseruseruser", user[0])
            res.send({


              'status': 200, "PdfBase-64": base64, "message": "success", "pdf": project_name + "-Material-Receipt-Transactions-" + result +
                ".pdf"
            });
            fs.writeFile('filenamereceipt.pdf', base64, { encoding: 'base64' }, function (err) {
              console.log('File created');
            });
          }

        })();
      }

      catch (error) {
        console.log('our error', error)
      }

    });

  });
};

//////////////
//////////////
// export const issuePDFCntrlwithfiltersCntrl = async (req, res) => {
//   var user = req.body;
//   var inp = req.body
//   getMaterialSubCategoryMdl(function (err, results) {
//     // console.log("get call results", results)
//     var mat_list = [];
//     results.forEach(function (item, index) {
//       // console.log("item.AutoMaterialId",item.AutoMaterialId);
//       mat_list.push(item.AutoMaterialId)

//     })
//     console.log("mat_listmat_listmat_listmat_list", mat_list)
//     if (user.materialId.length == 0) {
//       user.materialId = mat_list;
//     }
//     if (user.fromDate.length == 0) {
//       var x = new Date();
//       x.setDate(1);
//       x.setMonth(x.getMonth() - 1);
//       user.fromDate = x.toLocaleString().slice(0, 10)
//     }
//     if (user.toDate.length == 0) {
//       var x = new Date();
//       // console.log("xxxxxxxxxxxxxxxxxxxxxx",x)
//       user.toDate = x.toLocaleString().slice(0, 10)
//     }
//     materialIssueListOnDateFilterMdl(user, async function (err, data) {
//       // console.log("data", data)
//       try {
//         if (err) {
//           console.log("err", err)
//           return;
//         }
//         try {
//           const browser = await puppeteer.launch();
//           console.log("browser", browser)
//           const page = await browser.newPage();
//           const content = await compile('issue-list', data);
//           await page.setContent(content);
//           const buffer = await page.pdf({ format: "A4" });
//           const base64 = buffer.toString('base64');
//           var d = new Date();
//           var result = d.toISOString().replace("T", "-").replaceAll(":", "-").substring(0, 19);
//           if (data) {
//             var d = data;
//             var project_name = "";
//             Object.keys(d).forEach(function (key) {
//               var value = d[key];
//               project_name = value.ProjectName
//               // console.log("1111111111111111111", y)
//             });
//             res.send({
//               'status': 200, "PdfBase-64": base64, "message": "success", "pdf": project_name + "-Material-Issue-Transactions-" + result + ".pdf"
//             })
//             fs.writeFile('filenameIssue.pdf', base64, { encoding: 'base64' }, function (err) {
//               console.log('File created');
//             });
//           }

//           else {
//             res.send({ status: 404, message: "err" });
//           };
//         }
//         catch (error) {
//           console.log('our error', error)
//         }
//       } catch (err) {
//       }
//     });
//     const compile = async function (templateName, data) {
//       data.forEach(function (item, index) {
//         item.UpdatedTimeStamp = item.UpdatedTimeStamp.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, '-');
//         //console.log(item, index);
//       });
//       const filepath = path.join(process.cwd(), 'templates', `${templateName}.hbs`)
//       console.log("filepath", filepath)
//       const html = await fs.readFileSync(filepath, 'utf8')
//       if (data.length == 0) {
//         data = 0;
//       };
//       var today_date = new Date().toLocaleDateString('en-GB', {
//         day: 'numeric', month: 'short', year: 'numeric'
//       }).replace(/ /g, '-');
//       var fromdate = inp.fromDate
//       var fDate = new Date(fromdate)
//       var f_date = fDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, '-');



//       var todate = inp.toDate
//       var tDate = new Date(todate)
//       var t_date = tDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, '-');



//       let user_Arry = []
//       for (var each in data) {
//         var dict = {};
//         dict = data[each]
//         each = Number(each) + 1;

//         // user[each].push({
//         // key: "S.No",
//         // value: each
//         // });
//         dict["number"] = each;
//         console.log("each++++++++++++++++", dict);
//         user_Arry.push(dict)
//       };
//       data = user_Arry;
//       return hbs.compile(html)({ "Shots": data, "input": inp, "Date": today_date, "fromDate": f_date, "toDate": t_date })
//     }
//     hbs.registerHelper('dateFormat', function (value, format) {
//       return moment(value).format(format);
//     });



//   })
// };


///////////////////////////////////////////


export const issuePDFCntrlwithfiltersCntrl = async (req, res) => {
  var user = req.body;
  var inp = req.body
  // console.log("date", user.fromDate)
  // console.log("date", user.toDate)
  // console.log("user.toDate.length", user.toDate.length)
  getMaterialSubCategoryMdl(function (err, results) {
    var mat_list = [];
    results.forEach(function (item, index) {

      mat_list.push(item.AutoMaterialId)
    })
    console.log("mat_listmat_listmat_listmat_list", mat_list)
    if (user.materialId.length == 0) {
      user.materialId = mat_list;
    }
    if (user.fromDate.length == 0) {
      var x = new Date();
      x.setDate(1);
      x.setMonth(x.getMonth() - 1);
      user.fromDate = x.toISOString().slice(0, 10)
    }
    if (user.toDate.length == 0) {
      var x = new Date();
      user.toDate = x.toISOString().slice(0, 10)
    }
    console.log("user req body==================", user)
    materialIssueListOnDateFilterMdl(user, async function (err, user) {
      // console.log("dateMDl", user.fromDate)
      console.log("dateMDL", user.length)
      if (err) {
        console.log("error", err)
        // res.send({ status: 500, message: "Not able to process the request, at the moment please try again" });
      }
      try {
        const compile = async function (templateName, user) {
          // console.log("dateMDlHTML", user.fromDate)
          // console.log("dateMDLHTML", user.toDate)
          //console.log("userrrrrrrrrrrrr", user.UpdatedTimeStamp)
          user.forEach(function (item, index) {
            item.UpdatedTimeStamp = item.UpdatedTimeStamp.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, '-');
            //console.log(item, index);
          });

          const AutoMaterialIssueId = user[0].AutoMaterialIssueId;
          console.log("oooooooooooooooooooooooo", AutoMaterialIssueId)
          const filepath = path.join(process.cwd(), 'templates', `${templateName}.hbs`)
          //console.log("filepath", filepath)
          const html = await fs.readFileSync(filepath, 'utf8');
          if (user.length == 0) {
            user = 0;
          }
          var today_date = new Date().toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric'
          }).replace(/ /g, '-');

          var fromdate = inp.fromDate
          var fDate = new Date(fromdate)
          var f_date = fDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, '-');

          var todate = inp.toDate
          var tDate = new Date(todate)
          var t_date = tDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, '-');

          user.forEach(function (item, index) {
            item.Quantity = item.Quantity.toLocaleString('en-IN', {
              style: 'currency',
              currency: 'INR'
            }).replaceAll("₹", ' ');
            const num = user[0].Quantity
            console.log("numnumnumnum", num)
          });

          //console.log(item, index);


          // console.log("pdf datapdf datapdf datapdf datapdf datapdf data ",user)
          let user_Arry = []
          for (var each in user) {
            var dict = {};
            dict = user[each];
            each = Number(each) + 1;

            //   user[each].push({
            //     key:   "S.No",
            //     value: each
            // });
            dict["number"] = each;
            // console.log("each++++++++++++++++", dict[0]);
            user_Arry.push(dict)
          };
          user = user_Arry;

          //console.log("pdf datapdf datapdf datapdf datapdf datapdf data ", user)


          return hbs.compile(html)({ "Shots": user, "input": inp, "Date": today_date, "fromDate": f_date, "toDate": t_date })
        }
        hbs.registerHelper('dateFormat', function (value, format) {
          return moment(value).format(format);
        });
        (async function () {
          const browser = await puppeteer.launch();
          // sconsole.log("browser", browser)
          const page = await browser.newPage();
          const content = await compile('issue-list', user);
          await page.setContent(content);
          const buffer = await page.pdf({ format: "A4" });
          const base64 = buffer.toString('base64');




          var d = new Date();
          var result = d.toISOString().replace("T", "-").replaceAll(":", "-").substring(0, 19);

          if (user) {
            var d = user;
            var project_name = "";
            Object.keys(d).forEach(function (key) {
              var value = d[key];
              project_name = value.ProjectName
              // console.log("1111111111111111111", y)

            });

            console.log("useruseruseruseruseruseruseruser", user[0])
            res.send({


              'status': 200, "PdfBase-64": base64, "message": "success", "pdf": project_name + "-Material-Receipt-Transactions-" + result +
                ".pdf"
            });
            fs.writeFile('filenamereceipt.pdf', base64, { encoding: 'base64' }, function (err) {
              console.log('File created');
            });
          }

        })();
      }

      catch (error) {
        console.log('our error', error)
      }

    });

  });
};





export const allTransactionPDFWithFilters = async (req, res) => {
  var data = req.body;
  var inp = req.body;
  console.log("inp", inp)
  console.log("userrrrrrrrrrrrr", data.toDate)
  console.log("user.toDate.length", data.toDate.length)
  getMaterialSubCategoryMdl(function (err, results) {
    // console.log("get call results", results)
    var mat_list = [];
    results.forEach(function (item, index) {
      // console.log("item.AutoMaterialId",item.AutoMaterialId);
      mat_list.push(item.AutoMaterialId)
    })
    console.log("mat_listmat_listmat_listmat_list", mat_list)
    if (data.materialId.length == 0) {
      data.materialId = mat_list;
    }
    if (data.fromDate.length == 0) {
      var x = new Date();
      x.setDate(1);

      x.setMonth(x.getMonth() - 1);
      data.fromDate = x.toISOString().slice(0, 10)
    }
    if (data.toDate.length == 0) {
      var x = new Date();
      data.toDate = x.toISOString().slice(0, 10)
    }
    console.log("data++++++++++=====================", data)
    allTransactionDateFilterMdlforPDF(data, async function (err, data) {
      try {
        if (err) {
          console.log("err", err)
          return;
        }
        try {
          const browser = await puppeteer.launch();
          console.log("browser", browser)
          const page = await browser.newPage();
          const content = await compile('allTransaction-list', data);
          await page.setContent(content);
          const buffer = await page.pdf({ format: "A4" });
          const base64 = buffer.toString('base64');


          var d = new Date();



          var result = d.toISOString().replace("T", "-").replaceAll(":", "-").substring(0, 19);
          if (data) {

            var d = data;
            var project_name = "";
            Object.keys(d).forEach(function (key) {
              var value = d[key];
              project_name = value.ProjectName
              // console.log("1111111111111111111", y)

            });

            res.send({
              'status': 200, "PdfBase-64": base64, "message": "success", "pdf": project_name + "-All-Transactions-" + result +
                ".pdf"
            })
            fs.writeFile('filenameAllTranc.pdf', base64, { encoding: 'base64' }, function (err) {
              console.log('File created');
            });
          }
          else {
            res.send({ status: 404, message: "err" });
          };
        }
        catch (error) {
          console.log('our error', error)
        }
      } catch (err) {
      }




    });
    const compile = async function (templateName, data) {
      data.forEach(function (item, index) {
        item.UpdatedTimeStamp = item.UpdatedTimeStamp.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, '-');
        //console.log(item, index);
      });
      const filepath = path.join(process.cwd(), 'templates', `${templateName}.hbs`)
      console.log("filepath", filepath)
      const html = await fs.readFileSync(filepath, 'utf8');
      if (data.length == 0) {
        data = 0;
      };
      var today_date = new Date().toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric'
      }).replace(/ /g, '-');

      var fromdate = inp.fromDate
      var fDate = new Date(fromdate)
      var f_date = fDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, '-');
      var todate = inp.toDate
      var tDate = new Date(todate)
      var t_date = tDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, '-');
      console.log("datadatadatadatadata", data)

      if (data !== 0) {
        data.forEach(function (item, index) {
          item.Quantity = item.Quantity.toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR'
          }).replaceAll("₹", ' ');
          const num = data[0].Quantity
          console.log("numnumnumnum", num)
        });
      }
      let user_Arry = []
      for (var each in data) {
        var dict = {};
        dict = data[each]
        each = Number(each) + 1;
        //   user[each].push({
        //     key:   "S.No",

        //     value: each
        // });
        dict["number"] = each;
        // console.log("each++++++++++++++++", dict);
        user_Arry.push(dict)
      };
      data = user_Arry;
      console.log("u, ser_Arryuser_Arryuser_Arryuser_Arry", data)
      var noData = "No data available"

   

      return hbs.compile(html)({ "Shots": data, "input": inp, "Date": today_date, "fromDate": f_date, "toDate": t_date })

    }
    console.log("v f", inp)
    hbs.registerHelper('dateFormat', function (value, format) {
      return moment(value).format(format);
    });
  })
};




/////////////////////////////////////////////////////////
export const stockMaterialPDFfilterCntrl = async (req, res) => {
  var stock = req.body;
  var inp = req.body;




  stockMdl(stock, async function (err, data) {

    console.log("data", data)
    try {
      if (err) {
        console.log("err", err)
        return;
      }
      try {
        const browser = await puppeteer.launch();
        console.log("browser", browser)
        const page = await browser.newPage();
        const content = await compile('stock-list', data);
        await page.setContent(content);
        const buffer = await page.pdf({ format: "A4" });
        const base64 = buffer.toString('base64');
        console.log('done');
        await browser.close();
        var d = new Date();
        var result = d.toISOString().replace("T", "-").replaceAll(":", "-").substring(0, 19);
        if (data) {
          var d = data;
          var project_name = "";
          Object.keys(d).forEach(function (key) {
            var value = d[key];
            project_name = value.ProjectName

          });
          res.send({

            'status': 200, "PdfBase-64": base64, "message": "success", "pdf": project_name + "-Stock-" + result +
              ".pdf"
          })
          fs.writeFile('filename.pdf', base64, { encoding: 'base64' }, function (err) {
            console.log('File created');
          });
        }
        else {
          res.send({ status: 404, message: "err" });
        };
        // console.log(`data:application/pdf;base64,${base64}`); // Test it in a browser.

        // await page.emulateMediaType('screen');
        // await page.pdf({
        //   path: 'mypdfStock.pdf',
        //   format: 'A4',
        //   printBackground: true
        // });
        // console.log("path", path)
        // console.log('done');
        // await browser.close();
        // process.exit();

      }
      catch (error) {
        console.log('our error', error)
      }
    } catch (err) {
    }
  });
  const compile = async function (templateName, data) {
    const filepath = path.join(process.cwd(), 'templates', `${templateName}.hbs`)
    console.log("filepath", filepath)
    let projectName = data[0].ProjectName
    // console.log("projectnameprojectnameprojectnameprojectname", data[0].ProjectName)
    const html = await fs.readFileSync(filepath, 'utf8');
    if (data.length == 0) {
      data = 0;
    };
    var today_date = new Date().toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    }).replace(/ /g, '-');



    data.forEach(function (item, index) {
      item.stock = item.stock.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR'
      }).replaceAll("₹", ' ');
      const num = data[0].stock
      console.log("numnumnumnum", num)
    });
    let user_Arry = []
    for (var each in data) {
      var dict = {};
      dict = data[each]
      each = Number(each) + 1;
      dict["number"] = each;

      // console.log("each++++++++++++++++", dict);
      user_Arry.push(dict)
    };


    return hbs.compile(html)({ "Shots": data, "input": inp, "ProjectName": projectName, "Date": today_date })
  }
  hbs.registerHelper('dateFormat', function (value, format) {
    return moment(value).format(format);
  });
};


////////////////////////////////////////INVOICES////////////////////////////////////////////////////////////

// export const materialPDFCntrl = async (req, res) => {
//   var data = req.body;
//   receiptListByProjectMdl(data, async function (err, data) {
//     if (err) {
//       console.log("error", err)
//       res.send({ status: 500, message: "Not able to process the request, at the moment please try again" });
//     }
//     try {
//       const compile = async function (templateName, data) {
//         const filepath = path.join(process.cwd(), 'templates', `${templateName}.hbs`)
//         console.log("filepath", filepath)
//         const html = await fs.readFileSync(filepath, 'utf8');
//         return hbs.compile(html)({ "Shots": data })
//       }
//       hbs.registerHelper('dateFormat', function (value, format) {
//         return moment(value).format(format);
//       });
//       (async function () {
//         const browser = await puppeteer.launch();
//         // sconsole.log("browser", browser)
//         const page = await browser.newPage();
//         const content = await compile('short-list', data);
//         await page.setContent(content);
//         const buffer = await page.pdf({ format: "A4" });
//         const base64 = buffer.toString('base64');
//         // console.log(`data:application/pdf;base64, ${base64}`); // Test it in a browser.
//         // await page.emulateMediaType('screen');
//         // await page.pdf({
//         //   path: 'mypdf.pdf',
//         //   format: 'A4',
//         //   printBackground: true
//         // });
//         if (data) {
//           // console.log("data", data)
//           res.send({ 'status': 200, "PdfBase-64": base64, "message": "success", "Pdf": "Receipt.pdf" })
//         }
//         // console.log("path", path)
//         // console.log('done');
//         // await browser.close();
//         // process.exit();
//       })();
//     }

//     catch (error) {
//       console.log('our error', error)
//     }

//   });


// };

// export const issueMaterialPDFCntrl = async (req, res) => {
//   var v = req.body

//   issueListByProjectMdlforPDF(v, async function (err, data) {
//     // console.log("data", data)
//     try {
//       if (err) {
//         console.log("err", err)
//         return;
//       }
//       try {
//         const browser = await puppeteer.launch();
//         console.log("browser", browser)
//         const page = await browser.newPage();
//         const content = await compile('issue-list', data);
//         await page.setContent(content);
//         const buffer = await page.pdf({ format: "A4" });
//         const base64 = buffer.toString('base64');
//         if (data) {
//           console.log("data", data)
//           res.send({ 'status': 200, "PdfBase-64": base64, "message": "success", "pdf": "Issue.pdf" })
//         }
//         else {
//           res.send({ status: 404, message: "err" });
//         };
//         // console.log(`data:application/pdf;base64,${base64}`); // Test it in a browser.
//         // await page.emulateMediaType('screen');
//         // await page.pdf({
//         //   path: 'mypdfIssue.pdf',
//         //   format: 'A4',
//         //   printBackground: true
//         // });
//         // console.log("path", path)
//         // console.log('done');
//         // await browser.close();
//         // process.exit();

//       }
//       catch (error) {
//         console.log('our error', error)
//       }
//     } catch (err) {
//     }
//   });
//   const compile = async function (templateName, data) {
//     const filepath = path.join(process.cwd(), 'templates', `${templateName}.hbs`)
//     console.log("filepath", filepath)
//     const html = await fs.readFileSync(filepath, 'utf8');
//     return hbs.compile(html)({ "Shots": data })
//   }
//   hbs.registerHelper('dateFormat', function (value, format) {
//     return moment(value).format(format);
//   });
// };


// export const allTransactionPDF = async (req, res) => {
//   var stock = req.body;
//   getTransactionReportMdl(stock, async function (err, data) {
//     console.log("data", data)
//     try {
//       if (err) {
//         console.log("err", err)
//         return;
//       }
//       try {
//         const browser = await puppeteer.launch();
//         console.log("browser", browser)
//         const page = await browser.newPage();
//         const content = await compile('allTransaction-list', data);
//         await page.setContent(content);
//         const buffer = await page.pdf({ format: "A4" });
//         const base64 = buffer.toString('base64');
//         if (data) {
//           console.log("data", data)
//           res.send({ 'status': 200, "PdfBase-64": base64, "message": "success", "Pdf": "Alltransaction.pdf" })
//         }
//         else {
//           res.send({ status: 404, message: "err" });
//         };
//       }
//       catch (error) {
//         console.log('our error', error)
//       }
//     } catch (err) {
//     }
//   });
//   const compile = async function (templateName, data) {
//     const filepath = path.join(process.cwd(), 'templates', `${templateName}.hbs`)
//     console.log("filepath", filepath)
//     const html = await fs.readFileSync(filepath, 'utf8');
//     return hbs.compile(html)({ "Shots": data })
//   }
//   hbs.registerHelper('dateFormat', function (value, format) {
//     return moment(value).format(format);
//   });
// };

// export const stockMaterialPDFCntrl = async (req, res) => {
//   var stock = req.body;
//   stockMdl(stock, async function (err, data) {

//     console.log("data", data)
//     try {
//       if (err) {
//         console.log("err", err)
//         return;
//       }
//       try {
//         const browser = await puppeteer.launch();
//         console.log("browser", browser)
//         const page = await browser.newPage();
//         const content = await compile('stock-list', data);
//         await page.setContent(content);
//         const buffer = await page.pdf({ format: "A4" });
//         const base64 = buffer.toString('base64');
//         if (data) {
//           console.log("data", data)
//           res.send({ 'status': 200, "PdfBase-64": base64, "message": "success", "pdf": "Stock.pdf" })
//         }
//         else {
//           res.send({ status: 404, message: "err" });
//         };
//         // console.log(`data:application/pdf;base64,${base64}`); // Test it in a browser.
//         // await page.emulateMediaType('screen');
//         // await page.pdf({
//         //   path: 'mypdfStock.pdf',
//         //   format: 'A4',
//         //   printBackground: true
//         // });
//         // console.log("path", path)
//         // console.log('done');
//         // await browser.close();
//         // process.exit();

//       }
//       catch (error) {
//         console.log('our error', error)
//       }
//     } catch (err) {
//     }
//   });
//   const compile = async function (templateName, data) {
//     const filepath = path.join(process.cwd(), 'templates', `${templateName}.hbs`)
//     console.log("filepath", filepath)
//     const html = await fs.readFileSync(filepath, 'utf8');
//     return hbs.compile(html)({ "Shots": data })
//   }
//   hbs.registerHelper('dateFormat', function (value, format) {
//     return moment(value).format(format);
//   });
// };

//*****************************************************************************************************************************************************/
//*************************************************************************************************************************************************** */

export const materialImageCollectionCntrl = function (req, res) {
  // var image_url = req.body.mulImages;
  var data = req.body;
  var mulImages = data.images;
  console.log("mulImages", mulImages)
  var datetimestamp = Date.now();
  var random_number = Math.floor(100000 + Math.random() * 900000);
  var unicnumber = random_number + "" + datetimestamp;
  var base64Data = image_url;
  const __dirname = path.resolve();
  var dynamic_path = '/uploads/materialCollection/' + unicnumber
  var upload_path = path.join(__dirname, './uploads/materialCollection/' + unicnumber);
  if (!fs.existsSync(upload_path)) {
    fs.mkdirSync(upload_path, { recursive: true });
  }
  for (var i = 0; i < mulImages.length; i++) {
    var image_url = mulImages[i];

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
      var imageupload = image + unicnumber + ".jpeg";
      console.log("imageupload", imageupload)
      data.mulImages = dynamic_path;
      console.log("data.InvoiceImg", data.mulImages)
      var data = data
    }
  }




  try {
    materialImageCollectionMdl(data, function (err, results) {


      console.log("================>", data)
      if (err) {
        res.json({ status: 400, message: "Not able to process the request, please try again" })
      }
      if (results) {

        res.json({ status: 200, message: "Material image uploaded successfully" })
      }

    })
  } catch (error) {
    res.send({ status: 500, message: "Internal server error" })
    console.log(error)
  }

};



export const equipmentImageCollection = function (req, res) {
  var image_url = req.body.image_with_load_front_view;
  var image_url1 = req.body.image_with_load_back_view;
  var image_url2 = req.body.image_with_load_fueltank_view;
  var image_url3 = req.body.image_with_load_other_side_view;

  var image_url5 = req.body.image_with_out_load_front_view;
  var image_url6 = req.body.image_with_out_load_back_view;
  var image_url7 = req.body.image_with_out_load_fueltank_view;
  var image_url8 = req.body.image_with_out_load_other_side_view;

  var image_url9 = req.body.Weigh_bridge_invoice_image
  var data = req.body;

  var datetimestamp = Date.now();
  var random_number = Math.floor(100000 + Math.random() * 900000);
  var unicnumber = random_number + "" + datetimestamp;
  var base64Data = image_url;
  const __dirname = path.resolve();

  var dynamic_path = '/uploads/equipment/' + unicnumber
  var upload_path_with_load = path.join(__dirname, './uploads/equipment/' + unicnumber + "/" + "with_load");
  if (!fs.existsSync(upload_path_with_load)) {
    fs.mkdirSync(upload_path_with_load, { recursive: true });
  }
  if (image_url != null && image_url != undefined && image_url != "") {
    image_url = image_url.replace(/^data:image\/jpeg;base64,/, "");
    var base64Data = image_url;
    const __dirname = path.resolve();
    try {
      fs.writeFile(
        upload_path_with_load + "/" + "image_with_load_front_view" + ".jpeg",
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
  if (image_url1 != null && image_url1 != undefined && image_url1 != "") {
    image_url1 = image_url1.replace(/^data:image\/jpeg;base64,/, "");
    var base64Data = image_url1;
    const __dirname = path.resolve();
    try {
      fs.writeFile(

        upload_path_with_load + "/" + "image_with_load_back_view" + ".jpeg",
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
  if (image_url2 != null && image_url2 != undefined && image_url2 != "") {
    image_url2 = image_url2.replace(/^data:image\/jpeg;base64,/, "");
    var base64Data = image_url2;
    const __dirname = path.resolve();
    try {
      fs.writeFile(
        upload_path_with_load + "/" + "image_with_load_fueltank_view" + ".jpeg",
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
  if (image_url3 != null && image_url3 != undefined && image_url3 != "") {
    image_url3 = image_url3.replace(/^data:image\/jpeg;base64,/, "");
    var base64Data = image_url3;
    const __dirname = path.resolve();
    try {
      fs.writeFile(
        upload_path_with_load + "/" + "image_with_load_other_side_view" + ".jpeg",
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
  var dynamic_path_with_out_load = '/uploads/equipment/' + unicnumber + "/" + "with_out_load"
  var upload_path_with_out_load = path.join(__dirname, './uploads/equipment/' + unicnumber + "/" + "with_out_load");
  if (!fs.existsSync(upload_path_with_out_load)) {
    fs.mkdirSync(upload_path_with_out_load, { recursive: true });
  }
  if (image_url5 != null && image_url5 != undefined && image_url5 != "") {
    image_url5 = image_url5.replace(/^data:image\/jpeg;base64,/, "");
    var base64Data = image_url5;
    const __dirname = path.resolve();
    try {
      fs.writeFile(
        upload_path_with_out_load + "/" + "image_with_out_load_front_view" + ".jpeg",
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
  if (image_url6 != null && image_url6 != undefined && image_url6 != "") {
    image_url6 = image_url6.replace(/^data:image\/jpeg;base64,/, "");
    var base64Data = image_url6;
    const __dirname = path.resolve();
    try {
      fs.writeFile(
        upload_path_with_out_load + "/" + "image_with_out_load_back_view" + ".jpeg",
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
  if (image_url7 != null && image_url7 != undefined && image_url7 != "") {
    image_url7 = image_url7.replace(/^data:image\/jpeg;base64,/, "");
    var base64Data = image_url7;
    const __dirname = path.resolve();
    try {
      fs.writeFile(
        upload_path_with_out_load + "/" + "image_with_out_load_fueltank_view" + ".jpeg",
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
  if (image_url8 != null && image_url8 != undefined && image_url8 != "") {
    image_url8 = image_url8.replace(/^data:image\/jpeg;base64,/, "");
    var base64Data = image_url8;
    const __dirname = path.resolve();
    try {
      fs.writeFile(
        upload_path_with_out_load + "/" + "image_with_load_other_side_view" + ".jpeg",
        base64Data,
        "base64",
        function (err) {
          console.log(err);
        }
      );
    } catch (err) {
      return res.json({ message: "error in fs", err: err });
    }
    var imageupload = image + unicnumber + ".jpeg";
    console.log("imageupload", imageupload)
    data.image_url8 = dynamic_path_with_out_load;
    // console.log("data.InvoiceImg", data.image_url2)
    var data = data
  }
  var upload_path_weigh_bridge = path.join(__dirname, './uploads/equipment/' + unicnumber + "/weigh_bridge");
  if (!fs.existsSync(upload_path_weigh_bridge)) {
    fs.mkdirSync(upload_path_weigh_bridge, { recursive: true });
  }
  if (image_url9 != null && image_url9 != undefined && image_url9 != "") {
    image_url9 = image_url9.replace(/^data:image\/jpeg;base64,/, "");
    var base64Data = image_url9;
    const __dirname = path.resolve();
    try {
      fs.writeFile(
        upload_path_weigh_bridge + "/" + "Weigh_bridge_invoice_image" + ".jpeg",
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
  data.image_url = dynamic_path;
  var data = data

  try {
    equipmentImageCollectionMdl(data, function (err, results) {
      // console.log("================>", data)
      if (err) {
        res.json({ status: 400, message: "Not able to process the request, please try again" })
      }
      if (results) {

        res.json({ status: 200, message: "Equipment image uploaded successfully" })
      }

    })
  }
  catch (error) {
    res.send({ status: 500, message: "Internal server error" })
    console.log(error)
  }

};


///////////////////////////////////MIXED DESIGN///////////////////////////////////////////////////////////////








export const get_equipment_machinary_type_Cntrl = function (req, res) {

  get_equipment_machinary_type_mdl(function (err, results) {
    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 400, message: "Not able to process the request,please try again" });
        return;
      }
      res.send({ status: 200, data: results, message: "Success" });
      console.log("resul", results)
    } catch (err) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });
};

export const getWorkComponentCntrl = function (req, res) {
  var data = req.params;
  getWorkComponentType(data, function (err, results) {
    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 400, message: "Not able to process the request,please try again" });
        return;
      }
      res.send({ status: 200, data: results, message: "Success" });
      console.log("resul", results)
    } catch (err) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });
};










export const mixedDesignMaterialCntrl = function (req, res) {
  mixedDesignMaterial(function (err, results) {
    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 400, message: "Not able to process the request,please try again" });
        return;
      }
      res.send({ status: 200, data: results, message: "Success" });
      console.log("resul", results)
    } catch (err) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });
};




export const mulMaterialCntrl = function (req, res) {
  var req1 = req.body.quantity;
  var data = req.body
  // console.log("datadatadatadata", req1)
  mixedDesignMaterial(data, function (err, results) {
    console.log("datadtatadatatatata", results)
    var mat_list1 = [];
    results.forEach(function (item, index) {

      console.log("item", item)
      var materialName = item.material_name

      var ID = item.materialId
      var metrics_1 = item.Metrics_1
      console.log("yyyyyyyyyyyyy", metrics_1)
      //  console.log("$%$%$%%%%%$%%$%$%$%%%$%",item, index )

      // console.log("yyyyyyyyyyyyyyyyyyyyyyyyyy", y)
      var Quantity = data.quantity * item.mix_ratio

      Quantity = Quantity.toFixed(2);

      mat_list1.push({ materialName, Quantity, ID, metrics_1 })

      const clone = JSON.parse(JSON.stringify(mat_list1));
      // console.log("cloneclone", clone)
      // console.log("mat_list1mat_list1", mat_list1)
    })
    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 400, message: "Not able to process the request, at the moment please try again" });
        return;
      }

      //  var y = results[0].material_name;
      // console.log("y,uuuuuuuuuuuuuuuuuuuuu", y)

      res.send({ status: 200, quantity: mat_list1, message: "Success" });

    } catch (error) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });
};


export const addMaterialDesignTransactionsCntrl = function (req, res) {
  var image_url = req.body.InvoiceImg;
  var data = req.body;

  if (image_url != null && image_url != undefined && image_url != "") {

    image_url = image_url.replace(/^data:image\/jpeg;base64,/, "");
    var datetimestamp = Date.now();
    var random_number = Math.floor(100000 + Math.random() * 900000);
    var unicnumber = random_number + "" + datetimestamp;
    var base64Data = image_url;
    const __dirname = path.resolve();
    var upload_path = path.join(__dirname, './uploads/mixedMaterialDesign');
    var imagePath = "/uploads/mixedMaterialDesign" + "/" + unicnumber + ".jpeg";
    if (!fs.existsSync(upload_path)) {
      fs.mkdirSync("./uploads/mixedMaterialDesign", { recursive: true });
    }
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
    var imageupload = imagePath;
    console.log("imageupload", imageupload)
    data.InvoiceImg = imageupload;
    console.log("data.InvoiceImg", data.InvoiceImg)
    var data = data
  }




  try {
    addMaterialDesignTransactionsMdl(data, function (err, results) {

      console.log("================>", data)
      if (err) {
        res.json({ status: 400, message: "Not able to process the request, please try again" })
      }
      if (results) {

        res.json({ status: 200, message: "Mixed material issued successfully" })
      }

    })
  } catch (error) {
    res.send({ status: 500, message: "Internal server error" })
    console.log(error)
  }

}




export const addMaterialDesignTransactionsCntrl1 = function (req, res) {
  var image_url = req.body.InvoiceImg;
  var data = req.body;
  var project_id = data.project_id
  if (image_url != null && image_url != undefined && image_url != "") {

    image_url = image_url.replace(/^data:image\/jpeg;base64,/, "");
    var datetimestamp = Date.now();
    var random_number = Math.floor(100000 + Math.random() * 900000);
    var unicnumber = random_number + "" + datetimestamp;
    var base64Data = image_url;
    const __dirname = path.resolve();
    var upload_path = path.join(__dirname, './uploads/mixedMaterialDesign');
    var imagePath = "/uploads/mixedMaterialDesign" + "/" + unicnumber + ".jpeg";
    if (!fs.existsSync(upload_path)) {
      fs.mkdirSync("./uploads/mixedMaterialDesign", { recursive: true });
    }
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
    var imageupload = imagePath;
    // console.log("imageupload", imageupload)
    data.InvoiceImg = imageupload;
    // console.log("data.InvoiceImg", data.InvoiceImg)
    var data = data
  }
  console.log(data.mixedMaterials)
  var material_ids = []
  data.mixedMaterials.forEach((element) => {
    var _key = Object.keys(element);
    var value = Object.values(element)
    var key = parseInt(_key[0])
    material_ids.push(key)
  })
  console.log("material_idsmaterial_idsmaterial_ids", material_ids)
  stock_md(material_ids, project_id, function (err, rows) {
    console.log("rowsrowsrowsrowsrowsrows", rows)
    if (rows) {
      var stock_avaialble = []
      for (var i = 0; i < rows.length; i++) {

        data.mixedMaterials.forEach((element) => {
          var _key = Object.keys(element);
          var value = Object.values(element);
          var key = parseInt(_key[0]);
          if (key == rows[i]["MaterialId"]) {
            console.log("key = ", key, "values_key = ", rows[i]["MaterialId"], "strock from UI", value)
            if (value > rows[i]["stock"]) {
              stock_avaialble.push(`${rows[i]["MaterialName"]}`)
            }
          }
        })


      }
      console.log("stock_avaialblestock_avaialble", stock_avaialble)
      if (stock_avaialble.length > 0) {
        res.send({ status: 500, data: stock_avaialble, message: "Stock not available for materials" });
      }
      else if (err) {
        res.json({ status: 400, message: "Not able to process the request, at the moment please try again" })
      }
      else {

        addMaterialDesignTransactionsMdl(data, function (err, results) {
          // console.log("results", results)
          console.log("================>")
          if (err) {
            res.json({ status: 400, message: "Not able to process the request, at the moment please try again" })
          }
          if (results) {
            res.json({ status: 200, message: "Material issued successfully" })
          }
          ;
        })
      }


    }

  })
}


export const getMixedDesignMaterialCntrl = function (req, res) {

  getMixedDesignMaterialMDL(function (err, results) {
    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 400, message: "Not able to process the request,please try again" });
        return;
      }
      res.send({ status: 200, data: results, message: "Success" });
      console.log("resul", results)
    } catch (err) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });
};




export const getMDsubWorkCntrl = function (req, res) {
  var data = req.params;
  getMDsubWorkMDL(data, function (err, results) {
    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 400, message: "Not able to process the request,please try again" });
        return;
      }
      res.send({ status: 200, data: results, message: "Success" });
      console.log("resul", results)
    } catch (err) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });
};





///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const stockCSVCntrl = function (req, res) {

  var stock = req.body;


  console.log(stock)
  stockMdl(stock, function (err, results) {
    console.log(results)
    async function generateExcel() {


      // Execute the statement to fetch data in results
      const result = results;

      const workbook = new Excel.Workbook();
      const worksheet = workbook.addWorksheet('Stock Available');

      workbook.modified = new Date();
      // Define columns in the worksheet, these columns are identified using a key.

      var dobCol = worksheet.getRow(2);
      let result1 = result.map(a => a.ProjectName);
      let unique = String(result1.filter((item, i, ar) => ar.indexOf(item) === i));


      var today = new Date();
      var date = today.getFullYear() + '-' + (today.getMonth()
        + 1) + '-' + today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date + ' ' + time;
      worksheet.getRow(2).values = ['', unique, '', "Stock as on  " + dateTime]
      worksheet.getRow(1).values = ['Stock available']
      worksheet.mergeCells('A1', 'D1');
      worksheet.getCell('D1').alignment = { vertical: 'middle', horizontal: 'center' };
      worksheet.getRow(4).values = ['S.no', 'Material Name', 'Metrics', 'Stock']
      let user_Arry = []
      for (var each in result) {
        var dict = {};
        dict = result[each]
        each = Number(each) + 1;
        // user_Arry.push(each)
        // result["S.no"] = each;
        dict["S.no"] = each
        console.log("each++++++++++++++++", dict);
      };
      console.log("result11result11result11result11result11", dict)
      dobCol.worksheet.columns = [
        { key: "S.no", width: 5 },
        { key: 'MaterialName', width: 18 },
        { key: 'Metrics', width: 11 },
        { key: 'stock', width: 19, }
      ]
      worksheet.getColumn(4).numFmt = '#,##0;[Red]-�#,##0';
      var minutesToAdd = 330;
      var currentDate = new Date();
      var futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000);
      var dateTime = futureDate.toString().substring(0, 24)
      console.log("dateTime dateTime ", dateTime)
      for (const row of result) {
        console.log("resultresultresultresult", result)
        worksheet.addRow(row);
      }
      worksheet.getRow(result.length + 6).values = ["Note: System Generated Report on " + dateTime]
      worksheet.getCell('A1').font = {
        // name: 'Comic Sans MS',
        family: 4,
        size: 14,
        // underline: true,
        bold: true,
        fgColor: { argb: 'f5b914' }
      }
      // worksheet.mergeCells('A1', 'D1');
      // worksheet.getCell('D1').alignment = { vertical: 'middle', horizontal: 'center' };
      worksheet.getCell('A4').font = {

        family: 4,
        size: 10,
        bold: true,
      }
      worksheet.getCell('B4').font = {
        family: 4,
        size: 10,
        bold: true,
      }
      worksheet.getCell('B2').font = {
        family: 4,
        size: 10,
        bold: true,
      },
        worksheet.getCell('E2').font = {
          family: 4,
          size: 10,
          bold: true,
        },
        worksheet.getCell('B4').font = {
          family: 4,
          size: 10,
          bold: true,
        },
        worksheet.getCell('C4').font = {
          family: 4,
          size: 10,
          bold: true,
        }
      worksheet.getCell('D4').font = {
        family: 4,
        size: 10,
        bold: true,
      }
      // worksheet.mergeCells(1,2,3,4)
      worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
        worksheet.getCell('A1').font = {
          // name: 'Comic Sans MS',
          family: 4,
          size: 14,
          // underline: true,
          bold: true,
          fgColor: { argb: 'f5b914' }
        }
        row.eachCell((cell, colNumber) => {
          if (rowNumber == 4) {
            // First set the background of header row
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              font: 'bold',
              fgColor: { argb: 'f5b914' }
            }
          }
          // Set border of each cell 
          cell.border = {
            // top: { style: 'thin' },
            // left: { style: 'thin' },
            // bottom: { style: 'thin' },
            // right: { style: 'thin' }
          };
        })




        row.eachCell((cell, colNumber) => {
          // worksheet.autoFilter = 'A1:D1';
          if (rowNumber == 1) {
            // First set the background of header row
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              bold: true,
              fgColor: { argb: 'f5b914' }

            }
          }
          // // Set border of each cell 
          // cell.border = {
          //   top: { style: 'thin' },
          //   left: { style: 'thin' },
          //   bottom: { style: 'thin' },
          //   right: { style: 'thin' }
          // };
        })


        row.eachCell((cell, colNumber) => {
          // worksheet.autoFilter = 'A1:D1';
          if (rowNumber == 2) {
            // First set the background of header row
            cell.fill = {
              type: 'pattern',
              // pattern: 'solid',
              bold: true,
              // fgColor: { argb: 'f5b914' }

            }
            cell.border = {
              top: { style: 'thin' },
              left: { style: 'thin' },
              bottom: { style: 'thin' },
              right: { style: 'thin' }
            };
          }
          cell.border = {

          };


        })


        //Commit the changed row to the stream
        row.commit();
      });

      // Finally save the worksheet into the folder from where we are running the code. 
      // await workbook.xlsx.writeFile('Stock.xlsx');
      const fileBuffer = await workbook.xlsx.writeBuffer()
      // console.log(fileBuffer)
      return fileBuffer
    }
    (async function () {

      // console.log("await execl ",await generateExcel())
      let fileBuffer = await generateExcel().catch((error) => {
        console.error(error);
      });
      // var fileBuffer = Buffer.from(aesCbc.encrypt(fileBuffer));
      // console.log("fileBufferfileBufferfileBufferfileBuffer", fileBuffer)
      // const contents = fs.readFileSync('./Stock.xlsx', { encoding: 'base64' });



      try {
        var d = new Date();
        var result = d.toISOString().replace("T", "-").replaceAll(":", "-").substring(0, 19);
        if (results) {
          var d = results;
          var project_name = "";
          Object.keys(d).forEach(function (key) {
            var value = d[key];
            project_name = value.ProjectName
          });
          res.send({ status: 200, base64Data: fileBuffer.toString('base64'), message: "Success", "csv": project_name + "-Stock-" + result + ".xlsx" });
        }
        else {

          res.send({ status: 400, message: "Not able to process the request, at the moment please try again" });
        }
        // console.log("resul", results)
      } catch (error) {
        res.send({ status: 500, message: "Internal server error" })
      }



    })();

  });
};


export const allTransactionDateCSV = function (req, res) {
  var stock = req.body;
  var inp = req.body;
  var p_name = inp.ProjectName
  console.log("p_namep_namep_namep_name", p_name)
  var fromdate = inp.fromDate
  var fDate = new Date(fromdate)
  var f_date = fDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, '-');
  console.log("f_datef_datef_datef_datef_datef_datef_datef_datef_datef_datef_date", f_date)
  var todate = inp.toDate
  var tDate = new Date(todate)
  var t_date = tDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, '-');
  console.log("t_datet_datet_datet_datet_datet_datet_datet_datet_datet_date", t_date)
  console.log("stockstockstockstockstockstockstock", stock)


  getMaterialSubCategoryMdl(function (err, results) {

    var mat_list = [];
    results.forEach(function (item, index) {
      mat_list.push(item.AutoMaterialId)
    })
    console.log("mat_listmat_listmat_listmat_list", mat_list)
    if (stock.materialId.length == 0) {
      stock.materialId = mat_list;
    }
    if (stock.fromDate.length == 0) {
      var x = new Date();
      x.setDate(1);

      x.setMonth(x.getMonth() - 1);
      stock.fromDate = x.toISOString().slice(0, 10)
    }
    if (stock.toDate.length == 0) {
      var x = new Date();
      stock.toDate = x.toISOString().slice(0, 10)
    }
    allTransactionDateFilterMdlforPDF(stock, function (err, results) {
      async function generateExcel() {
        // Execute the statement to fetch data in results
        const result = results;
        // Create Excel workbook and worksheet
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('Material Receipts & Issued');

        workbook.modified = new Date();

        var dobCol = worksheet.getRow(1);

        results.forEach(function (item, index) {
          item.UpdatedTimeStamp = item.UpdatedTimeStamp.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, '-');

        });


        var fromdate = inp.fromDate
        var fDate = new Date(fromdate)
        var f1_date = fDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, '-');
        var todate = inp.toDate
        var tDate = new Date(todate)
        var t1_date = tDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, '-');
        worksheet.getRow(2).values = ['', p_name, '', 'from : ' + f1_date, 'to : ' + t1_date]

        worksheet.getRow(1).values = ['All Transactions']
        // worksheet.getRow(1).values = ['Stock available']
        worksheet.mergeCells('A1', 'D1');
        worksheet.getCell('D1').alignment = { vertical: 'middle', horizontal: 'center' };

        worksheet.getRow(4).values = ['S.no', 'Date', 'Type', 'Material Name', 'Quantity', 'Metrics']
        let user_Arry = []
        for (var each in result) {
          var dict = {};
          dict = result[each]
          each = Number(each) + 1;

          dict["S.no"] = each
          // console.log("each++++++++++++++++", dict);
        };

        dobCol.worksheet.columns = [
          { key: "S.no", width: 5 },
          { key: "UpdatedTimeStamp", width: 16 },
          { key: 'transactiontype', width: 15 },
          { key: 'MaterialName', width: 18 },
          { key: 'Quantity', width: 18 },
          { key: 'Metrics', width: 10 },


        ]

        worksheet.getColumn(5).numFmt = '#,##0;[Red]-�#,##0';
        // Add rows from database to worksheet 
        for (const row of result) {
          worksheet.addRow(row);

        }

        var minutesToAdd = 330;
        var currentDate = new Date();
        var futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000);
        var dateTime = futureDate.toString().substring(0, 24)

        worksheet.getRow(result.length + 6).values = ["Note: System Generated Report on " + dateTime]

        worksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {

          row.eachCell((cell, colNumber) => {

            // worksheet.mergeCells('A1', 'D1');
            // worksheet.getCell('D1').alignment = { vertical: 'middle', horizontal: 'center' };
            if (rowNumber == 1) {
              // First set the background of header row
              cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'f5b914' }
              }

            }
            if (rowNumber == 4) {
              // First set the background of header row
              cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'f5b914' }
              }

            }
            // Set border of each cell 
            // cell.border = {
            //   top: { style: 'thin' },
            //   left: { style: 'thin' },
            //   bottom: { style: 'thin' },
            //   right: { style: 'thin' }
            // };
          })
          worksheet.getCell('A1').font = {
            // name: 'Comic Sans MS',
            family: 4,
            size: 14,
            // underline: true,
            bold: true,
            // fgColor: { argb: 'f5b914' },
            // color: { argb: 'FF00FF00' },
          }
          worksheet.getCell('A4').font = {
            family: 4,
            size: 10,
            bold: true,
            fgColor: { argb: 'f5b914' }
          }
          worksheet.getCell('B4').font = {
            family: 4,
            size: 10,
            bold: true,
            fgColor: { argb: 'f5b914' }
          }
          worksheet.getCell('C4').font = {
            family: 4,
            size: 10,
            bold: true,
            fgColor: { argb: 'f5b914' }
          }
          worksheet.getCell('D4').font = {
            family: 4,
            size: 10,
            bold: true,
            fgColor: { argb: 'f5b914' }
          }
          worksheet.getCell('E4').font = {
            family: 4,
            size: 10,
            bold: true,
            fgColor: { argb: 'f5b914' }
          }
          worksheet.getCell('F4').font = {
            family: 4,
            size: 10,
            bold: true,
            fgColor: { argb: 'f5b914' }
          }
          //Commit the changed row to the stream
          row.commit();
        });

        // Finally save the worksheet into the folder from where we are running the code. 
        const fileBuffer = await workbook.xlsx.writeBuffer()
        // console.log(fileBuffer)
        return fileBuffer
      }
      (async function () {
        let fileBuffer = await generateExcel().catch((error) => {
          console.error(error);
        });

        // const contents = fs.readFileSync('./Alltranac.xlsx', { encoding: 'base64' });

        // });
        var d = new Date();



        var result = d.toISOString().replace("T", "-").replaceAll(":", "-").substring(0, 19);
        if (result) {

          var d = result;
          var project_name = "";
          Object.keys(d).forEach(function (key) {
            var value = d[key];
            project_name = value.ProjectName
            // console.log("1111111111111111111", y)

          });
          res.send({

            'status': 200, "base64Data": fileBuffer.toString('base64'), "message": "success", "csv": p_name + "-All-Transactions-" + result +
              ".xlsx"
          })

        }
        else {
          res.send({ status: 404, message: "err" });
        };
      })();
    });
  });
};



export const receiptDataCSV = function (req, res) {
  var stock = req.body;
  var inp = req.body;
  var p_name = inp.ProjectName
  console.log("p_namep_namep_namep_name", p_name)
  var fromdate = inp.fromDate
  var fDate = new Date(fromdate)
  var f_date = fDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, '-');
  console.log("f_datef_datef_datef_datef_datef_datef_datef_datef_datef_datef_date", f_date)
  var todate = inp.toDate
  var tDate = new Date(todate)
  var t_date = tDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, '-');
  console.log("t_datet_datet_datet_datet_datet_datet_datet_datet_datet_date", t_date)
  getMaterialSubCategoryMdl(function (err, results) {
    // console.log("get call results", results)
    var mat_list = [];
    results.forEach(function (item, index) {
      // console.log("item.AutoMaterialId",item.AutoMaterialId);
      mat_list.push(item.AutoMaterialId)
    })
    console.log("mat_listmat_listmat_listmat_list", mat_list)
    if (stock.materialId.length == 0) {
      stock.materialId = mat_list;
    }
    if (stock.fromDate.length == 0) {
      var x = new Date();
      x.setDate(1);

      x.setMonth(x.getMonth() - 1);
      stock.fromDate = x.toISOString().slice(0, 10)
    }
    if (stock.toDate.length == 0) {
      var x = new Date();
      stock.toDate = x.toISOString().slice(0, 10)
    }
    // console.log("data++++++++++=====================", data)

    materialReceiptListOnDateFilterMdl(stock, function (err, results) {
      async function generateExcel() {


        // Execute the statement to fetch data in results
        const result = results;

        // Create Excel workbook and worksheet
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('Material Receipts ');

        workbook.modified = new Date();
        // Define columns in the worksheet, these columns are identified using a key.
        // var t = new Date()
        // worksheet.addRow({id: 1, name: 'John Doe', dob: new Date(1970, 1, 1)});
        var dobCol = worksheet.getRow(1);

        results.forEach(function (item, index) {
          item.UpdatedTimeStamp = item.UpdatedTimeStamp.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, '-');
          //console.log(item, index);
        });

        var fromdate = inp.fromDate
        var fDate = new Date(fromdate)
        var f1_date = fDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, '-');
        var todate = inp.toDate
        var tDate = new Date(todate)
        var t1_date = tDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, '-');

        worksheet.getRow(1).values = ['Receipt Transactions']
        // worksheet.getRow(1).values = ['Stock available']
        worksheet.mergeCells('A1', 'D1');
        worksheet.getCell('D1').alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getRow(2).values = ['', p_name, '', 'from : ' + f1_date, 'to : ' + t1_date]
        worksheet.getRow(4).values = ['S.no', 'Date', 'Material Name', 'Quantity', 'Metrics']
        let user_Arry = []
        for (var each in result) {
          var dict = {};
          dict = result[each]
          each = Number(each) + 1;

          dict["S.no"] = each
          // console.log("each++++++++++++++++", dict);
        };

        dobCol.worksheet.columns = [
          { key: "S.no", width: 5 },
          { key: "UpdatedTimeStamp", width: 16 },
          { key: 'MaterialName', width: 18 },
          { key: 'Quantity', width: 17 },
          { key: 'Metrics', width: 10 },
          // { header: 'slkijgydchup', key: t }

        ]
        worksheet.getColumn(4).numFmt = '#,##0;[Red]-�#,##0';
        for (const row of result) {
          worksheet.addRow(row);

        }
        var minutesToAdd = 330;
        var currentDate = new Date();
        var futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000);
        var dateTime = futureDate.toString().substring(0, 24)

        worksheet.getRow(result.length + 6).values = ["Note: System Generated Report on " + dateTime]
        // worksheet.autoFilter = 'A1:D1';


        worksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {

          row.eachCell((cell, colNumber) => {


            if (rowNumber == 1) {
              // First set the background of header row
              cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'f5b914' }
              }
            }
            if (rowNumber == 4) {
              // First set the background of header row
              cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'f5b914' }
              }
            }
            // Set border of each cell 
            // cell.border = {
            //   top: { style: 'thin' },
            //   left: { style: 'thin' },
            //   bottom: { style: 'thin' },
            //   right: { style: 'thin' }
            // };
          })
          if (rowNumber == 4) {
            // First set the background of header row
            // cell.fill = {
            //   type: 'pattern',
            //   pattern: 'solid',
            //   fgColor: { argb: 'f5b914' }
            // }

          }
          worksheet.getCell('A1').font = {
            // name: 'Comic Sans MS',
            family: 4,
            size: 14,
            // underline: true,
            bold: true,
            // fgColor: { argb: 'f5b914' },
            // color: { argb: 'FF00FF00' },
          }
          worksheet.getCell('A4').font = {
            family: 4,
            size: 10,
            bold: true,
            fgColor: { argb: 'f5b914' }
          }
          worksheet.getCell('B4').font = {
            family: 4,
            size: 10,
            bold: true,
            fgColor: { argb: 'f5b914' }
          }
          worksheet.getCell('C4').font = {
            family: 4,
            size: 10,
            bold: true,
            fgColor: { argb: 'f5b914' }
          }
          worksheet.getCell('D4').font = {
            family: 4,
            size: 10,
            bold: true,
            fgColor: { argb: 'f5b914' }
          }
          worksheet.getCell('E4').font = {
            family: 4,
            size: 10,
            bold: true,
            fgColor: { argb: 'f5b914' }
          }
          worksheet.getCell('F4').font = {
            family: 4,
            size: 10,
            bold: true,
            fgColor: { argb: 'f5b914' }
          }
          //Commit the changed row to the stream
          row.commit();
          //Commit the changed row to the stream
          // row.commit();
        });

        // Finally save the worksheet into the folder from where we are running the code. 
        const fileBuffer = await workbook.xlsx.writeBuffer()
        // console.log(fileBuffer)
        return fileBuffer
      }
      (async function () {
        let fileBuffer = await generateExcel().catch((error) => {
          console.error(error);
        });

        // const contents = fs.readFileSync('./receipt.xlsx', { encoding: 'base64' });

        // });
        var d = new Date();
        var result = d.toISOString().replace("T", "-").replaceAll(":", "-").substring(0, 19);

        if (result) {
          var d = result;
          var project_name = "";
          Object.keys(d).forEach(function (key) {
            var value = d[key];
            project_name = value.ProjectName
            // console.log("1111111111111111111", y)

          });

          console.log("useruseruseruseruseruseruseruser", result[0])
          res.send({
            //"PdfBase-64": contents,

            'status': 200, "message": "success", "base64Data": fileBuffer.toString('base64'), "csv": p_name + "-Material-Receipt-Transactions-" + result +
              ".xlsx"
          });

        }
      })();


    });
  });
};


export const materialIssueCSV = function (req, res) {
  var stock = req.body;
  var inp = req.body;
  var p_name = inp.ProjectName
  console.log("p_namep_namep_namep_name", p_name)
  var fromdate = inp.fromDate
  var fDate = new Date(fromdate)
  var f_date = fDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, '-');
  console.log("f_datef_datef_datef_datef_datef_datef_datef_datef_datef_datef_date", f_date)
  var todate = inp.toDate
  var tDate = new Date(todate)
  var t_date = tDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, '-');
  getMaterialSubCategoryMdl(function (err, results) {
    // console.log("get call results", results)
    var mat_list = [];
    results.forEach(function (item, index) {
      // console.log("item.AutoMaterialId",item.AutoMaterialId);
      mat_list.push(item.AutoMaterialId)
    })
    console.log("mat_listmat_listmat_listmat_list", mat_list)
    if (stock.materialId.length == 0) {
      stock.materialId = mat_list;
    }
    if (stock.fromDate.length == 0) {
      var x = new Date();
      x.setDate(1);

      x.setMonth(x.getMonth() - 1);
      stock.fromDate = x.toISOString().slice(0, 10)
    }
    if (stock.toDate.length == 0) {
      var x = new Date();
      stock.toDate = x.toISOString().slice(0, 10)
    }
    // console.log("data++++++++++=====================", data)

    materialIssueListOnDateFilterMdl(stock, function (err, results) {
      async function generateExcel() {


        // Execute the statement to fetch data in results
        const result = results;

        // Create Excel workbook and worksheet
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('Material Issued');

        workbook.modified = new Date();
        // Define columns in the worksheet, these columns are identified using a key.
        // var t = new Date()
        // worksheet.addRow({id: 1, name: 'John Doe', dob: new Date(1970, 1, 1)});
        var dobCol = worksheet.getRow(1);

        results.forEach(function (item, index) {
          item.UpdatedTimeStamp = item.UpdatedTimeStamp.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, '-');
          //console.log(item, index);
        });
        worksheet.getRow(1).values = ['Issue Transactions']
        // worksheet.getRow(1).values = ['Stock available']
        worksheet.mergeCells('A1', 'D1');
        var fromdate = inp.fromDate
        var fDate = new Date(fromdate)
        var f1_date = fDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, '-');
        var todate = inp.toDate
        var tDate = new Date(todate)
        var t1_date = tDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, '-');
        worksheet.getCell('D1').alignment = { vertical: 'middle', horizontal: 'center' };
        worksheet.getRow(2).values = ['', p_name, '', 'from : ' + f1_date, 'to : ' + t1_date]
        worksheet.getRow(4).values = ['S.no', 'Date', 'Material Name', 'Quantity', 'Metrics']
        let user_Arry = []
        for (var each in result) {
          var dict = {};
          dict = result[each]
          each = Number(each) + 1;

          dict["S.no"] = each
          // console.log("each++++++++++++++++", dict);
        };

        dobCol.worksheet.columns = [

          { key: "S.no", width: 5 },
          { key: "UpdatedTimeStamp", width: 16 },
          { key: 'MaterialName', width: 18 },
          { key: 'Quantity', width: 17 },
          { key: 'Metrics', width: 14 },
          // { header: 'slkijgydchup', key: t }



        ]

        worksheet.getColumn(4).numFmt = '#,##0;[Red]-�#,##0';
        for (const row of result) {
          worksheet.addRow(row);

        }

        var today = new Date()
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;


        var minutesToAdd = 330;
        var currentDate = new Date();
        var futureDate = new Date(currentDate.getTime() + minutesToAdd * 60000);
        var dateTime = futureDate.toString().substring(0, 24)

        worksheet.getRow(result.length + 6).values = ["Note: System Generated Report on " + dateTime]


        worksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {

          row.eachCell((cell, colNumber) => {


            if (rowNumber == 1) {
              // First set the background of header row
              cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'f5b914' }
              }
            }
            if (rowNumber == 4) {
              // First set the background of header row
              cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'f5b914' }
              }
            }
            // Set border of each cell 
            cell.border = {
              // top: { style: 'thin' },
              // left: { style: 'thin' },
              // bottom: { style: 'thin' },
              // right: { style: 'thin' }
            };
          })

          //Commit the changed row to the stream
          worksheet.getCell('A1').font = {
            // name: 'Comic Sans MS',
            family: 4,
            size: 14,
            // underline: true,
            bold: true,
            // fgColor: { argb: 'f5b914' },
            // color: { argb: 'FF00FF00' },
          }
          worksheet.getCell('A4').font = {
            family: 4,
            size: 10,
            bold: true,
            fgColor: { argb: 'f5b914' }
          }
          worksheet.getCell('B4').font = {
            family: 4,
            size: 10,
            bold: true,
            fgColor: { argb: 'f5b914' }
          }
          worksheet.getCell('C4').font = {
            family: 4,
            size: 10,
            bold: true,
            fgColor: { argb: 'f5b914' }
          }
          worksheet.getCell('D4').font = {
            family: 4,
            size: 10,
            bold: true,
            fgColor: { argb: 'f5b914' }
          }
          worksheet.getCell('E4').font = {
            family: 4,
            size: 10,
            bold: true,
            fgColor: { argb: 'f5b914' }
          }
          worksheet.getCell('F4').font = {
            family: 4,
            size: 10,
            bold: true,
            fgColor: { argb: 'f5b914' }
          }
          //Commit the changed row to the stream
          row.commit();
        });

        // Finally save the worksheet into the folder from where we are running the code. 
        const fileBuffer = await workbook.xlsx.writeBuffer()
        return fileBuffer
      }
      (async function () {
        let fileBuffer = await generateExcel().catch((error) => {
          console.error(error);
        });


        // const contents = fs.readFileSync('./SimpleCust.xlsx', { encoding: 'base64' });

        // });
        var d = new Date();
        var result = d.toISOString().replace("T", "-").replaceAll(":", "-").substring(0, 19);

        if (result) {
          var d = result;
          var project_name = "";
          Object.keys(d).forEach(function (key) {
            var value = d[key];
            project_name = value.ProjectName
            // console.log("1111111111111111111", y)

          });

          try {
            if (err) {
              console.log("err", err)
              res.send({ status: 400, message: "Not able to process the request, at the moment please try again" });
              return;
            }
            res.send({
              'status': 200, "message": "success", "base64Data": fileBuffer.toString('base64'), "csv": p_name + "-Material-Issue-Transactions-" + result +
                ".xlsx"
            });
            console.log("resul", results)
          } catch (error) {
            res.send({ status: 500, message: "Internal server error" })
          }

        }
      })();
    });

  });
};

//*************************************************WORK PROGRESSS************************************************************************/

// export const workProgressStatusCntrl = function (req, res) {
// console.log("1")
// var image_url = req.body.InvoiceImg;
// var data = req.body;
// console.log("2")
// // var project_id = data.project_id
// if (image_url != null && image_url != undefined && image_url != "") {

//   image_url = image_url.replace(/^data:image\/jpeg;base64,/, "");
//   var datetimestamp = Date.now();
//   var random_number = Math.floor(100000 + Math.random() * 900000);
//   var unicnumber = random_number + "" + datetimestamp;
//   var base64Data = image_url;
//   const __dirname = path.resolve();
//   var upload_path = path.join(__dirname, './uploads/workProgress');
//   var imagePath = "/uploads/workProgress" + "/" + unicnumber + ".jpeg";
//   if (!fs.existsSync(upload_path)) {
//     fs.mkdirSync("./uploads/workProgress", { recursive: true });
//   }
//   try {
//     fs.writeFile(
//       upload_path + "/" + unicnumber + ".jpeg",
//       base64Data,
//       "base64",
//       function (err) {
//         console.log(err);
//       }
//     );
//   } catch (err) {
//     return res.json({ message: "error in fs", err: err });
//   }
//   var imageupload = imagePath;
//   // console.log("imageupload", imageupload)
//   data.InvoiceImg = imageupload;
//   // console.log("data.InvoiceImg", data.InvoiceImg)
//   var data = data
// }
// try {
//   console.log("3")
//   workProgressStatus(data, function (err, results) {
//     console.log("resultsresultsresultsresultsresultsresults", results)
//     console.log("5")
//     console.log("================>", data)
//     if (err) {
//       res.json({ status: 400, message: "Not able to process the request, please try again" })
//     }
//     if (results) {

//       res.json({ status: 200, message: "Material added successfully" })
//     }

//   })
// } catch (error) {
//   res.send({ status: 500, message: "Internal server error" })
//   console.log(error)
// }

// }




export const workProgressStatusCntrl = function (req, res) {
  var data = req.body;



  delOldPath(data, function (err, results) {
    // var dir = results

    // console.log("dirdirdirdir",dir)
    if (results) {
      console.log("resultsresults", typeof results)
      // var text = results.toString()
      const text = JSON.stringify(results)
      console.log("texttexttexttext", text)
      console.log("texttexttexttext", typeof text)
      var replace = text.replace("[{", "").replace('"images"', '').replace('"/', '').replace(':"/', "").replace(":", "").replace('"}]', "")
      console.log("replacereplacereplacereplace", replace)
      if (fs.existsSync(replace)) {
        fs.rmdirSync(replace, { recursive: true })
        console.log("sucess")
      }
    }



    delWPMDMdl(data, function (err, results) {
      if (err) {
        res.send(500, "Server Error");
        return;
      }


      // console.log("results",results)
      if (results) {
        workProgressStatus1(data, function (err, results) {
          // console.log("datadatadatadatadata", data.mulImages)

          //   if (fs.existsSync( '/uploads/workProgress/7072281653640586646/1450761653640586651.jpeg')) {
          //     console.log('Found file');
          // } 





          try {
            if (err) {
              console.log("err", err)
              res.send({ status: 400, message: "Not able to process the request,please try again" });
              return;
            }
            res.send({ status: 200, message: "Work progress added successfully" });
            // console.log("workkkkkkkkkkkkkkkkkkkkkkkkkkkkk", results)
          } catch (err) {
            res.send({ status: 500, message: "Internal server error" })
          }
        });
      }
    })
  })
  // }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const workProgressCntrl = function (req, res) {

  var data = req.body;
  workProgressToSelectWork(data, function (err, results) {

    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 400, message: "Not able to process the request, at the moment please try again" });
        return;
      }
      res.send({ status: 200, message: "Work created successfully" });
      console.log("resul", results)
    } catch (error) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });
};



export const getworkProgressCntrl = function (req, res) {

  getworkProgressMdl(function (err, results) {
    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 400, message: "Not able to process the request,please try again" });
        return;
      }
      res.send({ status: 200, data: results, message: "Success" });
      console.log("resul", results)
    } catch (err) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });
};



export const getSteelCntrl = function (req, res) {

  getSteelMdl(function (err, results) {
    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 400, message: "Not able to process the request,please try again" });
        return;
      }
      res.send({ status: 200, data: results, message: "Success" });
      console.log("resul", results)
    } catch (err) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });
};




export const getPOLCntrl = function (req, res) {

  getPOLMdl(function (err, results) {
    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 400, message: "Not able to process the request,please try again" });
        return;
      }
      res.send({ status: 200, data: results, message: "Success" });
      console.log("resul", results)
    } catch (err) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });
};




export const getMDMetricsCntrl = function (req, res) {

  getMDMetricsMdl(function (err, results) {
    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 400, message: "Not able to process the request,please try again" });
        return;
      }
      res.send({ status: 200, data: results, message: "Success" });
      console.log("resul", results)
    } catch (err) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });
};

export const getPOLMetricsCnrl = function (req, res) {
  var data = req.params;
  getPOLMetricsMdl(data, function (err, results) {
    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 400, message: "Not able to process the request,please try again" });
        return;
      }
      res.send({ status: 200, data: results, message: "Success" });
      console.log("resul", results)
    } catch (err) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });
};



export const getSteelMetricsCntrl = function (req, res) {

  getSteelMetricsMdl(function (err, results) {
    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 400, message: "Not able to process the request,please try again" });
        return;
      }
      res.send({ status: 200, data: results, message: "Success" });
      console.log("resul", results)
    } catch (err) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });
};





// export const getWpStatusCntrl = function (req, res) {
//   var data = req.body;
//   console.log(data)

//   getWpStatusMdl(data, function (err, results) {
//     console.log("resultseqp", results)

//     getWpMDMdl(data, function (err, resultsmd) {
//       console.log("resultsmd", resultsmd)
//       // })

//       getSteeldataMdl(data, function (err, resultssteel) {
//         console.log("resultssteel", resultssteel)
//         // })
//         getWpstatusMdl(data, function (err, resultsstatus) {

//           // console.log("resultsstatusresultsstatusresultsstatus", resultsstatus.length === 0)
//           var image = resultsstatus.map(({ images }) => ({ images }));

//           console.log("image", image[0].images != 'Undefined')

//           if (resultsstatus.length === 0) {
//             return res.send({ "status": 500, "equipment": [], "MD": [], "steel": [], "resultsstatus": [], "data": data, "message": "No data enterd this day" })
//           }



//           // else if (image[0].images != null && image[0].images != 'undefined'  && image[0].images !== "") {

//           //   console.log("Statussssssssssssssssss", image)

//           //   console.log("pathhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh", path.resolve(path.dirname('')).replace("\\", "/"))
//           //   var folder_path = path.resolve(path.dirname('')).replace("\\", "/") + image[0].images;
//           //   console.log("folder_pathfolder_path", folder_path)
//           //   var arrayImage = []
//           //   var files = fs.readdirSync(folder_path);
//           //   console.log("filesfilesfilesfiles", files)
//           //   files.forEach(file => {
//           //     let fileStat = fs.statSync(folder_path + '/' + file).isDirectory();
//           //     // console.log("fileStatfileStatfileStat",fileStat)
//           //     if (!fileStat) {
//           //       arrayImage.push(image[0].images + "/" + file);
//           //     }
//           //   });
//           // }
//           else  if (image[0].images != "null" && image[0].images != "undefined" && image != "") {

//             console.log("Statussssssssssssssssss", image)

//             console.log("pathhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh", path.resolve(path.dirname('')).replace("\\", "/"))
//             var folder_path = path.resolve(path.dirname('')).replace("\\", "/") + image[0].images;
//             console.log("folder_pathfolder_path", folder_path)
//             var arrayImage = []
//             var files = fs.readdirSync(folder_path);
//             console.log("filesfilesfilesfiles", files)
//             files.forEach(file => {
//               let fileStat = fs.statSync(folder_path + '/' + file).isDirectory();
//               // console.log("fileStatfileStatfileStat",fileStat)
//               if (!fileStat) {
//                 arrayImage.push(image[0].images + "/" + file);
//               }
//              });
//           }

//           else {
//             arrayImage = []
//           }
//           // }




//           console.log("global", arrayImage)



//           try {
//             if (err) {
//               console.log("err", err)
//               res.send({ status: 400, "data": data, message: "err" });
//               return;
//             }



//             else if (results == 0 && resultsmd == 0 && resultssteel == 0 && resultsstatus == 0) {
//               res.send({ "status": 500, "equipment": [], "MD": [], "steel": [], "resultsstatus": [], "data": data, "message": "No data enterd this day" })
//             }


//             else { res.send({ "status": 200, "equipment": results, "MD": resultsmd, "steel": resultssteel, resultsstatus, arrayImage, "data": data, "message": "success" }) };


//             // console.log("resulllllllllllllllllllllllllll", results);




//           } catch (err) {
//             res.send({ status: 600, "data": data, message: "Internal server error" })
//           }
//         });
//       });
//     });
//   });
// };


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////










export const getWpStatusCntrl = function (req, res) {
  var data = req.body;
  console.log(data)

  getWpEquipMdl(data, function (err, results) {
    console.log("resultseqp", results)

    getWpMDMdl(data, function (err, resultsmd) {
      console.log("resultsmd", resultsmd)
      // })

      getSteeldataMdl(data, function (err, resultssteel) {
        console.log("resultssteel", resultssteel)
        // })
        getWpstatusMdl(data, function (err, resultsstatus) {

          // console.log("resultsstatusresultsstatusresultsstatus", resultsstatus.length === 0)
          var image = resultsstatus.map(({ images }) => ({ images }));

          if (resultsstatus.length === 0) {
            return res.send({ "status": 500, "equipment": [], "MD": [], "steel": [], "resultsstatus": [], "data": data, "message": "No data enterd this day" })
          }


          else if (image[0].images != "null" && image[0].images != "undefined" && image != "") {

            console.log("Statussssssssssssssssss", image)

            console.log("pathhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh", path.resolve(path.dirname('')).replace("\\", "/"))
            var folder_path = path.resolve(path.dirname('')).replace("\\", "/") + image[0].images;
            console.log("folder_pathfolder_path", folder_path)
            var arrayImage = []
            var files = fs.readdirSync(folder_path);
            console.log("filesfilesfilesfiles", files)
            files.forEach(file => {
              let fileStat = fs.statSync(folder_path + '/' + file).isDirectory();
              // console.log("fileStatfileStatfileStat",fileStat)
              const PORT = process.env.PORT;
              console.log(PORT)
              if (!fileStat) {
                arrayImage.push(`http://143.110.241.155:${PORT}` + image[0].images + "/" + file);
              }
            });
          }




          else {
            arrayImage = []
          }
          // }

          // const files  = fs.readdir(path.resolve(path.dirname('')).replace("\\", "/") + image[0].images, function (err, files) {
          //   console.log("Files28583-285-283-5082-305", files)

          //   // console.log("filesfilesfiles", files)

          //   files.forEach( function  (file) {

          //     var images = image[0].images + "/" + file
          //     resolve(this.arrayImage.push(images))
          //     // return arrayImage;
          //     // console.log("arayyyyyyyyyyyyyyyyy=========", arrayImage)


          //   })
          //   return arrayImage
          // })


          console.log("global", arrayImage)
          try {
            if (err) {
              console.log("err", err)
              res.send({ status: 400, "data": data, message: "err" });
              return;
            }


            else if (results == 0 && resultsmd == 0 && resultssteel == 0 && resultsstatus == 0) {
              res.send({ "status": 500, "equipment": [], "MD": [], "steel": [], "resultsstatus": [], "data": data, "message": "No data enterd this day" })
            }


            else { res.send({ "status": 200, "equipment": results, "MD": resultsmd, "steel": resultssteel, resultsstatus, arrayImage, "data": data, "message": "success" }) };


            // console.log("resulllllllllllllllllllllllllll", results);




          } catch (err) {
            res.send({ status: 600, "data": data, message: "Internal server error" })
          }
        });
      });
    });
  });
};









export const purchaseOrderCntrl = function (req, res) {
  var image_url = req.body.InvoiceImg;
  var data = req.body;

  if (image_url != null && image_url != undefined && image_url != "") {

    image_url = image_url.replace(/^data:image\/jpeg;base64,/, "");
    var datetimestamp = Date.now();
    var random_number = Math.floor(100000 + Math.random() * 900000);
    var unicnumber = random_number + "" + datetimestamp;
    var base64Data = image_url;
    const __dirname = path.resolve();
    var upload_path = path.join(__dirname, './uploads/purchaseOrder');
    var imagePath = "/uploads/purchaseOrder" + "/" + unicnumber + ".jpeg";
    if (!fs.existsSync(upload_path)) {
      fs.mkdirSync("./uploads/purchaseOrder", { recursive: true });
    }
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
    var imageupload = imagePath;
    console.log("imageupload", imageupload)
    data.InvoiceImg = imageupload;
    console.log("data.InvoiceImg", data.InvoiceImg)
    var data = data
  }
  try {
    purchaseOrderMdl(data, function (err, results) {

      console.log("================>", data)
      if (err) {
        res.json({ status: 400, message: "Not able to process the request, please try again" })
      }
      if (results) {

        res.json({ status: 200, message: "Material added successfully" })
      }

    })
  } catch (error) {
    res.send({ status: 500, message: "Internal server error" })
    console.log(error)
  }

}







export const getPurchaseOrderListCntrl = function (req, res) {
  getPurchaseOrderListMdl(function (err, results) {
    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 400, message: "Not able to process the request, at the moment please try again" });
        return;
      }
      res.send({ status: 200, data: results, message: "Success" });
      console.log("resul", results)
    } catch (err) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });
};





export const getDatesCntrl = function (req, res) {

  var data = req.body;
  getDatesMdl(data, function (err, results) {
    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 400, message: "Not able to process the request, at the moment please try again" });
        return;
      }
      res.send({ status: 200, dates: results, message: "Success" });
      console.log("resul", results)
    } catch (error) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });
};





export const poListByProject = function (req, res) {

  var data = req.params;
  poListByProjectMdl(data, function (err, results) {
    try {
      if (err) {
        console.log("err", err)
        res.send({ status: 400, message: "Not able to process the request, at the moment please try again" });
        return;
      }
      res.send({ status: 200, data: results, message: "Success" });
      // console.log("resul", results)
    } catch (err) {
      res.send({ status: 500, message: "Internal server error" })
    }
  });
};






//  export const sendemailCtrl = function (req, res) {
//   var transporter = nodemailer.createTransport({
//     service: "gmail",
//     secure: true,
//     host: "my.smtp.host",
//     port: 465,
//     auth: {
//       user: "srijakuntamukkala870@gmail.com",
//       pass: "Bunnu#81",
//       //   accessToken: 'ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x'
//     },
//     tls: {
//       // do not fail on invalid certs
//       rejectUnauthorized: false,
//     },
//   });

//   var mailOptions = {
//     from: "srijakuntamukkala870@gmail.com",
//     to: "lokeshkolli555@gmail.com",
//     subject: "Sending Email using Node.js",
//     text: "That was easy!",
//   };

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log(info);
//       console.log("Email sent: " + info.response);
//     }
//   });
// };