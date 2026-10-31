# Práctica 3 - Después (S + D aplicados)

```js
// S: una pieza por responsabilidad

function validarStock(items, inventario) {
  for (const item of items) {
    if (inventario.stockDe(item.id) < item.cantidad) {
      throw new Error('Sin stock para ' + item.nombre);
    }
  }
}

function calcularTotalConIsv(items) {
  const subtotal = items.reduce((suma, i) => suma + i.precio * i.cantidad, 0);
  const isv = subtotal * TASA_ISV;
  return { subtotal, isv, total: subtotal + isv };
}

function formatearTicket(cliente, items, montos) {
  // devuelve el texto del ticket, no imprime nada
}

// D: guardado y envío llegan desde afuera (inyectados)

class ProcesadorDePedidos {
  constructor(inventario, repositorio, impresora, notificador) {
    this.inventario = inventario;     // abstracción: stockDe(id)
    this.repositorio = repositorio;   // abstracción: guardar(pedido)
    this.impresora = impresora;       // abstracción: imprimir(texto)
    this.notificador = notificador;   // abstracción: enviar(telefono, mensaje)
  }

  procesar(cliente, items) {
    validarStock(items, this.inventario);
    const montos = calcularTotalConIsv(items);
    this.repositorio.guardar({ cliente, items, total: montos.total });
    this.impresora.imprimir(formatearTicket(cliente, items, montos));
    this.notificador.enviar(cliente.telefono, 'Gracias por tu compra. Total: L ' + montos.total);
    return montos.total;
  }
}

// En producción: new ProcesadorDePedidos(inventarioMySQL, repoMySQL, impresoraTermica, whatsApp)
// En tests:      new ProcesadorDePedidos(inventarioFalso, repoFalso, impresoraFalsa, notificadorFalso)
```