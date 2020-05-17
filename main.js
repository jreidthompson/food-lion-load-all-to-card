// jshint esversion: 6

function runSelect(event) {
  event.preventDefault();

  // Click on every "load to card" button.
  var load2crd = document.getElementsByClassName('fl-coupon-load');
  console.log(load2crd.length + ' coupons found');
  var clicked = 0;

  // Iterate in reverse because clicking on a button mutates the coupon list.
  for (var btn of Array.from(load2crd).reverse()) {
    btn.click();
    clicked++;
  }
  console.log(clicked + ' coupons clicked');
}

function insertButton(btn) {
  function waitForSite() {
    var targetelem = document.getElementById('site-content-wrap');
    if (targetelem !== null) {
      clearInterval(waitForSiteTimer);
      targetelem.insertBefore(btn, targetelem.childNodes[0]);
    }
  }

  // Wait for site to finish loading before inserting button.
  var waitForSiteTimer = setInterval(waitForSite, 100);
}

function init() {
  // Make a new button for our action.
  var newbutton = document.createElement('button');
  newbutton.name = 'load_all_to_card';
  newbutton.id = 'load_all_to_card';
  newbutton.style.cssText = 'background-color: #E82A24; color: #fff; font-weight: 700; border: none; padding: 6px 10px; cursor: pointer; margin: 5px';
  newbutton.appendChild(document.createTextNode('Load All To Card'));
  newbutton.addEventListener('click', runSelect);

  insertButton(newbutton);
}

init();

// -- The End --
