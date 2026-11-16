# Diagnostico - Practica 5

## Tabla de problemas

| Problema en enfermo.js | Principio violado | Refactor aplicado |
|---|---|---|
| Nombres criptico (proc, d, t, c, r, p) | Principio 1: el codigo se escribe para humanos | Renombrar a procesarVenta, cliente, total, tipo |
| Numeros magicos (0.9, 0.15, 100, 2, -1) | Principio 1 | Constantes con nombre (TASA_ISV, CODIGO_ERROR, etc.) |
| Anidamiento profundo de if | Principio 1 | Early return |
| Codigo muerto (descuento viejo comentado) y variable temp sin uso | Principio 1 y 5 (leccion Knight) | Borrarlos, Git guarda la historia |
| Formula del ISV duplicada | Principio 4: DRY | Extraer calcularTotalConIsv |
| Una funcion calcula, guarda en BD y manda correo | Principio 2: una funcion, una responsabilidad (SRP) | Separar en calcularTotal, registrarVenta y notificarCliente |
| Base de datos y correo soldados dentro de la funcion | Principio 9: disena para el cambio (DIP) | Inyectar repositorio y notificador como parametros |

## Tests antes del refactor (enfermo.js)

```
OK     cliente normal paga el total mas 15% de ISV
OK     cliente vip paga con 10% de descuento y luego ISV
OK     total cero devuelve -1
OK     total negativo devuelve -1
OK     cliente nulo devuelve -1
OK     guarda la venta con su total y sus puntos
OK     cliente vip gana el doble de puntos
OK     envia un correo de agradecimiento al cliente
OK     cliente vacio no guarda venta ni envia correo

Todo verde
```

## Tests despues del refactor (sano.js)

```
OK     cliente normal paga el total mas 15% de ISV
OK     cliente vip paga con 10% de descuento y luego ISV
OK     total cero devuelve -1
OK     total negativo devuelve -1
OK     cliente nulo devuelve -1
OK     guarda la venta con su total y sus puntos
OK     cliente vip gana el doble de puntos
OK     envia un correo de agradecimiento al cliente
OK     cliente vacio no guarda venta ni envia correo

Todo verde
```