class teamArray{

    constructor(pTeamNmb, pTeamNmbCounter, pTeamName, pStanding, pWins, pDraws, pLosses, pPts, pGf, pGa, pGd, pQuarter, pSemi, pFinal, pChampion){
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
        this.quarter = pQuarter // Boolean variable that's initially 0
        this.semi = pSemi; // Boolean variable that's initially 0
        this.final = pFinal; // Boolean variable that's initially 0
        this.champion = pChampion // Boolean variable that's initially 0
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