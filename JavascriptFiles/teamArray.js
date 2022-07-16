class teamArray{

    constructor(pTeamNmb, pTeamNmbCounter, pTeamName, pStanding, pWins, pDraws, pLosses, pPts, pGf, pGa, pGd){
        this.teamNmb = pTeamNmb;
        this.teamNmbCounter = pTeamNmbCounter 
        this.teamName = pTeamName;
        this.standing = pStanding;
        this.wins = pWins;
        this.draws = pDraws;
        this.losses = pLosses;
        this.pts = pPts;
        this.gf = pGf;
        this.ga = pGa;
        this.gd = pGd;
    }

    setTeamName(newName){
        this.teamName = newName;
        this.teamNmb = ("Team " + this.teamNmbCounter +  " - " + this.teamName)
    }

    setInitialStanding(pStanding){
        this.standing = pStanding;
    }

    //Methods to get all of the attributes in the method so that they can be accessed from outside the class
    getTeamNmb(){
        return this.teamNmb;
    }

    getTeamNmbCounter(){
        return this.teamNmbCounter;
    }

    getTeamName(){
        return this.teamName;
    }

    getStanding(){
        return this.standing;
    }

    getWins(){
        return this.wins;
    }

    getDraws(){
        return this.draws;
    }

    getLosses(){
        return this.losses;
    }

    getGf(){
        return this.gf;
    }

    getGa(){
        return this.ga;
    }

    getGd(){
        return this.gd;
    }

    getPts(){
        return this.pts;
    }

}