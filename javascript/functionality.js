const contenedorProductos = document.getElementById("contenedorProductos");
const detalle = document.getElementById("detalleProducto");

async function cargarProductos() {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        const productos = await response.json();

        mostrarProductos(productos);
    } catch (error) {
        console.error("Error al cargar los productos:", error);
        const mensaje = document.createElement("p");
        mensaje.textContent = "No se pudieron cargar los productos.";
        contenedorProductos.appendChild(mensaje);
    }
}

function mostrarProductos(productos) {
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
    contenedorProductos.style.display = "none";
    detalle.style.display = "block";

    detalle.replaceChildren();

    const back_button = document.createElement("button");
    back_button.textContent = "Volver";
    back_button.classList.add("bubbles");
    back_button.addEventListener("click", volver)

    const contenedor_general = document.createElement("div")

    const contenedorImagen = document.createElement("section")
    
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
    adquirir.textContent = "Agregar al carrito";
    
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
    detalle.style.display = "none";
    contenedorProductos.style.display = "block";
}

cargarProductos();