//JS for savedplaces.html

//Icons
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

//Insert name, location, comment(, images) (+ image of chosen pin in the top right corner)
function createList(){
	localforage.keys().then(function(keys){
		for (key of keys){
			localforage.getItem(key).then(function(value){
				var h6 = document.createElement('h6');
				h6.innerHTML = value.name;

				if (value.type != 'circle'){
					var chosenPin = pinTypes[value.type][value.color];
					var icon = document.createElement('img');
					icon.src = chosenPin;
					icon.className = 'iconImg';
					icon.alt = 'Pin Icon';
				};

				var titleDiv = document.createElement('div');
				titleDiv.className = 'titleDiv';
				titleDiv.id = 'title_' + value.name;
				if (value.type != 'circle'){
					titleDiv.appendChild(icon);
				};
				titleDiv.appendChild(h6);

				var del = document.createElement('button');
				del.className = 'changePlace';
				del.id = 'del_' + value.name;
				del.innerHTML = 'Delete';
				var modif = document.createElement('button');
				modif.className = 'changePlace disableModif';
				modif.id = 'modif_' + value.name;
				modif.innerHTML = 'Modify';

				var para = document.createElement('p');
				para.innerHTML = value.comment;

				if (value.image != null){
					var image = document.createElement('img');
					image.src = value.image;
					image.className = 'placeImg';
					image.alt = 'Place Image';
				}

				var contentDiv = document.createElement('div');
				contentDiv.className = 'bigContentDiv';
				contentDiv.id = 'content_' + value.name;
				contentDiv.appendChild(modif);
				contentDiv.appendChild(del);
				contentDiv.appendChild(para);
				if (value.image != null){
					contentDiv.appendChild(image);
				};
				contentDiv.style.display = 'none';

				var div = document.createElement('div');
				div.className = 'placeDiv';
				div.id = value.name;
				div.appendChild(titleDiv);
				div.appendChild(contentDiv);

				var section = document.getElementById('places');
				section.appendChild(div);

				var titleDivEventListener = document.getElementById('title_' + value.name);
				titleDivEventListener.addEventListener('click', function(){
					var content = document.getElementById('content_' + value.name);
					if (content.style.display === 'none'){
						content.style.display = 'block';
					} else {
						content.style.display = 'none';
					};
				});

				var delEventListener = document.getElementById('del_' + value.name);
				delEventListener.addEventListener('click', function(){
					deletePOI(value.name);
				});
				var modifEventListener = document.getElementById('modif_' + value.name);
				modifEventListener.addEventListener('click', function(){
					modifyPlace();
				});
			});
		};
	});
}

//Delete place or circle
function deletePOI(key){
	var confirmation = confirm('Do you really want to delete this place? (This action is final if you execute it.)');
	if (confirmation){
		localforage.removeItem(key).then(function(){
			alert('Place successfully deleted.');
		}).catch(function(err){
			alert('An error occured!');
			console.log(err);
		});
		var section = document.getElementById('places');
		var div = document.getElementById(key);
		section.removeChild(div);
	} else {
		alert('Action successfully canceled.');
	};
};

/*Modify data - not implemented function
function modifyPlace(){

}*/