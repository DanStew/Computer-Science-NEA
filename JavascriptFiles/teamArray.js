class teamArray{

    constructor(){
        console.log("Entered constructor")
        let teamNmbCount = JSON.parse(localStorage.getItem("teamNmbCount"));
        if (teamNmbCount == null){
            teamNmbCount = 1
        }
        this.teamNmb = "Team " + teamNmbCount;
        this.teamName = ""
        this.standing = 0
        this.wins = 0
        this.draws = 0
        this.losses = 0
        this.pts = 0
        this.gf = 0
        this.ga = 0
        this.gd = 0
        localStorage.setItem("teamNmbCount", JSON.stringify(teamNmb+1))
    }

    setTeamName(newName){
        this.teamName = newName;
        this.teamNmb = (this.teamNmb + " - " + this.teamName)
    }

    getTeamName(){
        return this.teamName;
    }

    setTeamNmb(teamNmb){
        this.teamNmb = ("Team " + teamNmb); 
    }

    getTeamNmb(){
        return this.teamNmb;
    }
}