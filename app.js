'use strict';
var allProducts = [];
var productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
var productFP = ['assets/bag.jpg', 'assets/banana.jpg', 'assets/bathroom.jpg', 'assets/boots.jpg', 'assets/breakfast.jpg', 'assets/bubblegum.jpg', 'assets/chair.jpg', 'assets/cthulhu.jpg', 'assets/dog-duck.jpg', 'assets/dragon.jpg', 'assets/pen.jpg', 'assets/pet-sweep.jpg', 'assets/scissors.jpg', 'assets/shark.jpg', 'assets/sweep.jpg', 'assets/tauntaun.jpg', 'assets/unicorn.jpg', 'assets/usb.jpg', 'assets/water-can.jpg', 'assets/wine-glass.jpg'];

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.votes = 0;
  this.timesSeen = 0;
  this.results = null;
  allProducts.push(this);
}
var tracker = {

  getRandomIndex: function() {
    return Math.floor(Math.random() * allProducts.length);










  },

  getUniqueImages: function() {

  },

  renderImages: function() {
    var randOne = this.getRandomIndex();
    var randTwo = this.getRandomIndex();
    var randThree = this.getRandomIndex();

  },

  addClickTracker: function() {

  },

  clickHandler: function() {

  },
};

(function createProducts() {

})();
