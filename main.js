//Google Maps

//__________________________________________________
//HTML display functions

//Show/hide sidebar
function showHideSidebar(){
	var sideBar = document.getElementById('sideBar');
	var POI = document.getElementById('POI');
	if (sideBar.style.display === 'none' && POI.style.display === 'none') {
		sideBar.style.display = 'block';
		document.getElementById('sidebarButton').innerHTML = '<i class="fa fa-arrow-left"></i>';
	} else {
		sideBar.style.display = 'none';
		POI.style.display = 'none';
		document.getElementById('sidebarButton').innerHTML = '<i class="fa fa-arrow-right"></i>';
	};
};

//Show/hide side options
function showHideOptions(){
	var sideOptions = document.getElementById('sideOptions');
	if (sideOptions.style.display === 'block') {
		sideOptions.style.display = 'none';
	} else {
		sideOptions.style.display = 'block';
	};
};

//Switch form to list of places and vice-versa
function switchFormPlaces(){
	var sideBar = document.getElementById('sideBar');
	var POI = document.getElementById('POI');
	if (sideBar.style.display === 'none' && POI.style.display === 'none') {
		return;
	}
	if (POI.style.display === 'block') {
		POI.style.display = 'none';
		sideBar.style.display = 'block';
	} else {
		sideBar.style.display = 'none';
		POI.style.display = 'block';
	};
};


//__________________________________________________
//Map functions (Google Maps)

//Creating map and tiles, centering on current location if available, else on Luxembourg City
var map;
var marker;
function initMap(){
	//Initializing map centered on Lux City
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 49.6096, lng: 6.1284},
		zoom: 12,
		fullscreenControl: false,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
			position: google.maps.ControlPosition.TOP_RIGHT,
		}
	});

	//Set marker on Lux City
	var luxCoords = {lat: 49.6096, lng: 6.1284};
	marker = new google.maps.Marker({
		position: luxCoords,
		map: map
	});
	marker.setMap(map);
	document.getElementById('latLngCo').value = marker.getPosition();

	//Calls function to center and put marker on current location
	if (navigator.geolocation){
          navigator.geolocation.getCurrentPosition(currentLocation)
	};

	//Calls function to display all previously saved places on the map with pins and create the list
	displaySavedPins();
	createList();

	setMarker();
};

//Uses HTML5 Geolocation API to find current location and open map centered on it
function currentLocation(currentLoc){
	var currentLoc = {
		lat: currentLoc.coords.latitude,
        lng: currentLoc.coords.longitude
	};
	map.setCenter(currentLoc);
	marker.setPosition(currentLoc);
	document.getElementById('latLngCo').value = '(' + currentLoc.lat + ', ' + currentLoc.lng + ')'
};

//Calls moving marker function activated on click on markerButton
var functionMarker;
function setMarker(){
	document.getElementById('latLngCo').value = marker.getPosition();
	if (circle != null){
		circle.setMap(null);
		circle = null;
	};
	form.removeEventListener('submit', saveCircle);
	form.addEventListener('submit', savePlace);
	google.maps.event.removeListener(functionCircle);
	functionMarker = map.addListener('click', setMyMarker);
	document.getElementById('controlMarkerDiv').disabled = true;
	document.getElementById('controlCircleDiv').disabled = false;
	document.getElementById('type').disabled = false;
};

//Moving marker function
function setMyMarker(setMyMarker){
	marker.setPosition(setMyMarker.latLng);
	map.panTo(setMyMarker.latLng);
	document.getElementById('latLngCo').value = setMyMarker.latLng;
};

//Pans to the given pin
function panToPin(lat, lng){
	var coords = new google.maps.LatLng(lat, lng);
	map.panTo(coords);
}

//Variable containing all pins of saved places
var allPins = {};

//Pin types and colors
var pinBase = 'images/Icons/';
var pinTypes = {
	pushPin: {
		blue: pinBase + 'BluePin.png',
		green: pinBase + 'GreenPin.png',
		pink: pinBase + 'PinkPin.png',
	},
	markerPin: {
		blue: pinBase + 'BlueMarker.png',
		green: pinBase + 'GreenMarker.png',
		pink: pinBase + 'PinkMarker.png',
	},
	flagPin: {
		blue: pinBase + 'BlueFlag.png',
		green: pinBase + 'GreenFlag.png',
		pink: pinBase + 'PinkFlag.png',
	}
};

//Grabbing option form and apply display changes
var optionForm = document.getElementById('optionForm');
optionForm.addEventListener('submit', applyOptions);

//Function to change display
function applyOptions(apply){
	apply.preventDefault();
	displayPins();
}

//Function changing pin display
function displayPins(){
	var displayPushPin = document.getElementById('pushPin').checked;
	var displayMarkerPin = document.getElementById('markerPin').checked;
	var displayFlagPin = document.getElementById('flagPin').checked;
	var displayCircles = document.getElementById('circlePin').checked;
	var displayBlue = document.getElementById('blue').checked;
	var displayGreen = document.getElementById('green').checked;
	var displayPink = document.getElementById('pink').checked;
	var pins = Object.values(allPins);
	for (pin of pins){
		if (pin.icon == pinTypes.pushPin.blue){
			if (displayPushPin && displayBlue){
				pin.setMap(map);
			} else {
				pin.setMap(null);
			};
		};
		if (pin.icon == pinTypes.pushPin.green){
			if (displayPushPin && displayGreen){
				pin.setMap(map);
			} else {
				pin.setMap(null);
			};
		};
		if (pin.icon == pinTypes.pushPin.pink){
			if (displayPushPin && displayPink){
				pin.setMap(map);
			} else {
				pin.setMap(null);
			};
		};
		if (pin.icon == pinTypes.markerPin.blue){
			if (displayMarkerPin && displayBlue){
				pin.setMap(map);
			} else {
				pin.setMap(null);
			};
		};
		if (pin.icon == pinTypes.markerPin.green){
			if (displayMarkerPin && displayGreen){
				pin.setMap(map);
			} else {
				pin.setMap(null);
			};
		};
		if (pin.icon == pinTypes.markerPin.pink){
			if (displayMarkerPin && displayPink){
				pin.setMap(map);
			} else {
				pin.setMap(null);
			};
		};
		if (pin.icon == pinTypes.flagPin.blue){
			if (displayFlagPin && displayBlue){
				pin.setMap(map);
			} else {
				pin.setMap(null);
			};
		};
		if (pin.icon == pinTypes.flagPin.green){
			if (displayFlagPin && displayGreen){
				pin.setMap(map);
			} else {
				pin.setMap(null);
			};
		};
		if (pin.icon == pinTypes.flagPin.pink){
			if (displayFlagPin && displayPink){
				pin.setMap(map);
			} else {
				pin.setMap(null);
			};
		};
	};
	var circles = Object.values(allCircles);
	for (cir of circles){
		if (cir.fillColor == '#7DE3FB'){
			if (displayCircles && displayBlue){
				cir.setMap(map);
			} else {
				cir.setMap(null);
			};
		};
		if (cir.fillColor == '#A2DA2B'){
			if (displayCircles && displayGreen){
				cir.setMap(map);
			} else {
				cir.setMap(null);
			};
		};
		if (cir.fillColor == '#E83882'){
			if (displayCircles && displayPink){
				cir.setMap(map);
			} else {
				cir.setMap(null);
			};
		};
	};
}

var allCircles = {}

//On click, set circle center
var functionCircle;
function selectCircle(){
	form.removeEventListener('submit', savePlace);
	form.addEventListener('submit', saveCircle);
	google.maps.event.removeListener(functionMarker);
	functionCircle = map.addListener('click', drawCircle);
	document.getElementById('controlMarkerDiv').disabled = false;
	document.getElementById('controlCircleDiv').disabled = true;
	document.getElementById('type').disabled = true;
}

//Function drawing the circle
var circle;
function drawCircle(d){
	map.panTo(d.latLng);
	var zoomFactor = 2**(-(map.getZoom()-12));
	if (circle == null){
		circle = new google.maps.Circle({
			strokeColor: "#FF0000",
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: "#FF0000",
			fillOpacity: 0.35,
			map: map,
			center: d.latLng,
			radius: 3000*zoomFactor,
			editable: true
		});
		circle.addListener('center_changed', function(){
			document.getElementById('latLngCo').value = circle.getCenter();
		})
	} else {
		circle.setCenter(d.latLng);
	};
	document.getElementById('latLngCo').value = d.latLng;
}

//__________________________________________________
//Storage functions (localForage)

//Load image and show image name when uploaded
var dataURL = null;
function getFile(event){
	//Getting image as URL data
	var reader = new FileReader();
	var input = event.target;
	reader.onload = function(){
		dataURL = reader.result;
	};
	reader.readAsDataURL(input.files[0]);
	//Modifying input label
	var image = document.getElementById('file').value;
	var imageFileName = image.split('\\').slice(-1);
	var fileLabel = document.getElementById('fileLabel');
	fileLabel.innerHTML = imageFileName[0];
}

//Reset the var dataURL on click on remove button
function removeFile(){
	dataURL = null;
	var fileLabel = document.getElementById('fileLabel');
	fileLabel.innerHTML = 'Upload an image';
	document.getElementById('file').value = '';
}

//Variable grabbing the form and executing saving function when clicking on save button
var form = document.getElementById('form');
form.addEventListener('submit', savePlace);

//Save data on client side
var validName;
function savePlace(saveEvent){
	saveEvent.preventDefault();
	var validName = document.getElementById('placeName').value;
	//Checks whether the name field is empty or not
	if (validName == ''){
		alert('You have to input a name for your place to save it!');
		return;
	};
	//Formatting comment
	var commentForm = document.getElementById('placeComment').value;
	var commentPlaceProto = commentForm.replace(/\n\n/g, '</p><br/><p>');
	var commentPlace = commentPlaceProto.replace(/\n/g, '</p><p>');
	//Formatting coordinates
	var loc = document.getElementById('latLngCo').value;
	var locAsNewString = loc.substring(1, loc.length - 1);
	var locAsArray = locAsNewString.split(', ');

	//Creating object place to be saved
	var place = {
		location: locAsArray,
		name: document.getElementById('placeName').value,
		comment: commentPlace,
		image: dataURL,
		type: document.getElementById('type').value,
		color: document.getElementById('color').value
	};
	localforage.getItem(validName).then(function(value){
		//Checks whether the name (key) is already used
		if (value == null){
			//Saving the place and displaying a new pin with infowindow
			localforage.setItem(validName, place).then(function(){
				alert('Saving place');
				//Creating new pin
				allPins[place.name] = new google.maps.Marker({
					position: {lat: parseFloat(place.location[0]), lng: parseFloat(place.location[1])},
					map: map,
					icon: pinTypes[place.type][place.color],
					title: place.name
				});
				//Bind infowindow
				allPins[place.name].addListener('click', function(){
					if (place.image == null){
						var contentWindow = '<div class="infoWindow"><h3>' + place.name + '</h3><div class="infoWindowCoords"><p><u>Latitude</u>: ' + parseFloat(place.location[0]) + '</p><p><u>Longitude</u>: ' + parseFloat(place.location[1]) + '</p></div><div class="infoWindowContent"><p>' + place.comment + '</p></div><div class="submitDiv"><button class="changePlace disableModif" onclick="modifyPlace()" disabled>Modify</button><button class="changePlace" onclick="deletePlace(&#039;' + place.name + '&#039;)">Delete</button></div></div>';
					} else {
						var contentWindow = '<div class="infoWindow"><h3>' + place.name + '</h3><div class="infoWindowCoords"><p><u>Latitude</u>: ' + parseFloat(place.location[0]) + '</p><p><u>Longitude</u>: ' + parseFloat(place.location[1]) + '</p></div><div class="infoWindowContent"><p>' + place.comment + '</p></div><div><img src="' + place.image + '"></img></div><div class="submitDiv"><button class="changePlace disableModif" onclick="modifyPlace()" disabled>Modify</button><button class="changePlace" onclick="deletePlace(&#039;' + place.name + '&#039;)">Delete</button></div></div>';
					};
					var infoWindow = new google.maps.InfoWindow({
						content: contentWindow,
						maxWidth:400,
					});
					infoWindow.open(map, allPins[place.name]);
					panToPin(parseFloat(place.location[0]), parseFloat(place.location[1]));
				});
				//Create div for place in sidebar
				localforage.getItem(validName).then(function(value){
					createDiv(value);
				}).catch(function(err){
					console.log(err);
				});
				alert('Place successfully saved!');
			}).catch(function(err){
				alert("An error occured, your place could not be saved! \n\n If you use Safari, you may need to 'Disable local file restrictions' in the 'Develop' menu.");
				console.log(err)
			});
			//Reset form
			var fileLabel = document.getElementById('fileLabel');
			fileLabel.innerHTML = 'Upload an image';
			dataURL = null;
			document.getElementById('file').value = '';
			form.reset();
		} else {
			alert('You cannot use a name that is already used for another place!')
		};
	}).catch(function(err){
		alert('An error occured!');
		console.log(err)
	});
};

//Saving circle function
function saveCircle(saveEvent){
	saveEvent.preventDefault();
	var validName = document.getElementById('placeName').value;
	//Checks whether the name field is empty or not
	if (validName == ''){
		alert('You have to input a name for your place to save it!');
		return;
	};
	//Formatting comment
	var commentForm = document.getElementById('placeComment').value;
	var commentPlaceProto = commentForm.replace(/\n\n/g, '</p><br/><p>');
	var commentPlace = commentPlaceProto.replace(/\n/g, '</p><p>');
	//Formatting coordinates
	var loc = document.getElementById('latLngCo').value;
	var locAsNewString = loc.substring(1, loc.length - 1);
	var locAsArray = locAsNewString.split(', ');
	//Formatting color
	var col = document.getElementById('color').value;
	var color;
	if (col == 'blue'){
		color = '#7DE3FB';
	} else if (col == 'green') {
		color = '#A2DA2B';
	} else {
		color = '#E83882';
	};

	//Creating object to be saved
	var placeCircle = {
		location: locAsArray,
		name: document.getElementById('placeName').value,
		comment: commentPlace,
		image: dataURL,
		radius: circle.radius,
		color: color,
		type: 'circle'
	};
	localforage.getItem(validName).then(function(value){
		//Checks whether the name (key) is already used
		if (value == null){
			//Saving the circle and displaying it in the chosen color
			localforage.setItem(validName, placeCircle).then(function(){
				alert('Saving place');
				//Creating new circle
				allCircles[placeCircle.name] = new google.maps.Circle({
					strokeColor: placeCircle.color,
					strokeOpacity: 0.8,
					strokeWeight: 2,
					fillColor: placeCircle.color,
					fillOpacity: 0.35,
					center: {lat: parseFloat(placeCircle.location[0]), lng: parseFloat(placeCircle.location[1])},
					radius: placeCircle.radius,
					map: map
				});
				//Bind infowindow
				allCircles[placeCircle.name].addListener('click', function(){
					if (placeCircle.image == null){
						var contentWindow = '<div class="infoWindow"><h3>' + placeCircle.name + '</h3><div class="infoWindowCoords"><p><u>Latitude</u>: ' + parseFloat(placeCircle.location[0]) + '</p><p><u>Longitude</u>: ' + parseFloat(placeCircle.location[1]) + '</p></div><div class="infoWindowContent"><p>' + placeCircle.comment + '</p></div><div class="submitDiv"><button class="changePlace disableModif" onclick="modifyPlace()" disabled>Modify</button><button class="changePlace" onclick="deleteCircle(&#039;' + placeCircle.name + '&#039;)">Delete</button></div></div>';
					} else {
						var contentWindow = '<div class="infoWindow"><h3>' + placeCircle.name + '</h3><div class="infoWindowCoords"><p><u>Latitude</u>: ' + parseFloat(placeCircle.location[0]) + '</p><p><u>Longitude</u>: ' + parseFloat(placeCircle.location[1]) + '</p></div><div class="infoWindowContent"><p>' + placeCircle.comment + '</p></div><div><img src="' + placeCircle.image + '"></img></div><div class="submitDiv"><button class="changePlace disableModif" onclick="modifyPlace()" disabled>Modify</button><button class="changePlace" onclick="deleteCircle(&#039;' + placeCircle.name + '&#039;)">Delete</button></div></div>';
					};
					var infoWindow = new google.maps.InfoWindow({
						content: contentWindow,
						maxWidth:400,
						position: {lat: parseFloat(placeCircle.location[0]), lng: parseFloat(placeCircle.location[1])}
					});
					infoWindow.open(map);
					panToPin(parseFloat(placeCircle.location[0]), parseFloat(placeCircle.location[1]));
				});
				//Create div for circle in sidebar
				localforage.getItem(validName).then(function(value){
					createDiv(value);
				}).catch(function(err){
					console.log(err);
				});
				alert('Place successfully saved!');
			}).catch(function(err){
				alert("An error occured, your place could not be saved! \n\n If you use Safari, you may need to 'Disable local file restrictions' in the 'Develop' menu.");
				console.log(err)
			});
			//Reset form
			var fileLabel = document.getElementById('fileLabel');
			fileLabel.innerHTML = 'Upload an image';
			dataURL = null;
			form.reset();
		} else {
			alert('You cannot use a name that is already used for another place!')
		};
	}).catch(function(err){
		alert('An error occured!');
		console.log(err)
	});
}

//Recall data to display all previously saved pins on page load
function displaySavedPins(savedPins){
	localforage.keys().then(function(keys){
		for(key of keys){
			localforage.getItem(key).then(function(value){
				if (value.type != 'circle'){
					//Creating pin
					allPins[value.name] = new google.maps.Marker({
						position: {lat: parseFloat(value.location[0]), lng: parseFloat(value.location[1])},
						map: map,
						icon: pinTypes[value.type][value.color],
						title: value.name
					});
					//Bind infowindow
					allPins[value.name].addListener('click', function(){
						if (value.image == null){
							var contentWindow = '<div class="infoWindow"><h3>' + value.name + '</h3><div class="infoWindowCoords"><p><u>Latitude</u>: ' + parseFloat(value.location[0]) + '</p><p><u>Longitude</u>: ' + parseFloat(value.location[1]) + '</p></div><div class="infoWindowContent"><p>' + value.comment + '</p></div><div class="submitDiv"><button class="changePlace disableModif" onclick="modifyPlace()" disabled>Modify</button><button class="changePlace" onclick="deletePlace(&#039;' + value.name + '&#039;)">Delete</button></div></div>';
						} else {
							var contentWindow = '<div class="infoWindow"><h3>' + value.name + '</h3><div class="infoWindowCoords"><p><u>Latitude</u>: ' + parseFloat(value.location[0]) + '</p><p><u>Longitude</u>: ' + parseFloat(value.location[1]) + '</p></div><div class="infoWindowContent"><p>' + value.comment + '</p></div><div><img src="' + value.image + '"></img></div><div class="submitDiv"><button class="changePlace disableModif" onclick="modifyPlace()" disabled>Modify</button><button class="changePlace" onclick="deletePlace(&#039;' + value.name + '&#039;)">Delete</button></div></div>';
						};
						var infoWindow = new google.maps.InfoWindow({
							content: contentWindow,
							maxWidth:400,
						});
						infoWindow.open(map, allPins[value.name]);
						panToPin(parseFloat(value.location[0]), parseFloat(value.location[1]));
					});
				} else {
					allCircles[value.name] = new google.maps.Circle({
						strokeColor: value.color,
						strokeOpacity: 0.8,
						strokeWeight: 2,
						fillColor: value.color,
						fillOpacity: 0.35,
						center: {lat: parseFloat(value.location[0]), lng: parseFloat(value.location[1])},
						radius: value.radius,
						map: map
					});
					//Bind infowindow
					allCircles[value.name].addListener('click', function(){
						if (value.image == null){
							var contentWindow = '<div class="infoWindow"><h3>' + value.name + '</h3><div class="infoWindowCoords"><p><u>Latitude</u>: ' + parseFloat(value.location[0]) + '</p><p><u>Longitude</u>: ' + parseFloat(value.location[1]) + '</p></div><div class="infoWindowContent"><p>' + value.comment + '</p></div><div class="submitDiv"><button class="changePlace disableModif" onclick="modifyPlace()" disabled>Modify</button><button class="changePlace" onclick="deleteCircle(&#039;' + value.name + '&#039;)">Delete</button></div></div>';
						} else {
							var contentWindow = '<div class="infoWindow"><h3>' + value.name + '</h3><div class="infoWindowCoords"><p><u>Latitude</u>: ' + parseFloat(value.location[0]) + '</p><p><u>Longitude</u>: ' + parseFloat(value.location[1]) + '</p></div><div class="infoWindowContent"><p>' + value.comment + '</p></div><div><img src="' + value.image + '"></img></div><div class="submitDiv"><button class="changePlace disableModif" onclick="modifyPlace()" disabled>Modify</button><button class="changePlace" onclick="deleteCircle(&#039;' + value.name + '&#039;)">Delete</button></div></div>';
						};
						var infoWindow = new google.maps.InfoWindow({
							content: contentWindow,
							maxWidth:400,
							position: {lat: parseFloat(value.location[0]), lng: parseFloat(value.location[1])}
						});
						infoWindow.open(map);
						panToPin(parseFloat(value.location[0]), parseFloat(value.location[1]));
					});
				};
			}).catch(function(err){
				alert('An error occured!');
				console.log(err)
			})
		};
	}).catch(function(err){
		alert('An error occured!');
		console.log(err);
	})
};

//Pan to see all pins
function panAllPins(){
	var pins = Object.values(allPins);
	var circles = Object.values(allCircles);
	if (pins.length == 0 && circles.length == 0){
		alert("You don't have any saved place.");
		return;
	};
	var bounds = new google.maps.LatLngBounds();
	for (pin of pins){
		bounds.extend(pin.getPosition());
	};
	for (cir of circles){
		bounds.extend(cir.getCenter());
	}
	map.fitBounds(bounds);
}

/*Modify data - not implemented function
function modifyPlace(){
	
}*/

//Delete data
function deletePlace(key){
	var confirmation = confirm('Do you really want to delete this place? (This action is final if you execute it.)');
	if (confirmation){
		allPins[key].setMap(null);
		delete allPins[key];
		localforage.removeItem(key).then(function(){
			alert('Place successfully deleted.');
		}).catch(function(err){
			alert('An error occured!');
			console.log(err);
		});
		var section = document.getElementById('POI');
		var div = document.getElementById(key);
		section.removeChild(div);
	} else {
		alert('Action successfully canceled.');
	};
};

//Delete all pins at once
function clearAllPins(){
	var pins = Object.values(allPins);
	var circles = Object.values(allCircles);
	if (pins.length == 0 && circles.length == 0){
		alert("You don't have any saved place.");
		return;
	};
	var confirmation = confirm('Do you really want to delete all pins at once? (This action is final if you execute it.)')
	if (confirmation){
		var section = document.getElementById('POI');
		section.innerHTML = '<div class="sideNav"><a class="smallLink" href="index.html"><i class="fa fa-home navIcon"></i> Welcome page</a><a class="smallLink" href="savedplaces.html"><img src="images/listIcon.png" alt="List icon" height="12"> Saved places</a></div><h5>Saved places</h5>';
		localforage.clear().then(function(){
			alert('All pins were successfully deleted.');
		}).catch(function(err){
			alert('An error occured!');
			console.log(err);
		});
		for (pin of pins) {
			pin.setMap(null);
		};
		allPins = {};
		for (cir of circles) {
			cir.setMap(null);
		};
		allCircles = {};
	} else {
		alert('Action successfully canceled.')
	}
}

//Delete circle
function deleteCircle(key){
	var confirmation = confirm('Do you really want to delete this place? (This action is final if you execute it.)');
	if (confirmation){
		allCircles[key].setMap(null);
		delete allCircles[key];
		localforage.removeItem(key).then(function(){
			alert('Place successfully deleted.');
		}).catch(function(err){
			alert('An error occured!');
			console.log(err);
		});
		var section = document.getElementById('POI');
		var div = document.getElementById(key);
		section.removeChild(div);
	} else {
		alert('Action successfully canceled.');
	};
}

//Creates the list of saved places on page load
function createList(){
	localforage.keys().then(function(keys){
		for (key of keys){
			localforage.getItem(key).then(function(value){
				createDiv(value);
			}).catch(function(err){
				console.log(err);
			});
		};
	}).catch(function(err){
		console.log(err);
	});
}

//Creates div with content for list of saved places
function createDiv(objectValue){
	//Name
	var h4 = document.createElement('h4');
	h4.innerHTML = objectValue.name;

	//Pin icon
	if (objectValue.type != 'circle'){
		var chosenPin = pinTypes[objectValue.type][objectValue.color];
		var icon = document.createElement('img');
		icon.src = chosenPin;
		icon.className = 'iconImg';
		icon.alt = 'Pin Icon';
	};

	//Title div
	var titleDiv = document.createElement('div');
	titleDiv.className = 'titleDiv';
	titleDiv.id = 'title_' + objectValue.name;
	if (objectValue.type != 'circle'){
		titleDiv.appendChild(icon);
	};
	titleDiv.appendChild(h4);

	//Buttons
	var button = document.createElement('button');
	button.className = 'changePlace';
	button.id = 'button_' + objectValue.name;
	button.innerHTML = 'Pan';
	var del = document.createElement('button');
	del.className = 'changePlace';
	del.id = 'del_' + objectValue.name;
	del.innerHTML = 'Delete';
	var modif = document.createElement('button');
	modif.className = 'changePlace disableModif';
	modif.id = 'modif_' + objectValue.name;
	modif.innerHTML = 'Modify';

	//Comment
	var para = document.createElement('p');
	para.innerHTML = objectValue.comment;

	//Image
	if (objectValue.image != null){
		var image = document.createElement('img');
		image.src = objectValue.image;
		image.className = 'placeImg';
		image.alt = 'Place Image';
	};

	//Content div
	var contentDiv = document.createElement('div');
	contentDiv.className = 'contentDiv';
	contentDiv.id = 'content_' + objectValue.name;
	contentDiv.appendChild(button);
	contentDiv.appendChild(modif);
	contentDiv.appendChild(del);
	contentDiv.appendChild(para);
	if (objectValue.image != null){
		contentDiv.appendChild(image);
	};
	contentDiv.style.display = 'none';

	//Div containing all infos of place
	var div = document.createElement('div');
	div.className = 'placeDivSide';
	div.id = objectValue.name;
	div.appendChild(titleDiv);
	div.appendChild(contentDiv);

	//Appending div to section
	var section = document.getElementById('POI');
	section.appendChild(div);

	//Add show/hide content div function to title div
	var titleDivEventListener = document.getElementById('title_' + objectValue.name);
	titleDivEventListener.addEventListener('click', function(){
		var content = document.getElementById('content_' + objectValue.name);
		if (content.style.display === 'none'){
			content.style.display = 'block';
		} else {
			content.style.display = 'none';
		};
	});

	//Add pan function
	var buttonEventListener = document.getElementById('button_' + objectValue.name);
	buttonEventListener.addEventListener('click', function(){
		panToPin(parseFloat(objectValue.location[0]), parseFloat(objectValue.location[1]));
	});
	//Add delete function
	var delEventListener = document.getElementById('del_' + objectValue.name);
	if (objectValue.type != 'circle'){
		delEventListener.addEventListener('click', function(){
			deletePlace(objectValue.name);
		});
	} else {
		delEventListener.addEventListener('click', function(){
			deleteCircle(objectValue.name);
		});
	};
	//Add modify function
	var modifEventListener = document.getElementById('modif_' + objectValue.name);
	modifEventListener.addEventListener('click', function(){
		modifyPlace();
	});
}