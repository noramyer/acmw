var eventsURL = "https://raw.githubusercontent.com/ACMWOSU/acmwosu.github.io/master/json/events.json";

$.getJSON(eventsURL)
  .done(function(data){//On successful import populate the page
    populateEvents(data);
  })
  .fail(function(a, b, c){ //When fail contact me or link to github to submit pull request
    jsonRetrieveError(c);
  });

function jsonRetrieveError(err){
  var upcoming = document.getElementById('event-squares');
  console.log("Request to '"+eventsURL+"' failed. Error: "+err);
}

function populateEvents(EventsJSON){
  sortEvents(EventsJSON);
  var today = new Date();
  today.setHours(0,0,0,0);
  const upcoming = [];
  const past = [];
  for (var i=0; i < 5; i++){  //Loop through events
      upcoming.push(EventsJSON[i]);
  }

  upcoming.reverse();
  for (var i=0; i < upcoming.length; i++){  //Loop through events
    var eventElement = setEvent(upcoming[i], i);
  }
}

function sortEvents(EventsJson) {
  EventsJson.sort(function(a, b){
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

function setEvent(EventJSON, index){
  header = document.getElementById(`event-header-${index+1}`);
  header.innerText = EventJSON['name'];

  description = document.getElementById(`event-desc-${index+1}`);
  description.innerText = `${EventJSON['date']}`;

  descriptionDetails = document.getElementById(`event-desc-time-and-place-${index+1}`);
  descriptionDetails.innerText = `${EventJSON['time']} ${EventJSON['location']}`;

  modalHeader = document.getElementById(`modal-header-${index+1}`);
  modalHeader.innerText = EventJSON['name'];

  modalSubheader = document.getElementById(`modal-subheader-${index+1}`);
  modalSubheader.innerText = `${EventJSON['date']} | ${EventJSON['time']} ${EventJSON['location']}`;

  modalDescription = document.getElementById(`modal-desc-${index+1}`);

  if(EventJSON['desc']) {
    modalDescription.innerText = `${EventJSON['desc']}`;
  }
}
