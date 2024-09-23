

CREATE  VIEW `materialstock` AS select `a`.`ProjectId` AS `ProjectId`,`a`.`MaterialId` AS `MaterialId`,`a`.`ProjectName` 
AS `ProjectName`,`a`.`MaterialName` AS `MaterialName`,(`a`.`Quantity` - ifnull(`b`.`Quantity`,0)) AS `stock
` from ((select `inframaterialsreceipts`.`ProjectId` AS `ProjectId`,`inframaterialsreceipts`.`MaterialId` AS
 `MaterialId`,`infraprojects`.`ProjectName` AS `ProjectName`,`inframaterials`.`MaterialName` AS `MaterialName`,
 ifnull(sum(`inframaterialsreceipts`.`Quantity`),0) AS `Quantity` from ((`inframaterialsreceipts` join `infraprojects` 
 on((`infraprojects`.`AutoProjectId` = `inframaterialsreceipts`.`ProjectId`))) join `inframaterials`
 on((`inframaterials`.`AutoMaterialId` = `inframaterialsreceipts`.`MaterialId`))) where 
 (`inframaterialsreceipts`.`Status` = 'approve') group by
 `inframaterialsreceipts`.`MaterialId`,`inframaterialsreceipts`.`ProjectId`) `a` 
 left join (select `inframaterialsissue`.`ProjectId` AS `ProjectId`,`inframaterialsissue`.`MaterialId`
 AS `MaterialId`,`infraprojects`.`ProjectName` AS `ProjectName`,`inframaterials`.`MaterialName` AS `MaterialName`,
 ifnull(sum(`inframaterialsissue`.`Quantity`),0) AS `Quantity` from ((`inframaterialsissue` join `infraprojects`
 on((`infraprojects`.`AutoProjectId` = `inframaterialsissue`.`ProjectId`))) join `inframaterials` 
 on((`inframaterials`.`AutoMaterialId` = `inframaterialsissue`.`MaterialId`))) where 
 (`inframaterialsissue`.`Status` = 'approve') group by `inframaterialsissue`.`MaterialId`,`inframaterialsissue`.`ProjectId`)
 `b` on(((`a`.`ProjectId` = `b`.`ProjectId`) 
and (`a`.`MaterialId` = `b`.`MaterialId`))));

###########MATERIAL RECEIPT VIEW############################################################################

CREATE VIEW `materialreceiptslist` AS select `b`.`MaterialId` AS `MaterialId`,`b`.`AutoMaterialReceiptId` AS 
`AutoMaterialReceiptId`,`a`.`MaterialName` AS `MaterialName`,`a`.`MaterialCategory` AS `MaterialCategory`,
`a`.`MaterialSubCategory` AS `MaterialSubCategory`,`d`.`ProjectName` AS `ProjectName`,`e`.`SubProjectName`
 AS `SubProjectName`,`b`.`MaterialReceiptId` AS `MaterialReceiptId`,`b`.`PurchaseDate` AS `PurchaseDate`,
 `c`.`FullName` AS `FullName`,`f`.`VendorName` AS `VendorName`,`b`.`UpdatedTimeStamp` AS `UpdatedTimeStamp`,
 `b`.`Quantity` AS `Quantity`,`b`.`Price` AS `Price`,`b`.`Metrics` AS `Metrics`,`b`.`PurchaseOrderId1` AS 
 `PurchaseOrderId1`,`b`.`PurchaseOrderId` AS `PurchaseOrderId`,`b`.`DateReceived` AS `DateReceived`,`b`.`VoucherDate` 
 AS `VoucherDate`,`b`.`InvoiceNo` AS `InvoiceNo`,`b`.`VehicleNo` AS `VehicleNo`,`b`.`Location` AS `Location`,
 `b`.`InvoiceImg` AS `InvoiceImg`,`b`.`Notes` AS `Notes`,`b`.`Status` AS `Status` from 
 (((((`inframaterials` `a` join `inframaterialsreceipts` `b` on((`a`.`AutoMaterialId` = `b`.`MaterialId`))) 
 join `infrausers` `c` on((`b`.`UserId` = `c`.`AutoUserId`))) join `infraprojects` `d` 
 on((`b`.`ProjectId` = `d`.`AutoProjectId`))) join `infrasubprojects` `e` 
 on((`b`.`SubProjectId` = `e`.`AutoSubProjectId`))) join `infravendors`
 `f` on((`b`.`VendorId` = `f`.`AutoVendorId`)));
 
 
 ###################################################MATERIAL ISSUE VIEW######################################################
CREATE VIEW `materialissuelist` AS select `b`.`MaterialId` AS `MaterialId`,`b`.`AutoMaterialIssueId` 
AS `AutoMaterialIssueId`,`a`.`MaterialName` AS `MaterialName`,`a`.`MaterialCategory` AS `MaterialCategory`,
`a`.`MaterialSubCategory` AS `MaterialSubCategory`,`d`.`ProjectName` AS `ProjectName`,`e`.`SubProjectName` 
AS `SubProjectName`,`c`.`FullName` AS `FullName`,`b`.`UpdatedTimeStamp` AS `UpdatedTimeStamp`,`b`.`Quantity` 
AS `Quantity`,`b`.`Metrics` AS `Metrics`,`b`.`IssuedDate` AS `IssuedDate`,`b`.`IssuedLocation` AS `IssuedLocation`,
`b`.`DeliverLocation` AS `DeliverLocation`,`b`.`IssueVehicleNo` AS `IssueVehicleNo`,`b`.`InvoiceImg` AS `InvoiceImg`,
`b`.`ReceivedBy` AS `ReceivedBy`,`b`.`Notes` AS `Notes`,`b`.`Status` AS `Status` from
 ((((`inframaterials` `a` join `inframaterialsissue` `b` on((`a`.`AutoMaterialId` = `b`.`MaterialId`))) 
 join `infrausers` `c` on((`b`.`UserId` = `c`.`AutoUserId`))) join `infraprojects` `d` 
 on((`b`.`ProjectId` = `d`.`AutoProjectId`))) join `infrasubprojects` `e` on((`b`.`SubProjectId` = `e`.`AutoSubProjectId`)));
 
 ######################################################################################################################
 
ALTER TABLE inframaterialsissue ALTER COLUMN Status SET DEFAULT 'pending';
ALTER TABLE inframaterialsreceipts ALTER COLUMN Status SET DEFAULT 'pending';
