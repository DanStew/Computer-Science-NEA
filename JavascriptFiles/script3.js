function checkWebsite(){
    let tournamentType = JSON.parse(localStorage.getItem("tournamentType"))
    if (tournamentType == "Knockout"){
        window.location.href = "Knockout.html"
    }
    else{
        window.location.href = "LeagueTable.html"
    }
}

