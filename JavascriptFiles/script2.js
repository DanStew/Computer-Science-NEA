//var teamNames = JSON.parse(localStorage.getItem("teamNames"));

function formSetup(){

    // Code to collect the arrayCounter and teamNmbs from local storage
    let arrayCounter = JSON.parse(localStorage.getItem("arrayCounter"));
    let teamNmb = JSON.parse(localStorage.getItem("teamNmb"));
    let tournamentType = localStorage.getItem("tournamentType")
    let teamNmbs;


    //This is the function to setup the objects for each team
    if (arrayCounter == 1){
        console.log(teamNmb)
        console.log(tournamentType)
        teamNmbs = new Array(teamNmb)

        if (tournamentType == "knockout"){
            if (teamNmb == 16){
                for (let i=0 ; i<=teamNmb-1 ; i++){     
                    let pTeamNmbCounter = i+1
                    let pTeamNmb = "Team " + pTeamNmbCounter        
                    teamNmbs[i] = new knockoutTeam(pTeamNmb,pTeamNmbCounter,"",0,0,0,0);
                } 
            }
            if (teamNmb == 8){
                for (let i=0 ; i<=teamNmb-1 ; i++){     
                    let pTeamNmbCounter = i+1
                    let pTeamNmb = "Team " + pTeamNmbCounter        
                    teamNmbs[i] = new knockoutTeam(pTeamNmb,pTeamNmbCounter,"",1,0,0,0);
                }  
            }
            if (teamNmb == 4){
                for (let i=0 ; i<=teamNmb-1 ; i++){     
                    let pTeamNmbCounter = i+1
                    let pTeamNmb = "Team " + pTeamNmbCounter        
                    teamNmbs[i] = new knockoutTeam(pTeamNmb,pTeamNmbCounter,"",1,1,0,0);
                } 
            }
            if (teamNmb == 2){
                for (let i=0 ; i<=teamNmb-1 ; i++){     
                    let pTeamNmbCounter = i+1
                    let pTeamNmb = "Team " + pTeamNmbCounter        
                    teamNmbs[i] = new knockoutTeam(pTeamNmb,pTeamNmbCounter,"",pTeamNmbCounter,1,1,1,0);
                } 
            }
        }
        else{
            for (let i=0 ; i<=teamNmb-1 ; i++){     
                let pTeamNmbCounter = i+1
                let pTeamNmb = "Team " + pTeamNmbCounter        
                teamNmbs[i] = new roundTeam(pTeamNmb,pTeamNmbCounter,"",pTeamNmbCounter,0,0,0,0,0,0,0);
            } 
        }

        //This is the code, for this example, to populate the array
        //It will also show the option elements to the number in which the user wanted the amount of teams
        for (let i=1 ; i<=teamNmb ; i++){
            let newTeamName = "Team " + i;
            teamNmbs[i-1].setTeamName(newTeamName);
        }

        //This is the code to increment the arrayCounter variable so this code isn't accessed again
        localStorage.setItem("arrayCounter", JSON.stringify(2))
        storeObjects(teamNmbs);
    } 

    //Code to make the array of objects
    teamNmbs = remakeObjects()

    //This is the code to hide all of the select options
    for (let i=1 ; i<=20 ; i++){
        document.getElementById("teamNmb"+i).style.display = "none";
    }

    // THis is the code to output the contents of the array to the option elements
    for (let i=1 ; i<=teamNmb ; i++){
        document.getElementById("teamNmb"+i).style.display = "";
        document.getElementById("teamNmb"+i).innerHTML = teamNmbs[i-1].getTeamNmb();
    } 

    //This is the code to store the teamNmbs array into local storage so it can be accessed again
    localStorage.setItem("teamNmbs", JSON.stringify(teamNmbs));

    //Setting up the variable for the formSubmit2 function
    localStorage.setItem("go", "true");
}

function formSubmit2(){
    let go = localStorage.getItem("go")
    if (go == "true"){
        //Collect the name enter in the right hand side of the form
        let newName = document.getElementById("teamName").value;
        let length1 = newName.length;
        if (length1 > 30){
            alert("The teams name must not be longer than 30 characters")
            localStorage.setItem("go", "false");
            window.location.href = "teamInput.html"
        }

        //Code to split down the team name into separate words and then check the characters in each individual word
        let words = newName.split(" ");
        console.log(words);
        let length = words.length;
        console.log(length);
        for (i=0 ; i<= length-1 ; i++){
            let wLength = words[i].length
            if (wLength >= 19){
                alert("Single word length must not be longer than 18 characters");
                localStorage.setItem("go", "false");
                window.location.href = "teamInput.html"
                break;
            }
        }

        go = localStorage.getItem("go");
        if (go == "true"){
            //Collect the index position of the item selected in the select
            var index = document.getElementById("teamNmbSelected").selectedIndex;
    
            //Make the array of objects from the class
            let teamNmbs = remakeObjects();

            //Change the value of the team selected to the new value
            teamNmbs[index].setTeamName(newName);

            //Store the changes to local storage
            storeObjects(teamNmbs)
        }
        
    }
    localStorage.setItem("go", "true")
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
