/*** KONFIG ***/

var perspektiva = 0; // ako je različito od nule pravi perspectivu
var mishStisnut = false;
var mishX = 0;
var mishY = 0;

/*** INIT ***/

var platno = document.getElementById('cnv');
platno.width = window.innerWidth;
platno.height = window.innerHeight;
var centarPlatnaX = platno.width / 2;
var centarPlatnaY = platno.height / 2;

var podloga = platno.getContext('2d');
podloga.strokeStyle = 'rgba(0, 0, 0, 0.3)';
podloga.fillStyle = 'rgba(0, 150, 255, 0.3)';

var centarKocke = new Vrh3D(0, 11 * centarPlatnaY / 10, 0);
var kocka = new Kocka(centarKocke, centarPlatnaY);
var predmeti = [kocka];

render(predmeti, podloga, centarPlatnaX, centarPlatnaY, perspektiva);


/*** EVENTS ***/

platno.addEventListener('mousedown', initMove);
document.addEventListener('mousemove', pratiMisha);
document.addEventListener('mouseup', stopMove);
if (perspektiva) platno.addEventListener('DOMMouseScroll',zumiraj);


/*** POMOĆNE FUNKCIJE ***/

function zumiraj (evt) {
  evt.preventDefault();
  perspektiva -= evt.detail;
  render(predmeti, podloga, centarPlatnaX, centarPlatnaY, perspektiva);
}

function rotiraj(vrh3D, centar, theta, phi) {
  // koeficijenti za matricu rotacije
  var ct = Math.cos(theta);
  var st = Math.sin(theta);
  var cp = Math.cos(phi);
  var sp = Math.sin(phi);

  // rotacija
  var x = vrh3D.x - centar.x;
  var y = vrh3D.y - centar.y;
  var z = vrh3D.z - centar.z;

  vrh3D.x = ct * x - st * cp * y + st * sp * z + centar.x;
  vrh3D.y = st * x + ct * cp * y - ct * sp * z + centar.y;
  vrh3D.z = sp * y + cp * z + centar.z;
}

function initMove(evt) {
  mishX = evt.clientX;
  mishY = evt.clientY;
  mishStisnut = true;
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
  render(predmeti, podloga, centarPlatnaX, centarPlatnaY, perspektiva);
}

function stopMove() {
  mishStisnut = false;
}
