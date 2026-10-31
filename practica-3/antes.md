# Práctica 3 - Antes (clase con todo mezclado)

```js
class Pedido {
  constructor(cliente, items) {
    this.cliente = cliente;
    this.items = items;
  }

  procesar() {
    // 1. validar stock
    for (const item of this.items) {
      const producto = db.query('SELECT stock FROM productos WHERE id = ?', item.id);
      if (producto.stock < item.cantidad) {
        throw new Error('Sin stock para ' + item.nombre);
      }
    }

    // 2. calcular total con ISV
    let subtotal = 0;
    for (const item of this.items) {
      subtotal += item.precio * item.cantidad;
    }
    const isv = subtotal * 0.15;
    const total = subtotal + isv;

    // 3. guardar en la base de datos
    const con = new MySQLConnection('localhost', 'root', '1234');
    con.query('INSERT INTO pedidos VALUES (?, ?)', this.cliente.id, total);
    for (const item of this.items) {
      con.query('UPDATE productos SET stock = stock - ? WHERE id = ?', item.cantidad, item.id);
    }

    // 4. imprimir ticket
    console.log('=== TICKET ===');
    console.log('Cliente: ' + this.cliente.nombre);
    for (const item of this.items) {
      console.log(item.nombre + ' x' + item.cantidad + ' L ' + item.precio * item.cantidad);
    }
    console.log('Subtotal: L ' + subtotal);
    console.log('ISV: L ' + isv);
    console.log('Total: L ' + total);

    // 5. enviar WhatsApp
    const wa = new WhatsAppClient('API_KEY_AQUI');
    wa.send(this.cliente.telefono, 'Gracias por tu compra. Total: L ' + total);

    return total;
  }
}
```