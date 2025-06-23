const contenedorProductos = document.getElementById("contenedorProductos");
const detalle = document.getElementById("detalleProducto");
const barraNavegacion = document.querySelector("header.nav_tab");
let productosTotal = [];

async function cargarProductos() {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        const productos = await response.json();

        productosTotal = productos;
        mostrarProductos(productosTotal);
        mostrarCategorias();
    } catch (error) {
        console.error("Error al cargar los productos:", error);
        const mensaje = document.createElement("p");
        mensaje.textContent = "No se pudieron cargar los productos.";
        contenedorProductos.appendChild(mensaje);
    }
}

const button_filtro = document.getElementById("filtro_logo");
const menu_filtro = document.getElementById("menu_filtro");
const inputBusqueda = document.getElementById("search_input");

inputBusqueda.addEventListener("input", busquedas);
menu_filtro.addEventListener("change", busquedas);


button_filtro.addEventListener("click", () => {
    menu_filtro.classList.toggle("oculto");
});

function mostrarCategorias() {
    const unicaCategoria = [...new Set(productosTotal.map(producto => producto.category))];

    menu_filtro.replaceChildren();

    const opcionTodo = document.createElement("option");
    opcionTodo.value = "todas";
    opcionTodo.textContent = "Todas las categorías";
    menu_filtro.appendChild(opcionTodo);

    unicaCategoria.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        menu_filtro.appendChild(option);
    });
}

function busquedas() {
    const inputProducto = inputBusqueda.value.toLowerCase();
    const categoriaSeleccionada = menu_filtro.value;

    const filtrados = productosTotal.filter(producto => {
        const s_nombre = producto.title.toLowerCase().includes(inputProducto);
        const s_categoria = categoriaSeleccionada === "todas" || producto.category === categoriaSeleccionada;

        return s_nombre && s_categoria;
    });

    mostrarProductos(filtrados);
}


function mostrarProductos(productos) {
    contenedorProductos.replaceChildren();
    productos.forEach(producto => {
        const contenedorProducto = document.createElement("div");
        contenedorProducto.classList.add("producto");

        const img = document.createElement("img");
        img.setAttribute("src", producto.image);
        img.setAttribute("alt", producto.title);
        img.classList.add("imagen_producto")

        const nombre_producto = document.createElement("strong");
        nombre_producto.textContent = producto.title;

        const precio = document.createElement("span");
        precio.textContent = `$${producto.price}`;

        contenedorProducto.appendChild(img);
        contenedorProducto.appendChild(nombre_producto);
        contenedorProducto.appendChild(precio);

        contenedorProducto.addEventListener("click", () => detalleProducto(producto));

        contenedorProductos.appendChild(contenedorProducto);
    });
}

function detalleProducto(producto) {
    contenedorProductos.classList.add("oculto");
    detalle.classList.remove("oculto");
    barraNavegacion.style.display = "none";

    detalle.replaceChildren();

    const back_button = document.createElement("button");
    back_button.textContent = "Volver";
    back_button.classList.add("bubbles");
    back_button.addEventListener("click", volver)

    const contenedor_general = document.createElement("div")
    contenedor_general.classList.add("contenedor_general")

    const contenedorImagen = document.createElement("section")
    contenedorImagen.classList.add("contenedorImagen")

    const imgDetalle = document.createElement("img");
    imgDetalle.setAttribute("src", producto.image);
    imgDetalle.setAttribute("alt", producto.title);
    imgDetalle.classList.add("imagen_producto_detalle");

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

    const adquirir = document.createElement("button")
    adquirir.id = "button_agregar"
    adquirir.textContent = "Agregar al carrito";

    adquirir.addEventListener("click", () => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        const productoExistente = carrito.find(p => p.id === producto.id);

        if (productoExistente) {
            productoExistente.cantidad += 1;
        } else {
            carrito.push({
                id: producto.id,
                title: producto.title,
                price: producto.price,
                cantidad: 1
            });
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));

        adquirir.textContent = "Producto añadido";
        adquirir.disabled = true;
    });


    const span = document.createElement("span");
    span.classList.add("text");
    span.textContent = "Volver";
    back_button.appendChild(span);

    contenedorInfoProducto.appendChild(categoria);
    contenedorInfoProducto.appendChild(nombre_producto);
    contenedorInfoProducto.appendChild(precio);
    contenedorInfoProducto.appendChild(descripcion);
    contenedorInfoProducto.appendChild(stock);
    contenedorInfoProducto.appendChild(adquirir);
    contenedorImagen.appendChild(imgDetalle);
    contenedor_general.appendChild(contenedorInfoProducto);
    contenedor_general.appendChild(contenedorImagen);
    detalle.appendChild(back_button);
    detalle.appendChild(contenedor_general);

}

function volver() {
    detalle.classList.add("oculto");
    contenedorProductos.classList.remove("oculto");
    barraNavegacion.style.display = "flex";

}

cargarProductos();





const sectionCarrito = document.getElementById("carrito");
const iconoCarrito = document.getElementById("carrito_logo")

iconoCarrito.addEventListener("click", () => {
    contenedorProductos.classList.add("oculto");
    detalle.classList.add("oculto");
    sectionCarrito.classList.remove("oculto");
    barraNavegacion.style.display = "none";
    showCarrito();
});

function showCarrito() {
    sectionCarrito.replaceChildren();

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const cartContainer = document.createElement("section");
    cartContainer.classList.add("cart_container");

    const header = document.createElement("header");
    header.classList.add("header_cartPage");

    const btnVolver = document.createElement("button");
    btnVolver.textContent = "Volver";
    btnVolver.classList.add("bubbles");
    btnVolver.addEventListener("click", () => {
        sectionCarrito.classList.add("oculto");
        contenedorProductos.classList.remove("oculto");
        barraNavegacion.style.display = "flex";
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

    if (carrito.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "Tu carrito está vacío";
        cartContainer.appendChild(mensaje);
    } else {
        let total = 0;

        const items = document.createElement("div");
        items.classList.add("items_cart");

        const tus_items = document.createElement("span");
        tus_items.textContent = "Tus items"
        tus_items.classList.add("span_items")

        items.appendChild(tus_items);

        carrito.forEach(producto => {
            const item = document.createElement("div");
            item.classList.add("producto-carrito");

            const nombre = document.createElement("p");
            nombre.textContent = producto.title;

            const precioUnitario = document.createElement("span");
            precioUnitario.textContent = `Precio Unitario: $${producto.price}`;

            const cantidad = document.createElement("span");
            cantidad.textContent = `Cantidad: ${producto.cantidad}`;

            const btnSumar = document.createElement("img");
            btnSumar.setAttribute("src", "../icons/suma_logo.png");
            btnSumar.setAttribute("alt", "sumar cantidad");
            btnSumar.classList.add("buttonsSR");
            btnSumar.addEventListener("click", () => actualizarCantidad(producto.id, 1));

            const btnRestar = document.createElement("img");
            btnRestar.setAttribute("src", "../icons/resta_logo.png");
            btnRestar.setAttribute("alt", "restar cantidad");
            btnRestar.classList.add("buttonsSR");
            btnRestar.addEventListener("click", () => actualizarCantidad(producto.id, -1));

            const algorithmButtons = document.createElement("div");
            algorithmButtons.classList.add("algorithmButtons")

            item.appendChild(nombre);
            item.appendChild(precioUnitario);
            item.appendChild(cantidad);
            algorithmButtons.appendChild(btnSumar);
            algorithmButtons.appendChild(btnRestar);
            item.appendChild(algorithmButtons)
            items.appendChild(item)

            total += producto.price * producto.cantidad;
        });

        cartContainer.appendChild(items);

        const pago_container = document.createElement("section");
        pago_container.classList.add("pago_container");

        const totalCompra = document.createElement("h3");
        totalCompra.textContent = `Total: $${total.toFixed(2)}`;

        const btnPagar = document.createElement("button");
        btnPagar.textContent = "Pagar";
        btnPagar.classList.add("btn_pagar");

        pago_container.appendChild(totalCompra);
        pago_container.appendChild(btnPagar);
        cartContainer.appendChild(pago_container);

        const btnVaciar = document.createElement("button");
        btnVaciar.textContent = "Vaciar carrito";
        btnVaciar.classList.add("bubbles");
        btnVaciar.addEventListener("click", () => {
            localStorage.removeItem("carrito");
            showCarrito();
        });

        sectionCarrito.appendChild(btnVaciar);
    }
    sectionCarrito.appendChild(cartContainer);
}


function actualizarCantidad(id, cambio) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito = carrito.map(producto => {
        if (producto.id === id) {
            const nuevaCantidad = producto.cantidad + cambio;
            return { ...producto, cantidad: nuevaCantidad > 0 ? nuevaCantidad : 1 };
        }
        return producto;
    })

    localStorage.setItem("carrito", JSON.stringify(carrito));
    showCarrito();
}


