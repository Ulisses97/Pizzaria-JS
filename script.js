let cart = [];
let modalQt = 1;
let modalKey = 0;


const querySelector = (e) => {
  return document.querySelector(e);
};

pizzaJson.map( (item, index)=>{
  
  // Clonando meu HTML
  let pizzaItem = querySelector('.models .pizza-item').cloneNode(true);

  // Qual pizza está no modal?
  pizzaItem.setAttribute('data-key', index);

  pizzaItem.querySelector('.pizza-item--img img').src = item.img
  pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
  pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

  // Evento de click para Abrir Modar
  pizzaItem.querySelector('a').addEventListener('click', (e) => {
    e.preventDefault();
    let key = e.target.closest('.pizza-item').getAttribute('data-key');
    modalQt = 1;
    modalKey = key;

    // Descrição no modal
    querySelector('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
    querySelector('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
    querySelector('.pizzaBig img').src = pizzaJson[key].img;
    querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;

    // deselecionado
    document.querySelector('.pizzaInfo--size.selected').classList.remove('selected');

    document.querySelectorAll('.pizzaInfo--size').forEach( (size, sizeIndex) => {

      if(sizeIndex == 2){
        size.classList.add('selected')
      }
      size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
    });


    // Quantidade
    querySelector('.pizzaInfo--qt').innerHTML = modalQt;


    // Pegar um atribulo e modificar pelo CSS
    // Animação de abrir o Modal
    querySelector('.pizzaWindowArea').style.opacity = '0';
    querySelector('.pizzaWindowArea').style.display = 'flex';
    setTimeout( () => {querySelector('.pizzaWindowArea').style.opacity = '1'}, 200) });

 


  // Preencher as informações em pizzaItem -> append pega o conteudo e add
  querySelector('.pizza-area').append(pizzaItem);

});

//Eventos do Modal
function closeModal(){
  querySelector('.pizzaWindowArea').style.opacity = '0';
  setTimeout( () => {
    querySelector('.pizzaWindowArea').style.display = 'none';
  }, 500);
}


// Botoes de quantidade - - - - - - -  - - -  - - -  - - -*
document.querySelector('.pizzaInfo--qtmais').addEventListener('click', (event) => {
  querySelector('.pizzaInfo--qt').innerHTML = modalQt +=1;
});
document.querySelector('.pizzaInfo--qtmenos').addEventListener('click', (event) => {
  if(modalQt > 1 ) querySelector('.pizzaInfo--qt').innerHTML = modalQt -=1;
});

document.querySelectorAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach( (item) => {
  item.addEventListener('click', closeModal)
} )

// Botoes de peso - - - - - - -  - - -  - - -  - - -*
document.querySelectorAll('.pizzaInfo--size').forEach( (size, sizeIndex) => {
  size.addEventListener('click', (e) => {
   document.querySelector('.pizzaInfo--size.selected').classList.remove('selected');
   size.classList.add('selected')
  })
});

// -- Adicionar ao carrinho
document.querySelector('.pizzaInfo--addButton').addEventListener('click', (e) =>{

  // Qual a pizza?
  console.log("pizza: "+ modalKey);

  // Qual o tamanho?
  let size = parseInt(document.querySelector('.pizzaInfo--size.selected').getAttribute('data-key'));
  console.log("tamanho: "+ size);

  // Quantas pizzas adicionadas?
  console.log("quantidade: "+ modalQt);

  // Adicionar ao carrinho

  let identifier = pizzaJson[modalKey].id+'@'+size;

  let key = cart.findIndex( (item) => {
    return item.identifier == identifier;
  });

  if(key > -1){
    cart[key].qt += modalQt;
  }else{
    cart.push({
      identifier,
      id:pizzaJson[modalKey].id,
      size:size,
      qt:modalQt
    })
  }
  
  //console.log(cart)
  updateCart();
  closeModal();

});

document.querySelector('.menu-openner').addEventListener('click', () =>{
  if(cart.length > 0) document.querySelector('aside').style.left = 0;
});

document.querySelector('.menu-closer').addEventListener('click', () =>{
  document.querySelector('aside').style.left = '100vw';
  
});

function updateCart(){

  document.querySelector('.menu-openner').innerHTML = cart.length;

  if(cart.length > 0){
    document.querySelector('aside').classList.add('show');

    // Monetarios
    let subtotal = 0, desconto = 0, total = 0;
    // End Monetarios


    // Limpar a lista de carrinho para não duplicar.
    document.querySelector('.cart').innerHTML = '';
    for(let i in cart){

      // Pegar o item
      let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);
      
      subtotal += pizzaItem.price * cart[i].qt;

      // Pegar o cart item
      let cartItem = document.querySelector('.models .cart--item').cloneNode(true);

      // Colocar as info (nome, Img, Quantidade...)

      // -Resolvendo tamanho da pizza juntamente com seu nome
      console.log(cart[i])
      let pizzaSizeName;
      switch(cart[i].size){
        case 0:
          pizzaSizeName = 'Pequena';
          break;
        case 1:
            pizzaSizeName = 'Média';
            break;   
        case 2:
            pizzaSizeName = 'Grande';
            break;                   
      }
      // -End


      let pizzaName = `${pizzaItem.name} (${pizzaSizeName})` 

      cartItem.querySelector('img').src = pizzaItem.img
      cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
      cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
      
      cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', (e) => {
        if(cart[i].qt > 1){
          cart[i].qt--;
        }else{
          cart.splice(i, 1)
        }
        updateCart();
      })
      cartItem.querySelector('.cart--item-qtmais').addEventListener('click', (e) => {
        cart[i].qt++;
        updateCart();
      })



      // Exibir na tela
      document.querySelector('.cart').append(cartItem);
    }

    desconto = subtotal * 0.1;
    total = subtotal - desconto;

    document.querySelector('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`; 
    document.querySelector('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`; 
    document.querySelector('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`; 



  }else{
    document.querySelector('aside').classList.remove('show');
    document.querySelector('aside').style.left = '100vw';

  }
}