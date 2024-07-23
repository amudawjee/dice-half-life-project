function getRandomArbitrary(min, max) {
  let number = Math.random() * (max - min) + min;
  return Math.round(number);
}

function rollDice(sides, number) {
  let roll = [];
  for (let n = 0; n < number; n++) {
    let min = 1;
    let max = sides;
    roll.push(getRandomArbitrary(min, max));
  }
  return roll;
}

function removeThree(value) {
  return value === 3;
}

function diceDeath(sides, number) {
  let roll = rollDice(sides, number);
  let newSet = roll.filter(removeThree);
  let newRoll = roll.length - newSet.length;
  return newRoll;
}

function halfLife(sides, number) {
  let totalDice = [number];
  let diceNumber = diceDeath(sides, number);
  let rollNumber = 1;
  while (0 < diceNumber) {
    totalDice.push(diceNumber);
    diceNumber = diceDeath(sides, diceNumber);
    rollNumber = rollNumber + 1;
  }
  console.log(rollNumber);
  console.log(totalDice);
  return totalDice;
}

function dataPoints(sides, number) {
  let yvalues = halfLife(sides, number);
  let xvalues = [];
  let xyvalues = [];
  let x = 0;
  yvalues.forEach(function (n) {
    let xy = {
      x: x,
      y: n,
    };

    xyvalues.push(xy);
    x = x + 1;
  });
  console.log(xyvalues);
  return xyvalues;
}

function readSides() {
  return Number(changeDiceSides.value);
}

function readNumber() {
  return Number(changeDiceNumber.value);
}

let changeDiceSides = document.querySelector("#diceSides");
changeDiceSides.addEventListener("click", readSides);

let changeDiceNumber = document.querySelector("#diceNumber");
changeDiceNumber.addEventListener("click", readNumber);

let changeGraph = document.querySelector("#rollButton");
changeGraph.addEventListener("click", plotGraph);

function plotGraph() {
  let chooseSides = readSides();
  let chooseNumber = readNumber();
  let xyvalues = dataPoints(chooseSides, chooseNumber);
  new Chart("myChart", {
    type: "scatter",
    data: {
      datasets: [
        {
          pointRadius: 4,
          pointBackgroundColor: "rgba(0,0,255,1)",
          data: xyvalues,
        },
      ],
    },
  });
}
