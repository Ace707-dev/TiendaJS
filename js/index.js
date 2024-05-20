let productos = []; //    Iniciamos un array vacio donde almacenaremos todos los productos que obtendremos de la API
let carrito = []; //    Iniciamos un array vacio donde almacenaremos los productos que el usuario agregue al carrito

const productosEl = document.querySelector('.productos ul');
const carritoEl = document.querySelector('.carrito ul');
const totalEl = document.querySelector('.carrito .total');
const finalizarCompraBtn = document.querySelector('.carrito .finalizar-compra');

// Iniciamos Api y traemos los datos falsos
fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => {
    productos = data;
    mostrarProductos();
  })
  .catch(error => console.error('Error fetching products:', error));

// Creamos una funcion para mostrar los productos
function mostrarProductos() {
  productosEl.innerHTML = ''; 

  productos.forEach(producto => {
    const productoEl = document.createElement('li');
    productoEl.classList.add('producto');

    const imgEl = document.createElement('img');
    imgEl.src = producto.image;
    imgEl.alt = producto.title;
    productoEl.appendChild(imgEl);

    const nombreEl = document.createElement('h3');
    nombreEl.textContent = producto.title;
    productoEl.appendChild(nombreEl);

    const precioEl = document.createElement('span');
    precioEl.classList.add('precio');
    precioEl.textContent = `$${producto.price}`;
    productoEl.appendChild(precioEl);

    const agregarCarritoBtn = document.createElement('button');
    agregarCarritoBtn.textContent = 'Agregar al carrito';
    agregarCarritoBtn.addEventListener('click', () => {
      agregarAlCarrito(producto);
    });
    productoEl.appendChild(agregarCarritoBtn);

    productoEl.innerHTML = `
      <img src="${producto.image}" alt="${producto.title} width="200px">
      <h3>${producto.title}</h3>
      <span class="precio">$${producto.price}</span>
      <button class="agregar-carrito">Agregar al carrito</button>
    `;

    productosEl.appendChild(productoEl);
  });
}


function agregarAlCarrito(producto) {
    carrito.push(producto);
    actualizarCarrito();
}




finalizarCompraBtn.addEventListener('click', () => {

});
