const TASA_ISV = 0.15;
const FACTOR_DESCUENTO_VIP = 0.9;
const TIPO_VIP = 'vip';
const CODIGO_ERROR = -1;
const LEMPIRAS_POR_PUNTO = 100;
const MULTIPLICADOR_PUNTOS_VIP = 2;

const baseDeDatos = { ventas: [] };
const correosEnviados = [];

function procesarVenta(cliente, total, tipo) {
  let resultado = 0;
  let puntos = 0;
  let temp = 0;
  if (cliente != null) {
    if (total > 0) {
      if (tipo === TIPO_VIP) {
        resultado = total * FACTOR_DESCUENTO_VIP + total * FACTOR_DESCUENTO_VIP * TASA_ISV;
        puntos = Math.floor(resultado / LEMPIRAS_POR_PUNTO) * MULTIPLICADOR_PUNTOS_VIP;
      } else {
        resultado = total + total * TASA_ISV;
        puntos = Math.floor(resultado / LEMPIRAS_POR_PUNTO);
      }
      if (cliente.length > 0) {
        baseDeDatos.ventas.push({ cliente: cliente, total: resultado, puntos: puntos });
        correosEnviados.push('Gracias ' + cliente + ', total: ' + resultado);
        // resultado = resultado - 5; // descuento viejo, no borrar
      }
    } else {
      resultado = CODIGO_ERROR;
    }
  } else {
    resultado = CODIGO_ERROR;
  }
  return resultado;
}

module.exports = { procesarVenta, baseDeDatos, correosEnviados };