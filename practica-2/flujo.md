\# Práctica 2 - GitFlow vs Trunk-Based



\## GitFlow

Usa varias ramas de larga vida: main, develop, feature, release y hotfix.

Cada tipo de cambio tiene su rama y su camino hacia producción.

Es ordenado, pero tiene más ramas que mantener y más merges.



\## Trunk-Based

Todos trabajan sobre una sola rama principal (main) con ramas muy cortas,

de horas o pocos días, que se integran rápido.

Hay menos merges grandes y menos conflictos, pero necesita buenas pruebas

automáticas para no romper main.





\## Mi elección para una app web

Usaría Trunk-Based. Una app web se despliega seguido, y ramas cortas con

integración continua permiten entregar cambios pequeños y rápidos con menos

conflictos. GitFlow tiene más sentido en software con versiones fijas,

como una app que se lanza por versiones numeradas.

