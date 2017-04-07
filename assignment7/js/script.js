function switchText(rate) {
	var rateText

	switch(rate) {
		case "2":
			rateText = "Very likely"
			break;
		case "1":
			rateText = "Likely"
			break;
		case "0":
			rateText = "Probably"
			break;
		case "-1":
			rateText = "Unlikely"
			break;
		case "-2":
			rateText = "Very unlikely"
			break;
	}

	return rateText
}

function main() {
	$("#submit").click(function() {
		// Get the rates entered by the user
		var bike = $("#bike").val()
		var bus = $("#bus").val()
		var car = $("#car").val()
		var carpool = $("#carpool").val()
		var taxi = $("#taxi").val()
		var walk = $("#walk").val()

		var zip = $("#zip").val()

		// Insert text into the output area element
		var bikeRate = switchText(bike)
		var busRate = switchText(bus)
		var carRate = switchText(car)
		var carpoolRate = switchText(carpool)
		var taxiRate = switchText(taxi)
		var walkRate = switchText(walk)
		
		$("#bike-rate").text("Bike from " + zip + ": " + bikeRate + ".")
		$("#bus-rate").text("Bus from " + zip + ": " + busRate + ".")
		$("#car-rate").text("Car from " + zip + ": " + carRate + ".")
		$("#carpool-rate").text("Carpool from " + zip + ": " + carpoolRate + ".")
		$("#taxi-rate").text("Taxi from " + zip + ": " + taxiRate + ".")
		$("#walk-rate").text("Walk from " + zip + ": " + walkRate + ".")
	}) // click()

	// Create a variable for the current year and insert it into the page
	var currentYear = new Date().getFullYear()
	$("#copy-date").text(currentYear)
}

$(document).ready(main)
