window.onload = function what() {
  var Boat = document.getElementById('Boat').style;

  var amp = 12/2;
  var freq = 1/32;
  var position;
  var i = 0;

  var angleAmp = 2;

  var id = setInterval(frame, 5);

  function frame() {
    position = amp*Math.sin(i*freq*Math.PI*2);
    angle = angleAmp*Math.atan(-amp*freq*Math.PI*2*Math.cos(i*freq*Math.PI*2));
    Boat.transform = "translateY(" + position + "px) " + "rotate(" + angle + "deg)";
    console.log(position);

    i += 0.05;

  }
}
