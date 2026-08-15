const KEY = 'lifeos-v1';

const base = {
  tasks: [
    ['Courseware IT lesson', '45 min • phone-ready'],
    ['Web development practice', '45 min • phone-ready'],
    ['Cybersecurity foundation', '30 min • phone-ready'],
    ['Project Management', '30 min • phone-ready'],
    ['Workout', '45 min • track your session'],
    ['Photography / editing', '30 min • portfolio work'],
    ['Income activity', '30 min • outreach or offer']
  ],

  areas: [
    ['💻', 'IT & Cybersecurity', 42],
    ['🌐', 'Website Development', 20],
    ['📋', 'Project Management', 15],
    ['📚', 'Studies', 35],
    ['📸', 'Photography', 55],
    ['🎬', 'Video Editing', 30],
    ['💪', 'Fitness', 64],
    ['💰', 'Income', 18]
  ],

  revenue: 0,
  expenses: 0,
  usd: 0,
  weight: 68,

  done: {}
};

let s = JSON.parse(localStorage.getItem(KEY) || 'null') || {
  ...base,
  done: {}
};


function save() {
  localStorage.setItem(KEY, JSON.stringify(s));
}


function money(n) {
  return 'GH₵' + Number(n).toLocaleString();
}


/* =========================
   ELEMENTS
========================= */

const overallEl = document.getElementById('overall');
const bar = document.getElementById('overallBar');
const summary = document.getElementById('summary');
const tasks = document.getElementById('tasks');
const areas = document.getElementById('areas');
const chainEl = document.getElementById('chain');

const rev = document.getElementById('rev');
const exp = document.getElementById('exp');
const profit = document.getElementById('profit');
const usd = document.getElementById('usd');


/* =========================
   RENDER HOME
========================= */

function render() {

  const d = s.tasks.filter((_, i) => s.done[i]).length;

  let overall = Math.round(
    s.areas.reduce((a, x) => a + x[2], 0) /
    s.areas.length *
    0.8
    +
    d / s.tasks.length * 20
  );

  overall = Math.min(100, overall);

  overallEl.textContent = overall + '%';

  bar.style.width = overall + '%';

  summary.textContent =
    `Today: ${d}/${s.tasks.length} tasks complete.`;


  /* TASKS */

  tasks.innerHTML = s.tasks.map((t, i) => `

    <label class="task">

      <input
        type="checkbox"
        ${s.done[i] ? 'checked' : ''}
        data-i="${i}"
      >

      <span>
        <b>${t[0]}</b>
        <small>${t[1]}</small>
      </span>

    </label>

  `).join('');


  document
    .querySelectorAll('[data-i]')
    .forEach(x => {

      x.onchange = () => {

        s.done[x.dataset.i] = x.checked;

        save();

        render();

      };

    });


  /* AREAS */

  areas.innerHTML = s.areas.map(a => `

    <div class="area">

      <span>${a[0]}</span>

      <b>${a[1]}</b>

      <small>${a[2]}%</small>

      <div class="mini">
        <i style="width:${a[2]}%"></i>
      </div>

    </div>

  `).join('');


  /* CAREER CHAIN */

  const chain = [
    'Foundation',
    'IT Support',
    'Networking',
    'Linux',
    'Cybersecurity',
    'Web Development',
    'Projects',
    'Clients',
    'Income',
    'Tech Career'
  ];

  chainEl.innerHTML = chain.map((x, i) => `

    <span class="step">
      ${i + 1}. ${x}
    </span>

  `).join('');


  /* MONEY */

  rev.textContent = money(s.revenue);

  exp.textContent = money(s.expenses);

  profit.textContent =
    money(s.revenue - s.expenses);

  usd.textContent =
    `$${s.usd} / $500`;


  /* MONEY PAGE */

  const moneyRev =
    document.getElementById('moneyRev');

  const moneyExp =
    document.getElementById('moneyExp');

  const moneyProfit =
    document.getElementById('moneyProfit');

  const moneyUsd =
    document.getElementById('moneyUsd');

  const moneyBar =
    document.getElementById('moneyBar');

  const moneyGoalText =
    document.getElementById('moneyGoalText');

  if (moneyRev)
    moneyRev.textContent = money(s.revenue);

  if (moneyExp)
    moneyExp.textContent = money(s.expenses);

  if (moneyProfit)
    moneyProfit.textContent =
      money(s.revenue - s.expenses);

  if (moneyUsd)
    moneyUsd.textContent =
      `$${s.usd} / $500`;

  if (moneyBar) {

    const percentage =
      Math.min(100, (s.usd / 500) * 100);

    moneyBar.style.width =
      percentage + '%';

  }

  if (moneyGoalText) {

    moneyGoalText.textContent =
      `$${s.usd} of $500 earned`;

  }


  /* WEIGHT */

  const moreWeight =
    document.getElementById('moreWeight');

  if (moreWeight)
    moreWeight.textContent =
      s.weight + ' kg';
}


/* =========================
   PAGE NAVIGATION
========================= */

function showPage(pageName) {

  const pages =
    document.querySelectorAll('.page');

  const navButtons =
    document.querySelectorAll('.nav-btn');


  /* Hide every page */

  pages.forEach(page => {

    page.classList.remove('active');

  });


  /* Show selected page */

  const selected =
    document.querySelector(
      `.page[data-page="${pageName}"]`
    );

  if (selected) {

    selected.classList.add('active');

  }


  /* Update navigation */

  navButtons.forEach(button => {

    button.classList.remove('active');

  });


  const activeButton =
    document.querySelector(
      `.nav-btn[data-page="${pageName}"]`
    );

  if (activeButton) {

    activeButton.classList.add('active');

  }


  /* Scroll to top */

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });


  /* Update browser URL without leaving app */

  try {

    history.replaceState(
      null,
      '',
      '#' + pageName
    );

  } catch (error) {}

}


/* =========================
   NAVIGATION BUTTONS
========================= */

document
  .querySelectorAll('.nav-btn')
  .forEach(button => {

    button.addEventListener('click', () => {

      const page =
        button.dataset.page;

      showPage(page);

    });

  });


/* =========================
   EXTERNAL WEBSITE BUTTONS
========================= */

document
  .querySelectorAll('.resource')
  .forEach(button => {

    button.addEventListener('click', () => {

      const url =
        button.dataset.url;

      if (url) {

        window.open(
          url,
          '_blank',
          'noopener,noreferrer'
        );

      }

    });

  });


/* =========================
   AI COACH
========================= */

function coach(mode) {

  const d =
    s.tasks.filter((_, i) => s.done[i]).length;

  const next =
    s.tasks.find((_, i) => !s.done[i]);

  let text;


  if (mode === 'now') {

    text = next

      ? `
        <div class="answer">

          <b>DO THIS NOW</b>

          <br><br>

          ${next[0]}

          <br>

          ${next[1]}

          <br><br>

          Finish this before adding another task.

        </div>
      `

      : `
        <div class="answer">

          Excellent. Today's plan is complete.

          Use remaining time for a portfolio project,
          recovery, or client outreach.

        </div>
      `;

  }


  else if (mode === 'week') {

    text = `

      <div class="answer">

        <b>YOUR SNAPSHOT</b>

        <br><br>

        Tasks today:
        ${d}/${s.tasks.length}

        <br>

        Fitness baseline:
        ${s.weight} kg

        <br>

        Revenue:
        ${money(s.revenue)}

        <br><br>

        Keep connecting learning to real projects.

        Your website work can become your portfolio
        and income engine while your IT learning
        builds your foundation.

      </div>

    `;

  }


  else {

    text = `

      <div class="answer">

        <b>TOMORROW</b>

        <br><br>

        Continue Courseware IT →
        build one web feature →
        study Project Management →
        train →
        work on photography/video →
        do one income action.

        <br><br>

        Prioritize phone-ready work
        while you don't have a laptop.

      </div>

    `;

  }


  document.getElementById('answer').innerHTML =
    text;

  document
    .getElementById('modal')
    .classList
    .remove('hidden');
}


/* =========================
   AI COACH BUTTONS
========================= */

document
  .getElementById('coach')
  .onclick = () => coach('now');


document
  .getElementById('next')
  .onclick = () => coach('now');


document
  .getElementById('close')
  .onclick = () => {

    document
      .getElementById('modal')
      .classList
      .add('hidden');

  };


document
  .querySelectorAll('.choice')
  .forEach(button => {

    button.onclick = () => {

      coach(button.dataset.mode);

    };

  });


/* =========================
   FITNESS BUTTON
========================= */

const fitnessInfo =
  document.getElementById('fitnessInfo');

if (fitnessInfo) {

  fitnessInfo.onclick = () => {

    alert(
      'Fitness tracker coming next. Your current weight is ' +
      s.weight +
      ' kg.'
    );

  };

}


/* =========================
   RESTORE PAGE FROM URL
========================= */

function loadInitialPage() {

  const hash =
    window.location.hash
      .replace('#', '');

  const validPages = [
    'home',
    'studies',
    'career',
    'money',
    'more'
  ];

  if (validPages.includes(hash)) {

    showPage(hash);

  } else {

    showPage('home');

  }

}


/* =========================
   START APP
========================= */

render();

loadInitialPage();


/* =========================
   SERVICE WORKER
========================= */

if ('serviceWorker' in navigator) {

  navigator.serviceWorker
    .register('sw.js')
    .catch(error => {

      console.log(
        'Service worker registration failed:',
        error
      );

    });

}
