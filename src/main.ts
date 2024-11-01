import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
app.style.backgroundColor = "skyblue";

const gameName = "Duck game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);


// Step 1: Adding a Button
const button = document.createElement("button");
button.style.borderRadius = "50%";
button.style.padding = "20px 20px";
button.innerHTML = "🍞";
button.style.backgroundColor = "darkblue";

// upgrade counters
const totalUpgrades = [0, 0, 0, 0, 0];

//Step 9: data-driven design
interface Item {
    name: string,
    cost: number,
    rate: number,
    item: string,
    desc: string
  };
//🍞🥖🥨🥐🥪
const availableItems : Item[] = [
    {name: "Plain Loaf", cost: 10, rate: 0.1, item: "🍞", desc: "A simple offering to attract modest duck attention."},
    {name: "Baguette", cost: 100, rate: 2, item: "🥖", desc: "The perfect bread for throwing across the lake."},
    {name: "Pretzel", cost: 1000, rate: 50, item: "🥨", desc: "A salty twist which draws in hoards of ducks."},
    {name: "Croissant", cost: 10000, rate: 100, item: "🥐", desc: "Elegant and falky, this buttery delight is irresistible."},
    {name: "Sandwich", cost: 100000, rate: 1000, item: "🥪", desc: "A whole meal in bread form! Ducks come in the thousands!"}
];

// Step 5: add new upgrade button
const upgradeButtons: HTMLButtonElement[] = [];
for(let i = 0; i < availableItems.length; i++) {
    const upgrade = document.createElement("button");
    upgrade.innerHTML = `${availableItems[0].name} (${totalUpgrades[i]})`;
    upgrade.style.backgroundColor = "darkblue";
    upgradeButtons.push(upgrade);
}


// Step 2: Adding a counter
let numDucks: number = 0;
const displayDucks = document.createElement("counter");
displayDucks.innerHTML = `<br><br>${numDucks} Ducks<br><br>`;

let addCount: number = 0;

// Step 6: staus display
const status = document.createElement("p");
status.innerHTML = `${addCount} Ducks per second`;


button.onclick = () => {
  updateDucks(1);
};

// Step 3: Automatic Clicking
// removing for step 4 // const interval = setInterval(updateDucks, 1000);
function updateDucks(x: number) {
  numDucks += x;
  button.style.fontSize = ((numDucks*0.1)+ 10) + "px";

  // round numbers
  numDucks = Math.round(numDucks * 100) / 100;
  addCount = Math.round(addCount * 100) / 100;

  for(let i = 0; i < availableItems.length; i++) {
    availableItems[i].cost = Math.round(availableItems[i].cost * 100) / 100;
    upgradeButtons[i].innerHTML = `${availableItems[i].name} ${availableItems[i].item} (${totalUpgrades[i]})<br> cost: ${availableItems[i].cost}`;
    upgradeButtons[i].innerHTML += `<br>${availableItems[i].desc}`;
    
  }

  displayDucks.innerHTML = `<br><br>${numDucks} Ducks<br><br>`;
  status.innerHTML = `${addCount} Ducks per second`;
  

}

// Step 4: Continuous Growth
let timestamp = 0;
requestAnimationFrame(contGrowth);
  

function contGrowth(time: number) {
  if (!timestamp || time - timestamp >= 1000) {
    timestamp = time;
    updateDucks(addCount);
  }
  // Step 5: check if button should be disabled
  for(let i = 0; i < availableItems.length; i++) {
    if (numDucks >= availableItems[i].cost) {
        upgradeButtons[i].disabled = false;
    } else {
        upgradeButtons[i].disabled = true;
    }
  }
  requestAnimationFrame(contGrowth);
}

let duckCount = 0;
let loopCount = 0;
let prevCount = 0;
const priceIncrease = 1.15;
// Step 5 + 6: Purchasing an upgrade
for(let i = 0; i < availableItems.length; i++) {
    upgradeButtons[i].onclick = () => {
        prevCount = addCount;
        addCount += availableItems[i].rate;
        numDucks -= availableItems[i].cost;
        totalUpgrades[i]++;
        availableItems[i].cost = availableItems[i].cost * priceIncrease;

        //add more ducks
        loopCount = availableItems[i].rate;
        if(Math.floor(addCount) - Math.floor(prevCount) > 0) {
            for(let j = 0; j < loopCount; j++) {
                button.innerHTML += "🦆";
                duckCount++;
                if(duckCount > 10) {
                    button.innerHTML += "<br>";
                    duckCount = 0;
                }
            }
        }
    };
}

// add buttons to screen
app.append(status);
app.append(button);
app.append(displayDucks);
for(let i = 0; i < upgradeButtons.length; i++) {
    app.append(upgradeButtons[i]);
}
