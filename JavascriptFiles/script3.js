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
    let nullClass = document.getElementsByClassName("err1");
    nullClass[i].style.display = 'none';
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