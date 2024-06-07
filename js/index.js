let productos = []; //    Iniciamos un array vacio donde almacenaremos todos los productos que obtendremos de la API
let carrito = []; //    Iniciamos un array vacio donde almacenaremos los productos que el usuario agregue al carrito

const productosEl = document.querySelector('.productos ul');
const carritoEl = document.querySelector('.carrito ul');
const totalEl = document.querySelector('.carrito .total');
const finalizarCompraBtn = document.querySelector('.carrito .finalizar-compra');
const popupContentEl = document.querySelector('.popup-content');
const searchBtn = document.querySelector('#search-btn');
const searchInput = document.querySelector('#search-input');


// Iniciamos Api y traemos los datos falsos
fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => {
    productos = data;
    mostrarProductos(productos); // Mostrar todos los productos al inicio
  })
  .catch(error => console.error('Error fetching products:', error));

  searchInput.addEventListener('input', function() {
    const productName = searchInput.value.toLowerCase();
    const filteredProducts = productos.filter(producto => producto.title.toLowerCase().includes(productName));
    mostrarProductos(filteredProducts); // Mostrar solo los productos filtrados
  });

// Creamos una funcion para mostrar los productos
function mostrarProductos(productosAMostrar) {
  productosEl.innerHTML = ''; 

  productosAMostrar.forEach(producto => {
    const productoEl = document.createElement('li');
    productoEl.classList.add('producto');

    productoEl.innerHTML = `
      <img src="${producto.image}" alt="${producto.title}" width="200px">
      <h3>${producto.title}</h3>
      <span class="precio">$${producto.price}</span>
    `;

    const agregarCarritoBtn = document.createElement('button');
    agregarCarritoBtn.textContent = 'Agregar al carrito';
    agregarCarritoBtn.addEventListener('click', () => {
      agregarAlCarrito(producto);
    });
    productoEl.appendChild(agregarCarritoBtn);

    productosEl.appendChild(productoEl);
  });
}

function agregarAlCarrito(producto) {
  carrito.push(producto);
  updateCartCount();
  actualizarPopup();
}

function actualizarPopup() {
  // Limpiar el contenido actual
  popupContentEl.innerHTML = '';

  // Crear un elemento de título y establecer su texto en "Carrito de compras"
  const tituloEl = document.createElement('h2');
  tituloEl.textContent = 'Carrito de compras';
  tituloEl.style.textAlign = 'center'; // Centrar el texto

  // Agregar el título al contenido del popup
  popupContentEl.appendChild(tituloEl);

  const totalEl = document.createElement('p');
  totalEl.style.textAlign = 'center'; 
  totalEl.style.fontWeight = 'bold'; 

  // Agregar el elemento del precio total al contenido del popup
  popupContentEl.appendChild(totalEl);

  if (carrito.length === 0) {
    const emptyMessageEl = document.createElement('p');
    emptyMessageEl.textContent = 'No hay productos en el carrito';
    emptyMessageEl.style.textAlign = 'center'; // Centrar el texto
    emptyMessageEl.style.fontWeight = 'bold'; // Hacer el texto en negrita
    popupContentEl.appendChild(emptyMessageEl);
  } else {
    const total = carrito.reduce((total, producto) => total + producto.price, 0);

    // Mostrar el precio total en el elemento que creamos
    totalEl.textContent = `Total: $${total.toFixed(2)}`;

    carrito.forEach((producto, index) => {
      const productoEl = document.createElement('div');
      productoEl.classList.add('producto-popup');

      const productoInfoEl = document.createElement('div');
      productoInfoEl.classList.add('producto-info');

      const imgEl = document.createElement('img');
      imgEl.src = producto.image;
      imgEl.alt = producto.title;
      imgEl.width = 100; // puedes ajustar el tamaño de la imagen como quieras

      const tituloEl = document.createElement('p');
      tituloEl.textContent = producto.title;

      const eliminarBtn = document.createElement('button');
      eliminarBtn.textContent = 'Eliminar';
      eliminarBtn.addEventListener('click', () => {
        eliminarDelCarrito(index);
      });

      productoInfoEl.appendChild(imgEl);
      productoInfoEl.appendChild(tituloEl);
      productoEl.appendChild(productoInfoEl);
      productoEl.appendChild(eliminarBtn);

      popupContentEl.appendChild(productoEl);

      const procederPagoBtn = document.createElement('button');
      procederPagoBtn.textContent = 'Proceder al pago';
      procederPagoBtn.addEventListener('click', () => {
        procederPago();
      });
    
      popupContentEl.appendChild(procederPagoBtn);
    });
  }


}
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarPopup();
  updateCartCount();
}


finalizarCompraBtn.addEventListener('click', () => {

});

var popup = document.getElementById('popup');
var btn = document.getElementById("open-popup");
var span = document.getElementById("close-popup");

btn.onclick = function() {
  popup.style.display = "block";
}

span.onclick = function() {
  popup.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == popup) {
    popup.style.display = "none";
  }
}

btn.onclick = function() {
  actualizarPopup();
  popup.style.display = "block";
}

var dropdownLinks = document.querySelectorAll('.dropdown-content a');

dropdownLinks.forEach(function(link) {

  link.addEventListener('click', function(event) {
    event.preventDefault();

    var category = this.getAttribute('data-category');

    filterProducts(category);
  });
});

function filterProducts(category) {
  const filteredProducts = productos.filter(producto => producto.category.toLowerCase() === category.toLowerCase());
  mostrarProductos(filteredProducts); 
}
function updateCartCount() {
  const cartCountElement = document.getElementById('cart-count');
  cartCountElement.textContent = carrito.length;
}

function procederPago() {
  // Limpiar el contenido actual
  popupContentEl.innerHTML = '';

  // Crear un elemento de título y establecer su texto en "Página de facturación"
  const tituloEl = document.createElement('h2');
  tituloEl.textContent = 'Página de facturación';
  tituloEl.style.textAlign = 'center'; // Centrar el texto
  tituloEl.style.marginBottom = '20px'; // Agregar espacio debajo del título
  popupContentEl.appendChild(tituloEl);

  // Crear campos de entrada para la dirección de facturación
  const direccionEl = document.createElement('input');
  direccionEl.placeholder = 'Dirección de facturación';
  direccionEl.style.display = 'block'; // Hacer que el elemento se muestre en una nueva línea
  direccionEl.style.margin = '10px auto'; // Centrar el elemento y agregar espacio debajo
  popupContentEl.appendChild(direccionEl);

  // Crear campos de entrada para los detalles de la tarjeta de crédito
  const tarjetaEl = document.createElement('input');
  tarjetaEl.placeholder = 'Número de tarjeta de crédito';
  tarjetaEl.style.display = 'block'; // Hacer que el elemento se muestre en una nueva línea
  tarjetaEl.style.margin = '10px auto'; // Centrar el elemento y agregar espacio debajo
  popupContentEl.appendChild(tarjetaEl);

  const fechaEl = document.createElement('input');
  fechaEl.placeholder = 'Fecha de vencimiento (MM/AA)';
  fechaEl.style.display = 'block'; // Hacer que el elemento se muestre en una nueva línea
  fechaEl.style.margin = '10px auto'; // Centrar el elemento y agregar espacio debajo
  popupContentEl.appendChild(fechaEl);

  const cvvEl = document.createElement('input');
  cvvEl.placeholder = 'CVV';
  cvvEl.style.display = 'block'; // Hacer que el elemento se muestre en una nueva línea
  cvvEl.style.margin = '10px auto'; // Centrar el elemento y agregar espacio debajo
  popupContentEl.appendChild(cvvEl);

  // Crear un botón para enviar el pago
  const pagarBtn = document.createElement('button');
  pagarBtn.textContent = 'Pagar ahora';
  pagarBtn.style.display = 'block'; // Hacer que el elemento se muestre en una nueva línea
  pagarBtn.style.margin = '10px auto'; // Centrar el elemento y agregar espacio debajo
  pagarBtn.addEventListener('click', () => {
    // Aquí puedes agregar la lógica para procesar el pago
  });
  popupContentEl.appendChild(pagarBtn);

  // Crear un botón para volver al carrito
  const volverBtn = document.createElement('button');
  volverBtn.textContent = 'Volver al carrito';
  volverBtn.style.display = 'block'; // Hacer que el elemento se muestre en una nueva línea
  volverBtn.style.margin = '10px auto'; // Centrar el elemento y agregar espacio debajo
  volverBtn.addEventListener('click', () => {
    actualizarPopup();
  });
  popupContentEl.appendChild(volverBtn);
}