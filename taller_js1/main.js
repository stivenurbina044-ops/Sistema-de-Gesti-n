// Productos disponibles
const productos = [
    { id: 1, nombre: "Manzanas", precio: 2050, categoria: "Frutas" },
    { id: 2, nombre: "Leche", precio: 3200, categoria: "Lácteos" },
    { id: 3, nombre: "Pan", precio: 1800, categoria: "Panadería" },
    { id: 4, nombre: "Queso", precio: 5000, categoria: "Lácteos" },
    { id: 5, nombre: "Tomates", precio: 2000, categoria: "Verduras" },
    { id: 6, nombre: "Huevos", precio: 4500, categoria: "Lácteos" },
    { id: 7, nombre: "Arroz", precio: 3000, categoria: "Granos" },
    { id: 8, nombre: "Aceite", precio: 6000, categoria: "Aceites" }
];

let carrito = [];

function mostrarProductos() {
    const contenedor = document.getElementById("productosLista");
    contenedor.innerHTML = "";

    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("producto-card");

        card.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>${producto.categoria}</p>
            <div class="producto-precio">$${producto.precio.toFixed(2)}</div>
            <button onclick="agregarAlCarrito(${producto.id})">
                Agregar
            </button>
        `;

        contenedor.appendChild(card);
    });
}

function agregarAlCarrito(idProducto) {
    const producto = productos.find(p => p.id === idProducto);

    const itemExistente = carrito.find(
        item => item.id === idProducto
    );

    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        });
    }

    actualizarCarrito();
}

function actualizarCarrito() {
    const carritoLista = document.getElementById("carritoLista");

    if (carrito.length === 0) {
        carritoLista.innerHTML = "<p>El carrito está vacío</p>";
        document.getElementById("totalPrecio").textContent = "0.00";
        document.getElementById("totalCantidad").textContent = "0";
        return;
    }

    carritoLista.innerHTML = "";

    carrito.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("carrito-item");

        div.innerHTML = `
            <div class="carrito-item-info">
                <strong>${item.nombre}</strong><br>
                Precio: $${item.precio.toFixed(2)}<br>
                Cantidad: ${item.cantidad}
            </div>

            <button onclick="eliminarDelCarrito(${item.id})">
                Eliminar
            </button>
        `;

        carritoLista.appendChild(div);
    });

    calcularTotales();
}

function calcularTotales() {
    const totalPrecio = carrito.reduce(
        (total, item) => total + (item.precio * item.cantidad),
        0
    );

    const totalCantidad = carrito.reduce(
        (total, item) => total + item.cantidad,
        0
    );

    document.getElementById("totalPrecio").textContent =
        totalPrecio.toFixed(2);

    document.getElementById("totalCantidad").textContent =
        totalCantidad;
}

function eliminarDelCarrito(idProducto) {
    carrito = carrito.filter(
        item => item.id !== idProducto
    );

    actualizarCarrito();
}

function limpiarCarrito() {
    carrito = [];
    actualizarCarrito();
}

document.addEventListener("DOMContentLoaded", () => {
    mostrarProductos();
    actualizarCarrito();

    document
        .getElementById("limpiarCarrito")
        .addEventListener("click", limpiarCarrito);
});
