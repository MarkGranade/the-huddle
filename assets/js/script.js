// api key =  cfc19886056f4d8fbbcfa5c178133e77
var selectEl = document.querySelector('#teams');
var currentYear = moment().format('YYYY');
var teamValue = 0;
console.log(currentYear);
var apiUrl = 'https://api.sportsdata.io/v3/nfl/scores/json/Schedules/' + currentYear + '?key=cfc19886056f4d8fbbcfa5c178133e77';



// Defining async function
async function getapi(url) {

    // Storing response
    const response = await fetch(url);

    // Storing data in form of JSON
    var data = await response.json();
   
    selectEl.addEventListener('change', (event) => {
        teamValue = parseInt(event.target.value);
        // use 'teamValue' value to loop and find games with correct team ID
        console.log(teamValue);
        show(data);
    });
}
// Calling that async function
getapi(apiUrl);

// Function to define innerHTML for HTML schedule
function show(data) {
    console.log(data);
    // create table headers for each section
    let tab = 
        `<tr>
            <th>Home Team</th>
            <th>Away Team</th>
            <th>City</th>
            <th>Date</th>
            <th>Stadium Type</th>
            <th>T.V. Channel</th>
        </tr>`;
    
    console.log(teamValue);
    // for of loop that displays only games played by the 'teamValue'
    for (let r of data) {
        
        // if 'teamValue' is either the Home or Away team display info for that game
        if (teamValue === r.GlobalAwayTeamID || teamValue === r.GlobalHomeTeamID) {
            // use ternary operator on r.date and r.stadiumdetails
            var displayDate = moment(r.Date ? r.Date : '').format('MM/DD/YYYY');
            console.log(displayDate);

            // HUNTER'S CODE! HE SOLVED IT SO EASY
            if (displayDate === 'Invalid date') {
                displayDate = '';
            };

            // create the html below for each game 'teamValue' plays
            tab += 
            `<tr>
                <td>${r.HomeTeam}</td>
                <td>${r.AwayTeam}</td>
                <td>${r.StadiumDetails ? r.StadiumDetails.City : '--'}</td>
                <td>${displayDate ? displayDate : '--'}</td>
                <td>${r.StadiumDetails ? r.StadiumDetails.Type : '--'}</td>
                <td>${r.Channel ? r.Channel : '--'}</td>
            </tr>`;
        };
    }
    // Setting innerHTML as tab variable
    document.getElementById('schedule-list').innerHTML = tab;
}
