//Class to make the superclass for the new subclasses
class teamArray{

    //Constructor to initialise all the attributes for this class
    constructor(pTeamNmb, pTeamNmbCounter, pTeamName){
        this.teamNmb = pTeamNmb;
        this.teamNmbCounter = pTeamNmbCounter 
        this.teamName = pTeamName;
    }

    //Methods to get all of the attributes in the method so that they can be accessed from outside the class

    setTeamName(newName){
        this.teamName = newName;
        this.teamNmb = ("Team " + this.teamNmbCounter +  " - " + this.teamName)
    }

    getTeamName(){
        return this.teamName;
    }

    getTeamNmb(){
        return this.teamNmb;
    }

    getTeamNmbCounter(){
        return this.teamNmbCounter;
    }
    
}