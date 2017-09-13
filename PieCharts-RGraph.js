////////////////////////////////////////////////////
//Version: 	1.1
//Author:  	Richard Byard
//Usage:	Pie chart with 3d and other options using the RGraph chart library.
//Date:		13 Sept 2017
////////////////////////////////////////////////////
define( [
        // Load the properties.js file using requireJS
        // Note: If you load .js files, omit the file extension, otherwhise
        // requireJS will not load it correctly 
		'jquery'
		,'qlik'
        ,'./properties/properties'
		,'./properties/initialProperties'
		,'./libraries/RGraph.common.core'
		,'./libraries/RGraph.common.dynamic'
		,'./libraries/RGraph.common.tooltips'
		,'./libraries/RGraph.common.resizing'
		//,'./libraries/RGraph.common.key'
		,'./libraries/RGraph.pie'  
		
    ],
	
    function ( $, qlik, props, initProps) {
        'use strict';	
		//Inject Stylesheet into header of current document
		//$( '<style>' ).html(styleSheet).appendTo( 'head' );
        return {
			//Define the properties tab - these are defined in the properties.js file
             definition: props,
			
			//Define the data properties - how many rows and columns to load.
			 initialProperties: initProps,
			
			//Allow export to print object 
			support : { export: true 
			},
			
			//Not sure if there are any other options available here.
			 snapshot: {cantTakeSnapshot: true
			 },

			//paint function creates the visualisation. - this one makes a very basic table with no selections etc.
            paint: function ($element, layout) {
			//debug propose only, please comment
			//console.log('Data returned: ', layout.qHyperCube);
			
			var app = qlik.currApp(this);
			
			// Get the Number of Dimensions and Measures on the hypercube
			var numberOfDimensions = layout.qHyperCube.qDimensionInfo.length;
			//console.log(numberOfDimensions);
			var numberOfMeasures = layout.qHyperCube.qMeasureInfo.length;
			//console.log(numberOfMeasures);
			
			// Get the Measure Name and the Dimension Name
			var measureName = layout.qHyperCube.qMeasureInfo[0].qFallbackTitle;
			//console.log(measureName);
			var dimensionName = layout.qHyperCube.qDimensionInfo[0].qFallbackTitle;
			//console.log(dimensionName);

			
			// Get the number of fields of a dimension
			var numberOfDimValues = layout.qHyperCube.qDataPages[0].qMatrix.length;
			//console.log(numberOfDimValues);
			
			// Get the values of the dimension
			var dimArray =[];
			var measArray =[];
			for (var i=0; i<numberOfDimValues;i++){
				dimArray[i] = layout.qHyperCube.qDataPages[0].qMatrix[i][0].qText;
				measArray[i] = layout.qHyperCube.qDataPages[0].qMatrix[i][1].qText;
			}
			
			
			var dimensionLength=layout.qHyperCube.qDataPages[0].qMatrix.length;
			
			var chart;
			
			
			
			
			
			
			// manage color selections
			
			// ColorSets
			// Red to Yellow (chart color 2 and 3)
			switch(numberOfDimValues) {
				case 1: var palette2 = ["#fb9a29"]; break;
				case 2: var palette2 = ["#662506","#fff7bc"]; break;
				case 3: var palette2 = ["#662506","#fed573","#fff7bc"]; break;
				case 4: var palette2 = ["#662506","#fdc34e","#fee89d","#fff7bc"]; break;						
				case 5: var palette2 = ["#662506","#f68e23","#fedf89","#feeca5","#fff7bc"]; break;
				case 6: var palette2 = ["#662506","#da5c0a","#fdbf4a","#fee89d","#fef0ad","#fff7bc"]; break;
				case 7: var palette2 = ["#662506","#d65707","#fcb23f","#fedf89","#fee79b","#feeea9","#fff7bc"]; break;
				default: var palette2 = ["#662506","#993404","#cc4c02","#ec7014","#fb9a29","#fec44f","#fee391","#fff7bc"];
			}
			
			// Blue to Red (chart coloe 4 and 5)
			switch(numberOfDimValues) {
				case 1: var palette4 = ["#e8fsfe"]; break;
				case 2: var palette4 = ["#3d52a1","#ae1c3e"]; break;
				case 3: var palette4 = ["#3d52a1","#d95c46","#ae1c3e"]; break;
				case 4: var palette4 = ["#3d52a1","#ebe6db","#d95c46","#ae1c3e"]; break;
				case 5: var palette4 = ["#3d52a1","#ebe6db","#d95c46","#c3393e","#ae1c3e"]; break;
				case 6: var palette4 = ["#3d52a1","#a8d6f3","#f29d6b","#cb443e","#bc2f3e","#ae1c3e"]; break;
				case 7: var palette4 = ["#3d52a1","#9ecff0","#f6b076","#d95c46","#cd463e","#bf343e","#ae1c3e"]; break;
				case 8: var palette4 = ["#3d52a1","#8dc4eb","#f2cfa7","#ec865d","#e27152","#da5e47","#cc453e","#ae1c3e"]; break;
				case 9: var palette4 = ["#3d52a1","#88c1ea","#efd8bc","#ef9164","#e87e59","#e06b4e","#d45341","#b8293e","#ae1c3e"]; break;
				default: var palette4 = ["#3d52a1","#3a89c9","#77b7e5","#b4ddf7","#e6f5fe","#ffe3aa","#f9bd7e","#ed875e","#d24d3e","#ae1c3e"];
			}
			
			// 3d effect colors
			var palette6 = ['Gradient(#c00:red:#f66:red:#c00)', 'Gradient(#00c:blue:#66f:blue:#00c)', 'Gradient(#0c0:#0f0:#6f6:#0f0:#0c0)', 'Gradient(#c66:pink:pink:pink:#c66)', 'Gradient(gray:#ccc:white:#ccc:gray)'];
			
			
			
			
			switch(layout.chartColor) {
				case 2: // dark red to yellow
					var palette = palette2;
					break;
				case 3: // yellow to dark red
					var palette = palette2.reverse();
					break;
				case 4: // blue to red
					var palette = palette4;
					break;
				case 5: // red to blue
					var palette = palette4.reverse();
					break;
				case 6: // 3d effect colors
					var palette = palette6;
					break;
				case 1: // standard QS dim colours
					switch(numberOfDimValues) {
						case 1: var palette = ["#4477aa"]; break;
						case 2: var palette = ["#4477aa","#cc6677"]; break;
						case 3: var palette = ["#4477aa","#ddcc77","#cc6677"]; break;
						case 4: var palette = ["#4477aa","#117733","#ddcc77","#cc6677"]; break;						
						case 5: var palette = ["#332288","#88ccee","#117733","#ddcc77","#cc6677"]; break;
						case 6: var palette = ["#332288","#88ccee","#117733","#ddcc77","#cc6677","#aa4499"]; break;
						case 7: var palette = ["#332288","#44aa99","#88ccee","#117733","#ddcc77","#cc6677","#aa4499"]; break;
						case 8: var palette = ["#332288","#44aa99","#88ccee","#117733","#999933","#ddcc77","#cc6677","#aa4499"]; break;
						case 9: var palette = ["#332288","#44aa99","#88ccee","#117733","#999933","#ddcc77","#cc6677","#882255","#aa4499"]; break;
						case 10: var palette = ["#332288","#44aa99","#88ccee","#117733","#999933","#ddcc77","#661100","#cc6677","#882255","#aa4499"]; break;
						case 11: var palette = ["#332288","#6699cc","#44aa99","#88ccee","#117733","#999933","#ddcc77","#661100","#cc6677","#882255","#aa4499"]; break;
						case 12: var palette = ["#332288","#6699cc","#88ccee","#44aa99","#117733","#999933","#ddcc77","#661100","#cc6677","#aa4466","#882255","#aa4499"]; break;
						default: ["#99c867","#e43cd0","#e2402a","#66a8db","#3f1a20","#e5aa87","#3c6b59","#aa2a6b","#e9b02e","#7864dd","#65e93c","#5ce4ba","#d0e0da","#d796dd","#64487b","#e4e72b","#6f7330","#932834","#ae6c7d","#986717","#e3cb70","#408c1d","#dd325f","#533d1c","#2a3c54","#db7127","#72e3e2","#e2c1da","#d47555","#7d7f81","#54ae9b","#e9daa6","#3a8855","#5be66e","#ab39a4","#a6e332","#6c469d","#e39e51","#4f1c42","#273c1c","#aa972e","#8bb32a","#bdeca5","#63ec9b","#9c3519","#aaa484","#72256d","#4d749f","#9884df","#e590b8","#44b62b","#ad5792","#c65dea","#e670ca","#e38783","#29312d","#6a2c1e","#d7b1aa","#b1e7c3","#cdc134","#9ee764","#56b8ce","#2c6323","#65464a","#b1cfea","#3c7481","#3a4e96","#6493e1","#db5656","#747259","#bbabe4","#e33f92","#d0607d","#759f79","#9d6b5e","#8574ae","#7e304c","#ad8fac","#4b77de","#647e17","#b9c379","#8da8b0","#b972d9","#786279","#7ec07d","#916436","#2d274f","#dce680","#759748","#dae65a","#459c49","#b7934a","#51c671","#9ead3f","#969a5c","#b9976a","#46531a","#c0f084","#76c146","#bad0ad"];
					}
					break;
			}
			
			
			
			// set shadow color to allow shadow to switch on and off
			if (layout.shadow) {
				var shadowYN = '#aaa';
			} else {
				var shadowYN = 'rgba(0,0,0,0)';
			}
			//console.log(shadowYN);
			
			
			// set exploding segments based off easy selection variable (will not store string required)
			switch(layout.explodeSegment) {
				case 0:
					var explodeSegment2 = [0];
					break;
				case 1:
					var explodeSegment2 = [20];
					break;
				case 2:
					var explodeSegment2 = [0,20];
					break;
				case 3:
					var explodeSegment2 = [0,0,20];
					break;
				case 4:
					var explodeSegment2 = [0,0,0,20];
					break;
				case 5:
					var explodeSegment2 = [0,0,0,0,20];
					break;
			}
			
			
			// set segment border color to allow border to switch on and off
			if (layout.segmentBorder) {
				var segmentBorder2 = '#fff';
			} else {
				var segmentBorder2 = 'rgba(0,0,0,0)';
			}
			
			
			
			// Activate or Deactivate Labels Sticks as sticks should not show if labels not selected.
			if (layout.chartLabels) {
				var labelsArray = dimArray;
			} else {
				var labelsArray = [];
			}
			layout.labelSticks
			
			
			// se
			
			
			// Swtich between charts to draw below 
			switch(layout.chartEffect) {
				case "Halo":
					var chartTypeEffect = "Halo";
					var chartVariant = layout.chartType;
					break;
				case "Border":
					var chartTypeEffect = "Halo";
					var chartVariant = layout.chartType;
					break;	
				case "2d":
					var chartTypeEffect = "Default";
					var chartVariant = layout.chartType;
					break;
				case "3d":
					var chartTypeEffect = "Default";
					var chartVariant = layout.chartType.concat(layout.chartEffect);
					break;
			}
					
			
			
			
/* 			
			var html = '';
			
			var width = $element.width(), height = $element.height();
			html+='<div id="canvas-wrapper"><canvas id="cvs" width="'+width+'" height="'+height+'">[No canvas support]</canvas></div>';
			
			$element.html(html);
			
			RGraph.Reset(document.getElementById('cvs'));
			
	 */		
			
			//To generate random numbers to allow multiple charts to present on one sheet:
			function guid() {return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();};
			function s4() {return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);};
			var tmpCVSID = guid();
						


			var html = '';			
			var width = $element.width(), height = $element.height();
			// add canvas for chart			
			html+='<div id="canvas-wrapper"><canvas id="' + tmpCVSID + '" width="'+width+'" height="'+height+'">[No canvas support]</canvas></div>';

			$element.html(html);

			
			RGraph.Reset(document.getElementById(tmpCVSID));
		
			
			switch(chartTypeEffect) {
				// Draws 3d pie chart
				case "Default":
					chart = new RGraph.Pie({
						id: tmpCVSID,
						data: measArray,
						options: {
							gutterLeft: 100,
							gutterRight: 100,
							gutterTop: 30,
							gutterBottom: 50, 
							linewidth: layout.segmentBorderWidth,
							textSize: 10,
							textColor: '#aaa',
							strokestyle: segmentBorder2,
							tooltips: dimArray,
							tooltipsEvent: 'onmousemove',					
							labels: labelsArray,						
							colors: palette,
							variant: chartVariant,
							//radius: 100,
							labelsSticksList: layout.labelSticks,
							//labelsSticksColors: [,'#cc0',,,'#0f0',,'black'],
							labelsSticksColors:'#aaa',
							//radius: 80,
							shadowOffsety: layout.shadowDepth,
							shadowColor: shadowYN,
							// ********************** you can change which segment explodes here, the first dimension in order is currently set [20,,] to explode by 20 pixels
							exploded: explodeSegment2,
							textAccessible: false,
							eventsClick: onClickDimension
							//eventsMousemove: onMouseMove,
						}
					}).draw();
					break;

					// Draws Halo chart	
					case "Halo":
					chart = new RGraph.Pie({
						id: tmpCVSID,
						data: measArray,
						options: {
							gutterLeft: 100,
							gutterRight: 100,
							gutterTop: 30,
							gutterBottom: 50,
							linewidth: layout.segmentBorderWidth,
							textSize: 10,
							textColor: '#9fcfff',
							strokestyle: segmentBorder2,
							tooltips: dimArray,
							tooltipsEvent: 'onmousemove',					
							labels: labelsArray,						
							colors: palette,
							variant: chartVariant,
							//radius: 100,
							//width: 50,
							labelsSticksList: layout.labelSticks,
							labelsSticksColors: '#aaa',
							//radius: 80,
							shadowOffsety: layout.shadowDepth,
							shadowColor: shadowYN,
							// ********************** you can change which segment explodes here, the first dimension in order is currently set [20,,] to explode by 20 pixels
							//exploded: explodeSegment2,
							textAccessible: false,
							eventsClick: onClickDimension
							//eventsMousemove: onMouseMove,
						}
					}).on('draw', function(obj)
							{
								RGraph.path2(
									obj.context,
									'lw 5 b a % % % 0 6.2830 false s white',
									obj.centerx,
									obj.centery,
									obj.radius - 12
								);

							}).draw();
					break;
				
					
			}
			
			
			
			
			
			
			
			
			
			
			// On Click actions
			function onClickDimension (e, shape)
			{
				var index = shape.index;
				app.field(dimensionName).toggleSelect(dimArray[index], true);
			}	
			
			// On Mouse Over actions
			function onMouseMove (e, shape)
			{
				var index = shape.index;
				//self.backendApi.selectValues(0, dimArray[index], true);
				app.field(dimensionName).toggleSelect(dimArray[index], true);
			}					
			
			//needed for export
			return qlik.Promise.resolve();
		}	
		
		
		
	};

} );

