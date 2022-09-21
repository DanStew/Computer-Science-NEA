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

    setWins(){
        this.wins++;
    }

    getDraws(){
        return this.draws;
    }

    setDraws(){
        this.draws++;
    }

    getLosses(){
        return this.losses;
    }

    setLosses(){
        this.losses++;
    }

    setGf(goalsScored){
        this.gf = this.gf + goalsScored;
    }

    getGf(){
        return this.gf;
    }

    setGa(goalsConceded){
        this.ga = this.ga + goalsConceded;
    }

    getGa(){
        return this.ga;
    }

    setGd(){
        this.gd = this.gf - this.ga;
    }

    getGd(){
        return this.gd;
    }

    setPts(){
        wPts = this.pts * 3
        this.pts = wPts + this.draws;
    }

    getPts(){
        return this.pts;
    }
}