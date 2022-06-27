class teamArray{

    constructor(pTeamNmb, pTeamNmbCounter, pTeamName, pStanding, pWins, pDraws, pLosses, pPts, pGf, pGa, pGd){
        console.log("Entered constructor")
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

    getTeamName(){
        return this.teamName;
    }

    getTeamNmb(){
        return this.teamNmb;
    }

    //Code to transfer all the objects data into a JSON string
    toJson = function() {
        return JSON.stringify({teamNmb: this.teamNmb , teamName: this.teamName , standing : this.standing , wins : this.wins , draws : this.draws, losses: this.losses, pts : this.pts ,gf: this.gf, ga: this.ga, gd: this.gd});
    };
}