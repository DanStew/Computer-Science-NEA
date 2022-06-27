//var teamNames = JSON.parse(localStorage.getItem("teamNames"));

function formSetup(){

    // Code to collect the arrayCounter and teamNmbs from local storage
    let arrayCounter = JSON.parse(localStorage.getItem("arrayCounter"));
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"));

    let teamNmbs;


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
        localStorage.setItem("arrayCounter", JSON.stringify(2))
        storeObjects(teamNmbs);
    } 

    /*teamNmbs = JSON.parse(localStorage.getItem("teamNmbs"));
    for (i=0 ; i<=teamNmb-1 ; i++){
        teamNmbs[i] = fromJson(teamNmbs[i]);
    }*/

    teamNmbs = remakeObjects()

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
    var data = JSON.parse(data)
    return new teamArray(data.teamNmb, data.teamName, data.standing, data.wins , data.draws, data.losses, data.pts, data.gf, data.ga, data.gd);
};

function storeObjects(objectArray){
    console.log(objectArray[0].getTeamNmb())
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"))
    for (let i=1 ; i<=teamNmb ; i++){
        localStorage.setItem("TeamNmb" + i + "Nmb", objectArray[i-1].getTeamNmb())
        localStorage.setItem("TeamNmb" + i + "NmbCounter", JSON.stringify(objectArray[i-1].getTeamNmbCounter()))
        localStorage.setItem("TeamNmb" + i + "Name", objectArray[i-1].getTeamName())
        localStorage.setItem("TeamNmb" + i + "Standing", JSON.stringify(objectArray[i-1].getStanding()))
        localStorage.setItem("TeamNmb" + i + "Wins", JSON.stringify(objectArray[i-1].getWins()))
        localStorage.setItem("TeamNmb" + i + "Draws", JSON.stringify(objectArray[i-1].getDraws()))
        localStorage.setItem("TeamNmb" + i + "Losses", JSON.stringify(objectArray[i-1].getLosses()))
        localStorage.setItem("TeamNmb" + i + "Pts", JSON.stringify(objectArray[i-1].getPts()))
        localStorage.setItem("TeamNmb" + i + "Gf", JSON.stringify(objectArray[i-1].getGf()))
        localStorage.setItem("TeamNmb" + i + "Ga", JSON.stringify(objectArray[i-1].getGa()))
        localStorage.setItem("TeamNmb" + i + "Gd", JSON.stringify(objectArray[i-1].getGd()))
    }
}

function remakeObjects(){
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"))
    let teamNmbs = new Array(teamNmb)
    for (let i=1 ; i<=teamNmb ; i++){
        let  pTeamNmb= localStorage.getItem("TeamNmb" + i + "Nmb")
        let  pTeamNmbCounter= JSON.parse(localStorage.getItem("TeamNmb" + i + "NmbCounter"))
        let  pTeamName= localStorage.getItem("TeamNmb" + i + "Name")
        let  pStanding =  JSON.parse(localStorage.getItem("TeamNmb" + i + "Standing"))
        let  pWins= JSON.parse(localStorage.getItem("TeamNmb" + i + "Wins"))
        let  pDraws= JSON.parse(localStorage.getItem("TeamNmb" + i + "Draws"))
        let  pLosses= JSON.parse(localStorage.getItem("TeamNmb" + i + "Losses"))
        let  pPts= JSON.parse(localStorage.getItem("TeamNmb" + i + "Pts"))
        let  pGf= JSON.parse(localStorage.getItem("TeamNmb" + i + "Gf"))
        let  pGa= JSON.parse(localStorage.getItem("TeamNmb" + i + "Ga"))
        let  pGd= JSON.parse(localStorage.getItem("TeamNmb" + i + "Gd"))
        teamNmbs[i-1] = new teamArray(pTeamNmb, pTeamNmbCounter , pTeamName, pStanding, pWins, pDraws, pLosses, pPts, pGf, pGa, pGd)
    }
    return teamNmbs
}

