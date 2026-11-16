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

function registrarVenta(repositorio, cliente, total, puntos) {
  repositorio.ventas.push({ cliente: cliente, total: total, puntos: puntos });
}

function notificarCliente(notificador, cliente, total) {
  notificador.push('Gracias ' + cliente + ', total: ' + total);
}

function procesarVenta(cliente, total, tipo, repositorio = baseDeDatos, notificador = correosEnviados) {
  if (cliente == null) return CODIGO_ERROR;
  if (!(total > 0)) return CODIGO_ERROR;

  const totalFinal = calcularTotal(total, tipo);
  const puntos = calcularPuntos(totalFinal, tipo);

  if (cliente.length > 0) {
    registrarVenta(repositorio, cliente, totalFinal, puntos);
    notificarCliente(notificador, cliente, totalFinal);
  }
  return totalFinal;
}

module.exports = { procesarVenta, baseDeDatos, correosEnviados };