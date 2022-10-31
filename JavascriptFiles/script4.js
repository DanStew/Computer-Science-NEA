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

        //Code to collect the variables to see what stage the knockout tournament is on
        let r16Pass = localStorage.getItem("r16Pass");
        let quarterPass = localStorage.getItem("quarterPass");
        let semiPass = localStorage.getItem("semiPass");
        let finalPass = localStorage.getItem("finalPass");

        //Code to check whether each stage of the tournament has been passed (Completed or not)
        //Round of 16
        if (r16Pass == "false"){
            //If not passed, generate round of 16 fixtures
            fixtures = generateR16();
            //Setting the number of fixtures in the tournament
            amount = 8;
        }
        //Quarter Final
        else if (quarterPass == "false"){
            //If not passed, generate quarter final fixtures
            fixtures = generateQuarter();
            //Setting the number of fixtures in the tournament
            amount = 4;
        }
        //Semi Final
        else if (semiPass == "false"){
            //If not passed, generate semi final fixtures
            fixture = generateSemi();
            //Setting the number of fixtures in the tournament
            amount  = 2;
        }
        //Final
        else if (finalPass == "false"){
            //If not passed, generate final fixture
            fixture = generateFinal();
            //Setting number of fixtures in the tournament
            amount = 1;
        }
        //If all fixtures Passed
        else{
            fixture = "No remaining fixtures";
            //Setting number of amount of fixtures in the tournament : This is 1 so it displays the message that no fixtures remain
            amount = 1;
        }
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
    //This code also converts the string that is collected from the form into an integer so that the variables can be used in calculations
    homeGoalsInput = document.getElementById("homeGoals").value;
    homeGoals = + homeGoalsInput;

    awayGoalsInput = document.getElementById("awayGoals").value;
    awayGoals = + awayGoalsInput;

    //Function to make sure that all the inputs in the form have been selected
    //Validating the inputs of the form
    inputsCorrect = checkGoals(homeGoalsInput, awayGoalsInput)
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

    //Collecting the type of tournament from local storage
    let tournamentType = localStorage.getItem("tournamentType");

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

    //Code to check if all the inputs of each stage of a knockout tournament have been entered
    if (tournamentType == "knockout"){
        if (hideFixtures[14] != undefined){
            localStorage.setItem("finalPass", "true")
        }
        else if (hideFixtures[13] != undefined){
            localStorage.setItem("semiPass", "true")
        }
        else if (hideFixtures[11] != undefined){
            localStorage.setItem("quarterPass", "true")
        }
        else if (hideFixtures[7] != undefined){
            localStorage.setItem("r16Pass", "true")
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

        //Code to update the attributes of the home team's object
        homeTeamObject.setWins();
        homeTeamObject.setGf(homeGoals);
        homeTeamObject.setGa(awayGoals);
        homeTeamObject.setGd();
        homeTeamObject.setPts();
 
        //Code to update the attributes of the away teams object
        awayTeamObject.setLosses();
        awayTeamObject.setGf(awayGoals);
        awayTeamObject.setGa(homeGoals);
        awayTeamObject.setGd();

    }

    //Draw
    else if (homeGoals == awayGoals){
     
        //Code to update the attributes of the home team's object
        homeTeamObject.setDraws();
        homeTeamObject.setGf(homeGoals);
        homeTeamObject.setGa(awayGoals);
        homeTeamObject.setGd();
        homeTeamObject.setPts();

        //Code to update the attributes of the away team's object
        awayTeamObject.setDraws();
        awayTeamObject.setGf(homeGoals);
        awayTeamObject.setGa(awayGoals);
        awayTeamObject.setGd();
        awayTeamObject.setPts();

    }

    //Away Win
    else{

        //Code to update the attributes of the home team's object
        homeTeamObject.setLosses();
        homeTeamObject.setGf(homeGoals);
        homeTeamObject.setGa(awayGoals);
        homeTeamObject.setGd();

        //Code to update the attributes of the away team's object
        awayTeamObject.setWins();
        awayTeamObject.setGf(homeGoals);
        awayTeamObject.setGa(awayGoals);
        awayTeamObject.setGd();
        awayTeamObject.setPts();

    }

    //Storing the object array so that the the changes that have been made can be carried on
    storeObjects(teamNmbs)

    //Code to update the standing in the table, as a result of the score that has just been submitted
    updateStanding(teamNmbs)

    
}

//Function to process the results in a knockout tournament
function knockoutScoreProcess(fixture,homeGoals, awayGoals){

    //Code to make the object array to be used
    let teamNmbs = remakeObjects();
    console.log(teamNmbs)

    //Finding the names of the home and away teams in the tournament
    let homeTeam = returnHomeTeam(fixture);
    alert(homeTeam)
    let awayTeam = returnAwayTeam(fixture);

    //Initialising the home and away team objects so they can be used
    let homeTeamObject;
    let awayTeamObject;

    //Code to find the object of the team with the correlated team name
    //Looping through all objects in the object array
    for (let i=0 ; i<= teamNmb-1; i++){
        //Collecting the name of the object that is currenty being looked at
        let objectTeamName = teamNmbs[i].getTeamName()
        alert(objectTeamName + " i ")

        //Comparing it with the home and away teams names to see if they are equal
        //If they are equal, the object will be store with where the names match so that they can be used later
        if (objectTeamName == homeTeam){
            homeTeamObject = teamNmbs[i]
        }
        else if (objectTeamName == awayTeam){
            awayTeamObject = teamNmbs[i]
        }
    }

    //Function to find the stage of the tournament that the knockout tournament is in
    let knockoutStage = findStage();

    //Code to check the type of result it is (Home win or Away Win)
    //There is no need to check for a draw as the validation of the goals in a knockout tournament mean that they can't be equal
    
    //Home Win
    if (homeGoals > awayGoals){

        alert(homeTeamObject)

        //Changing the attribute of the home team 
        //This is done by first checking the stage of the tournament that it is in, so that the correct attribute can be changed
        if (knockoutStage == "r16"){
            homeTeamObject.setQuarter();
        }
        else if (knockoutStage == "quarter"){
            homeTeamObject.setSemi();
        }
        else if (knockoutStage == "semi"){
            homeTeamObject.setFinal();
        }
        else if (knockoutStage == "final"){
            homeTeamObject.setChampion();
        }

    }

    //Away Win
    else if (awayGoals > homeGoals){

        //Changing the attribute of the away team 
        //This is done by first checking the stage of the tournament that it is in, so that the correct attribute can be changed
        if (knockoutStage == "r16"){
            awayTeamObject.setQuarter();
        }
        else if (knockoutStage == "quarter"){
            awayTeamObject.setSemi();
        }
        else if (knockoutStage == "semi"){
            awayTeamObject.setFinal();
        }
        else if (knockoutStage == "final"){
            awayTeamObject.setChampion();
        }

    }

    //Code to store the objects 
    storeObjects(teamNmbs);
}

//Function to find the current stage of the tournament that the team is on 
function findStage(){

    //Code to collect the collect the conditional variables of the stages 
    let r16Pass = localStorage.getItem("r16Pass");
    let quarterPass = localStorage.getItem("quarterPass");
    let semiPass = localStorage.getItem("semiPass");
    let finalPass = localStorage.getItem("finalPass");

    //Comparing the boolean values of the boolean variables to see which stage the tournament is currently on
    if (r16Pass == "false"){
        return "r16";
    }
    else if (quarterPass == "false"){
        return "quarter";
    }
    else if (semiPass == "false"){
        return "semi";
    }
    else if (finalPass == "false"){
        return "final";
    }
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

//Function to update the standing attributes in the object by comparing the points and sorting them by number
function updateStanding(objectArray){

    //Collecting the number of teams in the tournament
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb")); 

    //Creating the object array to be used
    let teamNmbs = remakeObjects();

    //Initialising the teamObject
    let teamObject;

    //Creating a 2d array to store the name of the team and the points that they have

    //Creating the overall 2d array
    let pointsArray = new Array(teamNmb);

    //Creating mini array within the array (To act as if it was a 2d array)
    for (i=0 ; i<= teamNmb-1 ; i++){
        //Making the mini arrays
        pointsArray[i] = new Array(2)

        //Inputting the data into the mini arrays (within the larger array)
        pointsArray[i][0] = objectArray[i].getTeamName();
        pointsArray[i][1] = objectArray[i].getPts();
    }

    //Commencing a bubble sort on the pts totals in the array, to get them in order
    //Outer Loop
    for (i=0 ; i<= teamNmb-2 ; i++){
        //Creating a swapped variable to increase the efficiency of the function
        let swapped = false
        //Inner Loop
        for(j=1 ; j<= teamNmb-1-i ; j++){
            //Sorting the numbers in descending order, so the team with the most points appear at the top
            if (pointsArray[j-1][1] < pointsArray[j][1]){
                
                //Storing the temporary variables of the two things in the 2d array
                tempName = pointsArray[j][0]
                tempPts = pointsArray[j][1]

                //Swapping the variables 
                pointsArray[j][0] = pointsArray[j-1][0]
                pointsArray[j][1] = pointsArray[j-1][1]
                pointsArray[j-1][0] = tempName
                pointsArray[j-1][1] = tempPts

                //Setting the swapped variable to true
                swapped = true
            }
        }

        //Making sure that the variable has been swapped
        if (swapped == false){
            break;
        }
    }

    //Collecting the team names from the array and then giving them the correct standing in the array 
    for (i=0 ; i<= teamNmb-1 ; i++){
        //Getting the name of the team from the pointsArray
        let teamName = pointsArray[i][0];
        //Comparing the name of the team to the names in the objects so that I can find the right object
        for  (j=0 ; j<= teamNmb-1 ; j++){
            //Getting the name of the team to compare
            let teamCompare = teamNmbs[j].getTeamName();
            //Comparing the two team names
            if (teamName == teamCompare){
                //Collecting and storing the object when these names meet
                teamObject = teamNmbs[j]
                break;
            }
        }

        //Changing the standing of the teams object
        teamObject.setStanding(i+1);

    }

    //Storing the changes that have been made
    storeObjects(teamNmbs);
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

//Function to generate the round of 16 fixtures in the tournament
function generateR16(){

    //Code to remake the object array to be used
    let teamNmbs = remakeObjects();

    //Code to get the teamNmb of he tournament
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"));

    //Creating the fixture array for the amount of fixtures in the knockout tournament
    let fixtures = new Array(8)

    //Looping through to make all the fixtures to put into the fixtures array
    for (let i=0 ; i<= 7 ; i++){
        //Collecting the names of the teams to put into the fixture
        let team1 = teamNmbs[i].getTeamName();
        let nmb = teamNmb-(i+1);
        let team2 = teamNmbs[nmb].getTeamName();

        //Putting together the teams and put them into the fixture
        let fixture = team1 + " v " + team2;

        //Then putting the made fixture into the fixtures array 
        fixtures[i] = fixture;
    }

    return fixtures; 
}

//Function to generate the fixtures for the quarter final stage of a knockout tournament
function generateQuarter(){    

    //Creating the fixture array for the amount of fixtures in the knockout tournament
    let fixtures = new Array(4)

    //Collecting the names of the teams that got into the quarter finals
    let quarterTeams = getQuarterTeams();

    //Code to make the fixtures for the quarter finals and then put them into the fixture array
    fixtures[0] = quarterTeams[0] + " v " + quarterTeams[7]
    fixtures[1] = quarterTeams[1] + " v " + quarterTeams[6]
    fixtures[2] = quarterTeams[2] + " v " + quarterTeams[5]
    fixtures[3] = quarterTeams[3] + " v " + quarterTeams[4]

    //Returning the fixtures
    return fixtures;
}

//Function to generate the fixtures for the semi final stage of the knockout tournament
function generateSemi(){

    //Code to make the fixtures array for this stage of the tournament
    fixtures = new Array(2)

    //Collecting the names of the teams that progressed to this stage
    let semiTeams = getSemiTeams();

    //Code to make the fixtures from the teams that progessed this far and then putting them into the fixtures array
    fixtures[0] = semiTeams[0] + " v " + semiTeams[3]
    fixtures[1] = semiTeams[1] + " v " + semiTeams[2]

    //Returning the fixtures
    return fixtures;

}

//Function to generate the fixtures for the final stage of the tournament
function generateFinal(){

    //Code to collect the names of the teams at this stage of the tournament
    let finalTeams = getFinalTeams();

    //Code to make the fixture for the final and putting into fixtures
    fixtures = finalTeams[0] + " v " + finalTeams[1]

    //Returning the fixtures
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
        for (let i=1 ; i<=teamNmb-1 ; i++){
            console.log("Entered")
            //Storing all of the information from the object into local storing so that is can be collected later
            localStorage.setItem("TeamNmb" + i + "Nmb", JSON.stringify(objectArray[i-1].getTeamNmb()))
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
    return teamNmbs;
}