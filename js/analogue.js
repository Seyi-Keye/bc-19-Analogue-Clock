
    document.addEventListener('DOMContentLoaded', displayTime);
 
	function displayTime() {
		// creating a new instance of the date class
	    const dateData = new Date();
	    // Specify and assign each date method to be used
	    const hr   = dateData.getHours();
		const mint = dateData.getMinutes();
		const secs = dateData.getSeconds();
		const zone = dateData.getTimezoneOffset()/(-60);

	    // Digital clock setup
	    // convert all values to string(num) before use
	    const timeString = formatHour(hr) + ":" + padZero(mint) + ":" + padZero(secs) + ". " + amPM(hr)  + "  GMT: +" +String(zone) ;
		document.querySelector("#current-time").innerHTML = timeString;
		}
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

	// Analogue clock setup
    // A cross-brower way to check if document has loaded in javaScript and is ready, so change state to complete
	document.onreadystatechange = () => {
  		if (document.readyState === 'complete') {
	    // document is ready
	    const canvas = document.querySelector("#clockCanvas");
	    const context = canvas.getContext("2d");
	     
	    //Setting a radius to fill the canvas size specified
	    const clockRadius = 100;
	     
	    //Ensuring a centralized clock on the canvas
	    const clockX = canvas.width / 2;
	    const clockY = canvas.height / 2;
	     
	    //Math calculations for radians of each arm
	    //Defining TAU
		Math.TAU = 2 * Math.PI;
		let dateData = new Date();
		let hr 	 = dateData.getHours() % 12;
		let mint = dateData.getMinutes();
		let secs = dateData.getSeconds();
			
		 function drawArm(progressRate) {
		    var armRadians = (Math.TAU * progressRate) - (Math.TAU/4);
		    var armLength = clockRadius;
		 
		    var targetX = clockX + Math.cos(armRadians) * armLength;
		    var targetY = clockY + Math.sin(armRadians) * armLength;
		 
		    context.lineWidth = 10;
		    context.strokeStyle = '#DD0000'; // RED
		 
		    context.beginPath();
		    context.moveTo(clockX, clockY); // Start at the center
		    context.lineTo(targetX, targetY); // Draw a line outwards
		    context.stroke();
			}
			 
		drawArm(hr / 12); // Hour
		drawArm(mint / 60); // Minute
		drawArm(secs / 60); // Second

		// const hrArmRadians = Math.TAU * (hr / 12);
		// const hrArmLength = clockRadius;
		 
		// // If we start from the center of the clock, 
		// //  this is where the x and y value the other end of the arm should point to
		// const targetX = clockX + Math.cos(hrArmRadians - (Math.TAU/4)) * hrArmLength;
		// const targetY = clockY + Math.sin(hrArmRadians - (Math.TAU/4)) * hrArmLength;
	     
	 //    //Setting a 10 pixels thick red coloured hour arm
	 //    context.lineWidth = 10;
	 //    context.strokeStyle = 'red';
	     
	 //     // Drawing a line that starts at the center of the canvas to the right
	 //    context.beginPath();
	 //    context.moveTo(clockX, clockY); // Start at the center
	 //    context.lineTo(targetX, targetY); // Draw a line outwards
	 //    context.stroke();
	 //    //Setting a 5 pixels thick black coloured minute hand
		// context.lineWidth = 5;
		// context.strokeStyle = 'black';
		// // Drawing a line that starts at the center of the canvas and moves upward 
		// context.beginPath();
		// context.moveTo(clockX, clockY); // Start at the center
		// context.lineTo(clockX, clockY - clockRadius); // Draw a line upwards
		// context.stroke();

  }
}
