const TASA_ISV = 0.15;
const FACTOR_DESCUENTO_VIP = 0.9;
const TIPO_VIP = 'vip';
const CODIGO_ERROR = -1;
const LEMPIRAS_POR_PUNTO = 100;
const MULTIPLICADOR_PUNTOS_VIP = 2;

const baseDeDatos = { ventas: [] };
const correosEnviados = [];

function calcularTotalConIsv(base) {
  return base + base * TASA_ISV;
}

function calcularTotal(total, tipo) {
  if (tipo === TIPO_VIP) return calcularTotalConIsv(total * FACTOR_DESCUENTO_VIP);
  return calcularTotalConIsv(total);
}

function calcularPuntos(totalFinal, tipo) {
  const puntos = Math.floor(totalFinal / LEMPIRAS_POR_PUNTO);
  return tipo === TIPO_VIP ? puntos * MULTIPLICADOR_PUNTOS_VIP : puntos;
}

function procesarVenta(cliente, total, tipo) {
  if (cliente == null) return CODIGO_ERROR;
  if (!(total > 0)) return CODIGO_ERROR;

  const totalFinal = calcularTotal(total, tipo);
  const puntos = calcularPuntos(totalFinal, tipo);

  if (cliente.length > 0) {
    baseDeDatos.ventas.push({ cliente: cliente, total: totalFinal, puntos: puntos });
    correosEnviados.push('Gracias ' + cliente + ', total: ' + totalFinal);
  }
  return totalFinal;
}

module.exports = { procesarVenta, baseDeDatos, correosEnviados };