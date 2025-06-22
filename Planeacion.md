# Maquetación y Estructuración


## Maquetacion y Diseño

### Estructura planeada

![Estructura planeada](./Readme_images/Estructura%20planeada.png)

En la estructura planeada se quiere implementar 4 paginas, una que sea la index page que es la bienvenida al usuario apenas ingresa al sitio web. En la pagina de compras_page se aparcan todos los productos consultados a la API y son ajustados y posicionados en el grid. En la pagina de detalle_producto se aloja la informacion del producto que se selecciona desde la pagina de compras_home. Finalmente en la pagina de carrito de compras se colocan los productos que son agregados desde la pagina de detalle producto, en el carrito de compras se puede modificar la cantidad de productos solicitados y la suma total.

### Index_page

![Index page](./Readme_images/Index-1.png)

Se implementa una vista de bienvenida al usuario con fines de ambientacion y presentacion a la pagina de compras NeoTix y se agrega un boton que cambia la presentacion a la vista de los productos que ofrece el sitio web. En terminos de educacion se agregan dos cubos animados que den un toque sutil de elegancia y minimalismo.

### Compras_page

![Compras_page](./Readme_images/compras_page-2.png)

En esta parte del sitio web se visualizan todos los productos que se estan ofreciendo, todos los productos tienen que ser dinamicos mediante JS incluyendo la accion de acceder a la informacion del producto. Se incluye la barra de busqueda funcional junto el filtro y el boton del carrito de compras, finalmente para regresar a la index solo se presiona en el logo de NeoTix

### Detalle producto page

![Detalle_producto_page](./Readme_images/detalle_producto-3.png)

En esta seccion del sitio web se agrega un contenedor con fondo azul mas amplio donde se incluye la informacion del producto, su imagen, stock y clasificacion a la que pertenece y el boton para volver a la vista de productos.

### Carrito de compras
![Carrito_page](./Readme_images/carrito%20_page-4.png)

En la vista del carrito de compras se guardaran todos los productos que el cliente desea mediante localStorage como la manera de guardar el almacenamiento de lo que se realice en la pagina. En un contenedor se encontraran todos los items deseados por el usaurio con los botones incrementar o reducir la cantidad que se desea solicitar ademas de añadir el total de la compra y un boton para pagar, aunque la funcionalidad para pagar por esta etapa aun no es necesaria de acuerdo con los requirimientos.


