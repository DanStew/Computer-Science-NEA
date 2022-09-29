let tournamentType;
let teamNmb;

function formSubmit1(){
    //This is the code to take the tournamentType entered from the form
    tournamentType = document.getElementById("type").value;
    localStorage.setItem("tournamentType", tournamentType);

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
    
    //Code to delete the hideFixtures array from memory when a new league is made
    localStorage.removeItem("hideFixtures");

    // This is the code to store the arrayCounter variable in localStorage to be used in the next page
    localStorage.setItem("arrayCounter",JSON.stringify(1));

    //The code below is used to load the user to the next page, as all that is needed from this page has been complete
    window.location.href = "teamInput.html";

    return false;
}

// This is the function that makes sure that the TeamNmb meets the requirements
function numberCheck(teamNmb){
    let tournamentType = localStorage.getItem("tournamentType");
    if (tournamentType == "knockout"){
        if (teamNmb == 2 || teamNmb == 4 || teamNmb == 8 || teamNmb == 16){}
        else{
            alert("Tournaments with a knockout structure only can have either 2 , 4, 8 or 16 teams in them");
            return false;
        }
    }
    if (teamNmb >= 2 && teamNmb<=20){
        return true;
    }
    alert("Team Number must be between 2 and 20");
    return false;
}
