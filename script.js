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

  pizzaItem.querySelector('a').addEventListener('click', (e) => {
    e.preventDefault();

    // Pegar um atribulo e modificar pelo CSS

    // Abrindo o Modal
    querySelector('.pizzaWindowArea').style.opacity = '0';
    querySelector('.pizzaWindowArea').style.display = 'flex';
    setTimeout( () => {
      querySelector('.pizzaWindowArea').style.opacity = '1';
    }, 200);
    


  })

  // Preencher as informações em pizzaItem -> append pega o conteudo e add
  querySelector('.pizza-area').append(pizzaItem);

});