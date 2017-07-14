yours = [-75.1, 40];
mine = [-75, 40];
hometown = [116, 39];

function rotateTo(p) {
  d3.transition()
    .duration(2500)
    .tween("rotate", function() {
      var r = d3.interpolate(projection.rotate(), [-p[0], -p[1]]);
      return function(t) {
        projection.rotate(r(t));
        svg.selectAll("path").attr("d", path)
      };
    })
    .each("end", function() {
      console.log(p);

      if (p[0] == yours[0] && p[1] == yours[1]) rotateTo(hometown);
      if (p[0] == hometown[0] && p[1] == hometown[1]) rotateTo(mine);
    })
}
function addMarks(locations) {
  //.datum({type: "mark", coordinates: [d[0], d[1]]})
  console.log(locations);
  locations.forEach(function(d){
    svg.append("path", ".foreground")
      .datum({type: "Point", coordinates: [d[0], d[1]]})
      .attr("class", "point")
      .attr("d", path);
  });
}

function getClientLocation() {
  $.getJSON("http://freegeoip.net/json/", function(data) {
    yours = [data['longitude'], data['latitude']];
    addMarks([yours, mine, hometown]);
    console.log(data);
    rotateTo(yours);
  });
}
var width = window.innerWidth,
  height = window.innerHeight,
  sens = 0.25,
  focused;

//Setting projection

var projection = d3.geo.orthographic()
  .scale(width / 3)
  .rotate([116, 39])
  .translate([width / 2, height - height / 3])
  .clipAngle(90);

var path = d3.geo.path()
  .projection(projection);

//SVG container

var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

//Adding water

svg.append("path")
  .datum({type: "Sphere"})
  .attr("class", "water")
  .attr("d", path);



queue()
  .defer(d3.json, "/world-110m.json")
  .defer(d3.tsv, "/world-110m-country-names.tsv")
  .await(ready);

//Main function

function ready(error, world, countryData) {

  var countryById = {},
    countries = topojson.feature(world, world.objects.countries).features;

  //Drawing countries on the globe
  getClientLocation();


  var world = svg.selectAll("path.land")
    .data(countries)
    .enter().append("path")
    .attr("class", "land")
    .attr("d", path)

  //Mouse events

  function country(cnt, sel) { 
    for(var i = 0, l = cnt.length; i < l; i++) {
      if(cnt[i].id == sel.value) {return cnt[i];}
    }
  };

};
