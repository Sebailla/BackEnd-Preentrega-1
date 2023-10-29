// Establecemos conección con e server websocket
const socket = io()

socket.on('connection', () => {
  console.log('Cliente conectado')
})

socket.on('disconnect', () => {
  console.log('Cliente sin conección')
})

// Cargamos lod productos a la tabla
socket.on('getProducts', (dataProducts) => {

  console.table(dataProducts)

  const tbody = document.querySelector('.productsTable tbody')

  tbody.innerHTML = ''

  dataProducts.forEach(p => {

    const row = document.createElement('tr')
    row.innerHTML =
      `
      <td><img src="${p.thumbnail}" alt="${p.title}" width="50" height="100"></td>
      <td>${p.title}</td>
      <td>${p.description}</td>
      <td> $ ${p.price}</td>
      <td>${p.stock}</td>
      <td>
      <button class="btnDeleteProduct" data-id="${p.id}">Delete</button>
      </td>
      `
    tbody.appendChild(row)

    //Boton delete product
    const btnDeleteProduct = row.querySelector('.btnDeleteProduct')
    btnDeleteProduct.addEventListener('click', () => {
      const productId = btnDeleteProduct.dataset.id
      socket.emit('getProducts', productId)
    })
  })

  // Metodo post

  document.querySelector('.btnAddProduct').onclick = () => {
    // Acceder a los valores de los campos
    let titulo = document.getElementById("title").value;
    let descripcion = document.getElementById("description").value;
    let precio = document.getElementById("price").value;
    let imagen = document.getElementById("thumbnail").value;
    let codigo = document.getElementById("code").value;
    let stock = document.getElementById("stock").value;
    let categoria = document.getElementById("category").value;

    // Crear un objeto con los valores
    let saveDatos = {titulo, descripcion,precio,imagen,codigo,stock,categoria}

    console.log(saveDatos)
    const dataJson = JSON.parse(saveDatos)

    socket.emit('postProducts', dataJson);
  }
})

