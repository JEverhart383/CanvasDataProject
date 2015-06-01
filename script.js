
//Spring 2015 
var Spring2015 = "data/Spring2015/Spring2015"; 
var Spring2015Name = "Spring 2015"; 
var Spring2015StartDate = "2015-01-11"; 
var Spring2015EndDate = "2015-05-03" ; 

//Fall 2014 
var Fall2014 = "data/Fall2014/Fall2014"; 
var Fall2014Name = "Fall 2014";
var Fall2014StartDate = "2014-08-24"; 
var Fall2014EndDate = "2014-12-14"; 

//Summer II 2014
var Summer22014 = "data/Summer22014/Summer22014";
var Summer22014Name = "Summer II 2014";
var Summer22014StartDate = "2014-05-18" ; 
var Summer22014EndDate = "2014-08-03" ;  

//Summer I 2014
var Summer12014 = "data/Summer12014/Summer12014"; 
var Summer12014Name = "Summer I 2014"; 
var Summer12014StartDate = "2014-05-18" ; 
var Summer12014EndDate = "2014-07-02" ; 

//Spring 2014
var Spring2014 = "data/Spring2014/Spring2014"; 
var Spring2014Name = "Spring 2014"; 
var Spring2014StartDate = "2014-01-12" ; 
var Spring2014EndDate = "2014-05-31" ; 

//Fall 2013
var Fall2013 = "data/Fall2013/Fall2013"; 
var Fall2013Name = "Fall 2013"; 
var Fall2013StartDate = "2013-08-25" ; 
var Fall2013EndDate = "2013-12-29" ; 

//Summer II 2013
var Summer22013 = "data/Summer22013/Summer22013";
var Summer22013Name = "Summer II 2013"; 
var Summer22013StartDate = "2013-05-12" ; 
var Summer22013EndDate = "2013-08-31" ; 

//Summer I 2013
var Summer12013 = "data/Summer12013/Summer12013";
var Summer12013Name = "Summer I 2013"; 
var Summer12013StartDate = "2013-05-12" ; 
var Summer12013EndDate = "2013-06-30" ; 

//Category Overview 

var catOverviewPath = "data/CategoryTotal.json"; 


//define function to write charts with data path and term name as variables

function createCharts(dataPath, termName, startDate, endDate){


	//remove SVGs if updating data 
	d3.select("#chart svg").remove("svg"); 
	d3.select("#chart2 svg").remove("svg");
	d3.select("#gradeChart svg").remove("svg");  

	//create SVGs 
	var svg = dimple.newSvg("#chart", 1200, 500);
	var svg2 = dimple.newSvg("#chart2", 800, 500);
	var svg3 = dimple.newSvg("#gradeChart", 450, 200); 
	
	//adjust start and end dates for 2 week window 
	startDate = new Date(startDate); 
	startDate = new Date(startDate - 1209600000); 

	endDate = new Date(endDate); 
	endDate = new Date(endDate + 1209600000); 

	var activityPath = dataPath + "Activity.json"; 
	var statisticsPath = dataPath + "Statistics.json"; 
	var gradesPath = dataPath + "Grades.json"

	//load JSON for Activity path 
	d3.json(activityPath, function(data){  

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
			myChart2.setBounds(30,30,750,450); 
			myChart2.addMeasureAxis("p", "views"); 
			var ring = myChart2.addSeries("category", dimple.plot.pie); 
			ring.innerRadius = "50%"; 
			myChart2.addLegend(30,20,200,300, "left"); 
			myChart2.draw(); 

	});//End JSON function


	//Begin JSON load for stats totals 
	d3.json(statisticsPath, function(data){
		d3.select(".total-courses").text(data.courses); 
		d3.select(".total-teachers").text(data.teachers); 
		d3.select(".total-students").text(data.students);
		d3.select(".total-discussions").text(data.discussion_topics);
		d3.select(".total-media").text(data.media_objects);
		d3.select(".total-attachments").text(data.attachments);
		d3.select(".total-assignments").text(data.assignments);

	}); 

	//Begin JSON load for grades 

	d3.json(gradesPath, function(data){

		gradesArray = [];

		function gradeScore(score, frequency){
			this.score = score;
			this.frequency = frequency; 
		} 

		for (var key in data){
			var newGrade = new gradeScore(parseInt(key), data[key]); 
			gradesArray.push(newGrade);  
		}

		console.log(gradesArray); 
		 

		var myChart3 = new dimple.chart(svg3, gradesArray); 
			
			myChart3.setBounds(50, 15, 350, 120); 
			var x = myChart3.addCategoryAxis("x", "score");   
			x.hidden = false;
			x.title = "Score"; 
			var y = myChart3.addCategoryAxis("y", "frequency"); 
			y.title = "Frequency"; 
			var s = myChart3.addSeries(null , dimple.plot.line); 
			myChart3.draw();    
			
			d3.selectAll("#gradeChart svg g .dimple-axis g text").remove("text"); 


	}); 




}//End createCharts 

function categoryOverview(catDataPath){

	var svg = dimple.newSvg("#chart3", 1000, 500);
    d3.json(catDataPath, function (data) { 	

      var myChart = new dimple.chart(svg, data); 
      myChart.setBounds(65, 30, 950, 400)
      myChart.addCategoryAxis("x", "term_name");
      myChart.addMeasureAxis("y", "views");
      myChart.addMeasureAxis("z", "views");
      myChart.addSeries("category", dimple.plot.bubble);
      myChart.addLegend(900, 40, 200, 200, "left");
      myChart.draw();
    });


}


//inital data load with most recent completed term

createCharts(Spring2015, Spring2015Name, Spring2015StartDate, Spring2015EndDate); 

categoryOverview(catOverviewPath); 


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
