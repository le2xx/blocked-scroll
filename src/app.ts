import './main.scss';
import './index.html';

const arr = Array.from({ length: 150 }, (v, k) =>  k * 50 );
let openModal: boolean;
let htmlScrollTop: string = '0';

const createNode = (value: number) => {
  const node = document.createElement('div');
  node.className = 'row'
  node.innerHTML = `<div class="line"></div>
                        <span class="text">${value}</span>
                    <div class="line"></div>`;
  return node;
};

window.onload = () => {
  const html = document.querySelector('html');
  const body = document.querySelector('body');
  const app = document.querySelector('.app');
  const modal = document.querySelector('.modal');
  const toggle = document.querySelector('.toggle');
  const indicator = document.querySelector('.indicator');

  const nodesApp = arr.map((item) => createNode(item));
  const nodesModal = arr.map((item) => createNode(item));

  app.append(...nodesApp);
  modal.querySelector('.items').append(...nodesModal);

  const debounce = (f, ms) => {
    let isCooldown = false;

    return function() {
      if (isCooldown) return;

      f.apply(this, arguments);
      isCooldown = true;

      setTimeout(() => isCooldown = false, ms);
    };
  }

  const toggleFunc = (e) => {
    openModal = !openModal;
    openModal ? modal.classList.add('opened') : modal.classList.remove('opened');
    openModal ? body.classList.add('fixed') : body.classList.remove('fixed');
    openModal ? toggle.textContent = 'Close modal' : toggle.textContent = 'Open modal';
  };

  const setIndicator = (e) => {
    const nodes = indicator.querySelectorAll('.label');
    if (e.target.scrollTop) {
      nodes[1].querySelector('span').textContent = e.target.scrollTop || 0;
      // console.log('modal', e);
    } else if (e.target.scrollingElement) {
      if (!openModal) {
        htmlScrollTop = e.target.scrollingElement.scrollTop;
      } else {
        e.target.scrollingElement.scrollTop = htmlScrollTop;
      }
      nodes[0].querySelector('span').textContent = htmlScrollTop;
      // console.log('html', e);
    }
  }

  toggle.addEventListener('click', toggleFunc);

  window.addEventListener('scroll', debounce(setIndicator, 50), false);

  modal.querySelector('.scroll')
      .addEventListener('scroll', debounce(setIndicator, 50), false);
}