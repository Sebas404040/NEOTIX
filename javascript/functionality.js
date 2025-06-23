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

button_filtro.addEventListener("click", () => {
    menu_filtro.classList.toggle("oculto");
});

function mostrarCategorias(){
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

menu_filtro.addEventListener("change", () => {
    const categoria = menu_filtro.value;

    if (categoria === "todas") {
        mostrarProductos(productosTotal);
    } else {
        const filtrados = productosTotal.filter(producto => producto.category === categoria);
        mostrarProductos(filtrados);
    }
});


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

const inputBusqueda = document.getElementById("search_input");

inputBusqueda.addEventListener("input", () => {
    const entrada = inputBusqueda.value.toLowerCase();

    const filtrados = productosTotal.filter(producto =>
        producto.category.toLowerCase().includes(entrada)
    );
    mostrarProductos(filtrados);
})

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