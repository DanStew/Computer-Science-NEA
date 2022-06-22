let tournamentType;
let teamNmb;
let ;

function formSubmit1(){
    //Take the teamNmb and tournamentType from the information submitted in the form
    let checked = false;
    while (checked == false){
        teamNmb = document.getElementById("teamNmb").value;
        checked = numberCheck(teamNmb);

    }
    tournamentType = document.getElementById("type").value;
    console.log(teamNmb);
    console.log(tournamentType);
    return false
}

function numberCheck(teamNmb){
    if (teamNmb >= 2 && teamNmb<=20){
        return true;
    }
    alert("Team Number must be between 2 and 20");
    return false;
}