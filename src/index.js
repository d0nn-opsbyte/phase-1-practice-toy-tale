let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


 document.addEventListener('DOMContentLoaded', () => {
  const toyCollection = document.getElementById('toy-collection');
  const form = document.getElementById('add-toy-form');

  
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(toys => {
      toyCollection.innerHTML = ''; 
      toys.forEach(renderToyCard);
    });

  
  function renderToyCard(toy) {
    const card = document.createElement('div');
    card.className = 'card';

    const toyName = document.createElement('h2');
    toyName.textContent = toy.name;

    const toyImg = document.createElement('img');
    toyImg.src = toy.image;
    toyImg.className = 'toy-avatar';

    const toyLikes = document.createElement('p');
    toyLikes.textContent = `${toy.likes} Likes`;

    const likeBtn = document.createElement('button');
    likeBtn.textContent = 'Like ❤️';
    likeBtn.className = 'like-btn';
    likeBtn.id = toy.id;

    
    likeBtn.addEventListener('click', () => {
      const newLikes = toy.likes + 1;

      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({ likes: newLikes })
      })
        .then(response => response.json())
        .then(updatedToy => {
          toy.likes = updatedToy.likes;
          toyLikes.textContent = `${updatedToy.likes} Likes`;
        });
    });

    
    card.append(toyName, toyImg, toyLikes, likeBtn);
    toyCollection.appendChild(card);
  }

  
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const image = form.image.value.trim();

    if (!name || !image) return;

    const newToy = {
      name: name,
      image: image,
      likes: 0
    };

    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(newToy)
    })
      .then(response => response.json())
      .then(toy => {
        renderToyCard(toy); 
        form.reset();
      });
  });
}); 


