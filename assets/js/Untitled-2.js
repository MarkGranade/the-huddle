fetch(
    'https://app.sportdataapi.com/api/v1/soccer/leagues/101?apikey=7ec85c10-2187-11ec-8e4e-c5d4734ef44a'
  )
    // Converts the response to JSON
    .then(function(response) {
      return response.json();
  
    })
    .then(function(data) {
        console.log(data);
    });
