document.addEventListener('DOMContentLoaded', startTimer);
    // Get timezone data from api and sorts by the zone names
$.get("https://api.timezonedb.com/v2/list-time-zone?key=D1LUAPW05SMD&format=json",function(data){
	zones = data.zones.sort(function(a,b){
				return a['zoneName'].toLowerCase() > b['zoneName'].toLowerCase();
			})

	var options = '';
	zones.forEach(function(item){
		selected = '';
		if(item['zoneName'].toLowerCase() == 'africa/lagos'){
			selected = 'selected';
		}
	options += '<option value=' +(item.gmtOffset/3600) + ' ' + selected + '>' + item.zoneName + '</option>';
	document.getElementById('tzSelect').innerHTML = options;
	});
});

function startTimer(){
	setInterval(updateTime, 1000);
    // updateTime();
} 


function updateTime() {
const dateData = new Date();
const offset_value = document.getElementById('tzSelect').value-1
const hr = dateData.getHours() + offset_value;
const mint = dateData.getMinutes();
const secs = dateData.getSeconds();
const zone = dateData.getTimezoneOffset()/(-60);

  //--- Digital clock setup ----//
const timeString = formatHour(hr) + " : " + padZero(mint) + " : " + padZero(secs) + " " + amPM(hr)  + "  GMT: +" +String(zone) ;
// console.log("time",timeString);
document.querySelector("#current-time").innerHTML = timeString;
// }

// 	// Pad in the initial zero to the minute and second display for 0 to 9 results
function padZero(numb) {
    if (numb< 10){ 
        return "0" + String(numb);
		}else{
			  return String(numb);
		    }
}
		
// 	// Setting a 12 hourly clock using modulus to get remainders as hour for values greater than 12
function formatHour(hour){
	let hr = hour % 12;

		if (hr === 0) { 
	        hr = 12; 
	    }
	    return String(hr)
	}

// 	// function to detect if time is AM or PM
	function amPM(hour){
		return  (hour < 12) ? "AM" : "PM";}

	//--- Analogue clock setup ---//
    // A cross-brower way to check if document has loaded in javaScript and is ready, so change state to complete
// document.onreadystatechange = () => {
// 	if (document.readyState === 'complete') {
	    // document is ready
	    const canvas = document.querySelector("#clockCanvas");
	    const context = canvas.getContext("2d");
		     
		    //Setting a radius to fill the canvas size specified
	    const clockRadius = 100;
		     
		    //Ensuring a centralized clock on the canvas
	    const clockX = canvas.width / 2;
	    const clockY = canvas.height / 2;
		     
		    //Defining TAU
		Math.TAU = 2 * Math.PI;
		// let dateData = new Date();
		// let hr 	 = dateData.getHours() % 12;
		// let mint = dateData.getMinutes();
		// let secs = dateData.getSeconds();
			
		function drawArm(progressRate, armThickness, armLength, armColor) {
		    var armRadians = (Math.TAU * progressRate) - (Math.TAU/4);
		    var targetX = clockX + Math.cos(armRadians) * (armLength * clockRadius);
		    var targetY = clockY + Math.sin(armRadians) * (armLength * clockRadius);
		 
		    context.lineWidth = armThickness;
		    context.strokeStyle = armColor;
		 
		    context.beginPath();
		    context.moveTo(clockX, clockY); // Start at the center
		    context.lineTo(targetX, targetY); // Draw a line outwards
		    context.stroke();
		}

		context.clearRect(0, 0, canvas.width, canvas.height);
		drawArm(hr / 12, 10, 0.50, '#000000'); // Hour
		drawArm(mint / 60,  4, 0.75, '#000000'); // Minute
		drawArm(secs / 60,  2, 1.00, '#FF0000'); // Second
//   }
// }
}
	
