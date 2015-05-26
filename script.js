var svg = dimple.newSvg("#chart", 1000, 500);
var svg2 = dimple.newSvg("#chart2", 1000, 500);

var Spring2015 = "Spring2015.json"; 
var Spring2015Name = "Spring 2015"; 
//define function to write charts with data path and term name as variables

function createCharts(dataPath, termName){

	d3.json(dataPath, function(data){

			d3.selectAll(".term-name").text(termName); 	

			data1 = data.by_date;
			data2 = data.by_category; 

			var myChart = new dimple.chart(svg,data1); 
			myChart.setBounds(60,30,950,450); 
			var x = myChart.addTimeAxis("x", "date", "%Y-%m-%d", "%a-%m-%d-%Y" ); 
			var y = myChart.addMeasureAxis("y", "views"); 
			var p = myChart.addMeasureAxis("y", "participations"); 
			var s = myChart.addSeries(null , dimple.plot.line); 
			myChart.draw(); 

			var myChart2 = new dimple.chart(svg2, data2);
			myChart2.setBounds(60,30,950,450); 
			myChart2.addMeasureAxis("p", "views"); 
			var ring = myChart2.addSeries("category", dimple.plot.pie); 
			ring.innerRadius = "50%"; 
			myChart2.addLegend(150,20,200,300, "left"); 
			myChart2.draw(); 

	});//End JSON function

}//End createCharts 

createCharts(Spring2015, Spring2015Name); 

//call to load JSON data 

// d3.json("Spring2015.json", function(data){

// 		d3.selectAll(".term-name").text("Spring 2015"); 	

// 		data1 = data.by_date;
// 		data2 = data.by_category; 

// 		var myChart = new dimple.chart(svg,data1); 
// 		myChart.setBounds(60,30,950,450); 
// 		var x = myChart.addTimeAxis("x", "date", "%Y-%m-%d", "%a-%m-%d-%Y" ); 
// 		var y = myChart.addMeasureAxis("y", "views"); 
// 		var p = myChart.addMeasureAxis("y", "participations"); 
// 		var s = myChart.addSeries(null , dimple.plot.line); 
// 		myChart.draw(); 

// 		var myChart2 = new dimple.chart(svg2, data2);
// 		myChart2.setBounds(60,30,950,450); 
// 		myChart2.addMeasureAxis("p", "views"); 
// 		var ring = myChart2.addSeries("category", dimple.plot.pie); 
// 		ring.innerRadius = "50%"; 
// 		myChart2.addLegend(150,20,200,300, "left"); 
// 		myChart2.draw(); 

// }); 