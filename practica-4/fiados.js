const TASA_MORA = 0.05;

function calcularMora(monto, diasVencidos) {
  if (diasVencidos > 0) return monto * TASA_MORA;
  return 0;
}

module.exports = { calcularMora };