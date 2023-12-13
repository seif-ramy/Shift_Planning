sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/date/UI5Date",
	"sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,UI5Date,JSONModel) {
        "use strict";

        return Controller.extend("sp.shiftplanning.controller.ShiftPlanView", {
            onInit: function () {
            //   var  startDate= UI5Date.getInstance("2023", "12", "13", "11", "0");
            // var shiftdata={
            //     startDate: UI5Date.getInstance("2023", "0", "15", "8", "0"),
            //     "people": [
            //         {
            //             "userId": "103179",
            //             "defaultFullName": "Lilly Sun",
            //             "division": "Manufacturing (MANU)",
            //             "department": "Operations TW (5000049)",
            //             "title": "HR Business Partner",
            //             "email": "lilly.sun@bestrunsap.com",
            //             "username": "103179",
            //             "appointments":[{
			// 				start: UI5Date.getInstance("2016", "9", "20", "10", "0"),
			// 				end: UI5Date.getInstance("2016", "11", "15", "12", "0"),
			// 				title: "Working out of the building",
			// 				type: "Type07",
			// 				pic: "sap-icon://sap-ui5",
			// 				tentative: false
			// 			},
			// 				{
			// 					start: UI5Date.getInstance("2023", "0", "15", "08", "30"),
			// 					end: UI5Date.getInstance("2023", "0", "15", "09", "30"),
			// 					title: "Meet Max Mustermann",
			// 					type: "Type02",
			// 					tentative: false
			// 				},
			// 				{
			// 					start: UI5Date.getInstance("2023", "0", "15", "10", "0"),
			// 					end: UI5Date.getInstance("2023", "0", "15", "12", "0"),
			// 					title: "Team meeting",
			// 					info: "room 1",
			// 					type: "Type01",
			// 					pic: "sap-icon://sap-ui5",
			// 					tentative: false
			// 				},
			// 				{
			// 					start: UI5Date.getInstance("2023", "0", "15", "11", "30"),
			// 					end: UI5Date.getInstance("2023", "0", "15", "13", "30"),
			// 					title: "Lunch",
			// 					info: "canteen",
			// 					type: "Type03",
			// 					tentative: true
			// 				},
			// 				{
			// 					start: UI5Date.getInstance("2023", "0", "15", "13", "30"),
			// 					end: UI5Date.getInstance("2023", "0", "15", "17", "30"),
			// 					title: "Discussion with clients",
			// 					info: "online meeting",
			// 					type: "Type02",
			// 					tentative: false
			// 				},
			// 				{
			// 					start: UI5Date.getInstance("2023", "0", "16", "00", "1"),
			// 					end: UI5Date.getInstance("2023", "0", "16", "23", "59"),
			// 					title: "Discussion",
			// 					info: "Online meeting",
			// 					type: "Type04",
			// 					tentative: false
			// 				},
			// 				{
			// 					start: UI5Date.getInstance("2023", "0", "18", "08", "30"),
			// 					end: UI5Date.getInstance("2023", "0", "18", "09", "30"),
			// 					title: "Meeting with the manager",
			// 					type: "Type02",
			// 					tentative: false
			// 				},
			// 				{
			// 					start: UI5Date.getInstance("2023", "0", "18", "11", "30"),
			// 					end: UI5Date.getInstance("2023", "0", "18", "13", "30"),
			// 					title: "Lunch",
			// 					info: "canteen",
			// 					type: "Type03",
			// 					tentative: true
			// 				},
			// 				{
			// 					start: UI5Date.getInstance("2023", "0", "18", "1", "0"),
			// 					end: UI5Date.getInstance("2023", "0", "18", "22", "0"),
			// 					title: "Team meeting",
			// 					info: "regular",
			// 					type: "Type01",
			// 					pic: "sap-icon://sap-ui5",
			// 					tentative: false
			// 				},
			// 				{
			// 					start: UI5Date.getInstance("2023", "0", "21", "00", "30"),
			// 					end: UI5Date.getInstance("2023", "0", "21", "23", "30"),
			// 					title: "New Product",
			// 					info: "room 105",
			// 					type: "Type03",
			// 					tentative: true
			// 				},
			// 				{
			// 					start: UI5Date.getInstance("2023", "0", "25", "11", "30"),
			// 					end: UI5Date.getInstance("2023", "0", "25", "13", "30"),
			// 					title: "Lunch",
			// 					type: "Type03",
			// 					tentative: true
			// 				},
			// 				{
			// 					start: UI5Date.getInstance("2023", "0", "29", "10", "0"),
			// 					end: UI5Date.getInstance("2023", "0", "29", "12", "0"),
			// 					title: "Team meeting",
			// 					info: "room 1",
			// 					type: "Type01",
			// 					pic: "sap-icon://sap-ui5",
			// 					tentative: false
			// 				},
			// 				{
			// 					start: UI5Date.getInstance("2023", "0", "30", "08", "30"),
			// 					end: UI5Date.getInstance("2023", "0", "30", "09", "30"),
			// 					title: "Meet Max Mustermann",
			// 					type: "Type02",
			// 					tentative: false
			// 				},
			// 				{
			// 					start: UI5Date.getInstance("2023", "0", "30", "10", "0"),
			// 					end: UI5Date.getInstance("2023", "0", "30", "12", "0"),
			// 					title: "Team meeting",
			// 					info: "room 1",
			// 					type: "Type01",
			// 					pic: "sap-icon://sap-ui5",
			// 					tentative: false
			// 				},
			// 				{
			// 					start: UI5Date.getInstance("2023", "0", "30", "11", "30"),
			// 					end: UI5Date.getInstance("2023", "0", "30", "13", "30"),
			// 					title: "Lunch",
			// 					type: "Type03",
			// 					tentative: true
			// 				},
			// 				{
			// 					start: UI5Date.getInstance("2023", "0", "30", "13", "30"),
			// 					end: UI5Date.getInstance("2023", "0", "30", "17", "30"),
			// 					title: "Discussion with clients",
			// 					type: "Type02",
			// 					tentative: false
			// 				},
			// 				{
			// 					start: UI5Date.getInstance("2023", "0", "31", "10", "00"),
			// 					end: UI5Date.getInstance("2023", "0", "31", "11", "30"),
			// 					title: "Discussion of the plan",
			// 					info: "Online meeting",
			// 					type: "Type04",
			// 					tentative: false
			// 				},
			// 				{
			// 					start: UI5Date.getInstance("2023", "1", "1", "1", "0"),
			// 					end: UI5Date.getInstance("2023", "1", "2", "22", "0"),
			// 					title: "Workshop",
			// 					info: "regular",
			// 					type: "Type07",
			// 					pic: "sap-icon://sap-ui5",
			// 					tentative: false
			// 				},
			// 				{
			// 					start: UI5Date.getInstance("2023", "1", "3", "08", "30"),
			// 					end: UI5Date.getInstance("2023", "1", "13", "09", "30"),
			// 					title: "Meeting with the manager",
			// 					type: "Type02",
			// 					tentative: false
			// 				},
			// 				{
			// 					start: UI5Date.getInstance("2023", "1", "4", "10", "0"),
			// 					end: UI5Date.getInstance("2023", "1", "4", "12", "0"),
			// 					title: "Team meeting",
			// 					info: "room 1",
			// 					type: "Type01",
			// 					pic: "sap-icon://sap-ui5",
			// 					tentative: false
			// 				},
			// 				{
			// 					start: UI5Date.getInstance("2023", "2", "30", "10", "0"),
			// 					end: UI5Date.getInstance("2023", "4", "33", "12", "0"),
			// 					title: "Working out of the building",
			// 					type: "Type07",
			// 					pic: "sap-icon://sap-ui5",
			// 					tentative: false
			// 				},
			// 				{
			// 					start: UI5Date.getInstance("2023", "8", "1", "00", "30"),
			// 					end: UI5Date.getInstance("2023", "10", "15", "23", "30"),
			// 					title: "Development of a new Product",
			// 					info: "room 207",
			// 					type: "Type03",
			// 					tentative: true
			// 				}]
            //         },
            //         {
            //             "userId": "103204",
            //             "defaultFullName": "Lori Suk",
            //             "division": "Manufacturing (MANU)",
            //             "department": "Operations TW (5000049)",
            //             "title": "Payroll Manager",
            //             "email": "lsuk@bestrunsap.com",
            //             "username": "103204"
            //         },
            //         {
            //             "userId": "42000002",
            //             "defaultFullName": "?? ?",
            //             "division": "Manufacturing (MANU)",
            //             "department": "Production TW (5000050)",
            //             "title": "?????",
            //             "email": "Richard.Chen@bestrunsap.com",
            //             "username": "42000002"
            //         },
            //         {
            //             "userId": "42000003",
            //             "defaultFullName": "?? ?",
            //             "division": "Manufacturing (MANU)",
            //             "department": "Operations & Maintenance TW (5000062)",
            //             "title": "?????",
            //             "email": "Stone.Ma@bestrunsap.com",
            //             "username": "42000003"
            //         },
            //         {
            //             "userId": "42000004",
            //             "defaultFullName": "?? ?",
            //             "division": "Manufacturing (MANU)",
            //             "department": "Operations TW (5000049)",
            //             "title": "?????",
            //             "email": "Daley.Lin@bestrunsap.com",
            //             "username": "42000004"
            //         },
            //         {
            //             "userId": "42000005",
            //             "defaultFullName": "?? ?",
            //             "division": "Manufacturing (MANU)",
            //             "department": "Operations TW (5000049)",
            //             "title": "????",
            //             "email": "Zach.Tsai@bestrunsap.com",
            //             "username": "42000005"
            //         }
            //     ]
            // };
            // //   var date={"start":startDate};
            //   var model=new JSONModel(shiftdata);
            //    this.getView().setModel(model);
            //    console.log(shiftdata);
            }
        });
    });
