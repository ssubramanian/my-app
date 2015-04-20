/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

$(document).on('click', '.schedule-link', function(){  
    var url = 'http://staging.activelifeadmin.com/dummy/websearch/public/index/getscheduleslist?branch_ids=3';        

    $.ajax({
        url: url,
        dataType: "json",
        async: true,
        success: function (result) {
            var items = [];

            $.each(result, function(key, val) {
                console.log(val.title);
                items.push('<li id="' + key + '" class="ui-btn schedule-list-item">' + val.title + '</li>');
            });

            $('#schedule-list').empty();
            $('#schedule-list').append(items.join(''));
        },
        error: function (request,error) {
            alert('Network error has occurred please try again!');
        }
    });  
});

$(document).on('click', '.location-link', function(){  
    navigator.geolocation.getCurrentPosition(disp);
       
});

function disp(pos) {
    console.log(pos);        
    $('#location').empty();
    
    var geocoder = new google.maps.Geocoder();
    var lat  = pos.coords.latitude;
    var lng = pos.coords.longitude;
    var latlng = new google.maps.LatLng(lat, lng);
         geocoder.geocode({'latLng': latlng}, function(results, status) {
           if (status == google.maps.GeocoderStatus.OK) {
           console.log(results)
             if (results[1]) {
                               
             //find country name
                  for (var i=0; i<results[0].address_components.length; i++) {
                 for (var b=0;b<results[0].address_components[i].types.length;b++) {

                 //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                     if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                         //this is the object you are looking for
                         city= results[0].address_components[i];
                         break;
                     }
                 }
             }
             //city data
             $('#location').append('Your current location is <b>' + results[0].formatted_address + city.short_name + " " + city.long_name);
             $('#location').append('</b> at ' + lat + ', ' + lng);

             } else {
               alert("No results found");
             }
           } else {
             alert("Geocoder failed due to: " + status);
           }

    });
}



