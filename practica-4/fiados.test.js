const { calcularMora } = require('./fiados');

let fallidos = 0;

function test(nombre, fn) {
  try {
    fn();
    console.log('OK     ' + nombre);
  } catch (e) {
    fallidos++;
    console.log('FALLA  ' + nombre + ' -> ' + e.message);
  }
}

function assertEqual(actual, esperado) {
  if (actual !== esperado) {
    throw new Error('esperaba ' + esperado + ' pero obtuvo ' + actual);
  }
}

function lanzaError(fn) {
  try { fn(); return false; } catch (e) { return true; }
}

test('cobra 5% de mora cuando el fiado tiene 5 dias vencidos', () => {
  const monto = 100;
  const resultado = calcularMora(monto, 5);
  assertEqual(resultado, 5);
});

test('no cobra mora cuando tiene 0 dias vencidos', () => {
  const monto = 100;
  const resultado = calcularMora(monto, 0);
  assertEqual(resultado, 0);
});

test('no cobra mora cuando el monto es 0', () => {
  const monto = 0;
  const resultado = calcularMora(monto, 10);
  assertEqual(resultado, 0);
});

test('cobra mora con 1 dia vencido (limite exacto)', () => {
  const monto = 200;
  const resultado = calcularMora(monto, 1);
  assertEqual(resultado, 10);
});

test('no cobra mora cuando los dias son negativos (aun no vence)', () => {
  const monto = 100;
  const resultado = calcularMora(monto, -3);
  assertEqual(resultado, 0);
});

test('lanza error cuando el monto es negativo', () => {
  const lanzo = lanzaError(() => calcularMora(-100, 5));
  assertEqual(lanzo, true);
});

test('lanza error cuando los dias no son un numero', () => {
  const lanzo = lanzaError(() => calcularMora(100, 'abc'));
  assertEqual(lanzo, true);
});

console.log(fallidos === 0 ? '\nTodo verde' : '\n' + fallidos + ' test(s) fallaron');
process.exitCode = fallidos === 0 ? 0 : 1;