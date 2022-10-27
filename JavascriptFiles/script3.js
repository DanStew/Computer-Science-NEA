//Function to set up the table setup page page with all of the code for it
function tableSetup(){

    //Code to make an array of the team objects
    let teamNmbs = remakeObjects();

    //Code to collect the amount of teams inputted from form 1
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"))
    let nmb = teamNmb
    nmb++

    //For loop to input all of the information from the objects into the table
    for (i=1 ; i<= teamNmb ; i++){
        //For each variable in the object, the function to get that variae from the object will be called and then be outputted to the table
        document.getElementById("standing"+i).innerHTML = teamNmbs[i-1].getStanding();
        document.getElementById("teamName"+i).innerHTML = teamNmbs[i-1].getTeamName();
        document.getElementById("button"+i).innerHTML = teamNmbs[i-1].getTeamName();
        document.getElementById("wins"+i).innerHTML = teamNmbs[i-1].getWins();
        document.getElementById("draws"+i).innerHTML = teamNmbs[i-1].getDraws();
        document.getElementById("losses"+i).innerHTML = teamNmbs[i-1].getLosses();
        document.getElementById("goalsAgainst"+i).innerHTML = teamNmbs[i-1].getGf();
        document.getElementById("goalDifference"+i).innerHTML = teamNmbs[i-1].getGa();
        document.getElementById("points"+i).innerHTML = teamNmbs[i-1].getGd();
        document.getElementById("goalsFor"+i).innerHTML = teamNmbs[i-1].getPts();
    }

    //Code to hide all buttons which are out of the range of the number of teams entered
    //Ie if user input teamNmb = 8, the website doesn't need to show the button for team 20
    for (i=nmb ; i<= 20 ; i++){
        document.getElementById("button"+i).style.visibility = "hidden"
    }
}

//Function to set up the specific team pages of the website
function teamSetup(){

        //Function to generate the fixtures for the round robin tournament
        let fixtures = generateRobin();

        //Function to display the fixtures to the website
        displayRobin(fixtures);
}

//Function to set up the knockout page of the website when it's needed
function knockoutSetup(){
    
    //Code to get the names of the teams in order to put into the knockout structure
    //It calls each function which will return the array of the teams to be outputted to the table 
    let semiTeams = getSemiTeams();
    let finalTeams = getFinalTeams();
    let champion  = getChampion();

    //Code to output the names of the teams to the website
    document.getElementById("topS").innerHTML = semiTeams[0];
    document.getElementById("3S").innerHTML = semiTeams[1];
    document.getElementById("botS").innerHTML = semiTeams[2];
    document.getElementById("2S").innerHTML = semiTeams[3];
    document.getElementById("topF").innerHTML = finalTeams[0];
    document.getElementById("botF").innerHTML = finalTeams[1];
    document.getElementById("champ").innerHTML = champion;

    //Code to reload the page to make sure that the information loaded onto the page will actually load to be seen 
    let reload = localStorage.getItem("reload", "true");
    if (reload == "true"){
        console.log("reloaded page")
        window.location.href = "Knockoutr16.html"
        
        //Code to make sure that the page won't be reloaded again 
        localStorage.setItem("reload", "false")
    }

    //Function to hide the sections of the knockout tournament not needed
    //These are the tabs that won't need to be selected if there aren't enough teams in the tournament to fill them
    hideSection();

    //Code to generate and display the fixtures for the website to display
    setValues();
    displayFixtures();
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

//Function to generate and display the fixtures onto the website
function displayFixtures(){

    //Function to generate the fixtures

    //Setting default values to test this that this code is working correctly
    //This will be changed when we get to the point where results can be processed
    setValues();

    //Code to generate the fixtures to be outputted to the website
    let fixtures = generateKnockout();

    //Code to get the number of teams in the tournament
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"));

    //Code to check the website and then display the fixtures for them
    if (document.URL.includes("r16") && (teamNmb >= 16)){
        //Outputting the fixtures from the array to the website to be seen 
        document.getElementById("r16Fixture1").innerHTML = fixtures[0];
        document.getElementById("r16Fixture2").innerHTML = fixtures[1];
        document.getElementById("r16Fixture3").innerHTML = fixtures[2];
        document.getElementById("r16Fixture4").innerHTML = fixtures[3];
        document.getElementById("r16Fixture5").innerHTML = fixtures[4];
        document.getElementById("r16Fixture6").innerHTML = fixtures[5];
        document.getElementById("r16Fixture7").innerHTML = fixtures[6];
        document.getElementById("r16Fixture8").innerHTML = fixtures[7];
    }
    //Checking what website page the user is on so that only the correct fixtures are outputted
    if (document.URL.includes("quarter")){
        //Outputting the fixtures from the array to the website to be seen
        document.getElementById("quarterFixture1").innerHTML = fixtures[0];
        document.getElementById("quarterFixture2").innerHTML = fixtures[1];
        document.getElementById("quarterFixture3").innerHTML = fixtures[2];
        document.getElementById("quarterFixture4").innerHTML = fixtures[3];
    }
    //Checking what website page the user is on so that only the correct fixtures are outputted
    if (document.URL.includes("semi")){
        //Outputting the fixtures from the array to the website to be seen
        document.getElementById("semiFixture1").innerHTML = fixtures[0];
        document.getElementById("semiFixture2").innerHTML = fixtures[1];
    }
    //Checking what website page the user is on so that only the correct fixtures are outputted
    if (document.URL.includes("final")){
        //Outputting the fixtures from the array to the website to be seen
        document.getElementById("finalFixture").innerHTML = fixtures;
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

//Function to display the round robin fixtures to the website
function displayRobin(fixtures){

    //Code to set the base values for the fixture numbers
    localStorage.setItem("homeFixture", JSON.stringify(0));
    localStorage.setItem("awayFixture", JSON.stringify(0));

    //Remaking the objects array and Collecting the team number in the system
    let teamNmbs = remakeObjects();
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"));

    //Creating arrays for the home and away fixtures in the system so they can be used later
    let homeFixtures = new Array(teamNmb-1);
    let awayFixtures = new Array(teamNmb-1);

    //Variable to store the team name that we are trying to collect the fixtures from
    let teamName;

    //Code to check the website name and get the relevant team name
    for (i=1 ; i<=teamNmb ; i++){
        if (document.URL.includes("team"+i)) {
            teamName = teamNmbs[i-1].getTeamName();
        }
    }

    //Code to calculate the amount of fixtures that will be generated for each team 
    let amount = (teamNmb * (teamNmb-1));

    //Console to check each fixture for the name of the relevant team
    for (i=0 ; i<= amount-1 ; i++){
        //Collecting the fixture
        let fixture = fixtures[i];
        //Separating the fixture into it's individual teams so they can be checked
        let teams = fixture.split(" v ");
        //Checking to see if the fixture is home
        if (teams[0] == teamName){
            //HomeNmb variable to store the number of home game that we are on
            let homeNmb = JSON.parse(localStorage.getItem("homeFixture"));
            //Storing the fixture into the home fixtures array
            homeFixtures[homeNmb] = fixture;
            //Incrementing and storing the homeNmb variable
            homeNmb++;
            localStorage.setItem("homeFixture", JSON.stringify(homeNmb));
        }
        //Checking to see if the fixture is away
        if (teams[1] == teamName){
            //Collecting the variable to store the number of away fixture that the system is on 
            let awayNmb = JSON.parse(localStorage.getItem("awayFixture"));
            //Setting the fixture at the awayNmb in the away fixtures array
            awayFixtures[awayNmb] = fixture;
            //Incrementing and storing the awayNmb variable
            awayNmb++;
            localStorage.setItem("awayFixture", JSON.stringify(awayNmb));
        }
    }

    //Code to loop through and display all of the fixtures, at there correct locations, from the home and away fixtures array
    for (i=1 ; i<=teamNmb-1 ; i++){
        document.getElementById("homematch"+i).innerHTML = homeFixtures[i-1];
        document.getElementById("awaymatch"+(i+19)).innerHTML = awayFixtures[i-1];
    }
}

//Code to generate the names of the teams in the quarters
function getQuarterTeams(){

    //Code to set the number of quarter teams the website is on (Initialising it) 
    localStorage.setItem("quarterNmb", JSON.stringify(0))

    //Remaking the object array to be used and Collecting the teamNmb variable
    let teamNmbs = remakeObjects();
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"));

    //Making the array to store the teams that got to the quarters
    let quarterTeams = new Array(8);
    //Goes through all of the objects to see whether quarter is 1 and therefore they are in the quarter
    for (i=0 ; i<= teamNmb-1 ; i++){
        //Getting the quarter variable from the teams object
        let quarterCheck = teamNmbs[i].getQuarter();
        //Checking if it is 1
        if (quarterCheck == 1 ){
            //Collecting the number of quarter team that we are on
            let quarterNmb = JSON.parse(localStorage.getItem("quarterNmb"));
            if (quarterNmb == null){
                quarterNmb = 0;
            }
            //Storing team name at the correct position in the 
            quarterTeams[quarterNmb] = teamNmbs[i].getTeamName();
            //Incrementing and storing the quarterNmb variable
            quarterNmb++
            localStorage.setItem("quarterNmb" , JSON.stringify(quarterNmb))
        }
    }
    //Returning the array of quarterTeams to be used
    return quarterTeams;
}

//Code to generate the names of the teams in the semis
function getSemiTeams(){

    //Code to set the number of semi teams the website is on (Initialising it) 
    localStorage.setItem("semiNmb" , JSON.stringify(0))

    //Remaking the object array to be used and Collecting the teamNmb variable
    let teamNmbs = remakeObjects();
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"));

    //Making the semiTeams array to store the teams that made it to the semis
    let semiTeams = new Array(4);

    //Goes through all of the objects to see whether semi is 1 and therefore they are in the semi
    for (i=0 ; i<= teamNmb-1 ; i++){
        //Getting the value of the semi variable in the object 
        let semiCheck = teamNmbs[i].getSemi();
        //Checking to see whether the value of the semi variable is 1
        if (semiCheck == 1 ){
            //Getting the number of semi team that the system is on
            let semiNmb = JSON.parse(localStorage.getItem("semiNmb"));
            if (semiNmb == null){
                semiNmb = 0;
            }
            //Storing the team name in the semiTeams array
            semiTeams[semiNmb] = teamNmbs[i].getTeamName();
            //Incrementing and storing the semiNmb variable
            semiNmb++
            localStorage.setItem("semiNmb" , JSON.stringify(semiNmb))
        }
    }
    //Returning the semiTeams array
    return semiTeams;
}

//Code to generate the names of the teams in the final
function getFinalTeams(){

    //Code to get the number of final team that the system is currently processing
    localStorage.setItem("finalNmb", JSON.stringify(0))

    //Code to recreate the object array to be used and Collect the number of teams in the tournament
    let teamNmbs = remakeObjects();
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"));

    //Creating the array to store the team names of the teams that got into the final
    let finalTeams = new Array(2);

    //Goes through all of the objects to see whether final is 1 and therefore they are in the final
    for (i=0 ; i<= teamNmb-1 ; i++){
        //Checking the status of the final attribute of all teams in the tournament
        let finalCheck = teamNmbs[i].getFinal();
        //Checking to see if it is one (They have reached the final)
        if (finalCheck == 1 ){
            let finalNmb = JSON.parse(localStorage.getItem("finalNmb"));
            if (finalNmb == null){
                finalNmb = 0;
            }
            //Putting the name of the team that got to the final in the correct position in the array
            finalTeams[finalNmb] = teamNmbs[i].getTeamName();

            //Incrementing and Storing the finalNmb variable
            finalNmb++
            localStorage.setItem("finalNmb" , JSON.stringify(finalNmb))
        }
    }
    //Returning the array of teams that got to the final
    return finalTeams;
}

//Code to generate the name of the champion
function getChampion(){
    //Recreating the object array to be used and Collecting the number of teams in the tournament
    let teamNmbs = remakeObjects();
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"));
    
    //Making the variable to store the team name of the champion
    let champion;
    
    //Goes through all of the objects to see whether champion is 1 and therefore they are the champion
    for (i=0 ; i<= teamNmb-1 ; i++){
        //Checking the status of the champion attribute of each team
        let championCheck = teamNmbs[i].getChampion();
        if (championCheck == 1 ){
            //Setting the value of champion to the team name is champion is 1 (TRUE)
            champion = teamNmbs[i].getTeamName();
        }
    }
    //Returning the champion variable
    return champion;
}

//Code to check which of the two websites should be run
function checkWebsite(){
    //Setting a reload variable to true to make sure that the page is reloaded (So that all contents supposed to be on the page is loaded)
    localStorage.setItem("reload", "true")

    //Collecting the tournament type of the tournament
    let tournamentType = localStorage.getItem("tournamentType")

    //Checking the tourament type to load the user to the correct website for the tournament
    if (tournamentType == "knockout"){
        window.location.href = "Knockoutr16.html"
    }
    else{
        window.location.href = "LeagueTable.html"
    }
}


//Test function to set the values for the fixture list to check
function setValues(){
    //Recreating the object array to be used
    let teamNmbs = remakeObjects();

    //Changing the values of some of the attributes in the objects so that the knockout fixture functions can be tested 
    //Ie Check that the getFinalTeams() function works properly
    //This has to be done as currently the system has no way of processing results
    teamNmbs[0].setQuarter();
    teamNmbs[1].setQuarter();
    teamNmbs[2].setQuarter();
    teamNmbs[3].setQuarter();
    teamNmbs[4].setQuarter();
    teamNmbs[5].setQuarter();
    teamNmbs[6].setQuarter();
    teamNmbs[7].setQuarter();
    teamNmbs[0].setSemi();
    teamNmbs[1].setSemi();
    teamNmbs[2].setSemi();
    teamNmbs[3].setSemi();
    teamNmbs[0].setSemi();
    teamNmbs[1].setFinal();
    teamNmbs[0].setFinal();
    teamNmbs[0].setChampion();

    //Storing the object array (With the new values)
    storeObjects(teamNmbs);
}

//Function to hide the parts of the knockout tournament in which aren't needed
function hideSection(){
    //Collecting the number of teams in the tournament
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"));

    //Checking the teamNmb of the tournament and hiding an elements of a knockout tournament that won't be needed
    //Ie in a knockout tournament of two, you don't need to see the round of 16 fixtures, as there aren't any
    if (teamNmb == 2){
        document.getElementById("ex1-tab-1").style.visibility = "hidden"
        document.getElementById("ex1-tab-2").style.visibility = "hidden"
        document.getElementById("ex1-tab-3").style.visibility = "hidden"
    }
    else if (teamNmb == 4){
        document.getElementById("ex1-tab-1").style.visibility = "hidden"
        document.getElementById("ex1-tab-2").style.visibility = "hidden"
    }
    else if (teamNmb == 8){
        document.getElementById("ex1-tab-1").style.visibility = "hidden"
    }
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