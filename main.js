/*** KONFIG ***/

var zapamcenMishX = 0;
var zapamcenMishY = 0;
var mishStisnut = false;
var perspektiva = 0; // ako je različito od nule pravi perspectivu

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
var nizPredmeta = [kocka];

render(nizPredmeta, podloga, centarPlatnaX, centarPlatnaY, perspektiva);


/*** EVENTS ***/

platno.addEventListener('mousedown', pocniVuchu);

document.addEventListener('mousemove', pratiMisha);

document.addEventListener('mouseup', function () {
  mishStisnut = false;
});

if (perspektiva) platno.addEventListener('DOMMouseScroll', zumiraj);


/*** FUNKCIJE ***/

function rotiraj(vrh3D, centar, ugaoVodoravno, ugaoUspravno) {
  // koeficijenti za matricu rotacije
  var ct = Math.cos(ugaoVodoravno);
  var st = Math.sin(ugaoVodoravno);
  var cp = Math.cos(ugaoUspravno);
  var sp = Math.sin(ugaoUspravno);

  // rotacija
  var x = vrh3D.x - centar.x;
  var y = vrh3D.y - centar.y;
  var z = vrh3D.z - centar.z;

  vrh3D.x = ct * x - st * cp * y + st * sp * z + centar.x;
  vrh3D.y = st * x + ct * cp * y - ct * sp * z + centar.y;
  vrh3D.z = sp * y + cp * z + centar.z;
}

function pratiMisha(evt) {
  if (!mishStisnut) return;

  var ugaoVodoravno = (evt.clientX - zapamcenMishX) * Math.PI / 360;
  var ugaoUspravno = (evt.clientY - zapamcenMishY) * Math.PI / 180;
  for (var i = 0; i < kocka.vrhovi.length; ++i) {
    rotiraj(kocka.vrhovi[i], centarKocke, ugaoVodoravno, ugaoUspravno);
  }
  azurirajMisha(evt);
  render(nizPredmeta, podloga, centarPlatnaX, centarPlatnaY, perspektiva);
}

function pocniVuchu(evt) {
  azurirajMisha(evt);
  mishStisnut = true;
}

function azurirajMisha(evt) {
  zapamcenMishX = evt.clientX;
  zapamcenMishY = evt.clientY;
}

function zumiraj(evt) {
  evt.preventDefault();
  perspektiva -= evt.detail;
  render(nizPredmeta, podloga, centarPlatnaX, centarPlatnaY, perspektiva);
}
