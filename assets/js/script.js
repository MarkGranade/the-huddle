// api key =  cfc19886056f4d8fbbcfa5c178133e77
var selectEl = document.querySelector('#teams');
var currentYear = moment().format('YYYY');
console.log(currentYear);

// teams.value = the value of each team in the dropdown

// API CALL FOR SCORES BY WEEK
var getSchedule = function() {
    var apiUrl = 'https://api.sportsdata.io/v3/nfl/scores/json/ScoresByWeek/' + currentYear + '/2?key=cfc19886056f4d8fbbcfa5c178133e77';

    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
            displaySchedule(data);
        })
    })
};

// GET CURRENT WEEK FUNCTION()
var getCurrentWeek = function() {
    var weekApi = 'https://api.sportsdata.io/v3/nfl/scores/json/CurrentWeek?key=cfc19886056f4d8fbbcfa5c178133e77';

    fetch(weekApi).then(function(response) {
        response.json().then(function(week) {
            console.log(week);
        })
    })
}


// DISPLAY TEAM GAMES FUNCTION
// - search for any game with team id === dropdown selection
// - 


// DISPLAY SCHEDULE FUNCTION()  
var displaySchedule = function(schedule, week) {
    // for (var i = 0; i < schedule.length; i++) {
}
// - create loop for schedule API to find
// -    - team
// -    - date

// - create variable to display the following
// -    - home team
// -    - away team
// -    - location
// -    - date
// -    - time
// - create element to display data in HTML


getCurrentWeek();
getSchedule();

selectEl.addEventListener('change', (event) => {
    var result = document.querySelector('#schedule-list');
    // result.textContent = `You like ${event.target.value}`;
    console.log(event);
});