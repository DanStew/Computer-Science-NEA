//Function to connect to the form on this page and handle the inputs of the form
function form3Setup(){
    console.log("Form3")
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"))
    let tournamentType = localStorage.getItem("tournamentType");
    let fixtures;
    let amount;

    //Code to generate the fixtures and fixture amount for the different types of tournaments
    if (tournamentType == "knockout"){
        fixtures = generateKnockout(teamNmb);
        amount = findKnockoutAmount();
        console.log(amount)
    }
    else{
        fixtures = generateRobin();
        amount = (teamNmb * (teamNmb - 1));
    } 

    //This is the code to hide all of the select options
    for (let i=1 ; i<=380 ; i++){
        console.log("Hide")
        document.getElementById("fixture"+i).style.display = "none";
    }

    //Code to unhide select options of available fixtures and input the fixture name into it
    for (let i=1 ; i<=amount ; i++){
        console.log("Fixture")
        document.getElementById("fixture"+i).style.display = "";
        document.getElementById("fixture"+i).innerHTML = fixtures[i-1];
    } 

    //Code to hide the select options of any teams that have already been selected
    let hideFixtures = JSON.parse(localStorage.getItem("hideFixtures"));
    if (hideFixtures != null){
        for (i=0 ; i<= amount-1 ; i++){
            if (hideFixtures[i] != undefined){
                console.log("hide fixture");
                console.log(hideFixtures[i])
                document.getElementById(hideFixtures[i]).style.display = "none";
                document.getElementById(hideFixtures[i]).innerHTML = "Fixture should be hidden";
            }
        }
    }
}


//Function to deal with the inputs and call all necessary functions and actions required from the input of a form
function formSubmit3(){
    //Variables to store all of the variables needed to be collected from the form
    fixture = document.getElementById("fixtureSelected").value;

    //Collect the index of the option selected
    fixtureNmb = document.getElementById("fixtureSelected").selectedIndex;
    //Normalise it with the form of the option id's, to get the id of the option selected
    fixtureNmb = "fixture" + (fixtureNmb);

    //Collects the goals from the inputs
    homeGoals = document.getElementById("homeGoals").value;
    awayGoals = document.getElementById("awayGoals").value;

    //Function to make sure that all the inputs in the form have been selected
    inputsCorrect = checkGoals(homeGoals, awayGoals)
    fixtureCorrect = checkFixtures(fixture)
    if (inputsCorrect == true && fixtureCorrect == true){

        //Function to tell the system that the fixture has already been selected, so it won't be shown again
        formIdCollect(fixtureNmb);

        //Function to process the results from the scores inputted
        let tournamentType = localStorage.getItem("tournamentType");
        if (tournamentType == "knockout"){
            knockoutScoreProcess(fixture,homeGoals, awayGoals);
        }
        else{
            roundScoreProcess(fixture,homeGoals, awayGoals);
        }
    }
    else{
        window.location.href = "resultInput.html";
    }
}

//Function to make sure that the user has inputted a value into the form, rather than it being empty
function checkGoals(homeGoals, awayGoals){
    let tournamentType = localStorage.getItem("tournamentType");
    if (homeGoals.length >= 1 && awayGoals.length >= 1){
        if (knockout == "knockout"){
            if (homeGoals == awayGoals){
                alert("Knockout Games can't draw");
                return false;
            }
            return true;
        }
        else{
            return true;
        }
    }
    alert("All form inputs must have values entered");
    return false;
}

function checkFixtures(fixture){
    if (fixture == "Select Fixture"){
        alert("You must select a fixture to input the result for");
        return false;
    }
    return true;
}

//Function to collect the id of the option selected, so it can be hidden if neccesary
function formIdCollect(fixtureNmb){
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"));
    let amount = (teamNmb * (teamNmb - 1));
    hideFixtures = JSON.parse(localStorage.getItem("hideFixtures"));
    console.log(hideFixtures);
    if (hideFixtures == null){
        hideFixtures = new Array(amount);
    }
    for (i=0 ; i<= amount-1 ; i++){
        if (hideFixtures[i] == undefined){
            hideFixtures[i] = fixtureNmb
            break;
        }
    }
    localStorage.setItem("hideFixtures", JSON.stringify(hideFixtures));
}

function returnHomeTeam(fixture){
    let teams = fixture.split(" v ");
    return teams[0];
}

function returnAwayTeam(fixture){
    let teams = fixture.split(" v ");
    return teams[1];
}

function roundScoreProcess(fixture,homeGoals,awayGoals){
    let teamNmbs = remakeObjects();
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"));

    //Code to get the individual names of the teams in the fixture
    let homeTeam = returnHomeTeam(fixture);
    let awayTeam = returnAwayTeam(fixture);
    console.log(homeTeam)
    console.log(awayTeam)

    let homeTeamObject;
    let awayTeamObject;

    //Code to find the object of the team with the correlated team name
    for (let i=0 ; i<= teamNmb-1; i++){
        let objectTeamName = teamNmbs[i].getTeamName()
        if (objectTeamName == homeTeam){
            homeTeamObject = teamNmbs[i]
        }
        else if (objectTeamName == awayTeam){
            awayTeamObject = teamNmbs[i]
        }
    }
    
    if (homeGoals > awayGoals){
        console.log(homeTeamObject.getTeamName());
        console.log(awayTeamObject.getTeamName());
    }
    else if (homeGoals == awayGoals){

    }
    else{

    }
    storeObjects()
}

function knockoutScoreProcess(fixture,homeGoals, awayGoals){
    let homeTeam = returnHomeTeam(fixture);
    let awayTeam = returnAwayTeam(fixture);
}

//Finds the amount of fixtures in a knockout tournament
function findKnockoutAmount(){
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"))
    if (teamNmb == 16){
        amount = 8;
        return amount;
    }
    else if (teamNmb == 8){
        amount = 4;
        return amount;
    }
    else if (teamNmb == 4){
        amount = 2;
        return amount;
    }
    else{
        amount = 1; 
        return amount;
    }
}


//Function to generate the fixtures for the round robin side of the tournament
function generateRobin(){
    let teamNmbs = remakeObjects();
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"));

    //Calculating the amount of fixtures needed and making an array for it
    let amount = (teamNmb * (teamNmb-1));
    console.log(amount)
    let fixtures = new Array(amount);

    //Variable to keep count on what number in the fixtures array we are on
    localStorage.setItem("fixtureNmb", JSON.stringify(0));

    //For loop to run through all the teams in the table
    for (i=0 ; i<= teamNmb-1; i++){
        let team1 = teamNmbs[i].getTeamName();

        //For loop to run through all the teams in the table again 
        for (j=0 ; j<= teamNmb-1 ; j++){
            let fixtureNmb = JSON.parse(localStorage.getItem("fixtureNmb"));
            let team2 = teamNmbs[j].getTeamName();

            //Code to make sure that the team is unique and arent the same
            let go = true;
            if (team1 == team2){
                go = false;
            }
            if (go == true){
                let fixture = team1 + " v " + team2;
                fixtures[fixtureNmb] = fixture;
                fixtureNmb++;
                localStorage.setItem("fixtureNmb", JSON.stringify(fixtureNmb));
            }
        }
    }

    return fixtures;
}

//Function to get the array of fixtures needed for the knockout structure
function generateKnockout(){
    console.log("entered knockout")
    let teamNmbs = remakeObjects();
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"));
    let fixtures;

    //Code to generate the round of sixteen fixtures
    // The document.URL.includes parts makes the code more efficient as it doesn't make all of the fixtures for all of the games it only makes the fixtures in which will be shown
    if ((teamNmb >= 16) && (document.URL.includes("Knockoutr16") || document.URL.includes("resultInput")) ) {
        console.log("Entered round of 16")
        fixtures = new Array(8)
        for (let i=0 ; i<= 7 ; i++){
            let team1 = teamNmbs[i].getTeamName();
            let nmb = teamNmb-(i+1);
            let team2 = teamNmbs[nmb].getTeamName();
            let fixture = team1 + " v " + team2;
            fixtures[i] = fixture
        }
    }
    
    //Code to generate the fixtures for the quarter finals
    else if (teamNmb >= 8 && (document.URL.includes("Knockoutquarter")|| document.URL.includes("resultInput"))){
        fixtures = new Array(4)
        let quarterTeams = getQuarterTeams();
        console.log(quarterTeams)
        fixtures[0] = quarterTeams[0] + " v " + quarterTeams[7]
        fixtures[1] = quarterTeams[1] + " v " + quarterTeams[6]
        fixtures[2] = quarterTeams[2] + " v " + quarterTeams[5]
        fixtures[3] = quarterTeams[3] + " v " + quarterTeams[4]
    }
    
    //Code to generate the fixtures for the semiFinals
    else if (teamNmb >= 4 && (document.URL.includes("Knockoutsemi")|| document.URL.includes("resultInput"))){
        fixtures = new Array(2)
        let semiTeams = getSemiTeams();
        console.log(semiTeams)
        fixtures[0] = semiTeams[0] + " v " + semiTeams[3]
        fixtures[1] = semiTeams[1] + " v " + semiTeams[2]
    }
    
    //Code to generate the fixture for the final
    //It isn't wrapped in a for loop as all knockout tournments will need this
    else if (document.URL.includes("Knockoutfinal")|| document.URL.includes("resultInput")){
        let finalTeams = getFinalTeams();
        console.log(finalTeams)
        fixtures = new Array(1);
        fixtures[0] = finalTeams[0] + " v " + finalTeams[1]
    }

    console.log(fixtures)
    return fixtures;
}

//The function to store all of the attributes of the objects in the array to local storage so they can be saved
function storeObjects(objectArray){
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"))
    let tournamentType = localStorage.getItem("tournamentType");
    if (tournamentType == "knockout"){
        for (let i=1 ; i<=teamNmb ; i++){
            localStorage.setItem("TeamNmb" + i + "Nmb", objectArray[i-1].getTeamNmb())
            localStorage.setItem("TeamNmb" + i + "NmbCounter", JSON.stringify(objectArray[i-1].getTeamNmbCounter()))
            localStorage.setItem("TeamNmb" + i + "Name", objectArray[i-1].getTeamName())
            localStorage.setItem("TeamNmb" + i + "Quarter", objectArray[i-1].getQuarter())
            localStorage.setItem("TeamNmb" + i + "Semi", objectArray[i-1].getSemi())
            localStorage.setItem("TeamNmb" + i + "Final", objectArray[i-1].getFinal())
            localStorage.setItem("TeamNmb" + i + "Champion", objectArray[i-1].getChampion())
            localStorage.setItem("TeamNmb" + i + "Champion", objectArray[i-1].getStanding())
        }
    }
    else{
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
}

//Function to put back together the array of instances of the class with the saved data
function remakeObjects(){
    let tournamentType = localStorage.getItem("tournamentType");
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"))
    let teamNmbs = new Array(teamNmb)
    if (tournamentType == "knockout"){
        for (i=1 ; i<=teamNmb ; i++){
            let  pTeamNmb= localStorage.getItem("TeamNmb" + i + "Nmb")
            let  pTeamNmbCounter= JSON.parse(localStorage.getItem("TeamNmb" + i + "NmbCounter"))
            let  pTeamName= localStorage.getItem("TeamNmb" + i + "Name")
            let  pQuarter= localStorage.getItem("TeamNmb" + i + "Quarter")
            let  pSemi= localStorage.getItem("TeamNmb" + i + "Semi")
            let  pFinal= localStorage.getItem("TeamNmb" + i + "Final")
            let  pChampion= localStorage.getItem("TeamNmb" + i + "Champion")
            teamNmbs[i-1] = new knockoutTeam(pTeamNmb, pTeamNmbCounter, pTeamName, pQuarter, pSemi, pFinal, pChampion);
        }
    }
    else{
        for (i=1 ; i<=teamNmb ; i++){
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
            teamNmbs[i-1] = new roundTeam(pTeamNmb, pTeamNmbCounter, pTeamName, pStanding, pWins, pDraws, pLosses, pPts, pGf, pGa, pGd)
        } 
    }
    return teamNmbs
}