console.clear();

Splitting({ target: '.skill-title h1', by: 'chars' });

const elApp = document.querySelector('#app');

const elPlanets = Array.from(document.querySelectorAll('[data-skill]')).
  reduce((acc, el) => {
    const skill = el.dataset.skill;

    acc[skill] = el;

    return acc;
  }, {});

const skillKeys = Object.keys(elPlanets);

function getDetails(skill) {
  // tilt, gravity, hours
  const details = Array.from(elPlanets[skill].
    querySelectorAll(`[data-detail]`)).
    reduce((acc, el) => {
      acc[el.dataset.detail] = el.innerHTML.trim();

      return acc;
    }, { skill });

  return details;
}

// ...........

let currentPlanetIndex = 0;
let currentPlanet = getDetails('Python');

function selectPlanet(skill) {
  const prevPlanet = currentPlanet;
  const elActive = document.querySelector('[data-active]');

  delete elActive.dataset.active;

  const elPlanet = elPlanets[skill];

  elPlanet.dataset.active = true;
  currentPlanet = getDetails(elPlanet.dataset.skill);

  console.log(prevPlanet, currentPlanet);

  const elHoursDetail = elPlanet.querySelector('[data-detail="hours"]');
  animate.fromTo({
    from: +prevPlanet.hours,
    to: +currentPlanet.hours
  },
    value => {
      elHoursDetail.innerHTML = Math.round(value);
    });

  const elTiltDetail = elPlanet.querySelector('[data-detail="tilt"]');
  animate.fromTo({
    from: +prevPlanet.tilt,
    to: +currentPlanet.tilt
  },
    value => {
      elTiltDetail.innerHTML = value.toFixed(2);
    });

  const elGravityDetail = elPlanet.querySelector('[data-detail="gravity"]');

  animate.fromTo({
    from: +prevPlanet.gravity,
    to: +currentPlanet.gravity
  },
    value => {
      elGravityDetail.innerHTML = value.toFixed(1);
    });
}

function selectPlanetByIndex(i) {
  currentPlanetIndex = i;
  elApp.style.setProperty('--active', i);
  selectPlanet(skillKeys[i]);
}

// document.body.addEventListener('click', () => {
//   currentPlanetIndex = (currentPlanetIndex + 1) % skillKeys.length;

//   selectPlanet(skillKeys[currentPlanetIndex]);
// });


/* ---------------------------------- */

function animate(duration, fn) {
  const start = performance.now();
  const ticks = Math.ceil(duration / 16.666667);
  let progress = 0; // between 0 and 1, +/-

  function tick(now) {
    if (progress >= 1) {
      fn(1);
      return;
    }

    const elapsed = now - start;
    progress = elapsed / duration;

    // callback
    fn(progress); // number between 0 and 1

    requestAnimationFrame(tick); // every 16.6666667 ms
  }

  tick(start);
}

function easing(progress) {
  return (1 - Math.cos(progress * Math.PI)) / 2;
}

const animationDefaults = {
  duration: 1000,
  easing
};


animate.fromTo = ({
  from,
  to,
  easing,
  duration },
  fn) => {
  easing = easing || animationDefaults.easing;
  duration = duration || animationDefaults.duration;

  const delta = +to - +from;

  return animate(duration, progress => fn(from + easing(progress) * delta));
};


/* ---------------------------------- */

const svgNS = 'http://www.w3.org/2000/svg';
const elSvgNav = document.querySelector('.skill-nav svg');

const elTspans = [...document.querySelectorAll('tspan')];;
const length = elTspans.length - 1;

elSvgNav.style.setProperty('--length', length);

// Getting the length for distributing the text along the path
const elNavPath = document.querySelector('#navPath');
const elLastTspan = elTspans[length];
const navPathLength = elNavPath.getTotalLength() - elLastTspan.getComputedTextLength();

elTspans.forEach((tspan, i) => {
  let percent = i / length;

  tspan.setAttribute('x', percent * navPathLength);
  tspan.setAttributeNS(svgNS, 'x', percent * navPathLength);

  tspan.addEventListener('click', e => {
    e.preventDefault();
    selectPlanetByIndex(i);
  });

});





