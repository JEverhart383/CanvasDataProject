
//Spring 2015 
var Spring2015 = "data/Spring2015.json"; 
var Spring2015Name = "Spring 2015"; 
var Spring2015StartDate = "2015-01-11"; 
var Spring2015EndDate = "2015-05-03" ; 

//Fall 2014 
var Fall2014 = "data/Fall2014.json"; 
var Fall2014Name = "Fall 2014";
var Fall2014StartDate = "2014-08-24"; 
var Fall2014EndDate = "2014-12-14"; 

//Summer II 2014
var Summer22014 = "data/Summer22014.json";
var Summer22014Name = "Summer II 2014";
var Summer22014StartDate = "2014-05-18" ; 
var Summer22014EndDate = "2014-08-03" ;  

//Summer I 2014
var Summer12014 = "data/Summer12014.json"; 
var Summer12014Name = "Summer I 2014"; 
var Summer12014StartDate = "2014-05-18" ; 
var Summer12014EndDate = "2014-07-02" ; 

//Spring 2014
var Spring2014 = "data/Spring2014.json"; 
var Spring2014Name = "Spring 2014"; 
var Spring2014StartDate = "2014-01-12" ; 
var Spring2014EndDate = "2014-05-31" ; 

//Fall 2013
var Fall2013 = "data/Fall2013.json"; 
var Fall2013Name = "Fall 2013"; 
var Fall2013StartDate = "2013-08-25" ; 
var Fall2013EndDate = "2013-12-29" ; 

//Summer II 2013
var Summer22013 = "data/Summer22013.json";
var Summer22013Name = "Summer II 2013"; 
var Summer22013StartDate = "2013-05-12" ; 
var Summer22013EndDate = "2013-08-31" ; 

//Summer I 2013
var Summer12013 = "data/Summer12013.json";
var Summer12013Name = "Summer I 2013"; 
var Summer12013StartDate = "2013-05-12" ; 
var Summer12013EndDate = "2013-06-30" ; 


//define function to write charts with data path and term name as variables

function createCharts(dataPath, termName, startDate, endDate){


	//remove SVGs if updating data 
	d3.select("#chart svg").remove("svg"); 
	d3.select("#chart2 svg").remove("svg"); 

	//create SVGs 
	var svg = dimple.newSvg("#chart", 1200, 500);
	var svg2 = dimple.newSvg("#chart2", 1000, 500);
	
	//adjust start and end dates for 2 week window 
	startDate = new Date(startDate); 
	startDate = new Date(startDate - 1209600000); 

	endDate = new Date(endDate); 
	endDate = new Date(endDate + 1209600000); 

	console.log(startDate + " to " + endDate); 
	

	d3.json(dataPath, function(data){  

			d3.selectAll(".term-name").text(termName); 
			var data1 = data.by_date; 
			var data2 = data.by_category; 
			var dataTrimmed = [];

			//Trim data based on start and end dates 	

			for (var i = 0; i < data1.length; i++){
				if (new Date(data1[i].date) >= startDate && new Date(data1[i].date) <= endDate){
					dataTrimmed.push(data1[i]); 
				}
			}
 
			var viewsArray = []; 
			var participateArray =[];
			
			for (var i = 0; i < dataTrimmed.length; i ++){
				viewsArray.push(dataTrimmed[i].views); 
			}

			totalViews = d3.sum(viewsArray);
			meanViews = Math.round(d3.mean(viewsArray) * 100)/100;

			for (var i = 0; i < dataTrimmed.length; i ++){
				participateArray.push(dataTrimmed[i].participations); 
			} 

			totalParticipate = d3.sum(participateArray); 
			meanParticipate = Math.round(d3.mean(participateArray) * 100)/100; 

			d3.select(".total-views").text(totalViews.toLocaleString()); 
			d3.select(".mean-views").text(meanViews.toLocaleString()); 
			d3.select(".total-participate").text(totalParticipate.toLocaleString()); 
			d3.select(".mean-participate").text(meanParticipate.toLocaleString()); 


			var myChart = new dimple.chart(svg,dataTrimmed); 
			myChart.setBounds(60,30, 1100, 400); 
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

//inital data load with most recent completed term

createCharts(Spring2015, Spring2015Name, Spring2015StartDate, Spring2015EndDate); 


//update data with Spring 2015 
document.querySelector(".spring2015").onclick = function(){
	createCharts(Spring2015, Spring2015Name, Spring2015StartDate, Spring2015EndDate);  
}; 

//update data with Fall 2014
document.querySelector(".fall2014").onclick = function(){
	createCharts(Fall2014, Fall2014Name, Fall2014StartDate, Fall2014EndDate);  
}; 

//update data with Summer II 2014
document.querySelector(".summer22014").onclick = function(){
	createCharts(Summer22014, Summer22014Name, Summer22014StartDate, Summer22014EndDate);  
}; 

//update data with Summer I 2014
document.querySelector(".summer12014").onclick = function(){
	createCharts(Summer12014, Summer12014Name, Summer12014StartDate, Summer12014EndDate);  
}; 

//update data with Spring 2014
document.querySelector(".spring2014").onclick = function(){
	createCharts(Spring2014, Spring2014Name, Spring2014StartDate , Spring2014EndDate);  
}; 

//update data with Fall 2013
document.querySelector(".fall2013").onclick = function(){
	createCharts(Fall2013, Fall2013Name, Fall2013StartDate, Fall2013EndDate);  
}; 

//update data with Summer II 2013
document.querySelector(".summer22013").onclick = function(){
	createCharts(Summer22013, Summer22013Name, Summer22013StartDate, Summer22013EndDate);  
}; 

//update data with Summer I 2013
document.querySelector(".summer12013").onclick = function(){
	createCharts(Summer12013, Summer12013Name, Summer12013StartDate, Summer12013EndDate);  
}; 
