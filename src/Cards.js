/* eslint-disable linebreak-style */
function cards() {
  const elements = document.querySelector('.elements');
  for (let i = 0; i < 6; i += 1) {
    const div = document.createElement('div');
    elements.appendChild(div);
    div.className = ('cposter');
    div.innerHTML = `
    <div class="CardFrame"><img class="poster" src="/Francavilla_JurassicPark_SDCC_V.jpg" alt=""></div>
    <ul class="buttons">
      <li class="card" >Card1</li>
      <li><img class="like" src="/like.png" alt=""></li>
    </ul>
    <button class="comment">Comments</button>
   `;
  }
}

export default cards;
