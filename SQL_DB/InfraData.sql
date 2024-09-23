#########################################Infra Projects#########################################

INSERT INTO `infraprojects` (ProjectId,ProjectName,ProjectDescription,ProjectType,ProjectAddress,ProjectCity,ProjectState,ProjectCountry,ProjectZipCode,
ProjectEstimatedValue,ProjectStatus,ProjectStartDate,ProjectEndDate,UpdatedBy)
VALUES ("LLP20210801", "Project-A", "Sample Project", "Type-1", "SunTowers, Madhapur", "Hyderabad", "Telangana", "India", "500060", 
200000.01, "Active", "2021-01-01" , "2022-06-06", "Admin1"),
("LLP202108030", "Project-B", "Sample Project 2", "Type-2", "SunTowers, Madhapur", "Hyderabad", "Telangana", "India", "500060", 
400000.01, "Completed", "2020-01-01" , "2022-01-06", "Admin1"),
("LLP202008030", "Project-C", "Sample Project 3", "Type-1", "SunTowers, Madhapur", "Hyderabad", "Telangana", "India", "500060", 
400000.01, "Completed", "2019-01-01" , "2020-08-06", "Admin1");


INSERT INTO `infraprojects` (ProjectId,ProjectName,ProjectDescription,ProjectType,ProjectAddress,ProjectCity,ProjectState,ProjectCountry,ProjectZipCode,
ProjectEstimatedValue,ProjectStatus,ProjectStartDate,ProjectEndDate,UpdatedBy)
VALUES ("LLP01", "JCRDLIS", "Jangaon", "Irrigation", "Jangaon", "Jangaon", "Telangana", "India", "500060", 
114.81, "Active", "2007-08-01" , "2022-06-30", "Admin1");
############################Infra Sub Projects############################################

INSERT INTO `infrasubprojects` (
SubProjectId,
SubProjectName,
AutoProjectId,
SubProjectDescription,
SubProjectType,
SubProjectAddress,
SubProjectCity,
SubProjectState,
SubProjectCountry,
SubProjectZipCode,
SubProjectEstimatedValue,
SubProjectStatus,
SubProjectStartDate,
SubProjectEndDate,
UpdatedBy
)
VALUES
("LLP01-Sub1", "JCRDLIS-01", 4, "Sample sub project, Part if main project", "Irrigation", "Jangaon", "Jangaon", "Telangana", "India", "500060", 52000.06, 
"In Progress","2021-01-01","2021-06-01",  "Admin1"),
("LLP01-Sub2", "ARMC", 4, "Sample sub project, Part if main project", "Irrigation", "Jangaon", "Jangaon", "Telangana", "India", "500060", 92000.06, 
"Pending","2021-06-01","2021-01-01",  "Admin1"),
("LLP01-Sub3", "CRMC", 4, "Sample sub project, Part if main project", "Irrigation", "Jangaon", "Jangaon", "Telangana", "India", "500060", 92000.06, 
"Pending","2021-06-01","2021-01-01",  "Admin1"),
("LLP01-Sub3", "ARMC Minors", 4, "Sample sub project, Part if main project", "Irrigation", "Jangaon", "Jangaon", "Telangana", "India", "500060", 92000.06, 
"Pending","2021-06-01","2021-01-01",  "Admin1"),
("LLP01-Sub4", "CRMC Minors", 4, "Sample sub project, Part if main project", "Irrigation", "Jangaon", "Jangaon", "Telangana", "India", "500060", 92000.06, 
"Pending","2021-06-01","2021-01-01",  "Admin1");





INSERT INTO `infrasubprojects` (
SubProjectId,
SubProjectName,
AutoProjectId,
SubProjectDescription,
SubProjectType,
SubProjectAddress,
SubProjectCity,
SubProjectState,
SubProjectCountry,
SubProjectZipCode,
SubProjectEstimatedValue,
SubProjectStatus,
SubProjectStartDate,
SubProjectEndDate,
UpdatedBy
)
VALUES
("LLP20210801-Sub1", "SubProject-A01", 1, "Sample sub project, Part if main project", "Sub-Type-1", "SunTowers 4th Floor", "Hyderabad", "Telangana", "India", "500060", 52000.06, 
"In Progress","2021-01-01","2021-06-01",  "Admin1"),
("LLP20210801-Sub2", "SubProject-B02", 2, "Sample sub project, Part if main project", "Sub-Type-2", "SunTowers 4th Floor", "Hyderabad", "Telangana", "India", "500060", 92000.06, 
"Pending","2021-06-01","2021-01-01",  "Admin1"),
("LLP20210801-Sub2", "SubProject-B03", 2, "Sample sub project, Part if main project", "Sub-Type-2", "SunTowers 4th Floor", "Hyderabad", "Telangana", "India", "500060", 92000.06, 
"Pending","2021-06-01","2021-01-01",  "Admin1"),
("LLP20210801-Sub3", "SubProject0-C04", 3, "Sample sub project, Part if main project", "Sub-Type-2", "SunTowers 4th Floor", "Hyderabad", "Telangana", "India", "500060", 92000.06, 
"Pending","2021-06-01","2021-01-01",  "Admin1"),
("LLP20210801-Sub3", "SubProject-C05", 3, "Sample sub project, Part if main project", "Sub-Type-2", "SunTowers 4th Floor", "Hyderabad", "Telangana", "India", "500060", 92000.06, 
"Pending","2021-06-01","2021-01-01",  "Admin1"),
("LLP20210801-Sub3", "SubProject-C06", 3, "Sample sub project, Part if main project", "Sub-Type-2", "SunTowers 4th Floor", "Hyderabad", "Telangana", "India", "500060", 92000.06, 
"Pending","2021-06-01","2021-01-01",  "Admin1");


####################################Infra User Roles##########################

INSERT INTO `infrauserroles`
(
`RoleId`,
`RoleName`,
`RoleType`,
`RoleDescription`,
`UpdatedBy`)
VALUES
("RL01", "Store Keeper", "Store Keeper", "Store Keeper", "Admin1"),
("RL02", "Site Engineer", "Site Engineer", "Site Engineer", "Site Engineer"),
("RL03", "Project Manager", "Project Manager", "Project Manager", "Project Manager"),
("RL04", "Admin", "Admin", "Admin", "Admin");



#################################### User Matrix Data##########################


INSERT INTO `infrausermatrix`
(`RoleId`,
`Functionality`,
`Subfunctionality`,
`Permission`)
VALUES
(1,"Materials","All",0),
(1, "Materials Receipts", "Create", 1),
(1, "Materials Receipts", "Delete", 1),
(1, "Materials Receipts", "Update", 1),
(1, "Materials Receipts", "Approve", 0),
(1, "Materials Receipts", "Decline", 0),
(1, "Materials Issue", "Create", 1),
(1, "Materials Issue", "Delete", 1),
(1, "Materials Issue", "Update", 1),
(1, "Materials Issue", "Approve", 0),
(1, "Materials Issue", "Decline", 0),
(1, "Assets", "All", 0), 
(1, "Work Done", "All", 0), 
(1, "Users", "All", 0), 
(1, "Vendors", "All", 0),

(2, "Materials", "All", 0),
(2, "Materials Receipts", "Approve", 1),
(2, "Materials Receipts", "Decline", 1),
(2, "Materials Receipts", "Update", 0),
(2, "Materials Receipts", "Approve", 0),
(2, "Materials Receipts", "Decline", 0),
(2, "Materials Issue", "Create", 0),
(2, "Materials Issue", "Delete", 0),
(2, "Materials Issue", "Update", 0),
(2, "Materials Issue", "Approve", 1),
(2, "Materials Issue", "Decline", 1),
(2, "Assets", "All", 0),
(2, "Work Done", "Create", 1),
(2, "Work Done", "Update", 1),
(2, "Work Done", "Delete", 1),
(2, "Work Done", "Approve", 0),
(2, "Work Done", "Decline", 0),
(2, "Users", "All", 0),
(2, "Vendors", "All", 0),

(3, "Work Done", "Create", 0),
(3, "Work Done", "Update", 0),
(3, "Work Done", "Delete", 0),
(3, "Work Done", "Approve", 1),
(3, "Work Done", "Decline", 1),
(3, "Users", "All", 0),
(3, "Materials", "All", 0),
(3, "Assets", "Create", 1),
(3, "Assets", "Update", 1),
(3, "Assets", "Delete", 1),
(3, "Assets", "Approve", 0),
(3, "Assets", "Decline", 0),
(3, "Vendors", "All", 0),

(4, "Vendors", "All", 1),
(4, "Assets", "All", 1),
(4, "Materials", "All", 1),
(4, "Materials Receipts", "All", 1),
(4, "Materials Issue", "All", 1),
(4, "Materials", "All", 1),
(4, "Work Done", "All", 1),
(4, "Users", "All", 1);


#############################Infra Materials##########################
INSERT INTO `inframaterials`
(`MaterialId`,
`MaterialName`,
`MaterialCategory`,
`MaterialSubCategory`,
`MaterialDescription`,
`Metrics`,
`Price`,
`UpdatedBy`)
VALUES
("STL1", "Steel-8 mm", "Steel", "Steel-8 mm", " ", "Ton", 5000.00, "Admin1"),
("STL2", "Steel-10 mm", "Steel", "Steel-10 mm", "   ", "Ton", 7000.00, "Admin1"),
("STL3", "Steel-12 mm", "Steel", "Steel-12 mm", "   ", "Ton", 6000.00, "Admin1"),
("STL4", "Steel-16 mm",  "Steel", "Steel-16 mm", "   ", "Ton", 5000.00, "Admin1"),
("STL5", "Steel-20 mm",  "Steel", "Steel-20 mm", "   ", "Ton", 7000.00, "Admin1"),
("STL6", "Steel-25 mm", "Steel", "Steel-25 mm", "   ", "Ton", 9000.00, "Admin1"),
("STL7", "Steel-32 mm", "Steel", "Steel-32 mm", "   ", "Ton", 9000.00, "Admin1"),
("AGG1", "Aggregates-Dust", "Aggregates", "Aggregates-Dust", "   ", "Ton", 5500.00, "Admin1"),
("AGG2", "Aggregates-10 mm", "Aggregates", "Aggregates-10 mm", "   ", "Ton", 11000.00, "Admin1"),
("AGG3", "Aggregates-20 mm", "Aggregates", "Aggregates-20 mm", "   ", "Ton", 500.00, "Admin1"),
("AGG4", "Aggregates-40 mm", "Aggregates", "Aggregates-40 mm", "   ", "Ton", 11000.00, "Admin1"),
("AGG5", "Aggregates-100 mm", "Aggregates", "Aggregates-100 mm", "   ", "Ton", "104.50", "Admin1"),
("AGG6", "Mixed Material", "Aggregates", "Mixed Material", "   ", "Ton", "104.50", "Admin1"),
("CMT1",  "Cement-OPC43", "Cement", "Cement-OPC43","   ",  "Ton", "704.50", "Admin1"),
("POL1",  "POL-HSD","POL", "HSD","   ",  "Litre", "104.50", "Admin1"),
("POL2", "POL-Engine Oils", "POL", "Engine Oils","   ",  "Litre", "104.50", "Admin1"),
("POL3",  "POL-Hydraullic Oils","POL", "Hydraullic Oils","   ",  "Litre", "104.50", "Admin1"),
("POL4",  "POL-Bitumen 60/70","POL", "Bitumen 60/70","   ",  "Kgs", "104.50", "Admin1"),
("POL5",  "POL-LDO","POL", "LDO","   ",  "Litre", "104.50", "Admin1"),
("POL6", "POL-Petrol","POL", "Petrol","   ",  "Litre", "104.50", "Admin1"),
("SND1",   "Sand-River ", "Sand", "Sand-River" , "   ",  "Ton", "104.50", "Admin1"),
("SND2", "Sand-Robo", "Sand", "Sand-Robo","   ",  "Ton", "104.50", "Admin1");

###################################Infra Vendors#####################################################

INSERT INTO `infravendors`
(
`VendorId`,
`VendorName`,
`VendorDescription`,
`VendorLocation`,
`VendorType`,
`UpdatedBy`)
VALUES
("VNDR1", "Vendor1", "Vendor Description", "Madhapur", "Steel Provider", "Admin1"),
("VNDR2", "Vendor2", "Vendor Description", "Warangal", "Steel Provider", "Admin1"),
("VNDR3", "Vendor3", "Vendor Description", "Madhapur", "Cement Provider", "Admin1"),
("VNDR4", "Vendor4", "Vendor Description", "Madhapur", "Aggregate Provider", "Admin1");

################################Infra Users######################################################

INSERT INTO `infrausers`
(
`UserEmail`,
`UserMobileNumber`,
`FullName`,
`Address`,
`District`,
`State`,
`Country`,
`RoleId`,
`Status`,
`Password`,
`UpdatedBy`)
VALUES
("admin1@infra.com", "+91-1234567890", "Jhon Doe",  "Madhapur", "Hyderabad", "Telangana", "India", 4, "Active", "Amdin$Infra1", "Admin");






