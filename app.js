const modal = document.querySelector('#modal');
const content = document.querySelector('#content');
const backdrop = document.querySelector('#backdrop');
const progress = document.querySelector('#progress');

content.addEventListener('click', openCard);
backdrop.addEventListener('click', closeModal);
//
// setTimeout(() => {
//   modal.classList.remove('open');
// }, 2000);

function openCard() {
  modal.classList.add('open');
}
function closeModal() {
  modal.classList.remove('open');
  console.log(modal.classList.value);
}

const technologies = [
  {
    id: 1,
    title: 'HTML',
    description: 'Html text',
    type: 'html',
    done: true,
  },
  {
    id: 2,
    title: 'CSS',
    description: 'CSS text',
    type: 'css',
    done: false,
  },
  {
    id: 3,
    title: 'JS',
    description: 'JS text',
    type: 'js',
    done: false,
  },
  {
    id: 4,
    title: 'REACT',
    description: 'REACT text',
    type: 'react',
    done: false,
  },
];

function init() {
  if (technologies.length === 0) {
    content.innerHTML = '<p class="emty">Технологий пока нету, добавьте</p>';
  } else {
    // let html = '';
    // for (let i = 0; i < technologies.length; i++) {
    //   const tech = technologies[i];
    //   html += toCard(tech);
    // }
    // content.innerHTML = html;
    content.innerHTML = technologies.map(toCard).join('');
  }
}

function toCard(tech) {
  const doneClass = tech.done ? 'done' : '';
  return `
<div class="card ${doneClass}">
    <h3>${tech.title}</h3>
</div>
`;
}

init();
