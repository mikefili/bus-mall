'use strict';

var allProducts = [];
// var lastSet = [];
var productNames = ['Bag', 'Banana', 'Bathroom', 'Boots', 'Breakfast', 'Bubblegum', 'Chair', 'Cthulhu', 'Dog-Duck', 'Dragon', 'Pen', 'Pet-Sweep', 'Scissors', 'Shark', 'Sweep', 'Tauntaun', 'Unicorn', 'USB', 'Water-Can', 'Wine-Glass'];

function Product(name, path) {
  this.name = name;
  this.path = path;
  this.votes = 0;
  this.seen = 0;
  allProducts.push(this);
}

(function() {
  for (var i = 0; i < productNames.length; i++) {
    new Product(productNames[i], 'assets/' + productNames[i] + '.jpg');
  }
})();

var tracker = {
  clickCount: 0,
  imgOne: document.getElementById('left-img'),
  imgTwo: document.getElementById('middle-img'),
  imgThree: document.getElementById('right-img'),

  getRandomIndex: function() {
    return Math.floor(Math.random() * allProducts.length);
  },

  renderImages: function() {
    var randOne = this.getRandomIndex();
    var randTwo = this.getRandomIndex();
    var randThree = this.getRandomIndex();

    if (randOne === randTwo || randTwo === randThree || randThree === randOne) {
      return;
    }

    this.imgOne.src = allProducts[randOne].path;
    this.imgTwo.src = allProducts[randTwo].path;
    this.imgThree.src = allProducts[randThree].path;
    this.imgOne.id = randOne;
    this.imgTwo.id = randTwo;
    this.imgThree.id = randThree;
  },

  addClickTracker: function() {
    tracker.clickCount++;
    allProducts[event.target.id].votes++;

    if (tracker.clickCount === 25) {
      tracker.displayResults();
    } else {
      tracker.renderImages();
    }
  },

  displayResults: function() {
    var results = document.getElementById('results');
    console.log(results);
    for (var i = 0; i < allProducts.length; i++) {
      var sentence = document.createElement('li');
      console.log(sentence);
      sentence.textContent = allProducts[i].votes + ' votes for the ' + allProducts[i].name;
      results.appendChild(sentence);
    }
    tracker.resetButton();
  },

  resetButton: function() {
    var reset = document.getElementById('reset');
    var button = document.createElement('button');
    button.innerHTML = 'RESET';
    reset.appendChild(button);
    button.addEventListener ('click', function() {
      location.reload();
    });
  }
};

tracker.renderImages();

tracker.imgOne.addEventListener('click', tracker.addClickTracker);
tracker.imgTwo.addEventListener('click', tracker.addClickTracker);
tracker.imgThree.addEventListener('click', tracker.addClickTracker);