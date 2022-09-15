class roundTeam extends teamArray{

    constructor(pTeamNmb, pTeamNmbCounter, pTeamName, pStanding, pWins, pDraws, pLosses, pPts, pGf, pGa, pGd){
        super(pTeamNmb, pTeamNmbCounter, pTeamName)
        this.standing = pStanding;
        this.wins = pWins;
        this.draws = pDraws;
        this.losses = pLosses;
        this.pts = pPts;
        this.gf = pGf;
        this.ga = pGa;
        this.gd = pGd;
    }

    //Methods needed to get and set the variables in this class

    setStanding(pStanding){
        this.standing = pStanding;
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