// api key =  cfc19886056f4d8fbbcfa5c178133e77
var selectEl = document.querySelector('#teams');
var currentYear = moment().format('YYYY');
console.log(currentYear);
// api url
var apiUrl = 'https://api.sportsdata.io/v3/nfl/scores/json/ScoresByWeek/' + currentYear + '/2?key=cfc19886056f4d8fbbcfa5c178133e77';


// Defining async function
async function getapi(url) {

    // Storing response
    const response = await fetch(url);

    // Storing data in form of JSON
    var data = await response.json();
    // console.log(data);
    if (response) {
        hideloader();
    }
    show(data);
}
// Calling that async function
getapi(apiUrl);


// Function to hide the loader
function hideloader() {
    document.getElementById('search-history').style.display = 'none'
}
// Function to define innerHTML for HTML schedule
function show(data) {
    console.log(data);
    let tab = 
        `<ul>
            <li>Home Team</li>
            <li>Away Team</li>
            <li>Location</li>
            <li>Date</li>
            <li>Score</li>
        </ul>`;
    
    // Loop to access all rows
    // Use 'teamValue' and compare to "GlobalAwayTeamID" & "GlobalHomeTeamID"
    // if 'teamValue' is flase ^ skip and check the next object
    // else grab data and display
    for (let r of data) {
        tab += 
            `<ul>
                <li>${r.HomeTeam}</li>
                <li>${r.AwayTeam}</li>
                <li>${r.StadiumDetails.Name}</li>
                <li>${r.Date}</li>
                <li>${r.HomeScore}</li>
            </ul>`;
    }
    // Setting innerHTML as tab variable
    document.getElementById('team-input').innerHTML = tab;
}


selectEl.addEventListener('change', (event) => {
    var teamValue = event.target.value;
    // use 'teamValue' value to loop and find games with correct team ID
    console.log(teamValue);
});