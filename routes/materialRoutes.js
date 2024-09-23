// import { json } from "body-parser";
import express from "express";
import {
    getUserCntrl,
    getSubProjectCntrl,
    getVendorcntrl,
    issueMaterialCntrl,
    projectCntrl,
    getMaterialCntrl,
    getMetricsCntrl,
    addMaterialReceipt,
    updateProjectCntrl,
    postandGetUpdateProject,
    receiptListByProject,
    issueListByProject,
    getSubCategoryCntrl,

    materialIssueListOnDateFilterCntrl,

    get15DaysIssueListCntrl,
    getTransactionReportCntrl,
    allTransactionDateFilterCntrl,



    getPendingReceiptMaterialCntrl,
    getPendingIssueMaterialCntrl,
    materialReceiptApproveCntrl,
    materialIssueApproveCntrl,
    stockCntrl,
    getMaterialSubCategoryCntrl,
    get15DaysReceiptListCntrl,
    materialReceiptListOnDateFilterCntrl,
    // workProgressCntrl,
    getEquipmentCntrl,
    getWorkTypeCntrl,
    getSubWorkTypeCntrl,
    equipmentMetricsCntrl,
    workSubTypeMetricsCntrl,




    materialImageCollectionCntrl,
    equipmentImageCollection,


    getMaterialStockcntrl,

    materialPDFCntrlwithfilters,
    issuePDFCntrlwithfiltersCntrl,
    allTransactionPDFWithFilters,
    stockMaterialPDFfilterCntrl,


    get_equipment_machinary_type_Cntrl,
    getWorkComponentCntrl,
   
    getMixedDesignMaterialCntrl,
    addMaterialDesignTransactionsCntrl,

    mulMaterialCntrl,

    getMDsubWorkCntrl,

    addMaterialDesignTransactionsCntrl1,
    stockCSVCntrl,
    allTransactionDateCSV,
    receiptDataCSV,
    materialIssueCSV,


    workProgressStatusCntrl,
    workProgressCntrl,
    getworkProgressCntrl,
    getSteelCntrl,
    getPOLCntrl,
    getMDMetricsCntrl,
    getPOLMetricsCnrl,
    getSteelMetricsCntrl,
    // dayCheckCntrl,
    getWpStatusCntrl,



    purchaseOrderCntrl,
    getPurchaseOrderListCntrl,
    getDatesCntrl,
    poListByProject,



  
    // poc
} from "../controllers/materialController.js";




const route = express.Router()



route.get("/getMetrics", getMetricsCntrl);
route.get("/getSubCategory/:materialCategory", getSubCategoryCntrl);
route.get("/getUserRoles", getUserCntrl);
route.get("/getMainCategory", getMaterialCntrl);
route.get("/getProject", projectCntrl);
route.get("/getSubProject/:AutoProjectId", getSubProjectCntrl);
route.get("/getVendors", getVendorcntrl)
route.post("/issueMaterial", issueMaterialCntrl);
route.post("/addMaterial", addMaterialReceipt)
route.post("/updateProject", updateProjectCntrl);
route.get("/getIssueMaterial/:ProjectName", issueListByProject);
route.get("/getMaterial/:ProjectName", receiptListByProject);
route.post("/postandGetUpdateProject", postandGetUpdateProject);
route.post("/updateProject", updateProjectCntrl);





//***********************************************Phase 2 APIS*********************************************************************/

//********************************************** Release 2 Approval of Materials*************************************************/
// Get Material Receipts for approve
route.get("/getPendingReceiptMaterial/:ProjectName", getPendingReceiptMaterialCntrl);
route.get("/getPendingIssueMaterial/:ProjectName", getPendingIssueMaterialCntrl);

// Approve Material Receipts/Issue by the admin
route.post("/materialApproveCntrl", materialReceiptApproveCntrl);
route.post("/approveMaterialIssue", materialIssueApproveCntrl);

//Stock
route.get("/getSubMaterialCategory", getMaterialSubCategoryCntrl);
route.post("/stockAvailability", stockCntrl);

//Receipt Transactions
route.get("/get15DaysReceiptList/:ProjectName", get15DaysReceiptListCntrl)
route.post("/materialReceiptListOnDateFilter", materialReceiptListOnDateFilterCntrl);

//Issue Transaction

route.get("/get15DaysIssueList/:ProjectName", get15DaysIssueListCntrl)
route.post("/materialIssueListOnDateFilter", materialIssueListOnDateFilterCntrl);

//All Transactions

route.get("/getTransactionReport/:ProjectName", getTransactionReportCntrl);
route.post("/allTransactionDateFilter", allTransactionDateFilterCntrl);

//Work Progress
// route.post("/workProgress", workProgressCntrl)


route.get("/getEquipmentValues", getEquipmentCntrl)

route.get("/getWorkType", getWorkTypeCntrl)

route.get("/getSubWorkType/:work_type_id", getSubWorkTypeCntrl)

// route.post("/poc",poc)


route.get("/subWorkEquipmentMetrics", equipmentMetricsCntrl)
route.get("/workSubTypeMetrics", workSubTypeMetricsCntrl)

// route.post("/workProgress1o",  workProgressCntrl1o)


// route.post("/materialPDF", materialPDFCntrl);
// route.post("/issueMaterialPDFC", issueMaterialPDFCntrl);
// route.post("/stockMaterialPDF", stockMaterialPDFCntrl);
// route.post("/allTransactionPDF", allTransactionPDF);



route.post("/materialImageCollection", materialImageCollectionCntrl);
route.post("/equipmentImageCollection", equipmentImageCollection);


route.get("/getMaterialStock/:ProjectName", getMaterialStockcntrl)


route.post("/materialPDFCntrlwithfilters", materialPDFCntrlwithfilters)
route.post("/issuePDFCntrlwithfilters", issuePDFCntrlwithfiltersCntrl)
route.post("/allTransactionPDFWithFilters", allTransactionPDFWithFilters)

route.post("/stockMaterialPDFfilter", stockMaterialPDFfilterCntrl)







///Mixed DeSIGN////////////
route.get("/equipmentMachineryType", get_equipment_machinary_type_Cntrl)
route.get("/getWorkComponent/:project_id/:Sub_Project_id", getWorkComponentCntrl)
// route.get("/getSubWorkComponent", getSubWorkComponentTypeCntrl)


route.get("/mixedDesignMaterial",getMixedDesignMaterialCntrl)
route.post("/addMaterialDesignTransactions",addMaterialDesignTransactionsCntrl)
route.get("/getMDsubWork/:Sub_Project_name", getMDsubWorkCntrl)
route.post("/addMaterialDesignTransactions1",addMaterialDesignTransactionsCntrl1),

route.post("/mulMaterial",mulMaterialCntrl);


route.post("/stockMaterialCSVfilter", stockCSVCntrl);

route.post("/allTransactionDataCSV", allTransactionDateCSV);

route.post("/receiptDataCSV", receiptDataCSV);

route.post("/materialIssueCSV", materialIssueCSV);

route.post("/workProgressforWork",workProgressCntrl)
route.post("/workProgresStatus", workProgressStatusCntrl);

route.get("/getworkProgress",getworkProgressCntrl);
route.get("/getSteelData", getSteelCntrl)
route.get("/getPOLData", getPOLCntrl)



route.get("/getMDMetricsData", getMDMetricsCntrl)
route.get("/getPOLMetricsData/:AutoMaterialId", getPOLMetricsCnrl)
route.get("/getSteelMetricsData", getSteelMetricsCntrl)
// route.get("/get")
// route.post("/dayCheckToEnter", dayCheckCntrl)
route.post("/getWpStatusData",getWpStatusCntrl)


route.post("/getDates",getDatesCntrl)
route.post("/postPurchaseOrder",purchaseOrderCntrl)
route.get("/getPurchaseOrderList",getPurchaseOrderListCntrl)
route.get("/getPurchaseOrderList/:ProjectName", poListByProject);




export default route;



