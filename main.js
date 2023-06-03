// jshint esversion: 8

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function findButtons(str) {
  let btns = [];
  for (let btn of document.querySelectorAll('button')) {
    if (btn.textContent.includes(str)) {
      btns.push(btn);
    }
  }
  return btns;
}

async function runSelect(event) {
  event.preventDefault();

  // Click on "Show More" button until it no longer shows up.
  for (;;) {
    let btns = findButtons('Show More');
    if (!btns.length) break;
    let btn = btns[0];
    btn.scrollIntoView();
    btn.click();
    await sleep(1000);
  }

  // Click on "Clip Coupon" buttons.
  let btns = findButtons('Clip Coupon');
  console.log(btns.length + ' coupons found');

  let clicked = 0;
  for (let btn of Array.from(btns).reverse()) {
    btn.scrollIntoView();
    btn.click();
    clicked++;
    await sleep(1000);
  }

  console.log(clicked + ' coupons clicked');
}

function insertButton(btn) {
  function waitForSite() {
    let targetelem = document.getElementById('app');
    if (targetelem !== null) {
      clearInterval(waitForSiteTimer);
      targetelem.insertBefore(btn, targetelem.childNodes[0]);
    }
  }

  // Wait for site to finish loading before inserting button.
  let waitForSiteTimer = setInterval(waitForSite, 100);
}

function init() {
  // Make a new button for our action.
  let newbutton = document.createElement('button');
  newbutton.name = 'load_all_to_card';
  newbutton.id = 'load_all_to_card';
  newbutton.style.cssText = 'background-color: #fff; color: #E82A24; font-weight: 700; border: solid #E82A24; padding: 6px 10px; cursor: pointer; margin: 5px';

  newbutton.addEventListener('mouseenter',
    () => {
      newbutton.style.color = '#fff';
      newbutton.style.backgroundColor = '#E82A24';
    }
  );

  newbutton.addEventListener('mouseleave',
    () => {
      newbutton.style.color = '#E82A24';
      newbutton.style.backgroundColor = '#fff';
    }
  );

  newbutton.appendChild(document.createTextNode('Load All To Card'));
  newbutton.addEventListener('click', runSelect);

  insertButton(newbutton);
}

init();

// -- The End --
