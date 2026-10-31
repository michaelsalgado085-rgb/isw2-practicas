# Práctica 3 - Notas

## S - Una responsabilidad (principio 2)
- El método procesar() hacía cinco cosas: validar, calcular, guardar, imprimir y notificar.
- Lo separé en validarStock(), calcularTotalConIsv() y formatearTicket().
- Cada función ahora se explica con su nombre y cabe en pocas líneas.
- Si cambia la tasa del ISV, solo toco calcularTotalConIsv().
- Cada pieza se puede probar sola, sin base de datos ni WhatsApp.

## D - Inversión de dependencias (principio 9)
- Antes la clase creaba MySQLConnection y WhatsAppClient por dentro, con la contraseña escrita en el código.
- Ahora recibe repositorio, impresora y notificador desde afuera como abstracciones.
- Puedo cambiar MySQL por otra base o WhatsApp por correo sin editar la lógica del pedido.
- En los tests inyecto versiones falsas y no mando mensajes reales.
- El negocio ya no conoce los detalles de la base de datos ni del servicio de mensajes.