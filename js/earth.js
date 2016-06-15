function getDistance(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return Math.round(d*10000)/10000;
}

function deg2rad(deg) {
    return deg * (Math.PI/180)
}

var map;
var city;
var lati,longi;
var region, country;
var mlati = 40.5902;
var mlongi = -75.3574;
var mcity = "Bethlehem PA USA"
function init() {
    $.ajax({ url: 'http://freegeoip.net/json/', success: function(data) { 
        lati = data.latitude;
        longi = data.longitude;
        city = data.city;
        region = data.region_name;
        country = data.country_name;
        getMap(lati, longi, city);
    } });
}
function getAns(dis){
    if(dis < 100) return "Wow! You're my neighbor!";
    if(dis < 1000) return "Wow! You're not far from me!";
    if(dis < 10000) return "Wow! It's a long distance between us";
}

function getMap(lati, longi, city){

    map = WE.map('map', {
        center: [mlati, mlongi],
        zoom: 2.5,
        dragging: true,
        scrollWheelZoom: true,
        proxyHost: 'http://srtm.webglearth.com/cgi-bin/corsproxy.fcgi?url='
    });
    var baselayer = WE.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg', {
            subdomains: '1234',
            attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">',
            maxZoom: 18
            }).addTo(map);

    /*
       var overlay = WE.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg', {
       subdomains: '1234',
       attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">',
       maxZoom: 18,
       opacity: 0.5
       }).addTo(map);

    //Add TileJSON layer
    var json = {"profile": "mercator", "name": "Grand Canyon USGS", "format": "png", "bounds": [-112.26379395, 35.98245136, -112.10998535, 36.13343831], "minzoom": 10, "version": "1.0.0", "maxzoom": 16, "center": [-112.18688965, 36.057944835, 13], "type": "overlay", "description": "", "basename": "grandcanyon", "tilejson": "2.0.0", "sheme": "xyz", "tiles": ["http://tileserver.maptiler.com/grandcanyon/{z}/{x}/{y}.png"]};

    var grandcanyon = WE.tileLayerJSON(json);
    grandcanyon.addTo(map);

    grandcanyon.setOpacity(0.7);

    document.getElementById('opacity2').addEventListener('change', function(e) {
    grandcanyon.setOpacity(e.target.value);
    });
    */


    document.getElementById('addmarkers').disabled = true;
    var mmarker = WE.marker([mlati, mlongi]);
    mmarker.bindPopup("<b>I'm here<b><span style='font-size:10px;color:#999'></br>" + mcity + "</span>", {maxWidth: 50, closeButton: true}).openPopup();
    mmarker.addTo(map);

    var ymarker = WE.marker([lati, longi]);
    ymarker.bindPopup("<b>You're here<b><span style='font-size:10px;color:#999'></br>" + city + ' ' + region + ' ' + country + "</span>", {maxWidth: 150, closeButton: true}).openPopup();
    ymarker.addTo(map);

    var marker = WE.marker([90, 90]);
    var distance = getDistance(lati, longi, mlati, mlongi);
    marker.bindPopup("<b>You're " + distance + "km away from me<b><span style='font-size:10px;color:#999'></br>" + getAns(distance) + "</span>", {maxWidth: 200, closeButton: true}).openPopup();

    marker.addTo(map);

    var before = null;
    requestAnimationFrame(function animate(now) {
        var c = map.getPosition();
        var elapsed = before? now - before: 0;
        before = now;
        map.setCenter([c[0], c[1] + 0.4*(elapsed/30)]);
        requestAnimationFrame(animate);
    });

}
