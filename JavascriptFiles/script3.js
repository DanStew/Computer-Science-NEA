//Function to set up the table setup page page with all of the code for it
function tableSetup(){
    let teamNmbs = remakeObjects();
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"))
    let nmb = teamNmb
    nmb++
    for (i=nmb ; i<= 20 ; i++){
        document.getElementById("button"+i).style.visibility = "hidden"
    }

    //For loop to input all of the information from the objects into the table
    for (i=1 ; i<= teamNmb ; i++){
        document.getElementById("standing"+i).innerHTML = teamNmbs[i-1].getStanding();
        document.getElementById("team"+i).innerHTML = teamNmbs[i-1].getTeamName();
        document.getElementById("button"+i).innerHTML = teamNmbs[i-1].getTeamName();
        document.getElementById("w"+i).innerHTML = teamNmbs[i-1].getWins();
        document.getElementById("d"+i).innerHTML = teamNmbs[i-1].getDraws();
        document.getElementById("l"+i).innerHTML = teamNmbs[i-1].getLosses();
        document.getElementById("ga"+i).innerHTML = teamNmbs[i-1].getGf();
        document.getElementById("gd"+i).innerHTML = teamNmbs[i-1].getGa();
        document.getElementById("pts"+i).innerHTML = teamNmbs[i-1].getGd();
        document.getElementById("gf"+i).innerHTML = teamNmbs[i-1].getPts();
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

    let reload = localStorage.getItem("reload", "true");
    if (reload == "true"){
        console.log("reloaded page")
        window.location.href = "Knockoutr16.html"
        
        localStorage.setItem("reload", "false")
    }

    //Function to hide the sections of the knockout tournament not needed
    hideSection();

    //Code to generate and display the fixtures for the website to display
    setValues();
    displayFixtures();
} 

//Function to get the array of fixtures needed for the knockout structure
function generateKnockout(){
    let teamNmbs = remakeObjects();
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"));
    let fixtures

    //Code to generate the round of sixteen fixtures
    // The document.URL.includes parts makes the code more efficient as it doesn't make all of the fixtures for all of the games it only makes the fixtures in which will be shown
    if ((teamNmb >= 16) && (document.URL.includes("Knockoutr16")) ) {
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
    if (teamNmb >= 8 && (document.URL.includes("Knockoutquarter"))){
        fixtures = new Array(4)
        let quarterTeams = getQuarterTeams();
        console.log(quarterTeams)
        fixtures[0] = quarterTeams[0] + " v " + quarterTeams[7]
        fixtures[1] = quarterTeams[1] + " v " + quarterTeams[6]
        fixtures[2] = quarterTeams[2] + " v " + quarterTeams[5]
        fixtures[3] = quarterTeams[3] + " v " + quarterTeams[4]
    }
    
    //Code to generate the fixtures for the semiFinals
    if (teamNmb >= 4 && (document.URL.includes("Knockoutsemi"))){
        fixtures = new Array(2)
        let semiTeams = getSemiTeams();
        console.log(semiTeams)
        fixtures[0] = semiTeams[0] + " v " + semiTeams[3]
        fixtures[1] = semiTeams[1] + " v " + semiTeams[2]
    }
    
    //Code to generate the fixture for the final
    //It isn't wrapped in a for loop as all knockout tournments will need this
    if (document.URL.includes("Knockoutfinal")){
        let finalTeams = getFinalTeams();
        console.log(finalTeams)
        fixtures = finalTeams[0] + " v " + finalTeams[1]
    }

    console.log(fixtures)
    return fixtures;
}

//Function to generate and display the fixtures onto the website
function displayFixtures(){

    //Function to generate the fixtures
    setValues();
    let fixtures = generateKnockout();
    console.log(fixtures)
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"));

    //Code to check the website and then display the fixtures for them
    if (document.URL.includes("r16") && (teamNmb >= 16)){
        document.getElementById("r16Fixture1").innerHTML = fixtures[0];
        document.getElementById("r16Fixture2").innerHTML = fixtures[1];
        document.getElementById("r16Fixture3").innerHTML = fixtures[2];
        document.getElementById("r16Fixture4").innerHTML = fixtures[3];
        document.getElementById("r16Fixture5").innerHTML = fixtures[4];
        document.getElementById("r16Fixture6").innerHTML = fixtures[5];
        document.getElementById("r16Fixture7").innerHTML = fixtures[6];
        document.getElementById("r16Fixture8").innerHTML = fixtures[7];
    }
    if (document.URL.includes("quarter")){
        document.getElementById("quarterFixture1").innerHTML = fixtures[0];
        document.getElementById("quarterFixture2").innerHTML = fixtures[1];
        document.getElementById("quarterFixture3").innerHTML = fixtures[2];
        document.getElementById("quarterFixture4").innerHTML = fixtures[3];
    }
    if (document.URL.includes("semi")){
        document.getElementById("semiFixture1").innerHTML = fixtures[0];
        document.getElementById("semiFixture2").innerHTML = fixtures[1];
    }
    if (document.URL.includes("final")){
        document.getElementById("finalFixture").innerHTML = fixtures;
    }
}

//Function to generate the fixtures for the round robin side of the tournament
function generateRobin(){
    let teamNmbs = remakeObjects();
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"));

    //Calculating the amount of fixtures needed and making an array for it
    let amount = (teamNmb * (teamNmb-1) / 2);
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

//Function to display the round robin fixtures to the website
function displayRobin(fixtures){

    //Code to set the base values for the fixture numbers
    localStorage.setItem("homeFixture", JSON.stringify(0));
    localStorage.setItem("awayFixture", JSON.stringify(0));

    let teamNmbs = remakeObjects();
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"));
    console.log(teamNmb)
    let homeFixtures = new Array(teamNmb-1);
    let awayFixtures = new Array(teamNmb-1);
    let teamName;

    //Code to check the website name and get the relevant team name
    for (i=1 ; i<=teamNmb ; i++){
        if (document.URL.includes("team"+i)) {
            teamName = teamNmbs[i-1].getTeamName();
        }
    }

    let amount = (teamNmb * (teamNmb-1));
    console.log(amount)

    //Console to check each fixture for the name of the relevant team
    for (i=0 ; i<= amount-1 ; i++){
        let fixture = fixtures[i];
        let teams = fixture.split(" v ");
        //Checking to see if the fixture is home
        if (teams[0] == teamName){
            let homeNmb = JSON.parse(localStorage.getItem("homeFixture"));
            homeFixtures[homeNmb] = fixture;
            homeNmb++;
            localStorage.setItem("homeFixture", JSON.stringify(homeNmb));
        }
        //Checking to see if the fixture is away
        if (teams[1] == teamName){
            let awayNmb = JSON.parse(localStorage.getItem("awayFixture"));
            awayFixtures[awayNmb] = fixture;
            awayNmb++;
            localStorage.setItem("awayFixture", JSON.stringify(awayNmb));
        }
    }

    for (i=1 ; i<=teamNmb-1 ; i++){
        document.getElementById("homematch"+i).innerHTML = homeFixtures[i-1];
        document.getElementById("awaymatch"+(i+19)).innerHTML = awayFixtures[i-1];
    }
}

//Code to generate the names of the teams in the quarters
function getQuarterTeams(){

    localStorage.setItem("quarterNmb", JSON.stringify(0))

    let teamNmbs = remakeObjects();
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"));
    let quarterTeams = new Array(8);
    //Goes through all of the objects to see whether quarter is 1 and therefore they are in the quarter
    for (i=0 ; i<= teamNmb-1 ; i++){
        let quarterCheck = teamNmbs[i].getQuarter();
        if (quarterCheck == 1 ){
            let quarterNmb = JSON.parse(localStorage.getItem("quarterNmb"));
            if (quarterNmb == null){
                quarterNmb = 0;
            }
            quarterTeams[quarterNmb] = teamNmbs[i].getTeamName();
            quarterNmb++
            localStorage.setItem("quarterNmb" , JSON.stringify(quarterNmb))
        }
    }
    return quarterTeams;
}

//Code to generate the names of the teams in the semis
function getSemiTeams(){

    localStorage.setItem("semiNmb" , JSON.stringify(0))

    let teamNmbs = remakeObjects();
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"));
    let semiTeams = new Array(4);
    console.log(semiTeams)
    //Goes through all of the objects to see whether semi is 1 and therefore they are in the semi
    for (i=0 ; i<= teamNmb-1 ; i++){
        let semiCheck = teamNmbs[i].getSemi();
        console.log(semiCheck)
        if (semiCheck == 1 ){
            let semiNmb = JSON.parse(localStorage.getItem("semiNmb"));
            if (semiNmb == null){
                semiNmb = 0;
            }
            console.log(semiNmb)
            semiTeams[semiNmb] = teamNmbs[i].getTeamName();
            console.log(semiTeams)
            semiNmb++
            localStorage.setItem("semiNmb" , JSON.stringify(semiNmb))
        }
    }
    console.log(semiTeams)
    return semiTeams;
}

//Code to generate the names of the teams in the final
function getFinalTeams(){

    localStorage.setItem("finalNmb", JSON.stringify(0))

    let teamNmbs = remakeObjects();
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"));
    let finalTeams = new Array(2);
    //Goes through all of the objects to see whether final is 1 and therefore they are in the final
    for (i=0 ; i<= teamNmb-1 ; i++){
        let finalCheck = teamNmbs[i].getFinal();
        if (finalCheck == 1 ){
            let finalNmb = JSON.parse(localStorage.getItem("finalNmb"));
            if (finalNmb == null){
                finalNmb = 0;
            }
            finalTeams[finalNmb] = teamNmbs[i].getTeamName();
            finalNmb++
            localStorage.setItem("finalNmb" , JSON.stringify(finalNmb))
        }
    }
    return finalTeams;
}

//Code to generate the name of the champion
function getChampion(){
    let teamNmbs = remakeObjects();
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"));
    let champion;
    
    //Goes through all of the objects to see whether champion is 1 and therefore they are the champion
    for (i=0 ; i<= teamNmb-1 ; i++){
        let championCheck = teamNmbs[i].getChampion();
        if (championCheck == 1 ){
            champion = teamNmbs[i].getTeamName();
        }
    }
    return champion;
}

//Code to check which of the two websites should be run
function checkWebsite(){
    localStorage.setItem("reload", "true")

    let tournamentType = localStorage.getItem("tournamentType")
    if (tournamentType == "knockout"){
        window.location.href = "Knockoutr16.html"
    }
    else{
        window.location.href = "LeagueTable.html"
    }
}


//Test function to set the values for the fixture list to check
function setValues(){
    let teamNmbs = remakeObjects();
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
    storeObjects(teamNmbs);
}

//Function to hide the parts of the knockout tournament in which aren't needed
function hideSection(){
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"));
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