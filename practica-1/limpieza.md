# Práctica 1 - Limpieza de código

## Código original
```js
function proc(d) {
  // suma los fiados
  const x = d.fiados.reduce((s, f) => s + f.monto, 0);
  const m = x * 0.05;
  // const viejo = x * 1.1;
  let t = x + m;
  if (d.dias > 90) {
    t = x;
  }
  if (t > 0) {
    registrarDeuda(d.clienteId, t);
  }
  return t;
}
```

## Smells que encontré
- **Nombres crípticos:** `proc`, `d`, `x`, `m`, `t` no dicen qué contienen ni qué hacen.
- **Números mágicos:** `0.05` y `90` no explican su significado.
- **Comentario que explica el QUÉ:** `// suma los fiados` repite lo que ya dice el código.
- **Código comentado:** `// const viejo = x * 1.1;` debería estar en el historial de Git.
- **Función que hace demasiado:** calcula el saldo, aplica la mora y registra la deuda, todo en una sola función.

## Código refactorizado
```js
const TASA_MORA = 0.05;
const DIAS_PARA_CONGELAR_MORA = 90;

function calcularSaldo(fiados) {
  return fiados.reduce((saldo, fiado) => saldo + fiado.monto, 0);
}

function calcularTotalConMora(saldo, diasVencidos) {
  // Decisión de negocio: pasados 90 días la mora se congela
  if (diasVencidos > DIAS_PARA_CONGELAR_MORA) return saldo;
  return saldo + saldo * TASA_MORA;
}

function procesarCuentaCliente(cliente) {
  const saldo = calcularSaldo(cliente.fiados);
  const total = calcularTotalConMora(saldo, cliente.dias);

  if (total > 0) {
    registrarDeuda(cliente.clienteId, total);
  }
  return total;
}
```
