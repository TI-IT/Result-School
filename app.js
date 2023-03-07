const modal = document.querySelector('#modal');
const content = document.querySelector('#content');
const backdrop = document.querySelector('#backdrop');
const progress = document.querySelector('#progress');
const form = document.querySelector('#form');

content.addEventListener('click', openCard);
backdrop.addEventListener('click', closeModal);
modal.addEventListener('change', toggleTech);
form.addEventListener('submit', createTech);

const APP_TITLE = document.title;
//
// setTimeout(() => {
//   modal.classList.remove('open');
// }, 2000);

function openCard(event) {
  const data = event.target.dataset;
  //find()-найти
  const tech = technologies.find((t) => t.type === data.type);

  if (!tech) return;
  poenModal(toModal(tech), tech.title);
}

function toModal(tech) {
  const checked = tech.done ? 'checked' : '';
  return `
     <h2>${tech.title}</h2>
      <p>
        ${tech.description}
      </p>
      <hr />
      <div>
        <input type="checkbox" id="done" ${checked} data-type = "${tech.type}"/>
        <label for="done">Выучил</label>
      </div>
  `;
}

function toggleTech(event) {
  const type = event.target.dataset.type;
  const tech = technologies.find((t) => t.type === type);
  tech.done = event.target.checked;
  init();
}

function poenModal(html, title = APP_TITLE) {
  document.title = `${title} | ${APP_TITLE}`;
  modal.innerHTML = html;
  modal.classList.add('open');
}

function closeModal() {
  document.title = APP_TITLE;
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
  renderCards();
  renderProgress();
}

function renderCards() {
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
function renderProgress() {
  const percent = computeProgressProcent();

  let backeground;
  if (percent <= 30) {
    backeground = '#e75a5a';
  } else if (percent > 30 && percent < 70) {
    backeground = '#f99415';
  } else {
    backeground = '#73ba3c';
  }

  progress.style.background = backeground;
  progress.style.width = `${percent}%`;
  progress.textContent = percent ? percent + '%' : '';
}

function computeProgressProcent() {
  // x -> 100%
  // 2 -> 5
  // x = (100 * 2) / 5
  if (technologies.length === 0) {
    return 0;
  }
  let doneCount = 0;
  for (let i = 0; i < technologies.length; i++) {
    if (technologies[i].done) doneCount++;
  }
  //Math.round() округляем в меншую сторону
  return Math.round((100 * doneCount) / technologies.length);
}
function toCard(tech) {
  const doneClass = tech.done ? 'done' : '';
  return `
<div class="card ${doneClass}" data-type="${tech.type}">
    <h3 data-type="${tech.type}">${tech.title}</h3>
</div>
`;
}

function isInvalid(title, description) {
  return !title.value || !description.value;
}
function createTech(event) {
  //отмена поведения перезагрузки страницы
  event.preventDefault();
  // const title = event.target.title;
  // const description = event.target.description;
  const { title, description } = event.target;

  if (isInvalid(title, description)) {
    if (!title.value) title.classList.add('invalid');
    if (!description.value) description.classList.add('invalid');
    setTimeout(() => {
      title.classList.remove('invalid');
      description.classList.remove('invalid');
    }, 2000);
    return;
  }
  const newTech = {
    title: title.value,
    description: description.value,
    done: false,
    type: title.value.toLowerCase(),
  };

  technologies.push(newTech);
  title.value = '';
  description.value = '';
  init();
}

init();
