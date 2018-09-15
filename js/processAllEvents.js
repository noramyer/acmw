var icons = ["",
  " <i class='fa fa-external-link-square'></i>",
  " <i class='fa fa-facebook-square'></i>"];
var mapLinkIcon= " <i class='fa fa-map-marker'></i>";

link = function(url, text, icon){
  var anchor = document.createElement("a");
  anchor.setAttribute('class', 'event-link');
  anchor.innerHTML = text;
  if(url){
    anchor.setAttribute('href', url);
    anchor.setAttribute('target', '_blank');
  }
  if(icon)anchor.innerHTML += icon;
  return anchor;
}

var eventsURL = "https://raw.githubusercontent.com/ACMWOSU/acmwosu.github.io/master/json/events.json";

$.getJSON(eventsURL)
  .done(function(data){//On successful import populate the page
    populateEvents(data);
  })
  .fail(function(a, b, c){ //When fail contact me or link to github to submit pull request
    jsonRetrieveError(c);
  });

function jsonRetrieveError(err){
  var upcoming = document.getElementById('upcoming');
  upcoming.innerHTML = "Error retrieving JSON. Please contact the webmaster"
  console.log("Request to '"+eventsURL+"' failed. Error: "+err);
}

function populateEvents(EventsJSON){
  var today = new Date();
  today.setHours(0,0,0,0); //Necessary to make same day events show up
  var upcoming = document.getElementById('upcoming');
  var past = document.getElementById('past');

  upcoming.innerHTML = ""
  past.innerHTML = ""

  sortEvents(EventsJSON);
  for (var i=0; i < EventsJSON.length; i++){  //Loop through events
    var eventElement = newEvent(EventsJSON[i])
    var eventDate = new Date(EventsJSON[i]['date']);
    eventDate.setHours(0,0,0,0);

    if(eventDate.getTime() < today.getTime()){
      past.appendChild(eventElement);
    } else {
      upcoming.insertBefore(eventElement, upcoming.firstChild);
    }
  }
}

function sortEvents(EventsJson) {
  EventsJson.sort(function(a, b){
    return new Date(b.date) - new Date(a.date);
  });
}

function newEvent(EventJSON){
  var event = document.createElement("div");
  event.setAttribute('class', 'event');

  var name = link(EventJSON['title_url'], EventJSON['name'], icons[EventJSON['link_type']]);
  name.setAttribute('class', 'event-name');
  event.appendChild(name);

  var desc = document.createElement("p");
  desc.setAttribute('class', 'lead');
  desc.innerHTML= EventJSON['date_string'];
  if(EventJSON['time']){desc.innerHTML+= ' | ' + EventJSON['time']};
  if(EventJSON['location']){
    var location = EventJSON['location'];
    desc.innerHTML+= ' | ';
    if(EventJSON['location_url']){
      desc.appendChild(link(EventJSON['location_url'], location, mapLinkIcon));
    } else {
      desc.innerHTML+=location;
    }
  }

  if(EventJSON['desc']){
    desc.innerHTML+=  "<br/>"
    desc.innerHTML += EventJSON['desc'];
    if(EventJSON['rsvp']){
      desc.innerHTML+=  "<br/>"
      desc.appendChild(link(EventJSON['rsvp_link'], EventJSON['rsvp'], icons[0]));
    }
  }
  event.appendChild(desc);


  return event;
}
