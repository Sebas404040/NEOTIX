// Creaciòn de los contenedores para las vistas 
const contenedorProductos = document.getElementById("contenedorProductos");
const detalle = document.getElementById("detalleProducto");
const barraNavegacion = document.querySelector("header.nav_tab");

//Este array se usa para aplicar filtros, búsquedas y renderizarlos dinámicamente en la vista
let productosTotal = [];

//Funcion asincrona encargada de cargar los productos desde la API
async function cargarProductos() {
    try {
        //Consulta a la API
        const response = await fetch("https://fakestoreapi.com/products");
        const productos = await response.json();

        //Guarda los productos obtenidos en la variable global `productosTotal`.
        productosTotal = productos;

        //Llama a `mostrarProductos()` para renderizar los productos en pantalla.
        mostrarProductos(productosTotal);
        mostrarCategorias();
    } catch (error) {

        //Mostrar mensaje de error en caso de que falle la consulta
        console.error("Error al cargar los productos:", error);
        const mensaje = document.createElement("p");
        mensaje.textContent = "No se pudieron cargar los productos.";
        contenedorProductos.appendChild(mensaje);
    }
}

//Captura de los elementos del filtro, el select y la barra de busqueda
const button_filtro = document.getElementById("filtro_logo");
const menu_filtro = document.getElementById("menu_filtro");
const inputBusqueda = document.getElementById("search_input");

// Asigna la función 'busquedas' como manejadora de eventos para:
// El evento 'input' en el campo de búsqueda (se ejecuta cada vez que el usuario escribe).
inputBusqueda.addEventListener("input", busquedas);

// El evento 'change' en el menú desplegable de categorías (se ejecuta al seleccionar una categoría).
menu_filtro.addEventListener("change", busquedas);

// Asigna un evento al ícono de filtro que alterna (muestra/oculta) el menú desplegable de categorías
// Esto permite que el menú solo se muestre cuando el usuario lo necesita.
button_filtro.addEventListener("click", () => {
    menu_filtro.classList.toggle("oculto");
});

// Funciòn para mostrar las categorias de los productos
function mostrarCategorias() {

    // Obtiene categorías únicas de los productos usando Set
    const unicaCategoria = [...new Set(productosTotal.map(producto => producto.category))];

    // Limpia las opciones anteriores del select
    menu_filtro.replaceChildren();

    // Agrega la opción para mostrar todas las categorías
    const opcionTodo = document.createElement("option");
    opcionTodo.value = "todas";
    opcionTodo.textContent = "Todas las categorías";
    menu_filtro.appendChild(opcionTodo);

    // Agrega una opción por cada categoría encontrada
    unicaCategoria.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        menu_filtro.appendChild(option);
    });
}

// Funcion que filtra los productos en base al texto de búsqueda y a la categoría seleccionada.
function busquedas() {
    const inputProducto = inputBusqueda.value.toLowerCase(); // Texto del buscador en minúsculas
    const categoriaSeleccionada = menu_filtro.value; // Categoría elegida en el menú

    const filtrados = productosTotal.filter(producto => {
        const s_nombre = producto.title.toLowerCase().includes(inputProducto); // Coincidencia por nombre
        const s_categoria = categoriaSeleccionada === "todas" || producto.category === categoriaSeleccionada;  // Coincidencia por categoría

        return s_nombre && s_categoria; // Retorna los productos que cumplan con ambas condiciones
    });

    mostrarProductos(filtrados); // Renderiza los productos filtrados
}

/**
 * Renderiza dinámicamente una galería de productos en el DOM.
 * 
 * @param {Array} productos - Lista de productos a mostrar. Cada producto debe tener
 *                            propiedades como `image`, `title` y `price`.
 */
function mostrarProductos(productos) {
    contenedorProductos.replaceChildren();  // Limpia contenido anterior
    productos.forEach(producto => {
        const contenedorProducto = document.createElement("div"); // Crea contenedorProducto
        contenedorProducto.classList.add("producto");

        // Crea la imagen del producto
        const img = document.createElement("img");
        img.setAttribute("src", producto.image);
        img.setAttribute("alt", producto.title);
        img.classList.add("imagen_producto")

        // Nombre del producto
        const nombre_producto = document.createElement("strong");
        nombre_producto.textContent = producto.title;

        // Precio del producto
        const precio = document.createElement("span");
        precio.textContent = `$${producto.price}`;

        // Armado de la tarjeta del producto
        contenedorProducto.appendChild(img);
        contenedorProducto.appendChild(nombre_producto);
        contenedorProducto.appendChild(precio);

        // Evento que permite mostrar los detalles del producto
        contenedorProducto.addEventListener("click", () => detalleProducto(producto));

        // Agregar al DOM
        contenedorProductos.appendChild(contenedorProducto);
    });
}

/**
 * Muestra la vista detallada de un producto seleccionado.
 * 
 * @param {Object} producto - Objeto que representa un producto, con propiedades como
 *                            `id`, `title`, `image`, `price`, `description`, `category`.
 */
function detalleProducto(producto) {

    // Oculta secciones innecesarias y muestra la de detalles
    contenedorProductos.classList.add("oculto");
    detalle.classList.remove("oculto");
    barraNavegacion.classList.add("oculto");

    detalle.replaceChildren(); // Limpia contenido previo

    // Botón volver
    const back_button = document.createElement("button");
    back_button.classList.add("bubbles");
    back_button.addEventListener("click", volver)

    // Contenedor principal
    const contenedor_general = document.createElement("div")
    contenedor_general.classList.add("contenedor_general")

    // Contenedor para la imagen
    const contenedorImagen = document.createElement("section")
    contenedorImagen.classList.add("contenedorImagen")

    const imgDetalle = document.createElement("img");
    imgDetalle.setAttribute("src", producto.image);
    imgDetalle.setAttribute("alt", producto.title);
    imgDetalle.classList.add("imagen_producto_detalle");

    // Contenedor de información
    const contenedorInfoProducto = document.createElement("section");

    const categoria = document.createElement("div");
    categoria.textContent = producto.category;
    categoria.classList.add("categoria");

    const nombre_producto = document.createElement("h3");
    nombre_producto.textContent = producto.title;

    const precio = document.createElement("span");
    precio.textContent = `$${producto.price}`;

    const descripcion = document.createElement("p");
    descripcion.textContent = producto.description;

    const stock = document.createElement("span");
    stock.textContent = producto.count;

    // Botón para agregar al carrito
    const adquirir = document.createElement("button")
    adquirir.id = "button_agregar"
    adquirir.textContent = "Agregar al carrito";

    // Evento que es ejecutado al hacer click en el boton "Agregar al carrito"
    adquirir.addEventListener("click", () => {

        // Recupera el carrito desde localStorage o lo inicializa como arreglo vacío si no existe
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        // Verifica si el producto ya existe en el carrito
        const productoExistente = carrito.find(p => p.id === producto.id);

        if (productoExistente) {
            // Si el producto ya está en el carrito, incrementa su cantidad
            productoExistente.cantidad += 1;
        } else {
            // Si no está, lo agrega con cantidad 1
            carrito.push({
                id: producto.id,
                title: producto.title,
                price: producto.price,
                image: producto.image,
                cantidad: 1
            });
        }

        // Guarda el carrito actualizado en localStorage
        localStorage.setItem("carrito", JSON.stringify(carrito));

        // Cambia el texto del botón para indicar que el producto fue añadido
        adquirir.textContent = "Producto añadido";
        adquirir.disabled = true; // Desactiva el botón para evitar duplicados inmediatos
    });

    const span = document.createElement("span");
    span.classList.add("text");
    span.textContent = "Volver";
    back_button.appendChild(span);

    // Armar la sección informativa
    contenedorInfoProducto.appendChild(categoria);
    contenedorInfoProducto.appendChild(nombre_producto);
    contenedorInfoProducto.appendChild(precio);
    contenedorInfoProducto.appendChild(descripcion);
    contenedorInfoProducto.appendChild(stock);
    contenedorInfoProducto.appendChild(adquirir);
    contenedorImagen.appendChild(imgDetalle);

    // Agregar secciones al contenedor principal
    contenedor_general.appendChild(contenedorImagen);
    contenedor_general.appendChild(contenedorInfoProducto);

    // Insertar todo en el DOM
    detalle.appendChild(back_button);
    detalle.appendChild(contenedor_general);

}

// Función que permite vovler a la vista de productos
function volver() {

    // Oculta la sección de detalle del producto
    detalle.classList.add("oculto");

    // Muestra nuevamente la galería de productos
    contenedorProductos.classList.remove("oculto");

    // Muestra la barra de navegación
    barraNavegacion.classList.remove("oculto");

}


// FUNCIONES DEL CARRITO DE COMPRAS
// Llama a la función principal para cargar los productos desde la API al iniciar la página
cargarProductos();

// captura la sección del carrito en el DOM
const sectionCarrito = document.getElementById("carrito");

// Obtiene el ícono del carrito en la barra de navegación
const iconoCarrito = document.getElementById("carrito_logo")

// Evento que se ejecuta al hacer clic en el ícono del carrito
iconoCarrito.addEventListener("click", () => {
    contenedorProductos.classList.add("oculto");
    detalle.classList.add("oculto");
    sectionCarrito.classList.remove("oculto");
    barraNavegacion.classList.add("oculto");
    showCarrito();
});

// Funcion que renderiza el carrito de compras
function showCarrito() {

    // Limpia el contenido actual del carrito (por si ya había productos mostrados antes)
    sectionCarrito.replaceChildren();

    // Obtiene el carrito desde localStorage (o un arreglo vacío si aún no hay nada)
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Contenedor principal de los productos en el carrito
    const cartContainer = document.createElement("section");
    cartContainer.classList.add("cart_container");

    // === Encabezado del carrito ===
    const header = document.createElement("header");
    header.classList.add("header_cartPage");

    const btnVolver = document.createElement("button");
    btnVolver.textContent = "Volver";
    btnVolver.classList.add("btn_volver");
    btnVolver.addEventListener("click", () => {
        // Al hacer clic en "Volver", oculta el carrito y muestra los productos principales
        sectionCarrito.classList.add("oculto");
        contenedorProductos.classList.remove("oculto");
        barraNavegacion.classList.remove("oculto");
    });

    const cart_image_cart = document.createElement("img");
    cart_image_cart.setAttribute("src", "../icons/carrito_logo.png");
    cart_image_cart.setAttribute("alt", "Carrito de compras");
    cart_image_cart.classList.add("cart_image_cart");

    const cartTitle = document.createElement("span");
    cartTitle.textContent = "Carrito de compras";
    cartTitle.classList.add("cart_title");

    header.appendChild(btnVolver);
    header.appendChild(cart_image_cart);
    header.appendChild(cartTitle);
    sectionCarrito.appendChild(header);

     // === Si el carrito está vacío === muestra un mensaje de que esta vacio
    if (carrito.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "Tu carrito está vacío";
        mensaje.classList.add("mensaje")
        cartContainer.appendChild(mensaje);
    } else {
        // === Si hay productos en el carrito === se crean los items del carrito de compras
        let total = 0;

        const items = document.createElement("div");
        items.classList.add("items_cart");

        const tus_items = document.createElement("span");
        tus_items.textContent = "Tus items"
        tus_items.classList.add("span_items")

        items.appendChild(tus_items);

        carrito.forEach(producto => {

            // Contenedor de cada producto
            const item = document.createElement("div");
            item.classList.add("producto-carrito");

            // Imagen del producto
            const imagen = document.createElement("img")
            imagen.setAttribute("src", producto.image);
            imagen.setAttribute("alt", producto.title);
            imagen.classList.add("imagen-producto_carrito");

            // Nombre del producto
            const nombre = document.createElement("p");
            nombre.textContent = producto.title;

            // Precio unitario
            const precioUnitario = document.createElement("span");
            precioUnitario.textContent = `Precio Unitario: $${producto.price}`;

            // Sección para mostrar y modificar la cantidad
            const containerCantidad = document.createElement("section");

            const cantidad = document.createElement("span");
            cantidad.textContent = `Cantidad: ${producto.cantidad}`;

            // Botón para sumar la cantidad
            const btnSumar = document.createElement("img");
            btnSumar.setAttribute("src", "../icons/suma_logo.png");
            btnSumar.setAttribute("alt", "sumar cantidad");
            btnSumar.classList.add("buttonsSR");
            btnSumar.addEventListener("click", () => actualizarCantidad(producto.id, 1));

            // Botón para restar a la cantidad
            const btnRestar = document.createElement("img");
            btnRestar.setAttribute("src", "../icons/resta_logo.png");
            btnRestar.setAttribute("alt", "restar cantidad");
            btnRestar.classList.add("buttonsSR");
            btnRestar.addEventListener("click", () => actualizarCantidad(producto.id, -1));

            // Contenenedor de los botones
            const algorithmButtons = document.createElement("div");
            algorithmButtons.classList.add("algorithmButtons")

            // Construccion del item
            item.appendChild(imagen);
            item.appendChild(nombre);
            item.appendChild(precioUnitario);
            containerCantidad.appendChild(cantidad);
            algorithmButtons.appendChild(btnSumar);
            algorithmButtons.appendChild(btnRestar);
            containerCantidad.appendChild(algorithmButtons);
            item.appendChild(containerCantidad);
            items.appendChild(item);

            // Acumulacion del total de la compra
            total += producto.price * producto.cantidad;
        });

        // Agrega todos los items al container del carrito
        cartContainer.appendChild(items);

        // === Sección de pago ===
        const pago_container = document.createElement("section");
        pago_container.classList.add("pago_container");

        // Total de la compra
        const totalCompra = document.createElement("h3");
        totalCompra.textContent = `Total: $${total.toFixed(2)}`;

        // Creacion del boton para pagar
        const btnPagar = document.createElement("button");
        btnPagar.textContent = "Pagar";
        btnPagar.classList.add("btn_pagar");

        // Imagen de la tarjeta de pago
        const cardImage = document.createElement("img");
        cardImage.setAttribute("src", "../icons/card_logo.png");
        cardImage.setAttribute("alt", "card_logo");
        cardImage.classList.add("card_logo")

        // Boton para pagar
        btnPagar.appendChild(cardImage);
        pago_container.appendChild(totalCompra);
        pago_container.appendChild(btnPagar);
        cartContainer.appendChild(pago_container);

        // Botón para vaciar el carrito
        const btnVaciar = document.createElement("button");
        btnVaciar.textContent = "Vaciar carrito";
        btnVaciar.classList.add("btn_vaciar");
        btnVaciar.addEventListener("click", () => {
            localStorage.removeItem("carrito");
            showCarrito(); // se llama a la funcion para reiniciar la vista del carrito tras vaciar
        });

        // Se agrega el boton de vaciar
        sectionCarrito.appendChild(btnVaciar);
    }

    // Agrega el contenedor principal del carrito a la sección
    sectionCarrito.appendChild(cartContainer);
}

/**
 * Actualiza la cantidad de un producto en el carrito según el cambio (+1 o -1).
 *
 * PARAMETROS UTILIZADOS:
 * @param {number} id - ID del producto cuya cantidad será modificada.
 * @param {number} cambio - Valor de cambio: +1 para sumar, -1 para restar.
 */
function actualizarCantidad(id, cambio) {

    // Obtiene el carrito actual desde localStorage
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // se mapea el carrito actualizando la cantidad del producto con el ID indicado
    carrito = carrito.map(producto => {
        if (producto.id === id) {
            const nuevaCantidad = producto.cantidad + cambio;
            return { ...producto, cantidad: nuevaCantidad > 0 ? nuevaCantidad : 1 };
        }
        return producto;
    })

    // Guarda el carrito actualizado en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // se llama a la funcion de showCarrito para mostrar la vista del carrito con los cambios aplicados
    showCarrito();
}


