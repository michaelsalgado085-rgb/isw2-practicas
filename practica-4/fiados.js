const TASA_MORA = 0.05;

function calcularMora(monto, diasVencidos) {
  if (typeof monto !== 'number' || Number.isNaN(monto) || monto < 0) {
    throw new Error('Monto invalido');
  }
  if (typeof diasVencidos !== 'number' || Number.isNaN(diasVencidos)) {
    throw new Error('Dias invalidos');
  }
  if (diasVencidos > 0) return monto * TASA_MORA;
  return 0;
}

module.exports = { calcularMora };