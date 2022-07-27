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

    getQuarter(){
        return this.quarter;
    }

    getSemi(){
        return this.semi;
    }

    getFinal(){
        return this.final;
    }

    getChampion(){
        return this.champion;
    }

    setQuarter(){
        this.quarter = 1;
    }

    setSemi(){
        this.semi = 1;
    }

    setFinal(){
        this.final = 1;
    }

    setChampion(){
        this.champion = 1 ;
    }

}