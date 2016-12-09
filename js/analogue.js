document.addEventListener('DOMContentLoaded', startTimer);
// Get timezone data from timeZonedb api and sorts by the zone names
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
// updateTime
} 

function updateTime() {
	const dateData = new Date();
	const offset_value = document.getElementById('tzSelect').value-1;

	let hr, mint;
// checking for float offset value
	if (offset_value%1 !== 0){
		let offset_vale = Math.floor(offset_value)
		const offset_valueMint= (offset_value-Math.floor(offset_vale))*60;
		hr = dateData.getHours() + offset_vale;
		mint = dateData.getMinutes() + offset_valueMint;
			if(mint>=60){
				mint = mint%60;
				hr +=1 
			}
	}
	else{
	hr = dateData.getHours() + offset_value;
	mint = dateData.getMinutes();
	} 
//seconds and zone are not affected by offset in float
	const secs = dateData.getSeconds();
	const zone = (offset_value + 1);
	const location = '';

//--- Digital clock setup ----//
	const timeString = formatHour(hr) + ":" + padZero(mint) + ":" + padZero(secs) + " " + amPM(hr)  + " GMT: " +String(zone);
	document.querySelector("#current-time").innerHTML = timeString;
	
// Pad in the initial zero to the minute and second display for 0 to 9 results
	function padZero(numb) {
	    if (numb< 10){ 
	        return "0" + String(numb);
		}else{
			 return String(numb);
	    }
	}
			
// Setting a 12 hourly clock using modulus to get remainders as hour for values greater than 12
	function formatHour(hour){
		let hr = hour % 12;
			if (hr === 0) { 
		        hr = 12; 
		    }
	    return String(hr)
	}

// function to detect if time is AM or PM
	function amPM(hour){
		return  (hour < 12) ? "AM" : "PM";
	}

//--- Analogue clock setup ---//
	const canvas = document.querySelector("#clockCanvas");
	const context = canvas.getContext("2d");
	     
//Setting a radius to fill the canvas size specified
	const clockRadius = 200;
	
//Ensuring a centralized clock on the canvas
	const clockX = canvas.width / 2;
	const clockY = canvas.height / 2;
		     
	Math.TAU = 2 * Math.PI;
				
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
			drawArm(hr / 12, 10, 0.45, '#000000'); // Hour
			drawArm(mint / 60,  4, 0.65, '#000000'); // Minute
			drawArm(secs / 60,  2, 0.90, 'blue'); // Second
}
	
