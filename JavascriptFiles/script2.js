//var teamNames = JSON.parse(localStorage.getItem("teamNames"));

function formSetup(){

    // Code to collect the arrayCounter and teamNmbs from local storage
    let arrayCounter = JSON.parse(localStorage.getItem("arrayCounter"));
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"));

    /*let teamNmbs = JSON.parse(localStorage.getItem("teamNmbs"));
    for (i=0 ; i<=teamNmb-1 ; i++){
        teamNmbs[i] = fromJson(teamNmbs[i]);
    }*/


    //This is the function to setup the objects for each team
    if (arrayCounter == 1){
        console.log(teamNmb)
        teamNmbs = new Array(teamNmb)

        for (let i=0 ; i<=teamNmb-1 ; i++){     
            let pTeamNmbCounter = i+1
            let pTeamNmb = "Team " + pTeamNmbCounter        
            teamNmbs[i] = new teamArray(pTeamNmb,pTeamNmbCounter,"",0,0,0,0,0,0,0,0);
        }

        //This is the code, for this example, to populate the array
        //It will also show the option elements to the number in which the user wanted the amount of teams
        for (let i=1 ; i<=teamNmb ; i++){
            let newTeamName = "Team " + i;
            teamNmbs[i-1].setTeamName(newTeamName);
        }

        //This is the code to increment the arrayCounter variable so this code isn't accessed again
        localStorage.setItem("arrayCounter", JSON.stringify(1))

        for (let i=1 ; i<=teamNmb ; i++){
            teamNmbs[i-1].toJson();
        }
        localStorage.setItem("teamNmbs",teamNmbs)
    } 

    //This is the code to hide all of the select options
    for (let i=1 ; i<=20 ; i++){
        document.getElementById("teamNmb"+i).style.display = "none";
    }

    // THis is the code to output the contents of the array to the option elements
    for (let i=1 ; i<=teamNmb ; i++){
        document.getElementById("teamNmb"+i).style.display = "";
        document.getElementById("teamNmb"+i).innerHTML = teamNmbs[i-1].getTeamNmb();
    } 

    //This is the code to store the teamNmbs array into local storage so it can be accessed again
    localStorage.setItem("teamNmbs", JSON.stringify(teamNmbs));
}

function formSubmit2(){
    newName = document.getElementById("teamName").value;
}

//Function to test that changes to the value of the array will be saved (TEST FUNCTION)
function formTest(){
    //Collect the array from local storage
    let teamNmbs = JSON.parse(localStorage.getItem("teamNmbs"));
    //Change the value of an item
    teamNmbs[0].setTeamName("This is a test")
    //Restore the array
    localStorage.setItem("teamNmbs", JSON.stringify(teamNmbs));
    //Reload the page to allow the initial function to run again and see the outcome
    window.location.href = "teamInput.html"
}


//Code to take all of the JSON strings and make them into new objects again so that the functions can be used
fromJson = function(data) {
    return new teamArray(data.teamNmb, data.teamName, data.standing, data.wins , data.draws, data.losses, data.pts, data.gf, data.ga, data.gd);
};


