
let currentLap = 0;
let raceStarted = false;
let raceFinished = false;

let drivers = [
    {name:"Max Verstappen", team:"Red Bull", speed:320, skill:95, time:0, tire:"Soft", pitStop:false, spun:false, status:"Ready"},
    {name:"Lewis Hamilton", team:"Ferrari", speed:315, skill:94, time:0, tire:"Hard", pitStop:false, spun:false, status:"Ready"},
    {name:"Charles Leclerc", team:"Ferrari", speed:318, skill:93, time:0, tire:"Soft", pitStop:false, spun:false, status:"Ready"},
    {name:"Lando Norris", team:"McLaren", speed:319, skill:94, time:0, tire:"Hard", pitStop:false, spun:false, status:"Ready"},
    {name:"Oscar Piastri", team:"McLaren", speed:317, skill:92, time:0, tire:"Soft", pitStop:false, spun:false, status:"Ready"},
    {name:"George Russell", team:"Mercedes", speed:316, skill:91, time:0, tire:"Hard", pitStop:false, spun:false, status:"Ready"},
    {name:"Fernando Alonso", team:"Aston Martin", speed:312, skill:95, time:0, tire:"Soft", pitStop:false, spun:false, status:"Ready"},
    {name:"Carlos Sainz", team:"Williams", speed:314, skill:92, time:0, tire:"Hard", pitStop:false, spun:false, status:"Ready"},
    {name:"Sergio Perez", team:"Red Bull", speed:313, skill:89, time:0, tire:"Soft", pitStop:false, spun:false, status:"Ready"},
    {name:"Pierre Gasly", team:"Alpine", speed:310, skill:90, time:0, tire:"Hard", pitStop:false, spun:false, status:"Ready"}
];

function displayDrivers() {
    let table = document.getElementById("driversTable");
    table.innerHTML = "";

    for (let i = 0; i < drivers.length; i++) {
        let row = document.createElement("tr");

        let position = document.createElement("td");
        let name = document.createElement("td");
        let team = document.createElement("td");
        let speed = document.createElement("td");
        let skill = document.createElement("td");
        let time = document.createElement("td");
        let tire = document.createElement("td");
        let status = document.createElement("td");

        position.textContent = i + 1;
        name.textContent = drivers[i].name;
        team.textContent = drivers[i].team;
        speed.textContent = drivers[i].speed;
        skill.textContent = drivers[i].skill;
        time.textContent = drivers[i].time.toFixed(2);
        tire.textContent = drivers[i].tire;
        status.textContent = drivers[i].status;

        row.appendChild(position);
        row.appendChild(name);
        row.appendChild(team);
        row.appendChild(speed);
        row.appendChild(skill);
        row.appendChild(time);
        row.appendChild(tire);
        row.appendChild(status);

        table.appendChild(row);
    }
}

function showEvent(message) {
    let events = document.getElementById("raceEvents");

    let paragraph = document.createElement("p");
    paragraph.textContent = message;

    events.appendChild(paragraph);
}

function calculateTime(driver) {
    let lapTime = 90;

    lapTime += (320 - driver.speed) * 0.1;
    lapTime += (95 - driver.skill) * 0.05;

    if (driver.tire === "Soft") {
        lapTime -= 0.5;
    } else {
        lapTime += 0.5;
    }

    lapTime += Math.random() * 2;

    driver.time += lapTime;
}

function startRace() {
    currentLap = 0;
    raceStarted = true;
    raceFinished = false;

    for (let i = 0; i < drivers.length; i++) {
        drivers[i].time = 0;
        drivers[i].pitStop = false;
        drivers[i].spun = false;
        drivers[i].status = "Ready";
    }

    document.getElementById("lap").textContent = "Lap: 0 / 10";
    document.getElementById("winner").textContent = "";
    document.getElementById("raceEvents").innerHTML = "";

    document.getElementById("startButton").disabled = true;
    document.getElementById("nextButton").disabled = false;

    showEvent("The race has started!");

    displayDrivers();
}

function nextLap() {
    if (currentLap >= 10 || raceStarted === false || raceFinished === true) {
        return;
    }

    currentLap++;

    let safetyCar = Math.random() < 0.15;

    if (safetyCar) {
        showEvent("Safety Car is on track!");
    }

    for (let i = 0; i < drivers.length; i++) {
        let driver = drivers[i];

        driver.status = "Racing";

        calculateTime(driver);

        if (currentLap === 5 && driver.pitStop === false) {
            driver.time += 20;
            driver.pitStop = true;

            if (driver.tire === "Soft") {
                driver.tire = "Hard";
            } else {
                driver.tire = "Soft";
            }

            driver.status = "Pit Stop";

            showEvent(driver.name + " entered the Pit Stop and changed tyres!");
        }

        if (Math.random() < 0.08) {
            driver.time += 5;
            driver.spun = true;
            driver.status = "Spin";

            showEvent(driver.name + " had a Spin!");
        }

        if (safetyCar && driver.status === "Racing") {
            driver.time += 3;
            driver.status = "Safety Car";
        }
    }

    drivers.sort(function(a, b) {
        return a.time - b.time;
    });

    document.getElementById("lap").textContent =
        "Lap: " + currentLap + " / 10";

    displayDrivers();

    if (currentLap === 10) {
        finishRace();
    }
}

function finishRace() {
    raceFinished = true;

    document.getElementById("winner").textContent =
        "Winner: " + drivers[0].name;

    document.getElementById("nextButton").disabled = true;

    showEvent("The race has finished!");
}

document.getElementById("startButton").addEventListener("click", startRace);

document.getElementById("nextButton").addEventListener("click", nextLap);

displayDrivers();
