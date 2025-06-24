# Maquetación y Estructuración


## Maquetacion y Diseño

### Estructura planeada

![Estructura planeada](./Readme_images/Estructura%20planeada.png)

En la estructura planeada se quiere implementar 4 paginas, una que sea la index page que es la bienvenida al usuario apenas ingresa al sitio web. En la pagina de compras_page se aparcan todos los productos consultados a la API y son ajustados y posicionados en el grid. En la pagina de detalle_producto se aloja la informacion del producto que se selecciona desde la pagina de compras_home. Finalmente en la pagina de carrito de compras se colocan los productos que son agregados desde la pagina de detalle producto, en el carrito de compras se puede modificar la cantidad de productos solicitados y la suma total.

### Index_page

![Index page](./Readme_images/Index-1.png)

🔹 Vista de bienvenida (index.html)

Se implementa una vista inicial que da la bienvenida al usuario con fines de ambientación y presentación general del sitio de compras NeoTix. Esta página incluye un botón principal que permite al usuario acceder a la vista de productos disponibles.

Desde una perspectiva estética y educativa, se integran dos cubos animados que aportan un toque sutil de elegancia y minimalismo, reforzando la identidad visual del proyecto y demostrando el uso de animaciones CSS dentro de una interfaz limpia y moderna.

### Compras_page

![Compras_page](./Readme_images/compras_page-2.png)

🔹 Vista principal de productos (products_page.html)

Esta sección del sitio web permite visualizar dinámicamente todos los productos disponibles mediante el uso de JavaScript. Cada producto es generado desde una fuente externa (API) y puede ser consultado individualmente accediendo a su vista de detalle, también construida de forma dinámica.

La página incluye:

- Una barra de búsqueda para localizar productos por nombre.

- Un filtro por categoría, que se genera automáticamente a partir de los productos obtenidos.

- Un botón de acceso al carrito de compras, donde se visualizan los productos seleccionados por el usuario.

- Un enlace de retorno a la página de bienvenida presionando el logo de NeoTix ubicado en la barra de navegación.

- Esta vista representa el corazón funcional del sitio y centraliza toda la interacción del usuario con los productos.

### Detalle producto page

![Detalle_producto_page](./Readme_images/detalle_producto-3.png)

En esta sección del sitio web se despliega un contenedor con un fondo azul más amplio y destacado, diseñado para resaltar la información específica del producto seleccionado. Esta vista se genera de manera dinámica al hacer clic sobre cualquier producto en la página principal.

### Carrito de compras
![Carrito_page](./Readme_images/carrito%20_page-4.png)

🔹 Vista del carrito de compras

En esta sección se muestran todos los productos seleccionados por el usuario para su futura compra. La información del carrito se gestiona utilizando localStorage, lo que permite mantener los productos añadidos incluso si el usuario recarga la página.

El carrito incluye:

- Una lista dinámica de productos añadidos, cada uno con:

- Imagen, nombre y precio unitario.

- Botones para incrementar o reducir la cantidad deseada.

- Un resumen con el total acumulado de la compra.

- Un botón para pagar (funcionalidad no implementada en esta etapa según los requerimientos).

- Un botón para vaciar el carrito completamente.

- Acceso de vuelta a la vista de productos con un botón de “Volver”.

Esta vista está diseñada para ofrecer una experiencia de compra clara, ordenada y flexible, permitiendo al usuario ajustar su pedido fácilmente antes de finalizar.


## Desarrollo de las ramas 

### Rama HTML
![HTML_branch_image](./Readme_images/HTML%20branch%20logo.png)

Rama donde se encuentra toda la estructura html de la pagina web de compras

#### commits relevantes:
<p align="center"> <img src="./Readme_images/HTML_commits2.png" alt="Commits HTML 2" width="600"/> <br/> <img src="./Readme_images/HTML_commits1.png" alt="Commits HTML 1" width="600"/> </p>

#### 🗑️ Justificacion de archivos eliminados:
![HTML_commits_1](./Readme_images/archivos_eliminados.png)
El desarrollo de los distintos archivos HTML presentes en los commits de esta rama tuvo como objetivo inicial ofrecer múltiples vistas para facilitar la navegación del usuario. No obstante, siguiendo buenas prácticas de desarrollo, se decidió utilizarlos únicamente como referencia estructural durante la implementación de vistas dinámicas con JavaScript, con la excepción del archivo "Products_page.html", donde efectivamente se alojan dichas vistas.

En conclusión, estos archivos fueron creados como guía temporal y posteriormente eliminados al no cumplir una función adicional dentro del proyecto. La versión final del sitio se desarrolló únicamente con dos archivos HTML principales: index.html y Products_page.html.

#### Estructura HTML final de index.html:

<p align="center"> <img src="./Readme_images/indexpage_str.png" alt="Commits HTML 2" width="600"/> <br/> 

🔹 index.html: Archivo encargado de dar la bienvenida al usuario. En esta vista se incluyen elementos decorativos y estéticos que introducen al sitio y refuerzan la identidad visual de la tienda.

#### Estructura HTML final de products_page.html:

<p align="center"> <img src="./Readme_images/Products_page_str.png" alt="Commits HTML 2" width="600"/> <br/> 

Archivo principal que estructura todas las vistas dinámicas del sitio web.
Sirve como contenedor central donde se integran, mediante JavaScript, las siguientes secciones:

🛍️ Vista general de todos los productos

🔎 Vista detallada del producto seleccionado

🛒 Carrito de compras interactivo

Este archivo fue diseñado para trabajar en conjunto con el script functionality.js, evitando la fragmentación del proyecto en múltiples archivos HTML y promoviendo una arquitectura más dinámica, escalable y mantenible.

<hr>

### 🎨 Rama CSS:

![CSS_branch_image](./Readme_images/CSS%20branch%20logo.png)

Rama que contiene todos los estilos CSS aplicados al sitio web de compras NeoTix. Aquí se definen los aspectos visuales del proyecto, incluyendo:

- Diseño de interfaz y disposición de elementos (maquetación).

- Animaciones sutiles como los cubos en la página de bienvenida.

- Estilos responsivos para adaptar la experiencia a distintos dispositivos.

- Personalización de botones, tarjetas de productos, navegación y carrito de compras.

- El objetivo de esta rama es garantizar una experiencia visual moderna, coherente y atractiva, reforzando la identidad visual del sitio.





![javaScript_branch_image](./Readme_images/JS_branch%20image.png)
![Docs_branch_image](./Readme_images/Docs_branch%20image.png)