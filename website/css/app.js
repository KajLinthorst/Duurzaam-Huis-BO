console.log("Hallo wereld wereld")

let weerImg = document.getElementById("js--weatherImage");
let weer = "sun"; // Soorten weer zijn "sun", "rain", "snow", "thunder", "cloud"


weerImg.src = ("img/weather/" + weer + ".png");



// Licht knopjes

const lightElems = document.getElementsByClassName("light");
let lights = [false, false, false];

ReadData("lights.php");

for (let i = 0; i < lights.length; i++) {
    lightElems[i].addEventListener('click', () => {
        lights[i] = !lights[i];
        SendData("lights.php", lights);
    });
    
}

function SendData(url, data) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(async (response) => {
            let json = await response.json();
            UpdateLightsFromServer(json);
    })
}


function ReadData(url) {
    fetch(url)
        .then(async (response) => {
            let json = await response.json();
            UpdateLightsFromServer(json)
        });
} 

function UpdateLightsFromServer(data) {
    lights = data;

    //console.log(lights);
    for (let i = 0; i < lights.length; ++i) {
        if (lights[i]) lightElems[i].style.backgroundColor = "green";
        else lightElems[i].style.backgroundColor = "red";
        
    }
}