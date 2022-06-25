class teamArray{

    constructor(){
        console.log("Entered constructor")
        this.array = Array[10]
        this.teamNmb = ""
        this.teamName = ""
        this.standing = 0
        this.wins = 0
        this.draws = 0
        this.losses = 0
        this.pts = 0
        this.gf = 0
        this.ga = 0
        this.gd = 0
        this.updateArray()
    }

    updateArray(){
        this.array[0] = this.teamNmb;
        this.array[1] = this.teamName;
        this.array[2] = this.standing
        this.array[3] = this.wins
        this.array[4] = this.draws
        this.array[5] = this.losses
        this.array[6] = this.pts
        this.array[7] = this.gf
        this.array[8] = this.ga
        this.array[9] = this.gd      
    }

    setTeamName(newName){
        this.teamName = newName;
        this.teamNmb = ("Team " + i + " - " + this.teamName)
        this.updateArray()
    }

    getTeamName(){
        return this.teamName;
    }

    setTeamNmb(teamNmb){
        this.teamNmb = ("Team " + teamNmb); 
        this.updateArray();
    }

    getTeamNmb(){
        return this.teamNmb;
    }
}