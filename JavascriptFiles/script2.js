//Function to set up the form for the webpage
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

        //Making the key array to store all of the teams objects
        teamNmbs = new Array(teamNmb)

        //Setting up the objects for when it is a knockout tournament
        if (tournamentType == "knockout"){

            //If statements to test the amount of teams that are in the tournament
            //This will decide the amount of objects that need to be made
            //Also some of the variables in the teams object will need to be preset when there are different amounts of team numbers
            //For instance a knockout team of two would have already passed the r16, quarters and semis
            //So the variables to store these will be preset to one

            if (teamNmb == 16){
                for (let i=0 ; i<=teamNmb-1 ; i++){
                    
                    //Variable to count the team number that we are currently making the object for
                    let pTeamNmbCounter = i+1
                    let pTeamNmb = "Team " + pTeamNmbCounter        

                    //Making the team objectct and storing it in the objects array
                    teamNmbs[i] = new knockoutTeam(pTeamNmb,pTeamNmbCounter,"",0,0,0,0);
                } 
            }
            if (teamNmb == 8){
                for (let i=0 ; i<=teamNmb-1 ; i++){  
                    
                    //Variable to count the team number that we are currently making the object for
                    let pTeamNmbCounter = i+1
                    let pTeamNmb = "Team " + pTeamNmbCounter
                    
                    //Making the team objectct and storing it in the objects array
                    teamNmbs[i] = new knockoutTeam(pTeamNmb,pTeamNmbCounter,"",1,0,0,0);
                }  
            }
            if (teamNmb == 4){
                for (let i=0 ; i<=teamNmb-1 ; i++){   
                    
                    //Variable to count the team number that we are currently making the object for
                    let pTeamNmbCounter = i+1
                    let pTeamNmb = "Team " + pTeamNmbCounter  
                    
                    //Making the team object and storing it in the objects array
                    teamNmbs[i] = new knockoutTeam(pTeamNmb,pTeamNmbCounter,"",1,1,0,0);
                } 
            }
            if (teamNmb == 2){
                for (let i=0 ; i<=teamNmb-1 ; i++){
                    
                    //Variable to count the team number that we are currently making the object for
                    let pTeamNmbCounter = i+1
                    let pTeamNmb = "Team " + pTeamNmbCounter  
                    
                    //Making the team object and storing it in the objects array
                    teamNmbs[i] = new knockoutTeam(pTeamNmb,pTeamNmbCounter,"",pTeamNmbCounter,1,1,1,0);
                } 
            }
        }

        //Code to make the objects for when it is a round robin tournament
        else{
            //For loop to loop through and create an object for all teams in the tournament 
            for (let i=0 ; i<=teamNmb-1 ; i++){     

                //Variable to keep count of what team number we are on
                let pTeamNmbCounter = i+1
                let pTeamNmb = "Team " + pTeamNmbCounter        
                
                //Code to create the round robin object for team i and store it in the objects array
                teamNmbs[i] = new roundTeam(pTeamNmb,pTeamNmbCounter,"",pTeamNmbCounter,0,0,0,0,0,0,0);
            } 
        }

        //This is the code, for this example, to populate the array
        //It will also show the option elements to the number in which the user wanted the amount of teams
        for (let i=1 ; i<=teamNmb ; i++){
            let newTeamName = "Team " + i;
            //Setting the team's name to its corresponding number
            teamNmbs[i-1].setTeamName(newTeamName);
        }

        //This is the code to increment the arrayCounter variable so this code isn't accessed again
        localStorage.setItem("arrayCounter", JSON.stringify(2))

        //Code to store the information from the objects array
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

//Function to deal with the inputs of the second form on the website (The team input form)
function formSubmit2(){

    //Variable to store and tell the system whether we should continue or not
    //The variable was preset to true in the form setup function 
    let go = localStorage.getItem("go")
    if (go == "true"){
        //Collect the name enter in the right hand side of the form
        let newName = document.getElementById("teamName").value;

        //Code to store the length of the new name that has been inputted so it can then be validated 
        let length1 = newName.length;

        //Code to validate the length of the name being entered 
        //If true, the go variable to continue will be set to false, an error will pop up, and the page will be reloaded
        if (length1 > 30){
            alert("The teams name must not be longer than 30 characters")

            //Setting the continue variable to false, so the code stops 
            localStorage.setItem("go", "false");
            
            //Reloading the page so that all further actions stop
            window.location.href = "teamInput.html"
        }

        //Code to split down the team name into separate words and then check the characters in each individual word
        let words = newName.split(" ");
        let length = words.length;
        //Code the validate the length of each word and make sure they are not too long
        for (i=0 ; i<= length-1 ; i++){

            //Collecting the lenght of the word at location i
            let wLength = words[i].length

            //Code to validate its length and make sure that it is not too long
            if (wLength >= 19){
                //Alerting the user that there is a problem
                alert("Single word length must not be longer than 18 characters");
                //Setting the continue variable in the function to false
                localStorage.setItem("go", "false");
                //Reloading the page so that all further actions stop
                window.location.href = "teamInput.html"
                break;
            }
        }

        //Recollecting the continue variable in the function
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
