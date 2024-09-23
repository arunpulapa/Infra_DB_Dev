CREATE DATABASE IF NOT EXISTS infradbdev;
USE infradbdev;

CREATE TABLE IF NOT EXISTS infraprojects(
	AutoProjectId	int NOT NULL AUTO_INCREMENT,
	ProjectId 	nvarchar(20),
    ProjectName varchar(80) NOT NULL,
    ProjectDescription nvarchar(255),
    ProjectType nvarchar(20) NOT NULL,
    ProjectAddress nvarchar(80) NOT NULL,
    ProjectCity nvarchar(20) NOT NULL,
    ProjectState nvarchar(20) NOT NULL,
    ProjectCountry nvarchar(20) NOT NULL,
    ProjectZipCode nvarchar(20) NOT NULL,
    ProjectEstimatedValue DECIMAL(19,2) NOT NULL,
    ProjectStatus nvarchar(20),
    ProjectStartDate DATE NOT NULL,
    ProjectEndDate DATE NOT NULL,
    UpdatedBy nvarchar(50) NOT NULL,
    UpdatedTimeStamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    primary key (AutoProjectId)
);

ALTER TABLE infraprojects
ADD CONSTRAINT UC_Projects UNIQUE (ProjectName );

CREATE TABLE IF NOT EXISTS  infrasubprojects(
	AutoSubProjectId int NOT NULL AUTO_INCREMENT,
	SubProjectId 	nvarchar(20),
    SubProjectName nvarchar(80) NOT NULL,
    AutoProjectId int NOT NULL,
    SubProjectDescription nvarchar(255),
    SubProjectType nvarchar(20) NOT NULL,
    SubProjectAddress nvarchar(80) NOT NULL, 
    SubProjectCity nvarchar(20) NOT NULL,
    SubProjectState nvarchar(20) NOT NULL,
    SubProjectCountry nvarchar(20) NOT NULL, 
    SubProjectZipCode nvarchar(20) NOT NULL, 
    SubProjectEstimatedValue DECIMAL(19,2) not null, 
    SubProjectStatus nvarchar(20), 
    SubProjectStartDate DATE not null, 
    SubProjectEndDate DATE not null, 
    UpdatedBy nvarchar(20) NOT NULL,
    UpdatedTimeStamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(AutoSubProjectId),
	INDEX par_ind (AutoSubProjectId),
    FOREIGN KEY (AutoProjectId)
	REFERENCES infraprojects(AutoProjectId)
	ON DELETE CASCADE
);

ALTER TABLE infrasubprojects
ADD CONSTRAINT UC_SubProjects UNIQUE (SubProjectName);

CREATE TABLE IF NOT EXISTS infrauserroles(
	AutoRoleId int NOT NULL auto_increment,
    RoleId NVARCHAR(20),
    RoleName NVARCHAR(20) NOT NULL,
    RoleType NVARCHAR (20) not null,
    RoleDescription VARCHAR(80),
    UpdatedBy varchar(40) NOT NULL,
    UpdatedTimeStamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(AutoRoleId)
    );
    
ALTER TABLE infrauserroles
ADD CONSTRAINT UC_UserRoles UNIQUE (RoleName);


CREATE TABLE IF NOT EXISTS  infrausers(
	AutoUserId int NOT NULL auto_increment,
    UserEmail NVARCHAR(40) NOT NULL,
    UserMobileNumber NVARCHAR(20) NOT NULL, 
    FullName NVARCHAR(40) NOT NULL, 
    Address NVARCHAR(80), 
    District NVARCHAR(20),
    State NVARCHAR(20),
    Country NVARCHAR(20),
    ProjectId int,
    SubProjectId int,
    RoleId int,
    Status NVARCHAR(20),
    Password NVARCHAR(255) not null, 
    UpdatedBy nvarchar(40) NOT NULL,
    UpdatedTimeStamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(AutoUserId),
	INDEX par_ind (AutoUserId),
    FOREIGN KEY (RoleId)
	REFERENCES infrauserroles(AutoRoleId)
	ON DELETE SET NULL
	ON UPDATE CASCADE,
    FOREIGN KEY (ProjectId)
	REFERENCES infraprojects(AutoProjectId)
	ON DELETE SET NULL
	ON UPDATE CASCADE,
    FOREIGN KEY (SubProjectId)
	REFERENCES infrasubprojects(AutoSubProjectId)
	ON DELETE SET NULL
	ON UPDATE CASCADE
);

ALTER TABLE infrausers
ADD CONSTRAINT UC_Users UNIQUE (UserEmail,UserMobileNumber);

CREATE TABLE IF NOT EXISTS infrauserpasswords (
	AutoId int not null auto_increment,
    UserId int,
    password nvarchar(20) NOT NULL,
    UpdatedBy nvarchar(40) NOT NULL,
    UpdatedTimeStamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(AutoId),
	INDEX par_ind (AutoId),
    FOREIGN KEY (UserId)
	REFERENCES infrausers(AutoUserId)
	ON DELETE SET NULL
	ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS infrauserprojects (
	AutoId int not null auto_increment,
    UserId int ,
    ProjectId int,
    SubProjectId int ,
    AssignedDate date,
    UpdatedBy nvarchar(40) NOT NULL,
    UpdatedTimeStamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(AutoId),
	INDEX par_ind (AutoId),
    FOREIGN KEY (ProjectId)
	REFERENCES infraprojects(AutoProjectId)
	ON DELETE SET NULL
	ON UPDATE CASCADE,
    FOREIGN KEY (SubProjectId)
	REFERENCES infrasubprojects(AutoSubProjectId)
	ON DELETE SET NULL
	ON UPDATE CASCADE,
    FOREIGN KEY (userid)
	REFERENCES infrausers(AutoUserId)
	ON DELETE SET NULL
	ON UPDATE CASCADE
);



CREATE TABLE IF NOT EXISTS inframaterials(
	AutoMaterialId int NOT NULL auto_increment,
    MaterialId NVARCHAR(20),
    MaterialName NVARCHAR(40) NULL,
    MaterialCategory NVARCHAR(20) NOT NULL,
    MaterialSubCategory NVARCHAR(20) NOT NULL,
    MaterialDescription NVARCHAR(80) NOT NULL, 
    Metrics NVARCHAR(20) NOT NULL,
    Price   DECIMAL(19,2), 
    MateialNotes NVARCHAR(80),
    UpdatedBy nvarchar(40) NOT NULL,
    UpdatedTimeStamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(AutoMaterialId)
    );
    
    
ALTER TABLE inframaterials
ADD CONSTRAINT UC_InfraMaterials UNIQUE KEY (MaterialSubCategory);


CREATE TABLE IF NOT EXISTS infravendors(
	AutoVendorId int NOT NULL auto_increment,
    VendorId NVARCHAR(20) NULL,
    VendorName NVARCHAR(40) NOT NULL,
    VendorDescription NVARCHAR(80),
    VendorLocation NVARCHAR(20),
    VendorType NVARCHAR(20),
    UpdatedBy nvarchar(40) NOT NULL,
    UpdatedTimeStamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY(AutoVendorId)
);

ALTER TABLE infravendors
ADD CONSTRAINT UC_InfraVendors UNIQUE (AutoVendorId, VendorId, VendorName);

CREATE TABLE IF NOT EXISTS inframaterailpurchaseorders(
	AutoMaterialPurchaseOrderId int NOT NULL AUTO_INCREMENT,
    MaterialPurchaseId NVARCHAR(20),
    MaterialId int,
    ProjectId int,
    SubProjectId int,
    VendorId int,
    UserId int,
    PurchaseOrderDate DATE,
    QunatityOrdered int,
    Metrics NVARCHAR(20),
    PurchaseOrderCost decimal(19,4),
    OrderPlacedLocation NVARCHAR(20),
    EstiamtedOrderDeliveryDate DATE,
    PurchaseOrderStatus NVARCHAR(20),
	Notes NVARCHAR(80),
    UpdatedBy nvarchar(40) NOT NULL,
    UpdatedTimeStamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY(AutoMaterialPurchaseOrderId),
	INDEX par_ind (AutoMaterialPurchaseOrderId),
	FOREIGN KEY (ProjectId)
	REFERENCES infraprojects(AutoProjectId)
	ON DELETE SET NULL
	ON UPDATE CASCADE,
    FOREIGN KEY (SubProjectId)
	REFERENCES infrasubprojects(AutoSubProjectId)
	ON DELETE SET NULL
	ON UPDATE CASCADE,
    FOREIGN KEY (MaterialId)
	REFERENCES inframaterials(AutoMaterialId)
	ON DELETE SET NULL
	ON UPDATE CASCADE

);



CREATE TABLE IF NOT EXISTS inframaterialsreceipts(
	AutoMaterialReceiptId int NOT NULL auto_increment,
    MaterialId int ,
    PurchaseOrderId int,
    PurchaseOrderId1 NVARCHAR(20),
    MaterialReceiptId NVARCHAR(20),
    UserId int ,
    ProjectId int ,
    SubProjectId int,
    PurchaseDate Date,
    Quantity decimal(10,2) NOT NULL,
    Price decimal(12,2), 
    VendorId int,
    Metrics NVARCHAR(20),
    DateReceived DATE,
    VoucherDate DATE,
    InvoiceNo nvarchar(20),
    VehicleNo nvarchar(20),
    Location nvarchar(20),
    InvoiceImg nvarchar(255),
    ReceivedBy nvarchar(40), 
    Notes nvarchar(80),
    UpdatedBy nvarchar(40) NOT NULL,
    UpdatedTimeStamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(AutoMaterialReceiptID),
	INDEX par_ind (AutoMaterialReceiptId),
    FOREIGN KEY (ProjectId)
	REFERENCES infraprojects(AutoProjectId)
	ON DELETE SET NULL
	ON UPDATE CASCADE,
    FOREIGN KEY (SubProjectId)
	REFERENCES infrasubprojects(AutoSubProjectId)
	ON DELETE SET NULL
	ON UPDATE CASCADE,
    FOREIGN KEY (MaterialId)
	REFERENCES inframaterials(AutoMaterialId)
	ON DELETE SET NULL
	ON UPDATE CASCADE,
	FOREIGN KEY (VendorId)
	REFERENCES infravendors(AutoVendorId)
	ON DELETE SET NULL
	ON UPDATE CASCADE,
    FOREIGN KEY (UserId)
	REFERENCES infrausers(AutoUserId)
	ON DELETE SET NULL
	ON UPDATE CASCADE
);


CREATE TABLE IF NOT EXISTS inframaterialsissue(	
	AutoMaterialIssueId int Not NUll AUTO_INCREMENT,
    MaterialIssueId NVARCHAR(20),
    MaterialId int ,
    UserId int,
    ProjectId int,
    SubProjectId int,
    Quantity decimal(10,2) NOT NULL,
    Metrics VARCHAR(255) NOT NULL,
    IssuedDate DATE NOT NULL,
	IssuedLocation NVARCHAR(20),
    DeliverLocation NVARCHAR(20),
    IssueVehicleNo NVARCHAR(20),
	InvoiceImg nvarchar(255),
    ReceivedBy NVARCHAR(40),
    Notes NVARCHAR(80),
    UpdatedBy nvarchar(40) NOT NULL,
    UpdatedTimeStamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY(AutoMaterialIssueId),
	INDEX par_ind (AutoMaterialIssueId),
    FOREIGN KEY (UserId)
	REFERENCES infrausers(AutoUserId)
	ON DELETE SET NULL
	ON UPDATE CASCADE,
    FOREIGN KEY (MaterialId)
	REFERENCES inframaterials(AutoMaterialId)
	ON DELETE SET NULL
	ON UPDATE CASCADE,
    FOREIGN KEY (ProjectId)
	REFERENCES infraprojects(AutoProjectId)
	ON DELETE SET NULL
	ON UPDATE CASCADE,
    FOREIGN KEY (SubProjectId)
	REFERENCES infrasubprojects(AutoSubProjectId)
	ON DELETE SET NULL
	ON UPDATE CASCADE,
    FOREIGN KEY (MaterialId)
	REFERENCES inframaterials(AutoMaterialId)
	ON DELETE SET NULL
	ON UPDATE CASCADE
);



CREATE TABLE IF NOT EXISTS infrausermatrix(
	AutoMatrixId int NOT NULL AUTO_INCREMENT,
    RoleId int,
    Functionality NVARCHAR(20) NOT NULL,
    Subfunctionality NVARCHAR(20) NOT NULL,
    Permission binary NOT NULL,
	Notes NVARCHAR(40),
	PRIMARY KEY(AutoMatrixId),
	INDEX par_ind (AutoMatrixId),
	FOREIGN KEY (RoleId)
	REFERENCES infrauserroles(AutoRoleId)
	ON DELETE SET NULL
	ON UPDATE CASCADE
);



CREATE TABLE IF NOT EXISTS inframaterailstock (
	AutoId int not null auto_increment,
    MaterialId int,
    QuantityInStock int not null, 
    Date date,
    UpdatedBy nvarchar(40) NOT NULL,
    UpdatedTimeStamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY(AutoId),
	INDEX par_ind (AutoId),
    FOREIGN KEY (MaterialId)
	REFERENCES inframaterials(AutoMaterialId)
	ON DELETE SET NULL
	ON UPDATE CASCADE
);

#############################Create view for displaying material receipts list ##################################

CREATE VIEW  materialreceiptslist 
AS (
SELECT  b.MaterialId,
		a.MaterialName,
		a.MaterialCategory,
		a.MaterialSubCategory,
        d.ProjectName,
        e.SubProjectName,
        b.MaterialReceiptId,
        b.PurchaseDate,
        c.FullName,
        f.VendorName,
        b.UpdatedTimeStamp,
        b.Quantity,
        b.Price,
        b.Metrics,
        b.PurchaseOrderId1,
        b.PurchaseOrderId,
        b.DateReceived,
        b.VoucherDate,
        b.InvoiceNo,
        b.VehicleNo,
        b.Location,
        b.InvoiceImg,
        b.Notes
FROM    inframaterials a
        INNER JOIN inframaterialsreceipts b
            ON a.AutoMaterialId = b.MaterialId
		INNER JOIN infrausers c
			ON b.UserId = c.AutoUserId 
		INNER JOIN infraprojects d
			ON b.ProjectId = d.AutoProjectId
		INNER JOIN infrasubprojects e
			ON b.SubProjectId = e.AutoSubProjectId
		INNER JOIN infravendors f
			ON b.VendorId = f.AutoVendorId);
            

#############################Create view for displaying material issue list ##################################


CREATE VIEW  materialissuelist 
AS (
SELECT  b.MaterialId,
		a.MaterialName,
		a.MaterialCategory,
		a.MaterialSubCategory,
        d.ProjectName,
        e.SubProjectName,
        c.FullName,
        b.UpdatedTimeStamp,
        b.Quantity,
        b.Metrics,
        b.IssuedDate,
        b.IssuedLocation,
        b.DeliverLocation,
        b.IssueVehicleNo,
        b.InvoiceImg,
        b.ReceivedBy,
        b.Notes
FROM    inframaterials a
        INNER JOIN inframaterialsissue b
            ON a.AutoMaterialId = b.MaterialId
		INNER JOIN infrausers c
			ON b.UserId = c.AutoUserId 
		INNER JOIN infraprojects d
			ON b.ProjectId = d.AutoProjectId
		INNER JOIN infrasubprojects e
			ON b.SubProjectId = e.AutoSubProjectId);
		#############################Create view for displaying material issue list ##################################
        
        
CREATE VIEW `materialstock` AS
select a.ProjectId,a.MaterialId, a.quantity - ifnull(b.quantity,0) stock
from (
select ProjectId, MaterialId, ifnull(sum(Quantity),0) Quantity
from inframaterialsreceipts
group by MaterialId, ProjectId
) a left join (
Select ProjectId, MaterialId, ifnull(sum(Quantity),0) Quantity
from inframaterialsissue
group by MaterialId, ProjectId
) b on a.ProjectId = b.ProjectId
AND a.MaterialId = b.MaterialId;