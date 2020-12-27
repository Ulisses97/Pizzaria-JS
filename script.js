const querySelector = (e) => {
  return document.querySelector(e);
} ;

pizzaJson.map( (item, index)=>{
  
  // Clonando meu HTML
  let pizzaItem = querySelector('.models .pizza-item').cloneNode(true);

  pizzaItem.querySelector('.pizza-item--img img').src = item.img

  pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
  pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

  // Preencher as informações em pizzaItem -> append pega o conteudo e add
  querySelector('.pizza-area').append(pizzaItem);

});