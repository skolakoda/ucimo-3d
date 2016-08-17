/*** KLASE ***/

var Vrh3D = function (x, y, z) {
  this.x = parseFloat(x);
  this.y = parseFloat(y);
  this.z = parseFloat(z);
};

var Vrh2D = function (x, y) {
  this.x = parseFloat(x);
  this.y = parseFloat(y);
};

var Kocka = function (centar, side) {
  var polaStrane = side / 2;
  this.vrhovi = [
    new Vrh3D(centar.x - polaStrane, centar.y - polaStrane, centar.z + polaStrane),
    new Vrh3D(centar.x - polaStrane, centar.y - polaStrane, centar.z - polaStrane),
    new Vrh3D(centar.x + polaStrane, centar.y - polaStrane, centar.z - polaStrane),
    new Vrh3D(centar.x + polaStrane, centar.y - polaStrane, centar.z + polaStrane),
    new Vrh3D(centar.x + polaStrane, centar.y + polaStrane, centar.z + polaStrane),
    new Vrh3D(centar.x + polaStrane, centar.y + polaStrane, centar.z - polaStrane),
    new Vrh3D(centar.x - polaStrane, centar.y + polaStrane, centar.z - polaStrane),
    new Vrh3D(centar.x - polaStrane, centar.y + polaStrane, centar.z + polaStrane)
  ];

  // svaka stranica je kvadrat sa četiri vrha
  // I represent a face with an array but you could create a dedicated class for that
  this.stranice = [
    [this.vrhovi[0], this.vrhovi[1], this.vrhovi[2], this.vrhovi[3]],
    [this.vrhovi[3], this.vrhovi[2], this.vrhovi[5], this.vrhovi[4]],
    [this.vrhovi[4], this.vrhovi[5], this.vrhovi[6], this.vrhovi[7]],
    [this.vrhovi[7], this.vrhovi[6], this.vrhovi[1], this.vrhovi[0]],
    [this.vrhovi[7], this.vrhovi[0], this.vrhovi[3], this.vrhovi[4]],
    [this.vrhovi[1], this.vrhovi[6], this.vrhovi[5], this.vrhovi[2]]
  ];
};


/*** FUNKCIJE ***/

/*
  prima niz predmeta
  predmet.stranice mora biti niz stranica
*/

function render(nizPredmeta, podloga, centarPlatnaX, centarPlatnaY, perspektiva) {
  podloga.clearRect(0, 0, 2 * centarPlatnaX, 2 * centarPlatnaY);
  for (var i = 0; i < nizPredmeta.length; ++i) {
    for (var j = 0; j < nizPredmeta[i].stranice.length; ++j) {
      var stranica = nizPredmeta[i].stranice[j];
      // crta prvi vrh
      var vrh2D = projektuj(stranica[0], perspektiva);
      podloga.beginPath();
      podloga.moveTo(vrh2D.x + centarPlatnaX, -vrh2D.y + centarPlatnaY);
      // crta ostale vrhove
      for (var k = 1; k < stranica.length; ++k) {
        vrh2D = projektuj(stranica[k], perspektiva);
        podloga.lineTo(vrh2D.x + centarPlatnaX, -vrh2D.y + centarPlatnaY);
      }
      podloga.closePath();
      podloga.stroke();
      podloga.fill();
    }
  }
}

function projektuj(vrh3D, perspektiva) {
  if (!perspektiva) return new Vrh2D(vrh3D.x, vrh3D.z);
  var r = perspektiva / vrh3D.y;
  return new Vrh2D(r * vrh3D.x, r * vrh3D.z);
}
