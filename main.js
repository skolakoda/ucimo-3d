/*
		var zumiraj = function(evt){
			var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
			if (delta) zoom(delta);
			return evt.preventDefault() && false;
		};
		canvas.addEventListener('DOMMouseScroll',zumiraj,false);
		canvas.addEventListener('mousewheel',zumiraj,false);
*/

/*** KONFIG ***/

var blizina = 300; // različito od nule pravi perspectivu
var mishStisnut = false;
var mishX = 0;
var mishY = 0;

/*** INIT ***/

var canvas = document.getElementById('cnv');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var dx = canvas.width / 2;
var dy = canvas.height / 2;

var ctx = canvas.getContext('2d');
ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
ctx.fillStyle = 'rgba(0, 150, 255, 0.3)';

var centarKocke = new Vrh3D(0, 11 * dy / 10, 0);
var kocka = new Kocka(centarKocke, dy);
var predmeti = [kocka];

render(predmeti, ctx, dx, dy, blizina);

autorotate_timeout = setTimeout(autorotate, 2000);

/*** EVENTS ***/

canvas.addEventListener('mousedown', initMove);
document.addEventListener('mousemove', pratiMisha);
document.addEventListener('mouseup', stopMove);
canvas.addEventListener('DOMMouseScroll',zumiraj);


/*** POMOĆNE FUNKCIJE ***/

function zumiraj (evt) {
  evt.preventDefault();
  blizina -= evt.detail;
}

function rotiraj(M, centar, theta, phi) {
  // koeficijenti za matricu rotacije
  var ct = Math.cos(theta);
  var st = Math.sin(theta);
  var cp = Math.cos(phi);
  var sp = Math.sin(phi);

  // rotacija
  var x = M.x - centar.x;
  var y = M.y - centar.y;
  var z = M.z - centar.z;

  M.x = ct * x - st * cp * y + st * sp * z + centar.x;
  M.y = st * x + ct * cp * y - ct * sp * z + centar.y;
  M.z = sp * y + cp * z + centar.z;
}

function initMove(evt) {
  clearTimeout(autorotate_timeout);
  mishStisnut = true;
  mishX = evt.clientX;
  mishY = evt.clientY;
}

function pratiMisha(evt) {
  if (!mishStisnut) return;
  var theta = (evt.clientX - mishX) * Math.PI / 360;
  var phi = (evt.clientY - mishY) * Math.PI / 180;
  for (var i = 0; i < 8; ++i) {
    rotiraj(kocka.vrhovi[i], centarKocke, theta, phi);
  }
  mishX = evt.clientX;
  mishY = evt.clientY;
  render(predmeti, ctx, dx, dy, blizina);
}

function stopMove() {
  mishStisnut = false;
  autorotate_timeout = setTimeout(autorotate, 2000);
}

function autorotate() {
  for (var i = 0; i < 8; ++i) {
    rotiraj(kocka.vrhovi[i], centarKocke, -Math.PI / 720, Math.PI / 720);
  }
  render(predmeti, ctx, dx, dy, blizina);
  autorotate_timeout = setTimeout(autorotate, 30);
}
