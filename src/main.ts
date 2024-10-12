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

// Step 2: Adding a counter
let numDucks: number = 0;
const displayDucks = document.createElement("counter");
displayDucks.innerHTML = `<br><br>${numDucks} Ducks`;

button.onclick = () => {
    updateDucks();
};

// Step 3: Automatic Clicking
const interval = setInterval(updateDucks, 1000);

function updateDucks(){
    numDucks++;
    displayDucks.innerHTML = `<br><br>${numDucks} Ducks`;
}
app.append(button);
app.append(displayDucks);



