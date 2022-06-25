class teamArray{

    constructor(){
        console.log("Entered constructor")
        this.array = new Array[8]
        this.standing = 0
        this.wins = 0
        this.draws = 0
        this.losses = 0
        this.pts = 0
        this.gf = 0
        this.ga = 0
        this.gd = 0
    }

    updateArray(){
        this.array[0] = this.standing
        this.array[1] = this.wins
        this.array[2] = this.draws
        this.array[3] = this.losses
        this.array[4] = this.pts
        this.array[5] = this.gf
        this.array[6] = this.ga
        this.array[7] = this.gd      
    }

    setTeamName(newName){
        this.array[1] = newName;
    }

    getTeamName(){
        return this.array[1];
    }

    sayHello(){
        console.log("Hello")
    }
}