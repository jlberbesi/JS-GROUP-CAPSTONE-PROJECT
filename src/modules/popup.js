import imgX from '../delete.png';

const containerPopup = document.querySelector('.popup__container');

const closePopup = () => {
  const btnX = document.querySelector('.popup__btn_x');
  btnX.addEventListener('click', () => {
    containerPopup.innerHTML = '';
  });
};

const showComments = (items) => {
  const popupContent = `
    <div class="popup__background">  
      <div class="popup__body">
        <button class="popup__btn_x"><img class="img__x" src="${imgX}"></button>
        <div class="popup__img-container">
          ${items.image && items.image.original ? `<img class="popup__img" src="${items.image.original}">` : ''}
        </div>
        <div class="popup__details">
          <h2 class="popup__title">${items.name}</h2>
          <p class="popup__genres">Category: ${items.genres}</p>
          <p class="popup__runtime">Duration: ${items.runtime} min</p>
        </div>
      </div>
    </div>`;

  containerPopup.innerHTML = popupContent;
  closePopup();
};

export default showComments;
