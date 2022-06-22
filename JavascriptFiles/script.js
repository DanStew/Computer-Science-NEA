let tournamentType;
let teamNmb;

function formSubmit1(){
    //Take the teamNmb and Passes it into the data validation function for that function
    teamNmb = document.getElementById("teamNmb").value;
    let checked = numberCheck(teamNmb);

    // This if statement reloads the page and exits the function to allow the user to enter a valid TeamNmb 
    if (checked == false){
        window.location.href = "index.html"
        return null;
    }

    //This is the code to take the tournamentType entered from the form
    tournamentType = document.getElementById("type").value;
    
    // This following code creates the array to the value of the amount of teams the user entered
    teams = createArray(teamNmb);
    var teamNames = JSON.parse(localStorage.getItem("teamNames"));
    console.log(teamNames);

    return false;
}

// This is the function that makes sure that the TeamNmb meets the requirements
function numberCheck(teamNmb){
    if (teamNmb >= 2 && teamNmb<=20){
        return true;
    }
    alert("Team Number must be between 2 and 20");
    return false;
}

// This is the function that will create the array for the team names to be stored in
function createArray(teamNmb){
    let teamNames = new Array(teamNmb);
    for (let i=1 ; i<=teamNmb; i++){
        teamNames[i-1] = "Team " + i;
    }
    localStorage.setItem("teamNames", JSON.stringify(teamNames));
    return;
}