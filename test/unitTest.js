/**
 * Created by JetBrains WebStorm.
 * User: acidsound
 * Date: 11. 9. 2.
 * Time: 오전 5:16
 * To change this template use File | Settings | File Templates.
 */
// set fixture data
var plansObjects = [
    // planIDs
    {
        "planID" : "plan01",
        imgSrc : "http://placehold.it/800x300/7D8C22"
    },
    {
        "planID" : "plan02",
        imgSrc : "http://placehold.it/800x300/B3BF67"
    },
    {
        "planID" : "plan03",
        imgSrc : "http://placehold.it/800x300/F2E49B"
    },
    {
        "planID" : "plan04",
        imgSrc : "http://placehold.it/800x300/D9DFF4"
    },
    {
        "planID" : "plan05",
        imgSrc : "http://placehold.it/800x300/6791BF"
    },
    // USDs
    {
        "USDID" : "01",
        "LNCID" : "01",
        "planID" : "plan01",
        "BDID" : "01",
        "hangingHeight" : 100,
        "detectCount" : 0,
        "detectRange" : 10,
        "calibration" : 10,
        "drawing-left" : 100,
        "drawing-top" : 100,
        "VerticalYN" : "Y",
        "currentStatus" : 1
    },
    {
        "USDID" : "02",
        "LNCID" : "01",
        "planID" : "plan01",
        "BDID" : "01",
        "hangingHeight" : 100,
        "detectCount" : 0,
        "detectRange" : 10,
        "calibration" : 10,
        "drawing-left" : 200,
        "drawing-top" : 200,
        "VerticalYN" : "N",
        "currentStatus" : 1
    },
    {
        "USDID" : "03",
        "LNCID" : "01",
        "planID" : "plan01",
        "BDID" : "01",
        "hangingHeight" : 100,
        "detectCount" : 0,
        "detectRange" : 10,
        "calibration" : 10,
        "drawing-left" : 500,
        "drawing-top" : 150,
        "VerticalYN" : "Y",
        "currentStatus" : 1
    },
    {
        "USDID" : "01",
        "LNCID" : "01",
        "planID" : "plan02",
        "BDID" : "01",
        "hangingHeight" : 100,
        "detectCount" : 0,
        "detectRange" : 10,
        "calibration" : 10,
        "drawing-left" : 300,
        "drawing-top" : 100,
        "VerticalYN" : "Y",
        "currentStatus" : 1
    },
    {
        "USDID" : "02",
        "LNCID" : "01",
        "planID" : "plan02",
        "BDID" : "01",
        "hangingHeight" : 100,
        "detectCount" : 0,
        "detectRange" : 10,
        "calibration" : 10,
        "drawing-left" : 300,
        "drawing-top" : 200,
        "VerticalYN" : "Y",
        "currentStatus" : 1
    },
    {
        "USDID" : "03",
        "LNCID" : "01",
        "planID" : "plan02",
        "BDID" : "01",
        "hangingHeight" : 100,
        "detectCount" : 0,
        "detectRange" : 10,
        "calibration" : 10,
        "drawing-left" : 400,
        "drawing-top" : 150,
        "VerticalYN" : "Y",
        "currentStatus" : 1
    },
    {
        "USDID" : "04",
        "LNCID" : "01",
        "planID" : "plan02",
        "BDID" : "01",
        "hangingHeight" : 100,
        "detectCount" : 0,
        "detectRange" : 10,
        "calibration" : 10,
        "drawing-left" : 500,
        "drawing-top" : 150,
        "VerticalYN" : "N",
        "currentStatus" : 1
    },
    // BD
    {
        "BDID" : "01",
        "LNCID" : "01",
        "areaID" : "01",
        "drawing-left" : 350,
        "drawing-top" : 150,
        "currentStatus" : 1
    },
    // SignBoards
    {
        "signBoardID" : "01",
        "floorID" : "B1F",
        "boardIP" : "10.10.123.64",
        "boardPort" : 3000,
        "boardType" : "Type0",
        "leftParkingCount" : 10,
        "rightParkingCount" : 13,
        "boardA_Dis_id" : 0x01,
        "boardB_Dis_id" : 0x0A,
        "boardC_dis_id" : 0x02,
        "drawing-left" : 200,
        "drawing-top" : 50
    }
];

console.log("\nTest for Database");

// Get some collections
var config = require('../config').params;

// Database
var Mongolian = require("mongolian");
var assert = require("assert");
var db = new Mongolian(config.database.connectionURL);
var pmses = db.collection("pms");

// truncate all collections
pmses.remove({});

// Insert some data
pmses.insert(plansObjects);
pmses.findOne({"USDID": "01", "LNCID" : "01", "planID": "plan01"}, function(err, pms) {
    assert.equal(pms.planID, "plan01");
});

console.log("\nEnd of Test");
