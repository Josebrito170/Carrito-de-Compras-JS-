const ClickButton = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')
let carrito = []

ClickButton.forEach(btn => {
    btn.addEventListener('click', addToCarritoItem)
})

function addToCarritoItem(e){
    //e.target para disparar un evento
    const button = e.target
    //closest para seleccionar el div padre del boton o elemento
    const item = button.closest('.card')
    //textContent porque queremos obtener el contenido
    const itemTitle = item.querySelector('.card-title').textContent;
    const itemPrice = item.querySelector('.precio').textContent;
    const itemImg = item.querySelector('.card-img-top').src;

    const newCarrito = {
        title: itemTitle,
        price: itemPrice,
        img: itemImg,
        cantidad: 1
    }

    addItemCarrito(newCarrito)
}

function addItemCarrito(newCarrito){

    const alert = document.querySelector('.alert')
    setTimeout( function(){
        alert.classList.add('hide')
    }, 2000)

    alert.classList.remove('hide')

    const inputElemento = tbody.getElementsByClassName('input__elemento')
    for (let i = 0; i < carrito.length; i++) {
        if(carrito[i].title.trim() === newCarrito.title.trim()){
            carrito[i].cantidad ++;
            const inputValue = inputElemento[i].value
            inputElemento.value++;
            carritoTotal()
            return null;
        }
        
    }

    carrito.push(newCarrito)
    renderCarrito()
}

function renderCarrito(){
    tbody.innerHTML = ''
    carrito.map(item => {
        const tr = document.createElement('tr')
        tr.classList.add('itemCarrito')
        const content = `
        <th scope="row">1</th>
                  <td class="table__productos">
                    <img src=${item.img} alt="">
                    <h6 class="title text-light">${item.title}</h6>
                  </td>
                  <td class="table__price text-light"><p>${item.price}</p>
                  </td>
                  <td class="table__cantidad">
                    <input type="number" min="1" value=${item.cantidad} class="input__elemento">
                    <button class="delete btn btn-danger">x</button>
                  </td>
        ` 
        tr.innerHTML = content;
        tbody.append(tr)

        tr.querySelector(".delete").addEventListener('click', borrarItemCarrito)
        tr.querySelector(".input__elemento").addEventListener('change', sumalaCantidad)
    })
    carritoTotal()
}

function carritoTotal(){
    let total = 0;
    const itemCartTotal = document.querySelector('.itemCartTotal')
    //forEach para que recorra todos los items del carrito y asi obtener el resultado
    carrito.forEach((item) => {
        const precio = Number(item.price.replace('$', ''))
        total = total + precio*item.cantidad
    })

    itemCartTotal.innerHTML =  `total $${total}`
    addlocalStorage()
}

function borrarItemCarrito(e){
    
    const deleteButton = e.target
    const tr = deleteButton.closest(".itemCarrito")
    const title = tr.querySelector('.title').textContent;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].title.trim() === title.trim()) {
            //splice para cambiar el contenido del array elimiando elementos existentes
            carrito.splice(i, 1)
        }
        
    }

    const alert = document.querySelector('.remove')
    setTimeout( function(){
        alert.classList.add('remove')
    }, 2000)

    alert.classList.remove('remove')

    tr.remove()
    carritoTotal()
}

function sumalaCantidad(){
    const sumaInput = e.target
    const tr = sumaInput.closest(".itemCarrito")
    const title = tr.querySelector('.title').textContent
    carrito.forEach(item => {
        if(item.title.trim() === title.trim()){
            sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
            item.cantidad = sumaInput.value;
            carritoTotal()
        }
        })
}

function addlocalStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function(){
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if(storage){
        carrito = storage;
        renderCarrito()
    }
}