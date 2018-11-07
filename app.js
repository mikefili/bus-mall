'use strict';

var allProducts = [];
var productNames = ['Bag', 'Banana', 'Bathroom', 'Boots', 'Breakfast', 'Bubblegum', 'Chair', 'Cthulhu', 'Dog-Duck', 'Dragon', 'Pen', 'Pet-Sweep', 'Scissors', 'Shark', 'Sweep', 'Tauntaun', 'Unicorn', 'USB', 'Water-Can', 'Wine-Glass'];

function Product(name, path) {
  this.name = name;
  this.path = path;
  this.votes = 0;
  this.seen = 0;
  this.cnvs = null;
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

    allProducts[randOne].seen++;
    allProducts[randTwo].seen++;
    allProducts[randThree].seen++;

    this.imgOne.src = allProducts[randOne].path;
    this.imgTwo.src = allProducts[randTwo].path;
    this.imgThree.src = allProducts[randThree].path;

    this.imgOne.id = randOne;
    this.imgTwo.id = randTwo;
    this.imgThree.id = randThree;
  },

  disableListeners: function() {
    tracker.imgOne.removeEventListener('click', tracker.addClickTracker);
    tracker.imgTwo.removeEventListener('click', tracker.addClickTracker);
    tracker.imgThree.removeEventListener('click', tracker.addClickTracker);
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
    var data = [];
    for (var i = 0; i < allProducts.length; i++) {
      data.push(allProducts[i].votes);
    }
    var results = document.getElementById('results');
    var ctx = document.getElementById('cnvs').getContext('2d');
    tracker.cnvs = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: productNames,
        datasets: [{
          label: '# of Votes',
          data: data,
          backgroundColor: [
            'rgba(255, 0, 0, 0.2)', 'rgba(255, 51, 0, 0.2)', 'rgba(255, 102, 0, 0.2)', 'rgba(255, 153, 0, 0.2)', 'rgba(255, 204, 0, 0.2)', 'rgba(255, 255, 0, 0.2)', 'rgba(204, 255, 0, 0.2)', 'rgba(153, 255, 0, 0.2)', 'rgba(102, 255, 0, 0.2)', 'rgba(51, 255, 0, 0.2)', 'rgba(0, 255, 0, 0.2)', 'rgba(0, 255, 51, 0.2)', 'rgba(0, 255, 102, 0.2)', 'rgba(0, 255, 153, 0.2)', 'rgba(0, 255, 204, 0.2)', 'rgba(0, 204, 255, 0.2)', 'rgba(0, 153, 168, 0.2)', 'rgba(0, 102, 210, 0.2)', 'rgba(0, 51, 255, 0.2)', 'rgba(0, 0, 255, 0.2)'],
          hoverBackgroundColor: [
            'rgba(255, 0, 0, 0.6)', 'rgba(255, 51, 0, 0.6)', 'rgba(255, 102, 0, 0.6)', 'rgba(255, 153, 0, 0.6)', 'rgba(255, 204, 0, 0.6)', 'rgba(255, 255, 0, 0.6)', 'rgba(204, 255, 0, 0.6)', 'rgba(153, 255, 0, 0.6)', 'rgba(102, 255, 0, 0.6)', 'rgba(51, 255, 0, 0.6)', 'rgba(0, 255, 0, 0.6)', 'rgba(0, 255, 51, 0.6)', 'rgba(0, 255, 102, 0.6)', 'rgba(0, 255, 153, 0.6)', 'rgba(0, 255, 204, 0.6)', 'rgba(0, 204, 255, 0.6)', 'rgba(0, 153, 168, 0.6)', 'rgba(0, 102, 210, 0.6)', 'rgba(0, 51, 255, 0.6)', 'rgba(0, 0, 255, 0.6)'],
          borderColor: [
            'rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0.9)'],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      }
    });
    tracker.disableListeners();
    results.appendChild(ctx);
    tracker.resetButton();
  },

  resetButton: function() {
    var reset = document.getElementById('reset');
    var button = document.createElement('button');
    button.textContent = 'RESET';
    reset.appendChild(button);
    button.addEventListener ('click', function() {
      location.reload();
    });
  }
};

tracker.renderImages();
tracker.resetButton();

tracker.imgOne.addEventListener('click', tracker.addClickTracker);
tracker.imgTwo.addEventListener('click', tracker.addClickTracker);
tracker.imgThree.addEventListener('click', tracker.addClickTracker);