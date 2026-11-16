const modulo = require(process.argv[2] || './enfermo');
const procesar = modulo.procesarVenta || modulo.proc;
const { baseDeDatos, correosEnviados } = modulo;

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

function assertCerca(actual, esperado) {
  if (Math.abs(actual - esperado) > 0.001) {
    throw new Error('esperaba ' + esperado + ' pero obtuvo ' + actual);
  }
}

function limpiar() {
  baseDeDatos.ventas.length = 0;
  correosEnviados.length = 0;
}

test('cliente normal paga el total mas 15% de ISV', () => {
  limpiar();
  const resultado = procesar('Ana', 100, 'normal');
  assertCerca(resultado, 115);
});

test('cliente vip paga con 10% de descuento y luego ISV', () => {
  limpiar();
  const resultado = procesar('Ana', 100, 'vip');
  assertCerca(resultado, 103.5);
});

test('total cero devuelve -1', () => {
  limpiar();
  const resultado = procesar('Ana', 0, 'normal');
  assertEqual(resultado, -1);
});

test('total negativo devuelve -1', () => {
  limpiar();
  const resultado = procesar('Ana', -50, 'normal');
  assertEqual(resultado, -1);
});

test('cliente nulo devuelve -1', () => {
  limpiar();
  const resultado = procesar(null, 100, 'normal');
  assertEqual(resultado, -1);
});

test('guarda la venta con su total y sus puntos', () => {
  limpiar();
  procesar('Ana', 1000, 'normal');
  assertEqual(baseDeDatos.ventas.length, 1);
  assertCerca(baseDeDatos.ventas[0].total, 1150);
  assertEqual(baseDeDatos.ventas[0].puntos, 11);
});

test('cliente vip gana el doble de puntos', () => {
  limpiar();
  procesar('Ana', 1000, 'vip');
  assertEqual(baseDeDatos.ventas[0].puntos, 20);
});

test('envia un correo de agradecimiento al cliente', () => {
  limpiar();
  procesar('Ana', 100, 'normal');
  assertEqual(correosEnviados.length, 1);
  assertEqual(correosEnviados[0].includes('Ana'), true);
});

test('cliente vacio no guarda venta ni envia correo', () => {
  limpiar();
  procesar('', 100, 'normal');
  assertEqual(baseDeDatos.ventas.length, 0);
  assertEqual(correosEnviados.length, 0);
});

console.log(fallidos === 0 ? '\nTodo verde' : '\n' + fallidos + ' test(s) fallaron');
process.exitCode = fallidos === 0 ? 0 : 1;