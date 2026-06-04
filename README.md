# Generador de etiquetas alimentarias

Micrositio estatico listo para publicar en GitHub Pages. Permite confeccionar e imprimir etiquetas alimentarias de frente y dorso para distintos formatos de producto.

## Formatos disponibles

- Frascos: 6 cm x 7 cm.
- Panificacion / Otros: 10 cm x 10 cm.
- Panificacion / Budines: 10 cm x 5 cm.
- Panificacion / Cookies: 7 cm x 7 cm.

El usuario debe elegir obligatoriamente el tipo de etiqueta antes de validar o imprimir.

## Funcionalidades

- Frente del producto con octogonos, logo o imagen de marca, marca, rubro, descripcion, peso, tenor graso, industria y redes.
- Dorso con ingredientes, alergenos, informacion nutricional, datos del fabricante, GIP, conservacion, fechas y leyenda comercial.
- Campo de alergenos separado de ingredientes, obligatorio, convertido automaticamente a mayusculas e impreso en negrita.
- Fechas de elaboracion y vencimiento opcionales para permitir sello manual posterior.
- Validacion opcional de fechas si el usuario las completa.
- Validacion del GIP con formato `1267/2025-01`.
- Impresion siempre de frente y dorso.
- Octogonos oficiales en PNG dentro de `assets/`.

## Octogonos

El generador permite dos modos:

- Provisorio para diseno: usa tamanos moderados para armar la etiqueta sin deteriorar la composicion visual.
- Calcular por superficie del envase: solicita la superficie de la cara principal del envase terminado y calcula el tamano de los octogonos segun la normativa aplicable.

La superficie normativa corresponde al envase/producto final, no al area de la etiqueta.

## Publicacion en GitHub Pages

1. Crear o abrir el repositorio en GitHub.
2. Subir el contenido completo de esta carpeta.
3. En GitHub, entrar a `Settings > Pages`.
4. Elegir `Deploy from a branch`, rama `main`, carpeta `/root`.
5. Abrir la URL publicada por GitHub Pages.

No requiere login, servidor, base de datos ni instalacion de dependencias.
