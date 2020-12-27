const querySelector = (e) => {
  return document.querySelector(e);
} ;

pizzaJson.map( (item, index)=>{
  
  // Clonando meu HTML
  let pizzaItem = querySelector('.models .pizza-item').cloneNode(true);

  // Preencher as informações em pizzaItem -> append pega o conteudo e add
  querySelector('.pizza-area').append(pizzaItem);

});