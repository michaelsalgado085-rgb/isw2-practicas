const TASA_ISV = 0.15;
const FACTOR_DESCUENTO_VIP = 0.9;
const TIPO_VIP = 'vip';
const CODIGO_ERROR = -1;
const LEMPIRAS_POR_PUNTO = 100;
const MULTIPLICADOR_PUNTOS_VIP = 2;

const baseDeDatos = { ventas: [] };
const correosEnviados = [];

function procesarVenta(cliente, total, tipo) {
  if (cliente == null) return CODIGO_ERROR;
  if (!(total > 0)) return CODIGO_ERROR;

  let resultado;
  let puntos;
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
  }
  return resultado;
}

module.exports = { procesarVenta, baseDeDatos, correosEnviados };