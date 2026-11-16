const baseDeDatos = { ventas: [] };
const correosEnviados = [];

function procesarVenta(cliente, total, tipo) {
  let resultado = 0;
  let puntos = 0;
  let temp = 0;
  if (cliente != null) {
    if (total > 0) {
      if (tipo === 'vip') {
        resultado = total * 0.9 + total * 0.9 * 0.15;
        puntos = Math.floor(resultado / 100) * 2;
      } else {
        resultado = total + total * 0.15;
        puntos = Math.floor(resultado / 100);
      }
      if (cliente.length > 0) {
        baseDeDatos.ventas.push({ cliente: cliente, total: resultado, puntos: puntos });
        correosEnviados.push('Gracias ' + cliente + ', total: ' + resultado);
        // resultado = resultado - 5; // descuento viejo, no borrar
      }
    } else {
      resultado = -1;
    }
  } else {
    resultado = -1;
  }
  return resultado;
}

module.exports = { procesarVenta, baseDeDatos, correosEnviados };