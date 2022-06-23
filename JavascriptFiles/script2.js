//var teamNames = JSON.parse(localStorage.getItem("teamNames"));

function formSetup(){
    let arrayCounter = JSON.parse(localStorage.getItem("arrayCounter"));
    let teamNmbs = JSON.parse(localStorage.getItem("teamNmbs"));

    if (arrayCounter == 1){

        let teamNmb = localStorage.getItem("teamNmb");
        let teamNmbs = new Array(teamNmb)


        for (let i=0 ; i<=teamNmb-1 ; i++){
            teamNmbs[i] = new teamArray();
        }
        
        //This is the code to hide all of the select options
        for (let i=1 ; i<=20 ; i++){
            document.getElementById("teamNmb"+i).style.display = "none";
        }

        //This is the code, for this example, to populate the array
        //It will also show the option elements to the number in which the user wanted the amount of teams
        for (let i=1 ; i<=teamNmb-1 ; i++){
            teamNmbs[i-1].setTeamName("Team");
            document.getElementById("teamNmb"+i).style.display = "";
            document.getElementById("teamNmb"+i).innerHTML = teamNmbs[i-1].getTeamName();
        }

        //This is the code to increment the arrayCounter variable so this code isn't accessed again
        localStorage.setItem("arrayCounter", JSON.stringify(2))
    }

    // THis is the code to output the contents of the array to the option elements
    for (let i=0 ; i<=teamNmb-1 ; i++){
        document.getElementById("teamNmb"+i).innerHTML = teamNmbs[i-1].getTeamName();
    }

    //This is the code to store the teamNmbs array into local storage so it can be accessed again
    localStorage.setItem("teamNmbs", JSON.stringify(teamNmbs));
}

function formSubmit2(){
    newName = document.getElementById("teamName").value;
    
}

//Function to test that changes to the value of the array will be saved (TEST FUNCTION)
function formTest(){
    //Collect the array from local storage
    let teamNmbs = JSON.parse(localStorage.getItem("teamNmbs"));
    //Change the value of an item
    teamNmbs[0].setTeamName("This is a test")
    //Restore the array
    localStorage.setItem("teamNmbs", JSON.stringify(teamNmbs));
    //Reload the page to allow the initial function to run again and see the outcome
    window.location.href = "teamInput.html"
}