let modalQt = 1;

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
    modalQt = 1;
    e.preventDefault();
    let key = e.target.closest('.pizza-item').getAttribute('data-key');

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