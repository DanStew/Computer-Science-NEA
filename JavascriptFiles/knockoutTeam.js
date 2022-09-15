class knockoutTeam extends teamArray{

    //Constructor to make initialise all the variables needed for making the knockoutTeam object
    constructor(pTeamNmb, pTeamNmbCounter, pTeamName, pQuarter, pSemi, pFinal, pChampion){
        super(pTeamNmb,pTeamNmbCounter,pTeamName)
        this.quarter = pQuarter // Boolean variable that's initially 0
        this.semi = pSemi; // Boolean variable that's initially 0
        this.final = pFinal; // Boolean variable that's initially 0
        this.champion = pChampion // Boolean variable that's initially 0
    }

    //Method to get and set the different variables that are needed for this specific class
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