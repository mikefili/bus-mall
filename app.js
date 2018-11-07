'use strict';

var allProducts = [];
// var lastSet = [];
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
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
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