function tableSetup(){
    let teamNmbs = remakeObjects();
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"))
    for (i=1 ; i<= teamNmb ; i++){
        document.getElementById("standing"+i).innerHTML = teamNmbs[i-1].getStanding();
        document.getElementById("team"+i).innerHTML = teamNmbs[i-1].getTeamName();
        document.getElementById("w"+i).innerHTML = teamNmbs[i-1].getWins();
        document.getElementById("d"+i).innerHTML = teamNmbs[i-1].getDraws();
        document.getElementById("l"+i).innerHTML = teamNmbs[i-1].getLosses();
        document.getElementById("ga"+i).innerHTML = teamNmbs[i-1].getGf();
        document.getElementById("gd"+i).innerHTML = teamNmbs[i-1].getGa();
        document.getElementById("pts"+i).innerHTML = teamNmbs[i-1].getGd();
        document.getElementById("gf"+i).innerHTML = teamNmbs[i-1].getPts();
    }
}

function knockoutSetup(){
    let semiTeams = getSemiTeams();
    let finalTeams = getFinalTeams();
    let champion  = getChampion();

    document.getElementById("topS").innerHTML = semiTeams[0];
    document.getElementById("3S").innerHTML = semiTeams[1];
    document.getElementById("botS").innerHTML = semiTeams[2];
    document.getElementById("2S").innerHTML = semiTeams[3];
    document.getElementById("topF").innerHTML = finalTeams[0];
    document.getElementById("botF").innerHTML = finalTeams[1];
    document.getElementById("champ").innerHTML = champion;
} 

function getSemiTeams(){
    let teamNmbs = remakeObjects();
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"));
    let semiTeams = new Array(4);
    for (i=0 ; i<= teamNmb-1 ; i++){
        let semiCheck = teamNmbs[i].getSemi();
        if (semiCheck == 1 ){
            let semiNmb = JSON.parse(localStorage.getItem("semiNmb"));
            if (semiNmb == null){
                semiNmb = 0;
            }
            semiTeams[semiNmb] = teamNmbs[i].getTeamName();
            semiNmb++
            localStorage.setItem("semiNmb" , JSON.stringify(semiNmb))
        }
    }
    return semiTeams;
}

function getFinalTeams(){
    let teamNmbs = remakeObjects();
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"));
    let finalTeams = new Array(2);
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

function getChampion(){
    let teamNmbs = remakeObjects();
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"));
    let champion
    for (i=0 ; i<= teamNmb-1 ; i++){
        let championCheck = teamNmbs[i].getChampion();
        if (championCheck == 1 ){
            champion = teamNmbs[i].getTeamName();
        }
    }
    return champion;
}

function checkWebsite(){
    let tournamentType = localStorage.getItem("tournamentType")
    console.log(tournamentType)
    if (tournamentType == "knockout"){
        window.location.href = "Knockout.html"
    }
    else{
        window.location.href = "LeagueTable.html"
    }
}

//Function to put back together the array of instances of the class with the saved data
function remakeObjects(){
    console.log("HI")
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
        let  pSemi= localStorage.getItem("TeamNmb" + i + "Semi")
        let  pFinal= localStorage.getItem("TeamNmb" + i + "Final")
        let  pChampion= localStorage.getItem("TeamNmb" + i + "Champion")
        teamNmbs[i-1] = new teamArray(pTeamNmb, pTeamNmbCounter , pTeamName, pStanding, pWins, pDraws, pLosses, pPts, pGf, pGa, pGd, pSemi, pFinal, pChampion)
    }
    return teamNmbs
}

//The function to store all of the attributes of the objects in the array to local storage so they can be saved
function storeObjects(objectArray){
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
        localStorage.setItem("TeamNmb" + i + "Semi", objectArray[i-1].getSemi())
        localStorage.setItem("TeamNmb" + i + "Final", objectArray[i-1].getFinal())
        localStorage.setItem("TeamNmb" + i + "Champion", objectArray[i-1].getChampion())
    }
}