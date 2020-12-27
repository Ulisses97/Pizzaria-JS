const querySelector = (e) => {
  return document.querySelector(e);
} ;

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

    querySelector('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
    querySelector('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
    querySelector('.pizzaBig img').src = pizzaJson[key].img;
    querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;


    // Pegar um atribulo e modificar pelo CSS
    // Animação de abrir o Modal
    querySelector('.pizzaWindowArea').style.opacity = '0';
    querySelector('.pizzaWindowArea').style.display = 'flex';
    setTimeout( () => {
      querySelector('.pizzaWindowArea').style.opacity = '1';
    }, 200);
    


  })

  // Preencher as informações em pizzaItem -> append pega o conteudo e add
  querySelector('.pizza-area').append(pizzaItem);

});