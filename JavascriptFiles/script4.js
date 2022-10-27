//Function to connect to the form on this page and handle the inputs of the form
function form3Setup(){
    //Collecting the teamNmb and tournament type of the tournament from local storage
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"))
    let tournamentType = localStorage.getItem("tournamentType");

    //Intialising some key variables to be used in this function
    let fixtures;
    let amount;

    //Code to generate the fixtures and fixture amount for the different types of tournaments
    //Knockout
    if (tournamentType == "knockout"){
        //Generating an array for all of the knockout fixtures 
        fixtures = generateKnockout(teamNmb);
        //Finding the amount of knockout games there needs to be 
        amount = findKnockoutAmount();
    }
    //Round Robin
    else{
        //Generating the array of all round robin games
        fixtures = generateRobin();
        //Working out the number of round robin games needed
        amount = (teamNmb * (teamNmb - 1));
    } 

    //This is the code to hide all of the select options
    //This is so that they don't appear uneedingly
    //Some of these are then unhidden when needed
    for (let i=1 ; i<=380 ; i++){
        document.getElementById("fixture"+i).style.display = "none";
    }

    //Code to unhide select options of available fixtures and input the fixture name into it
    for (let i=1 ; i<=amount ; i++){
        document.getElementById("fixture"+i).style.display = "";
        document.getElementById("fixture"+i).innerHTML = fixtures[i-1];
    } 

    //Code to hide the select options of any teams that have already been selected
    //Uses the hideFixtures array in local storage that stores the ids of the select options that have already been selected
    let hideFixtures = JSON.parse(localStorage.getItem("hideFixtures"));

    //First if is to check that there are actually fixtures that need to be hidden
    if (hideFixtures != null){
        //Loop through all of the fixture amount (As this is the maximum that will need to be hidden)
        for (i=0 ; i<= amount-1 ; i++){
            //If hideFixtures array is storing something, then the fixture will be hidden
            if (hideFixtures[i] != undefined){
                document.getElementById(hideFixtures[i]).style.display = "none";
                //This is test text to make sure that the select options that should have been hidden are hidden
                //This works as you will see this test in the select options if it didn't work and therefore you'd know there is an issue
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
    //Validating the inputs of the form
    inputsCorrect = checkGoals(homeGoals, awayGoals)
    fixtureCorrect = checkFixtures(fixture)

    //If statement to only continue if both validations are correct
    if (inputsCorrect == true && fixtureCorrect == true){

        //Function to tell the system that the fixture has already been selected, so it won't be shown again
        formIdCollect(fixtureNmb);

        //Function to process the results from the scores inputted
        //Collecting the tournament type of the tournament
        let tournamentType = localStorage.getItem("tournamentType");

        //Using if statement to check the tournament type and then load the correct function to process the results
        //Knockout
        if (tournamentType == "knockout"){
            knockoutScoreProcess(fixture,homeGoals, awayGoals);
        }
        //Round Robin
        else{
            roundScoreProcess(fixture,homeGoals, awayGoals);
        }
    }
    //Else (For when the validation of the inputs aren't correct)
    else{
        //Page reloaded so user can reenter form
        window.location.href = "resultInput.html";
    }
}

//Function to make sure that the user has inputted a value into the form, rather than it being empty
function checkGoals(homeGoals, awayGoals){
    //Collecting tournament type of the tournament
    let tournamentType = localStorage.getItem("tournamentType");

    //Checking the length of the goals inputs
    //Inputs can be of length 0 as that would mean there is no input
    if (homeGoals.length >= 1 && awayGoals.length >= 1){
        //Checking to see if it is a knockout tournament
        //This is because a knockout game can't end in a draw
        //Knockout 
        if (tournamentType == "knockout"){
            if (homeGoals == awayGoals){
                //Alerting user of error and returning false (So main function doesn't continue)
                alert("Knockout Games can't draw");
                return false;
            }
            return true;
        }
        //Round Robin
        else{
            return true;
        }
    }
    //Output for when if statement fails
    alert("All form inputs must have values entered");
    return false;
}

//Validation function to check that the fixture input is correct
function checkFixtures(fixture){
    //Making sure that the fixture isn't the default value
    if (fixture == "Select Fixture"){
        //Returning an error and false (so main function doesn't continue) if true
        alert("You must select a fixture to input the result for");
        return false;
    }
    //Returning true if false
    return true;
}

//Function to collect the id of the option selected, so it can be hidden if neccesary
function formIdCollect(fixtureNmb){
    //Collecting the teamNmb of the tournament from local storage
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"));

    //Calculating the amount of fixtures in the tournament
    let amount = (teamNmb * (teamNmb - 1));

    //Collecting a hide fixtures array from local storage and either using it or creating it to store the fixtureIds of the fixtures that have been selected
    //This is so that they can be later used to be hidden
    hideFixtures = JSON.parse(localStorage.getItem("hideFixtures"));
    if (hideFixtures == null){
        hideFixtures = new Array(amount);
    }
    //Looping through all positions in the hideFixtures array
    for (i=0 ; i<= amount-1 ; i++){
        //Continuing until the next space is found, where the fixtureId will be stored and the code will stop
        if (hideFixtures[i] == undefined){
            hideFixtures[i] = fixtureNmb
            break;
        }
    }
    //Storing the hideFixtures array in local storage
    localStorage.setItem("hideFixtures", JSON.stringify(hideFixtures));
}

//Function to check and return the home team's name in a fixture
function returnHomeTeam(fixture){
    //Split the fixture into its two teams
    let teams = fixture.split(" v ");
    //Returning the first (home) team
    return teams[0];
}

//Function to check and return the away team's name in a fixture
function returnAwayTeam(fixture){
    //Splitting the fixture into its two teams
    let teams = fixture.split(" v ");
    //Returning the second (away) team
    return teams[1];
}

//Function to process the scores of a round robin game
function roundScoreProcess(fixture,homeGoals,awayGoals){

    //Remaking the object array and collecting the number of teams in the tournament
    let teamNmbs = remakeObjects();
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"));

    //Code to get the individual names of the teams in the fixture
    let homeTeam = returnHomeTeam(fixture);
    let awayTeam = returnAwayTeam(fixture);

    //Intialising variables to store the objects for the home and away team so that they can be used
    let homeTeamObject;
    let awayTeamObject;

    //Code to find the object of the team with the correlated team name
    //Looping through all objects in the object array
    for (let i=0 ; i<= teamNmb-1; i++){
        //Collecting the name of the object that is currenty being looked at
        let objectTeamName = teamNmbs[i].getTeamName()

        //Comparing it with the home and away teams names to see if they are equal
        //If they are equal, the object will be store with where the names match so that they can be used later
        if (objectTeamName == homeTeam){
            homeTeamObject = teamNmbs[i]
        }
        else if (objectTeamName == awayTeam){
            awayTeamObject = teamNmbs[i]
        }
    }
    
    //Processing the different occurences that could happen in a result
    //Home Win
    if (homeGoals > awayGoals){
        console.log(homeTeamObject.getTeamName());
        console.log(awayTeamObject.getTeamName());
    }
    //Draw
    else if (homeGoals == awayGoals){

    }
    //Away Win
    else{

    }
    //Storing the object array so that the the changes that have been made can be carried on
    storeObjects()
}

//Function to process the results in a knockout tournament
function knockoutScoreProcess(fixture,homeGoals, awayGoals){
    //Finding the names of the home and away teams in the tournament
    let homeTeam = returnHomeTeam(fixture);
    let awayTeam = returnAwayTeam(fixture);
}

//Finds the amount of fixtures in a knockout tournament
function findKnockoutAmount(){
    //Collects the number of teams in the tournament from local storage
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"))

    //Compares the number of teams and then correlates it to a set number of fixture amount
    //Like a switch case
    //Then returns the amount 
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

    //Code to remake the objects array to be used
    let teamNmbs = remakeObjects();

    //Code to collect the number of teams from local storage
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"));

    //Calculating the amount of fixtures needed and making an array for it
    let amount = (teamNmb * (teamNmb-1) / 2);
    console.log(amount)

    //Code to make the fixtures array to be returned once fixtures have been generated
    let fixtures = new Array(amount);

    //Variable to keep count on what number in the fixtures array we are on
    localStorage.setItem("fixtureNmb", JSON.stringify(0));

    //For loop to run through all the teams in the table
    for (i=0 ; i<= teamNmb-1; i++){
        //Collecting the name of the team at position i 
        let team1 = teamNmbs[i].getTeamName();

        //For loop to run through all the teams in the table again 
        for (j=0 ; j<= teamNmb-1 ; j++){
            //Collecting the number of fixture that the system is on
            let fixtureNmb = JSON.parse(localStorage.getItem("fixtureNmb"));

            //Collecting the name of the team at positon j, the second team in the fixture
            let team2 = teamNmbs[j].getTeamName();

            //Code to make sure that the team is unique and arent the same
            let go = true;
            //Checking to see if both teams are equal
            if (team1 == team2){
                go = false;
            }
            //If both teams aren't equal a fixture is generated from the teams
            if (go == true){
                //Making the fixture
                let fixture = team1 + " v " + team2;
                //Storing the fixture in the array
                fixtures[fixtureNmb] = fixture;

                //Incrementing the fixture nmb and then storing it in local storage
                fixtureNmb++;
                localStorage.setItem("fixtureNmb", JSON.stringify(fixtureNmb));
            }
        }
    }

    //Returning the fixtures array to be used wherever it is called
    return fixtures;
}

//Function to get the array of fixtures needed for the knockout structure
function generateKnockout(){

    //Code to remake the object array to be used
    let teamNmbs = remakeObjects();

    //Code to get the teamNmb of he tournament and initialise the fixtures 
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"));
    let fixtures

    //Code to generate the round of sixteen fixtures
    // The document.URL.includes parts makes the code more efficient as it doesn't make all of the fixtures for all of the games it only makes the fixtures in which will be shown
    if ((teamNmb >= 16) && (document.URL.includes("Knockoutr16")) ) {

        //Creating the fixture array for the amount of fixtures in the knockout tournament
        fixtures = new Array(8)

        //Looping through to make all the fixtures to put into the fixtures array
        for (let i=0 ; i<= 7 ; i++){
            //Collecting the names of the teams to put into the fixture
            let team1 = teamNmbs[i].getTeamName();
            let nmb = teamNmb-(i+1);
            let team2 = teamNmbs[nmb].getTeamName();

            //Putting together the teams and put them into the fixture
            let fixture = team1 + " v " + team2;

            //Then putting the made fixture into the fixtures array 
            fixtures[i] = fixture
        }
    }
    
    //Code to generate the fixtures for the quarter finals
    if (teamNmb >= 8 && (document.URL.includes("Knockoutquarter"))){

        //Creating the fixture array for the amount of fixtures in the knockout tournament
        fixtures = new Array(4)

        //Collecting the names of the teams that got into the quarter finals
        let quarterTeams = getQuarterTeams();

        //Code to make the fixtures for the quarter finals and then put them into the fixture array
        fixtures[0] = quarterTeams[0] + " v " + quarterTeams[7]
        fixtures[1] = quarterTeams[1] + " v " + quarterTeams[6]
        fixtures[2] = quarterTeams[2] + " v " + quarterTeams[5]
        fixtures[3] = quarterTeams[3] + " v " + quarterTeams[4]
    }
    
    //Code to generate the fixtures for the semiFinals
    if (teamNmb >= 4 && (document.URL.includes("Knockoutsemi"))){

        //Code to make the fixtures array for this stage of the tournament
        fixtures = new Array(2)

        //Collecting the names of the teams that progressed to this stage
        let semiTeams = getSemiTeams();

        //Code to make the fixtures from the teams that progessed this far and then putting them into the fixtures array
        fixtures[0] = semiTeams[0] + " v " + semiTeams[3]
        fixtures[1] = semiTeams[1] + " v " + semiTeams[2]
    }
    
    //Code to generate the fixture for the final
    //It isn't wrapped in a for loop as all knockout tournments will need this
    if (document.URL.includes("Knockoutfinal")){
        //Code to collect the names of the teams at this stage of the tournament
        let finalTeams = getFinalTeams();

        //Code to make the fixture for the final and putting into fixtures
        fixtures = finalTeams[0] + " v " + finalTeams[1]
    }

    //Returning the fixtures variable/array so they can be used wherever they were called
    return fixtures;
}

//The function to store all of the attributes of the objects in the array to local storage so they can be saved
//This is done so that the information can be used later to remake the objects in a different function
function storeObjects(objectArray){

    //Code to collect the number of teams in the tournament and the tournament type
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"))
    let tournamentType = localStorage.getItem("tournamentType");

    //Testing to check the type of tournament it is 
    //This is done as the different tournament types have different variable that they'll have to store 
    if (tournamentType == "knockout"){
        //Looping through all of the number of teams in the array 
        for (let i=1 ; i<=teamNmb ; i++){
            //Storing all of the information from the object into local storing so that is can be collected later
            localStorage.setItem("TeamNmb" + i + "Nmb", objectArray[i-1].getTeamNmb())
            localStorage.setItem("TeamNmb" + i + "NmbCounter", JSON.stringify(objectArray[i-1].getTeamNmbCounter()))
            localStorage.setItem("TeamNmb" + i + "Name", objectArray[i-1].getTeamName())
            localStorage.setItem("TeamNmb" + i + "Quarter", objectArray[i-1].getQuarter())
            localStorage.setItem("TeamNmb" + i + "Semi", objectArray[i-1].getSemi())
            localStorage.setItem("TeamNmb" + i + "Final", objectArray[i-1].getFinal())
            localStorage.setItem("TeamNmb" + i + "Champion", objectArray[i-1].getChampion())
        }
    }
    //Testing to check the type of tournament it is 
    else{
        //Looping through all of the number of teams in the array 
        for (let i=1 ; i<=teamNmb ; i++){
            //Storing all of the information from the object into local storing so that is can be collected later
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

//Function to put back together the array of instances of the class with the saved data made from the storeObjects function
function remakeObjects(){
    //Code to store the tournament type and number of teams in the array
    let tournamentType = localStorage.getItem("tournamentType");
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"))

    //Code to make the array for the objects to be stored in 
    let teamNmbs = new Array(teamNmb)

    //Code to check the type of tournament that we are in
    if (tournamentType == "knockout"){
        //Code to loop through all of the teams in the tournament
        for (i=1 ; i<=teamNmb ; i++){
            //Code to collect all of the information stored in local storage from the storeObjects function and store them in separate variables
            let  pTeamNmb= localStorage.getItem("TeamNmb" + i + "Nmb")
            let  pTeamNmbCounter= JSON.parse(localStorage.getItem("TeamNmb" + i + "NmbCounter"))
            let  pTeamName= localStorage.getItem("TeamNmb" + i + "Name")
            let  pQuarter= localStorage.getItem("TeamNmb" + i + "Quarter")
            let  pSemi= localStorage.getItem("TeamNmb" + i + "Semi")
            let  pFinal= localStorage.getItem("TeamNmb" + i + "Final")
            let  pChampion= localStorage.getItem("TeamNmb" + i + "Champion")
            //Code to use the previously collected variables to make the object for each team and then store them in the object array
            teamNmbs[i-1] = new knockoutTeam(pTeamNmb, pTeamNmbCounter, pTeamName, pQuarter, pSemi, pFinal, pChampion);
        }
    }
    //Code to check the tournament type we are in for whether it is a round robin tournament
    else{
        //Code to loop through all of the teams in the tournament
        for (i=1 ; i<=teamNmb ; i++){
            //Code to collect all of the information stored in local storage from the storeObjects function and store them in separate variables
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
            //Code to make the object from the separate variables and then store them in the object array
            teamNmbs[i-1] = new roundTeam(pTeamNmb, pTeamNmbCounter, pTeamName, pStanding, pWins, pDraws, pLosses, pPts, pGf, pGa, pGd)
        } 
    }
    //Returning the object array so that they can be used from where this function was called
    return teamNmbs
}