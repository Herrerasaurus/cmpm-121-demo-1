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

// Step 5: add new button
const upgrade = document.createElement("button");
upgrade.innerHTML = "More Ducks";

// Step 2: Adding a counter
let numDucks: number = 0;
const displayDucks = document.createElement("counter");
displayDucks.innerHTML = `<br><br>${numDucks} Ducks<br><br>`;

let addCount = 0;

button.onclick = () => {
    updateDucks(1);
};

// Step 3: Automatic Clicking
// removing for step 4 // const interval = setInterval(updateDucks, 1000);
function updateDucks(x){
    numDucks+= x;
    displayDucks.innerHTML = `<br><br>${numDucks} Ducks<br><br>`;
}

// Step 4: Continuous Growth
let timestamp = 0;
requestAnimationFrame(contGrowth);

function contGrowth(time){
    if((time - timestamp >= 1000) ){
        timestamp = time;
        updateDucks(addCount);
    }
    
    requestAnimationFrame(contGrowth);
}

// Step 5: Purchasing an upgrade
upgrade.onclick = () => {
    addCount += 1;
    numDucks -= 10;
};



app.append(button);
app.append(displayDucks);
app.append(upgrade);



