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
- Exportacion e importacion de datos completos en JSON para reutilizar productos, fabricantes y configuraciones.
- Boton "Calcular kJ y %VD": calcula kJ (1 kcal = 4,2 kJ) y el %VD sobre una dieta de 2.000 kcal (energia 2000 kcal, carbohidratos 300 g, proteinas 75 g, grasas totales 55 g, grasas saturadas 22 g, fibra 25 g, sodio 2400 mg). Respeta las filas marcadas "Sin %VD".
- Aviso si el frente o el dorso no tienen lugar suficiente (por ejemplo, octogonos normativos grandes en una etiqueta chica).
- Impresion siempre de frente y dorso. El PDF se genera desde el dialogo de impresion ("Guardar como PDF").
- Octogonos oficiales en PNG dentro de `assets/`.

## Cargar desde el formulario PDF

El boton "Elegir PDF" lee el formulario del Instituto (folio con los datos del rotulo y folio con la informacion nutricional, Modelo vertical A) y completa todos los campos. Se pueden elegir uno o varios PDF; cada folio de datos se carga como un producto.

- El final del GIP se numera solo segun el orden de los productos (-01, -02, -03...). El campo "N.º del primer producto" permite empezar desde otro numero.
- Despues de importar falta subir el logo (se comparte entre todos los productos) y tildar los octogonos.
- El PDF tiene que tener texto (generado desde Excel); un PDF escaneado no se puede leer.
- La lectura usa pdf.js (Mozilla, Apache 2.0), incluido en `assets/vendor/pdfjs/`. Todo se procesa en el navegador: el PDF no se sube a ningun servidor.

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
