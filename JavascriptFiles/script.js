let tournamentType;
let teamNmb;

function formSubmit1(){
    //Take the teamNmb and Passes it into the data validation function for that function
    teamNmb = document.getElementById("teamNmb").value;
    // This is so that this variable can be accessed in the different files of the website
    localStorage.setItem("teamNmb", JSON.stringify(teamNmb));
    let checked = numberCheck(teamNmb);

    // This if statement reloads the page and exits the function to allow the user to enter a valid TeamNmb 
    if (checked == false){
        window.location.href = "index.html"
        return null;
    }

    //This is the code to take the tournamentType entered from the form
    tournamentType = document.getElementById("type").value;
    localStorage.setItem("tournamentType", tournamentType);

    
    // This following code creates the array to the value of the amount of teams the user entered
    teams = createArray(teamNmb);

    // This is the code to store the arrayCounter variable in localStorage to be used in the next page
    localStorage.setItem("arrayCounter",JSON.stringify(1));

    //The code below is used to load the user to the next page, as all that is needed from this page has been complete
    window.location.href = "teamInput.html";

   

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