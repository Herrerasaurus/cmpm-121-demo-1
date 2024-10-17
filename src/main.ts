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
let up1 = 0;
let up2 = 0;
let up3 = 0;
let up4 = 0;
let up5 = 0;
const totalUpgrades = [up1, up2, up3, up4, up5];

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
const upgrade1 = document.createElement("button");
// Step 6: add additional upgrades
const upgrade2 = document.createElement("button");
const upgrade3 = document.createElement("button");
const upgrade4 = document.createElement("button");
const upgrade5 = document.createElement("button");
const upgradeButtons = [upgrade1, upgrade2, upgrade3, upgrade4, upgrade5];

for(let i = 0; i < upgradeButtons.length; i++) {
    upgradeButtons[i].innerHTML = `${availableItems[0].name} (${totalUpgrades[i]})`;
    upgradeButtons[i].style.backgroundColor = "darkblue";
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
// Step 5 + 6: Purchasing an upgrade
for(let i = 0; i < availableItems.length; i++) {
    upgradeButtons[i].onclick = () => {
        prevCount = addCount;
        addCount += availableItems[i].rate;
        numDucks -= availableItems[i].cost;
        totalUpgrades[i]++;
        availableItems[i].cost = availableItems[i].cost * 1.15;

        // add perks to attract ducks - 🍞🥖🥨🥐🥪
        if(availableItems[i].item === "🍞" && totalUpgrades[i]==10) {
            button.innerHTML += `${availableItems[i].item}`;
        } else if(!(availableItems[i].item === "🍞")) {
            button.innerHTML += `${availableItems[i].item}`;
        }

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
