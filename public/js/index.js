/**
 * Created by JetBrains WebStorm.
 * User: acidsound
 * Date: 11. 9. 2.
 * Time: 오전 4:15
 * To change this template use File | Settings | File Templates.
 */
$().ready(function() {
    // create socket
    addLog = function(target, val) {
        $(target).text($(target).text() + val);
    };
    var socket = io.connect('/');
    socket.on('fromTCPPacket', function (data) {
        addLog($("textarea#log"), "incoming message :" + data);

        // 예상데이터 cg001T/ cg001F
        if (data.substr(0, 2) == "cg") {
            $('li>label+input#' + data.substr(0, 5)).attr('checked', data.substr(5, 1) == 'T');
        }
    });

    // when checkbox change. send tcpPacket
    $("li>label+input").change(function() {
        var msg = this.value + ($(this).attr('checked') ? "T" : "F");
        socket.emit("toTCPPacket", msg);
        addLog($("textarea#log"), "outgoing message :" + msg + "\r\n");
    });

    // test Data
    var plans = {
        "plan01" : {
            imgSrc : "/images/planImages/floorB1.jpg",
            planObjects : [
                {
                    "USDID" : "01",
                    "LNCID" : "01",
                    "planID" : "plan01",
                    "BDID" : "01",
                    "hangingHeight" : 100,
                    "detectCount" : 0,
                    "detectRange" : 10,
                    "calibration" : 10,
                    "drawing-left" : 1793,
                    "drawing-top" : 1450,
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
                // BD
                {
                    "BDID" : "01",
                    "LNCID" : "01",
                    "areaID" : "01",
                    "drawing-left" : 350,
                    "drawing-top" : 150,
                    "currentStatus" : 1
                },
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
            ]
        },
        "plan02" : {
            imgSrc : "/images/planImages/floorB2.jpg",
            planObjects : [
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
                }
            ]
        },
        "plan03" : {
            imgSrc : "/images/planImages/floorB3.jpg"
        },
        "plan04" : {
            imgSrc : "http://placehold.it/800x300/D9DFF4"
        },
        "plan05" : {
            imgSrc : "http://placehold.it/800x300/6791BF"
        }
    };

    // when click objects, view object's properties
    var clickObject = function() {
        // get properties from database, not memory
        var objectType = $(this).attr('id').split('__')[0];
        var objectID = $(this).attr('id').split('__')[1];
        console.debug("type:" + objectType + '\t' + "ID:" + objectID);
        switch (objectType) {
            case 'USDID' :
                break;
            case 'BDID' :
                break;
            case 'signBoard' :
                break;
        }
    };
    // when click plans, change plan Images
    $("ul#plans>li>ul>li").click(function() {
        $("li#currentPlan").text($(this).text());

        // loadPlanImage
        $("ul#planImage>li>ul>li>ul>li>img").attr('src', plans[$(this).attr('id')].imgSrc);

        // set global jQuery custom plugins
        jQuery.fn.getLastObject = function() {
            return $(this[this.length - 1]);
        };
        jQuery.fn.setPosition = function(x, y) {
            this.css("left", x + 'px');
            this.css("top", y + 'px');
            return this;
        };

        // delete old planObjects
        var objectCount = $("ul#planImage>li>ul>li>ul>li").length - 1;
        while (objectCount > 0) {
            $("ul#planImage>li>ul>li>ul>li").getLastObject().remove();
            objectCount--;
        }

        // set Initial Objects
        $(plans[$(this).attr('id')].planObjects).each(function() {

            // add BD Object
            if (!this.USDID && this.BDID) {
                $("li", $("ul#planImage>li>ul>li>ul")
                    .append('<li class="planObject">'
                    + '<img src="http://placehold.it/32x32/ff0&text=BD"/>'
                    + '</li>'))
                    .getLastObject()
                    .attr("id", "BDID" + "__" + this.BDID)
                    .setPosition(this["drawing-left"], this["drawing-top"])
                    .click(clickObject);
            }
            // add USD Object
            if (this.USDID) {
                $("li", $("ul#planImage>li>ul>li>ul")
                    .append('<li class="planObject">'
                    + (this.VerticalYN == 'Y'
                    ? '<img src="/images/planObjects/carOnV.png"/>'
                    : '<img src="/images/planObjects/carOnH.png"/>')
                    + '</li>'))
                    .getLastObject()
                    .attr("id", "USDID" + "__" + this.USDID)
                    .setPosition(this["drawing-left"] + (this.VerticalYN == 'Y' ? 16 : 0)
                    , this["drawing-top"] + (this.VerticalYN == 'Y' ? 0 : 16))
                    .click(clickObject);
            }
            // add signBoard Object
            if (this.signBoardID) {
                $("li", $("ul#planImage>li>ul>li>ul")
                    .append('<li class="planObject">'
                    + '<img src="http://placehold.it/64x64/0ff&text=signBoard"/>'
                    + '</li>'))
                    .getLastObject()
                    .attr("id", "signBoard" + "__" + this.signBoardID)
                    .setPosition(this["drawing-left"], this["drawing-top"])
                    .click(clickObject);
            }
        });

    });

    // when page loaded, set the first plan
    $($("ul#plans>li>ul>li")[0]).click();
});
