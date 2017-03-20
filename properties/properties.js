define( [

	'jquery',
	'qlik',
	'ng!$q',
	'ng!$http'


], function ($, qlik, $q, $http) {
    'use strict';
	//Define the current application
	var app = qlik.currApp();

    // *****************************************************************************
    // Dimensions & Measures
    // *****************************************************************************
    var dimensions = {
        uses: "dimensions",
        min: 1,
        max: 1
    };

    var measures = {
        uses: "measures",
        min: 1,
        max: 1
    };

    // *****************************************************************************
    // Appearance Section
    // *****************************************************************************
    var appearanceSection = {
        uses: "settings"
    };
	
	// *****************************************************************************
    // Sorting Section
    // *****************************************************************************
    var sortingSection = {
        uses: "sorting"
    };
	
	// *****************************************************************************
    // Options Section
    // *****************************************************************************
/* 	var chartTypeList = {
			type: "string",
			component: "dropdown",
			label: "Chart Type",
			ref: "chartTypeList",
			options: [{
				value: "pie",
				label: "Pie"
			}, {
				value: "donut",
				label: "Donut"
			}, {
				value: "pie3d",
				label: "3D Pie"
			}, {
				value: "donut3d",
				label: "3D Donut"
			}, {
				value: "haloPie",
				label: "Pie Halo"
			}, {
				value: "haloDonut",
				label: "Donut Halo"
			}
			],
			defaultValue: "donut"
	}; */

	
	

// ***************** TO BE WORKED ON TO SIMPLIFY CODE AND TO ALLOW MORE COLOR OPTIONS *********************
	var chartType = {
			type: "string",
			component: "dropdown",
			label: "Chart Type",
			ref: "chartType",
			options: [{
				value: "pie",
				label: "Pie"
			}, {
				value: "donut",
				label: "Donut"
			}
			],
			defaultValue: "donut"
	};

	
	var chartEffect = {
			type: "string",
			component: "dropdown",
			label: "Chart Effect",
			ref: "chartEffect",
			options: [{
				value: "2d",
				label: "2D"
			}, {
				value: "3d",
				label: "3D"
			}, {
				value: "Halo",
				label: "Halo"
			}
			],
			defaultValue: "2d"
	};
	
		
	var chartColor = {
			type: "string",
			component: "dropdown",
			label: "Chart Color",
			ref: "chartColor",
			options: [{
				value: 1,
				label: "Standard QS Colors"
			}, {
				value: 2,
				label: "Red to Yellow Gradient"
			}, {
				value: 3,
				label: "Yellow to Red Gradient"
			}, {
				value: 4,
				label: "Blue to Red Gradient"
			}, {
				value: 5,
				label: "Red to Blue Gradient"
			},{
				value: 6,
				label: "3D Color"
			}
			
			],
			defaultValue: 1
	};

	
	var chartLabels = {
			type: "boolean",
			component: "switch",
			label: "Show Chart Labels",
			ref: "chartLabels",
			options: [{
				value: true,
				label: "On"
			}, {
				value: false,
				label: "Off"
			}],
			defaultValue: true
	};
	
	var labelSticks = {
			type: "boolean",
			component: "switch",
			label: "Show Labels Sticks",
			ref: "labelSticks",
			options: [{
				value: true,
				label: "On"
			}, {
				value: false,
				label: "Off"
			}],
			defaultValue: false
	};
	
	var explodeSegment = {
			type: "string",
			component: "dropdown",
			label: "Explode Segment",
			ref: "explodeSegment",
			options: [{
				value: 0,
				label: "None"
			}, {
				value: 1,
				label: 1
			}, {
				value: 2,
				label: 2
			}, {
				value: 3,
				label: 3
				
			}, {
				value: 4,
				label: 4
			}, {
				value: 5,
				label: 5
			}
			]
	};
	
	
	var shadow = {
			type: "boolean",
			component: "switch",
			label: "Show Shadow",
			ref: "shadow",
			options: [{
				value: true,
				label: "On"
			}, {
				value: false,
				label: "Off"
			}],
			defaultValue: false
	};
	
	var shadowDepth = {
			type: "string",
			component: "dropdown",
			label: "Shadow Depth",
			ref: "shadowDepth",
			options: [{
				value: 5,
				label: '5 pixels'
			}, {
				value: 10,
				label: '10 pixels'
			}, {
				value: 15,
				label: '15 pixels'
			}, {
				value: 20,
				label: '20 pixels'
			}
			],
			defaultValue: 5
	};
	
	
	var segmentBorder = {
			type: "boolean",
			component: "switch",
			label: "Show Segment Border",
			ref: "segmentBorder",
			options: [{
				value: true,
				label: "On"
			}, {
				value: false,
				label: "Off"
			}],
			defaultValue: false
	};
	
	
	var segmentBorderWidth = {
			type: "string",
			component: "dropdown",
			label: "Segment Border Width",
			ref: "segmentBorderWidth",
			options: [{
				value: 2,
				label: '2 pixels'
			}, {
				value: 3,
				label: '3 pixels'
			}, {
				value: 4,
				label: '4 pixels'
			}, {
				value: 5,
				label: '5 pixels'
			}, {
				value: 6,
				label: '6 pixels'
			}, {
				value: 7,
				label: '7 pixels'
			}, {
				value: 8,
				label: '8 pixels'
			}, {
				value: 9,
				label: '9 pixels'
			}, {
				value: 10,
				label: '10 pixels'
			}
			
			],
			defaultValue: 5
	};
	
	
	
	var Options = {
		type:"items",
		label:"Options",
		items: {
			chartType:chartType,
			chartEffect:chartEffect,
			chartLabels:chartLabels,
			labelSticks:labelSticks,
			explodeSegment:explodeSegment,
			shadow:shadow,
			shadowDepth:shadowDepth,
			segmentBorder:segmentBorder,
			segmentBorderWidth:segmentBorderWidth,
			chartColor:chartColor
		}
	
	};
	
    // *****************************************************************************
    // Main property panel definition
    // ~~
    // Only what's defined here will be returned from properties.js
    // *****************************************************************************
	  
	//******************************************************************************

    return {
        type: "items",
        component: "accordion",
        items: {
            //Default Sections
			dimensions: dimensions,
            measures: measures,
            appearance: appearanceSection,
			sorting: sortingSection,
			//Custom Sections
			Options: Options
			//MyColorPicker: MyColorPicker
			//miscSettings: miscSettings

        }
    };

} );
