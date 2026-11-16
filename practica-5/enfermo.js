const baseDeDatos = { ventas: [] };
const correosEnviados = [];

function proc(d, t, c) {
  let r = 0;
  let p = 0;
  let temp = 0;
  if (d != null) {
    if (t > 0) {
      if (c === 'vip') {
        r = t * 0.9 + t * 0.9 * 0.15;
        p = Math.floor(r / 100) * 2;
      } else {
        r = t + t * 0.15;
        p = Math.floor(r / 100);
      }
      if (d.length > 0) {
        baseDeDatos.ventas.push({ cliente: d, total: r, puntos: p });
        correosEnviados.push('Gracias ' + d + ', total: ' + r);
        // r = r - 5; // descuento viejo, no borrar
      }
    } else {
      r = -1;
    }
  } else {
    r = -1;
  }
  return r;
}

module.exports = { proc, baseDeDatos, correosEnviados };