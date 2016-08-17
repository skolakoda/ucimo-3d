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

function render(predmeti, ctx, dx, dy, perspektiva) {
  ctx.clearRect(0, 0, 2 * dx, 2 * dy);
  for (var i = 0; i < predmeti.length; ++i) {
    for (var j = 0; j < predmeti[i].stranice.length; ++j) {
      var stranica = predmeti[i].stranice[j];
      // crta prvi vrh
      var P = project(stranica[0], perspektiva);
      ctx.beginPath();
      ctx.moveTo(P.x + dx, -P.y + dy);
      // crta ostale vrhove
      for (var k = 1; k < stranica.length; ++k) {
        P = project(stranica[k], perspektiva);
        ctx.lineTo(P.x + dx, -P.y + dy);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
    }
  }
}

function project(M, perspektiva) {
  if (!perspektiva) return new Vrh2D(M.x, M.z);
  var r = perspektiva / M.y;
  return new Vrh2D(r * M.x, r * M.z);
}
