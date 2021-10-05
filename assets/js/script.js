// api key =  cfc19886056f4d8fbbcfa5c178133e77
var selectEl = document.querySelector('#teams');
var currentYear = moment().format('YYYY');
var teamValue = 0;
console.log(currentYear);
// api url
var apiUrl = 'https://api.sportsdata.io/v3/nfl/scores/json/Schedules/' + currentYear + '?key=cfc19886056f4d8fbbcfa5c178133e77';



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
    selectEl.addEventListener('change', (event) => {
        teamValue = parseInt(event.target.value);
        // use 'teamValue' value to loop and find games with correct team ID
        console.log(teamValue);
        show(data);
    });
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
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>`;
    
    // Loop to access all rows
    // Use 'teamValue' and compare to "GlobalAwayTeamID" & "GlobalHomeTeamID"
    // if 'teamValue' is flase ^ skip and check the next object
    // else grab data and display

    // var arr = ['1', '2', '3'];
    // console.log(arr.filter(element => element === '2'))
    console.log(teamValue);
    for (let r of data) {
        // console.log(r.GlobalAwayTeamID);
        // console.log(r.GlobalHomeTeamID);
        // console.log(teamValue === r.GlobalAwayTeamID);
        // console.log(teamValue === r.GlobalHomeTeamID);

        if (teamValue === r.GlobalAwayTeamID || teamValue === r.GlobalHomeTeamID) {
            
            tab += 
            `<li>${r.HomeTeam}  ${r.AwayTeam}  ${r.StadiumDetails ? r.StadiumDetails.City : '' }  ${r.Date ? r.Date : ''}</li>`;
        };
    }
    // Setting innerHTML as tab variable
    document.getElementById('schedule-list').innerHTML = tab;
}


