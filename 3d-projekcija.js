/*** KLASE ***/

var Tacka3D = function (x, y, z) {
  this.x = parseFloat(x);
  this.y = parseFloat(y);
  this.z = parseFloat(z);
};

var Tacka2D = function (x, y) {
  this.x = parseFloat(x);
  this.y = parseFloat(y);
};

var Kocka = function (centar, side) {
  var polaStrane = side / 2;
  this.vertices = [
    new Tacka3D(centar.x - polaStrane, centar.y - polaStrane, centar.z + polaStrane),
    new Tacka3D(centar.x - polaStrane, centar.y - polaStrane, centar.z - polaStrane),
    new Tacka3D(centar.x + polaStrane, centar.y - polaStrane, centar.z - polaStrane),
    new Tacka3D(centar.x + polaStrane, centar.y - polaStrane, centar.z + polaStrane),
    new Tacka3D(centar.x + polaStrane, centar.y + polaStrane, centar.z + polaStrane),
    new Tacka3D(centar.x + polaStrane, centar.y + polaStrane, centar.z - polaStrane),
    new Tacka3D(centar.x - polaStrane, centar.y + polaStrane, centar.z - polaStrane),
    new Tacka3D(centar.x - polaStrane, centar.y + polaStrane, centar.z + polaStrane)
  ];

  this.stranice = [
    [this.vertices[0], this.vertices[1], this.vertices[2], this.vertices[3]],
    [this.vertices[3], this.vertices[2], this.vertices[5], this.vertices[4]],
    [this.vertices[4], this.vertices[5], this.vertices[6], this.vertices[7]],
    [this.vertices[7], this.vertices[6], this.vertices[1], this.vertices[0]],
    [this.vertices[7], this.vertices[0], this.vertices[3], this.vertices[4]],
    [this.vertices[1], this.vertices[6], this.vertices[5], this.vertices[2]]
  ];
};


/*** FUNKCIJE ***/

/*
  prima listu objekata za render
  moraju imati property 'stranice', koji sadrzi niz stranica predmeta
*/

function render(objects, ctx, dx, dy) {
  // Clear the previous frame
  ctx.clearRect(0, 0, 2 * dx, 2 * dy);
  // For each object
  for (var i = 0, n_obj = objects.length; i < n_obj; ++i) {
    // For each stranica
    for (var j = 0, n_faces = objects[i].stranice.length; j < n_faces; ++j) {
      // Current stranica
      var stranica = objects[i].stranice[j];
      // Draw the first vertex
      var P = project(stranica[0]);
      ctx.beginPath();
      ctx.moveTo(P.x + dx, -P.y + dy);
      // Draw the other vertices
      for (var k = 1, n_vertices = stranica.length; k < n_vertices; ++k) {
        P = project(stranica[k]);
        ctx.lineTo(P.x + dx, -P.y + dy);
      }
      // Close the path and draw the stranica
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
    }
  }
}

function project(M) {
  return new Tacka2D(M.x, M.z);
}
