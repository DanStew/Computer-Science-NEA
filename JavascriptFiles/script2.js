//var teamNames = JSON.parse(localStorage.getItem("teamNames"));

function formSetup(){
    let arrayCounter = JSON.parse(localStorage.getItem("arrayCounter"));
    let teamNmbs = JSON.parse(localStorage.getItem("teamNmbs"));

    if (arrayCounter == 1){

        let teamNmb = localStorage.getItem("teamNmb");
        let teamNmbs = new Array(teamNmb)
    
        //This is the code to hide all of the select options
        for (let i=1 ; i<=20 ; i++){
            document.getElementById("teamNmb"+i).style.display = "none";
        }

        //This is the code, for this example, to populate the array
        //It will also show the option elements to the number in which the user wanted the amount of teams
        for (let i=1 ; i<=teamNmbs.length ; i++){
            teamNmbs[i-1] = "Team" + i;
            document.getElementById("teamNmb"+i).style.display = "";
            document.getElementById("teamNmb"+i).innerHTML = teamNmbs[i-1];
        }

        //This is the code to increment the arrayCounter variable so this code isn't accessed again
        localStorage.setItem("arrayCounter", JSON.stringify(2))
    }

    // THis is the code to output the contents of the array to the option elements
    for (let i=1 ; i<=20 ; i++){
        document.getElementById("teamNmb"+i).innerHTML = teamNmbs[i-1];
    }

    //This is the code to store the teamNmbs array into local storage so it can be accessed again
    localStorage.setItem("teamNmbs", JSON.stringify(teamNmbs));
}

function formTest(){
    let teamNmbs = JSON.parse(localStorage.getItem("teamNmbs"));
    teamNmbs[0] = "This is a test";
    localStorage.setItem("teamNmbs", JSON.stringify(teamNmbs));
}