import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Duck game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Step 1: Adding a Button
const button = document.createElement("button");
button.innerHTML = "🦆";

// upgrade counters
let up1 = 0;
let up2 = 0;
let up3 = 0;

// Step 5: add new upgrade button
const upgrade1 = document.createElement("button");
upgrade1.innerHTML = `More Ducks (${up1})`;

// Step 6: add additional upgrades
const upgrade2 = document.createElement("button");
upgrade2.innerHTML = `Even More Ducks (${up2})`;
const upgrade3 = document.createElement("button");
upgrade3.innerHTML = `Way More Ducks (${up3})`;

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
  displayDucks.innerHTML = `<br><br>${numDucks.toFixed(1)} Ducks<br><br>`;
  upgrade1.innerHTML = `More Ducks (${up1})`;
  upgrade2.innerHTML = `Even More Ducks (${up2})`;
  upgrade3.innerHTML = `Way More Ducks (${up3})`;
  status.innerHTML = `${addCount.toFixed(1)} Ducks per second`;
  

}

// Step 4: Continuous Growth
let timestamp = 0;
requestAnimationFrame(contGrowth);

//price for upgrades
let upgrade1Price = 10;
let upgrade2Price = 100;
let upgrade3Price = 1000;

function contGrowth(time: number) {
  if (!timestamp || time - timestamp >= 1000) {
    timestamp = time;
    updateDucks(addCount);
  }
  // Step 5: check if button should be disabled
  if (numDucks >= upgrade1Price) {
    upgrade1.disabled = false;
  } else {
    upgrade1.disabled = true;
  }
  // Check button status for step 6 upgrades
  if (numDucks >= upgrade2Price) {
    upgrade2.disabled = false;
  } else {
    upgrade2.disabled = true;
  }
  if (numDucks >= upgrade3Price) {
    upgrade3.disabled = false
  } else {
    upgrade3.disabled = true;
  }

  requestAnimationFrame(contGrowth);
}

// Step 5 + 6: Purchasing an upgrade
upgrade1.onclick = () => {
  addCount += 0.1;
  numDucks -= 10;
  up1++;
  //increase by a growth factor of 1.15
  upgrade1Price = upgrade1Price * 1.15;
  console.log(upgrade1Price);
};
upgrade2.onclick = () => {
    addCount += 2;
    numDucks -= 100;
    up2++;
    //increase by a growth factor of 1.15
    upgrade2Price = upgrade2Price * 1.15;
    console.log(upgrade2Price);


};
upgrade3.onclick = () => {
    addCount += 50;
    numDucks -= 1000;
    up3++;
    //increase by a growth factor of 1.15
    upgrade3Price = upgrade3Price * 1.15;
    console.log(upgrade3Price);
};


// add buttons to screen
app.append(status);
app.append(button);
app.append(displayDucks);
app.append(upgrade1);
app.append(upgrade2);
app.append(upgrade3);

