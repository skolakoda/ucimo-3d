class Vrh {
  constructor(x, y, z) {
    this.x = parseFloat(x)
    this.y = parseFloat(y)
    this.z = parseFloat(z)
  }
}

/** KONFIG **/

const brzina = 0.01
const sirina = document.body.clientWidth
const visina = document.body.clientHeight

let prosliMishX = 0
let prosliMishY = 0
let mishStisnut = false

/** INIT **/

const centar = new Vrh(sirina / 2, visina / 2, 0)
const A = new Vrh(10, 100, 0)
const B = new Vrh(400, 200, 0)
const C = new Vrh(600, 300, 0)
const tacke = [A, B, C]

const platno = document.getElementById('canvas')
platno.width = sirina
platno.height = visina

const podloga = platno.getContext('2d')
podloga.strokeStyle = 'rgba(0, 0, 0, 0.3)'
podloga.fillStyle = 'rgba(0, 150, 255, 0.3)'

/** FUNKCIJE **/

const render = tacke => {
  podloga.clearRect(0, 0, sirina, visina)
  podloga.beginPath()
  podloga.moveTo(tacke[0].x, tacke[0].y)
  for (var i = 0; i < tacke.length; i++) {
    podloga.lineTo(tacke[i].x, tacke[i].y)
  }
  podloga.stroke()
}

const rotiraj = function (tacka, centar, pomakX, pomakY) {
  // koeficijenti za matricu rotacije
  const ct = Math.cos(pomakX)
  const st = Math.sin(pomakX)
  const cp = Math.cos(pomakY)
  const sp = Math.sin(pomakY)

  // rotacija
  const x = tacka.x - centar.x
  const y = tacka.y - centar.y
  const z = tacka.z - centar.z

  tacka.x = (ct * x) - (st * cp * y) + (st * sp * z) + centar.x
  tacka.y = (st * x) + (ct * cp * y) - (ct * sp * z) + centar.y
  tacka.z = (sp * y) + (cp * z) + centar.z
}

const pratiMisha = e => {
  if (!mishStisnut) return
  const pomakX = (e.clientX - prosliMishX) * brzina
  const pomakY = (e.clientY - prosliMishY) * brzina
  for (let i = 0; i < tacke.length; ++i) {
    rotiraj(tacke[i], centar, pomakX, pomakY)
  }
  azurirajMisha(e)
  render(tacke)
}

const pocniVuchu = function (e) {
  azurirajMisha(e)
  mishStisnut = true
}

const azurirajMisha = function (e) {
  prosliMishX = e.clientX
  prosliMishY = e.clientY
}

/** EXEC **/

render(tacke)

/** EVENTS **/

platno.addEventListener('mousedown', pocniVuchu)

document.addEventListener('mousemove', pratiMisha)

document.addEventListener('mouseup', () => mishStisnut = false)
