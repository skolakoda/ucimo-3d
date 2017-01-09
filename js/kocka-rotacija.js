/* global Vrh3D, Kocka */

/** KONFIG **/

const brzina = 0.01
const sirina = document.body.clientWidth
const visina = document.body.clientHeight

let prosliMishX = 0
let prosliMishY = 0
let mishStisnut = false

/** INIT **/

const centar = new Vrh3D(sirina / 2, visina / 2, 0)
const kocka = new Kocka(centar, visina / 2)

const platno = document.getElementById('canvas')
platno.width = sirina
platno.height = visina

const podloga = platno.getContext('2d')
podloga.strokeStyle = 'rgba(0, 0, 0, 0.3)'
podloga.fillStyle = 'rgba(0, 150, 255, 0.3)'

/** FUNKCIJE **/

/* @param telo.lica: niz nizova */
const render = telo => {
  podloga.clearRect(0, 0, sirina, visina)
  for (let i = 0; i < telo.lica.length; ++i) {
    const lice = telo.lica[i]
    podloga.beginPath()
    podloga.moveTo(lice[0].x + sirina / 2, -lice[0].y + visina / 2)
    for (let j = 1; j < lice.length; ++j) {
      podloga.lineTo(lice[j].x + sirina / 2, -lice[j].y + visina / 2)
    }
    podloga.closePath()
    podloga.stroke()
    podloga.fill()
  }
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

  tacka.x = ct * x - st * cp * y + st * sp * z + centar.x
  tacka.y = st * x + ct * cp * y - ct * sp * z + centar.y
  tacka.z = sp * y + cp * z + centar.z
}

const pratiMisha = function (e) {
  if (!mishStisnut) return
  const pomakX = (e.clientX - prosliMishX) * brzina
  const pomakY = (e.clientY - prosliMishY) * brzina
  for (let i = 0; i < kocka.vrhovi.length; ++i) {
    rotiraj(kocka.vrhovi[i], centar, pomakX, pomakY)
  }
  azurirajMisha(e)
  render(kocka, platno)
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

render(kocka, platno)

/** EVENTS **/

platno.addEventListener('mousedown', pocniVuchu)

document.addEventListener('mousemove', pratiMisha)

document.addEventListener('mouseup', () => mishStisnut = false)
