
// Distance between the camera and the plane
var distance = 300;

function project(M) {
	var r = distance / M.y;
	return new Tacka2D(r * M.x, r * M.z);
}

(function() {
	// Fix the canvas width and height
	var canvas = document.getElementById('cnv');
	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
	var dx = canvas.width / 2;
	var dy = canvas.height / 2;

	// Objects style
	var ctx = canvas.getContext('2d');
	ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
	ctx.fillStyle = 'rgba(0, 150, 255, 0.3)';

	// Create the kocka
	var centarKocke = new Tacka3D(0, 11*dy/10, 0);
	var kocka = new Kocka(centarKocke, dy);
	var objects = [kocka];

	// First render
	render(objects, ctx, dx, dy);

	// Events
	var mousedown = false;
	var mx = 0;
	var my = 0;

	canvas.addEventListener('mousedown', initMove);
	document.addEventListener('mousemove', move);
	document.addEventListener('mouseup', stopMove);

	// Rotate a vertice
	function rotate(M, centar, theta, phi) {
        // Rotation matrix coefficients
    	var ct = Math.cos(theta);
    	var st = Math.sin(theta);
    	var cp = Math.cos(phi);
    	var sp = Math.sin(phi);

		// Rotation
		var x = M.x - centar.x;
		var y = M.y - centar.y;
		var z = M.z - centar.z;

		M.x = ct * x - st * cp * y + st * sp * z + centar.x;
		M.y = st * x + ct * cp * y - ct * sp * z + centar.y;
		M.z = sp * y + cp * z + centar.z;
	}

	// Initialize the movement
	function initMove(evt) {
		clearTimeout(autorotate_timeout);
		mousedown = true;
		mx = evt.clientX;
		my = evt.clientY;
	}

	function move(evt) {
		if (mousedown) {
			var theta = (evt.clientX - mx) * Math.PI / 360;
			var phi = (evt.clientY - my) * Math.PI / 180;

			for (var i = 0; i < 8; ++i)
				rotate(kocka.vertices[i], centarKocke, theta, phi);

			mx = evt.clientX;
			my = evt.clientY;

			render(objects, ctx, dx, dy);
		}
	}

	function stopMove() {
		mousedown = false;
		autorotate_timeout = setTimeout(autorotate, 2000);
	}

	function autorotate() {
		for (var i = 0; i < 8; ++i)
			rotate(kocka.vertices[i], centarKocke, -Math.PI / 720, Math.PI / 720);

		render(objects, ctx, dx, dy);

		autorotate_timeout = setTimeout(autorotate, 30);
	}
	autorotate_timeout = setTimeout(autorotate, 2000);
})();
