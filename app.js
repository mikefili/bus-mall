'use strict';

var allProducts = [];
var productNames = ['Bag', 'Banana', 'Bathroom', 'Boots', 'Breakfast', 'Bubblegum', 'Chair', 'Cthulhu', 'Dog-Duck', 'Dragon', 'Pen', 'Pet-Sweep', 'Scissors', 'Shark', 'Sweep', 'Tauntaun', 'Unicorn', 'USB', 'Water-Can', 'Wine-Glass'];

function Product(name, path) {
  this.name = name;
  this.path = path;
  this.votes = 0;
  this.seen = 0;
  this.myChart = null;
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
    var ctx = document.getElementById('myChart').getContext('2d');
    tracker.myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: productNames,
        datasets: [{
          label: '# of Votes',
          data: data,
          backgroundColor: [
            'rgba(255, 0, 0, 0.2)',
            'rgba(255, 42, 0, 0.2)',
            'rgba(255, 84, 0, 0.2)',
            'rgba(255, 126, 0, 0.2)',
            'rgba(255, 168, 0, 0.2)',
            'rgba(255, 210, 0, 0.2)',
            'rgba(255, 255, 0, 0.2)',
            'rgba(210, 255, 0, 0.2)',
            'rgba(168, 255, 0, 0.2)',
            'rgba(126, 255, 0, 0.2)',
            'rgba(84, 255, 0, 0.2)',
            'rgba(42, 255, 0, 0.2)',
            'rgba(0, 255, 0, 0.2)',
            'rgba(0, 255, 42, 0.2)',
            'rgba(0, 255, 84, 0.2)',
            'rgba(0, 255, 126, 0.2)',
            'rgba(0, 255, 168, 0.2)',
            'rgba(0, 255, 210, 0.2)',
            'rgba(0, 255, 255, 0.2)',
            'rgba(0, 210, 255, 0.2)'
          ],
          borderColor: [
            'rgba(0, 0, 0, 0.9)',
            'rgba(0, 0, 0, 0.9)',
            'rgba(0, 0, 0, 0.9)',
            'rgba(0, 0, 0, 0.9)',
            'rgba(0, 0, 0, 0.9)',
            'rgba(0, 0, 0, 0.9)',
            'rgba(0, 0, 0, 0.9)',
            'rgba(0, 0, 0, 0.9)',
            'rgba(0, 0, 0, 0.9)',
            'rgba(0, 0, 0, 0.9)',
            'rgba(0, 0, 0, 0.9)',
            'rgba(0, 0, 0, 0.9)',
            'rgba(0, 0, 0, 0.9)',
            'rgba(0, 0, 0, 0.9)',
            'rgba(0, 0, 0, 0.9)',
            'rgba(0, 0, 0, 0.9)',
            'rgba(0, 0, 0, 0.9)',
            'rgba(0, 0, 0, 0.9)',
            'rgba(0, 0, 0, 0.9)',
            'rgba(0, 0, 0, 0.9)'
          ],
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