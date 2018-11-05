'use strict';
var allProducts = [];
var productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.tally = 0;
  this.votes = 0;
  allProducts.push(this);
}

(function itemList() {
  for (var i = 0; i < productNames; i++) {
    new Product(productNames[i], './assets/' + productNames[i] + '.jpg');
  }
});

var tracker = {
  products: [],
  totalClicks: 0,

  mainEl: document.getElementById('main-content'),

  getRandomIndex: function() {
    return Math.floor(Math.random() * productNames.length);
  },
  getUniqueImages: function() {

  },
  renderImages: function() {

  },
  addClickTracker: function() {

  },
  clickHandler: function() {

  },
};

(function createProducts() {

})()
