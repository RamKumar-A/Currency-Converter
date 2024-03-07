'use strict';

const selectors = document.querySelectorAll('.currency');
let base = document.querySelector('#base');
let converted = document.querySelector('#converted');
const output = document.querySelector('.outputValue');
const amount = document.querySelector('.amount');
const rev = document.querySelector('.rev');

const currencies = [
  'AUD',
  'BGN',
  'BRL',
  'CAD',
  'CHF',
  'CNY',
  'CZK',
  'DKK',
  'GBP',
  'HKD',
  'HUF',
  'IDR',
  'ILS',
  'INR',
  'ISK',
  'JPY',
  'KRW',
  'MXN',
  'MYR',
  'NOK',
  'NZD',
  'PHP',
  'PLN',
  'RON',
  'SEK',
  'SGD',
  'THB',
  'TRY',
  'USD',
  'ZAR',
];

selectors.forEach((s, i) => {
  const usdIndex = currencies.indexOf('USD');
  const inrIndex = currencies.indexOf('INR');

  // Move 'USD' to the front for index 0
  if (i === 0 && usdIndex !== -1) {
    currencies.splice(usdIndex, 1);
    currencies.unshift('USD');
  }

  // Move 'INR' to the front for index 1
  if (i === 1 && inrIndex !== -1) {
    currencies.splice(inrIndex, 1);
    currencies.unshift('INR');
  }

  currencies.forEach(function (item) {
    let option = document.createElement('option');
    option.value = item;
    option.text = item;
    s.appendChild(option);
  });
});

base.addEventListener('change', function () {
  curValue();
});

amount.addEventListener('change', function () {
  curValue();
});

converted.addEventListener('change', function () {
  curValue();
});

let bool = true;
rev.addEventListener('click', function () {
  // Swap the values of base and converted
  [base.value, converted.value] = [converted.value, base.value];
  if (bool) {
    rev.innerHTML = '&darr;&uarr;';
  } else rev.innerHTML = '&uarr;&darr;';
  bool = !bool;
  curValue();
});

async function curValue() {
  const url = ` https://api.frankfurter.app/latest?amount=${amount.value}&from=${base.value}&to=${converted.value}`;
  const res = await fetch(url);
  const data = await res.json();
  output.textContent = data.rates[converted.value] + ' ' + converted.value;
}

curValue();
