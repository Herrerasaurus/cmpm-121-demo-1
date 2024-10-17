import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Duck game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Step 1: Adding a Button
const button = document.createElement("button");
button.style.borderRadius = "50%";
button.style.padding = "20px 20px";
button.innerHTML = "🦆";

// upgrade counters
let up1 = 0;
let up2 = 0;
let up3 = 0;
const totalUpgrades = [up1, up2, up3];

//Step 9: data-driven design
interface Item {
    name: string,
    cost: number,
    rate: number
  };
  
const availableItems : Item[] = [
    {name: "More Ducks", cost: 10, rate: 0.1},
    {name: "Even More Ducks", cost: 100, rate: 2},
    {name: "Way More Ducks", cost: 1000, rate: 50},
];

// Step 5: add new upgrade button
const upgrade1 = document.createElement("button");
// Step 6: add additional upgrades
const upgrade2 = document.createElement("button");
const upgrade3 = document.createElement("button");
const upgradeButtons = [upgrade1, upgrade2, upgrade3];

for(let i = 0; i < 3; i++) {
    upgradeButtons[i].innerHTML = `${availableItems[0].name} (${totalUpgrades[i]})`;
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
    upgradeButtons[i].innerHTML = `${availableItems[i].name} (${totalUpgrades[i]})<br> cost: ${availableItems[i].cost}`;
    
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

// Step 5 + 6: Purchasing an upgrade
for(let i = 0; i < availableItems.length; i++) {
    upgradeButtons[i].onclick = () => {
        addCount += availableItems[i].rate;
        numDucks -= availableItems[i].cost;
        totalUpgrades[i]++;
        availableItems[i].cost = availableItems[i].cost * 1.15;
    };
}



// add buttons to screen
app.append(status);
app.append(button);
app.append(displayDucks);
app.append(upgrade1);
app.append(upgrade2);
app.append(upgrade3);

