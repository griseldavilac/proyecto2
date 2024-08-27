// Array de productos - Aquí es donde guardamos todos los productos de la tienda
const productos = [
  {
    nombre: 'Camiseta',
    categoria: 'ropa',
    precio: 20,
    imagen: 'images/camiseta.jpg'
  },
  {
    nombre: 'Pantalones',
    categoria: 'ropa',
    precio: 30,
    imagen: 'images/pantalones.jpg'
  },
  {
    nombre: 'Chaqueta',
    categoria: 'ropa',
    precio: 50,
    imagen: 'images/chaqueta.jpg'
  },
  {
    nombre: 'Zapatos',
    categoria: 'ropa',
    precio: 40,
    imagen: 'images/zapatos.jpg'
  },
  {
    nombre: 'Teléfono',
    categoria: 'electronica',
    precio: 200,
    imagen: 'images/telefono.jpg'
  },
  {
    nombre: 'Televisor',
    categoria: 'electronica',
    precio: 400,
    imagen: 'images/televisor.jpg'
  },
  {
    nombre: 'Auriculares',
    categoria: 'electronica',
    precio: 80,
    imagen: 'images/auriculares.jpg'
  },
  {
    nombre: 'Laptop',
    categoria: 'electronica',
    precio: 800,
    imagen: 'images/laptop.jpg'
  },
  {
    nombre: 'Reloj',
    categoria: 'accesorios',
    precio: 150,
    imagen: 'images/reloj.jpg'
  },
  {
    nombre: 'Gorra',
    categoria: 'accesorios',
    precio: 25,
    imagen: 'images/gorra.jpg'
  },
  {
    nombre: 'Bolso',
    categoria: 'accesorios',
    precio: 60,
    imagen: 'images/bolso.jpg'
  },
  {
    nombre: 'Gafas de sol',
    categoria: 'accesorios',
    precio: 70,
    imagen: 'images/gafas.jpg'
  }
]

// Función para crear el modal dinámicamente
function crearModalFiltros() {
  const modalHTML = `
    <div id="modal-filtros" class="modal">
      <div class="modal-content">
        <span id="cerrarModal" class="close">&times;</span>
        <form id="formulario-filtros">
          <label for="categoria">Categoría:</label>
          <select id="categoria">
            <option value="">Seleccionar</option>
            <option value="ropa">Ropa</option>
            <option value="electronica">Electrónica</option>
            <option value="accesorios">Accesorios</option>
          </select>
          <br />
          <label for="precio">Precio máximo:</label>
          <input type="text" id="precio" placeholder="Ej: 100" />
          <button type="button" id="aplicarFiltros" class="boton-estilo">
            Aplicar Filtros
          </button>
          <button type="button" id="limpiarFiltros" class="boton-estilo">
            Limpiar Filtros
          </button>
        </form>
      </div>
    </div>
  `
  document.body.insertAdjacentHTML('beforeend', modalHTML)

  // Asignar el evento de cierre al botón "X"
  document.getElementById('cerrarModal').addEventListener('click', cerrarModal)
}

// Función para crear los demás modales de mensajes de error y "no stock"
function crearModalesMensajes() {
  const modalesMensajesHTML = `
    <div id="modal-error-precio" class="modal">
      <div class="modal-content">
        <span id="cerrarModalErrorPrecio" class="close">&times;</span>
        <p>Error, en Precio máximo, solo están permitidos números.</p>
      </div>
    </div>
  `
  document.body.insertAdjacentHTML('beforeend', modalesMensajesHTML)

  // Asignar eventos de cierre a los modales de error
  document
    .getElementById('cerrarModalErrorPrecio')
    .addEventListener('click', function () {
      document.getElementById('modal-error-precio').style.display = 'none'
    })
}

// Función para pintar los productos en la página principal
function pintarProductos(
  filtrados = productos,
  mostrarPrecio = false,
  esSugerencia = false
) {
  const contenedorProductos = document.getElementById('productos-container')
  contenedorProductos.innerHTML = '' // Limpiamos el contenedor para que los productos se puedan pintar nuevamente

  // Si es una sugerencia, mostramos un título especial
  if (esSugerencia) {
    const tituloSugerencia = document.createElement('h2')
    tituloSugerencia.textContent = 'Productos Sugeridos'
    tituloSugerencia.classList.add('titulo-sugerencia')
    contenedorProductos.appendChild(tituloSugerencia)
  }

  // Creamos la tabla donde se mostrarán los productos
  const tablaProductos = document.createElement('table')
  tablaProductos.classList.add('tabla-productos')

  let filaProducto

  // Recorremos los productos filtrados y creamos una fila para cada 6 productos
  filtrados.forEach((prod, index) => {
    if (index % 6 === 0) {
      filaProducto = document.createElement('tr')
      filaProducto.className = 'fila-producto'
      tablaProductos.appendChild(filaProducto)
    }

    // Creamos una celda para cada producto con su imagen y nombre
    const celdaProducto = document.createElement('td')
    celdaProducto.className = 'celda-producto'

    // Si estamos mostrando los precios (por ejemplo, después de filtrar), los incluimos
    celdaProducto.innerHTML = `
        <img src="${prod.imagen}" alt="${prod.nombre}" class="imagen-producto">
        <h3>${prod.nombre}</h3>
        ${mostrarPrecio ? `<p>Precio: $${prod.precio}</p>` : ''}
      `

    filaProducto.appendChild(celdaProducto)
  })

  // Añadimos la tabla completa al contenedor de productos en el DOM
  contenedorProductos.appendChild(tablaProductos)

  // Si se aplicaron filtros o se están mostrando sugerencias, añadimos el botón "Volver"
  if (mostrarPrecio || esSugerencia) {
    const btnVolver = document.createElement('button')
    btnVolver.textContent = 'Volver'
    btnVolver.className = 'boton-estilo volver-btn' // Reutilizamos los estilos CSS
    btnVolver.onclick = function () {
      pintarProductos() // Al hacer clic, volvemos a mostrar todos los productos
    }
    contenedorProductos.appendChild(btnVolver)
  }
}

// Función para aplicar los filtros seleccionados por el usuario
function aplicarFiltros() {
  const categoriaSeleccionada = document.getElementById('categoria').value // Obtenemos la categoría seleccionada
  const precioMaximo = document.getElementById('precio').value.trim() // Obtenemos el precio máximo y quitamos espacios

  // Validación: si el campo de precio contiene letras o caracteres no válidos, mostramos un error
  if (precioMaximo !== '' && !/^\d+$/.test(precioMaximo)) {
    mostrarModalErrorPrecio() // Llamamos a la función para mostrar el error de precio
    return // Salimos de la función si no se cumple la validación
  }

  // Filtramos los productos según los filtros aplicados por el usuario
  const productosFiltrados = productos.filter((producto) => {
    const coincideCategoria = categoriaSeleccionada
      ? producto.categoria === categoriaSeleccionada
      : true
    const coincidePrecio = precioMaximo
      ? producto.precio <= parseFloat(precioMaximo)
      : true
    return coincideCategoria && coincidePrecio
  })

  // Si no se encontraron productos, mostramos sugerencias
  if (productosFiltrados.length === 0) {
    const productosSugeridos = sugerirProductos(
      categoriaSeleccionada,
      precioMaximo
    )
    pintarProductos(productosSugeridos, true, true) // Mostramos los productos sugeridos
  } else {
    pintarProductos(productosFiltrados, true) // Mostramos los productos filtrados
  }

  cerrarModal() // Cerramos el modal después de aplicar los filtros
}

// Función para sugerir productos cercanos al precio ingresado o de la misma categoría
function sugerirProductos(categoria, precioMaximo) {
  let productosSugeridos = productos.filter((producto) => {
    if (categoria) {
      return producto.categoria === categoria
    }
    return producto.precio > parseFloat(precioMaximo)
  })

  // Si no hay suficientes productos en la categoría o con precio mayor, tomamos algunos aleatorios
  if (productosSugeridos.length < 3) {
    productosSugeridos = productos
      .sort(() => 0.5 - Math.random()) // Barajamos aleatoriamente
      .slice(0, 3) // Seleccionamos los primeros 3
  } else {
    productosSugeridos = productosSugeridos.slice(0, 3) // Tomamos los primeros 3 de la lista
  }

  return productosSugeridos
}

// Función para cerrar el modal de filtros
function cerrarModal() {
  const modal = document.getElementById('modal-filtros')
  modal.style.display = 'none' // Simplemente ocultamos el modal
}

// Función para limpiar los filtros y volver a mostrar todos los productos
function limpiarFiltros() {
  document.getElementById('categoria').value = ''
  document.getElementById('precio').value = ''
  pintarProductos() // Volvemos a mostrar todos los productos
}

// Función para mostrar el modal de error si el precio es incorrecto
function mostrarModalErrorPrecio() {
  const modalErrorPrecio = document.getElementById('modal-error-precio')
  modalErrorPrecio.style.display = 'block' // Mostramos el modal de error
}

// Lógica para mostrar y ocultar el modal de filtros al hacer clic en "Filtrar"
function inicializarInterfaz() {
  crearModalFiltros()
  crearModalesMensajes()

  const modal = document.getElementById('modal-filtros')
  const btnMostrarModal = document.getElementById('mostrarModal')

  btnMostrarModal.onclick = function () {
    modal.style.display = 'block' // Mostramos el modal al hacer clic en "Filtrar"
  }

  // Cerrar el modal si el usuario hace clic fuera de él
  window.onclick = function (evento) {
    if (evento.target === modal) {
      cerrarModal() // Cerramos el modal si se hace clic fuera de él
    }
  }

  document
    .getElementById('aplicarFiltros')
    .addEventListener('click', aplicarFiltros)
  document
    .getElementById('limpiarFiltros')
    .addEventListener('click', limpiarFiltros)

  pintarProductos() // Pintamos todos los productos inicialmente al cargar la página
}

// Inicializamos la interfaz al cargar la página
document.addEventListener('DOMContentLoaded', inicializarInterfaz)
