class Action {
    constructor(initiator){
        this.initiator = initiator
    }
}

class TargetedAction extends Action {
    constructor(initiator, target){
        super(initiator)
        this.target = target
    }
}

class Hit {
    constructor(target, amount){
        this.target = target
        this.amount = amount
    }

    resolve(){
        // pierced > 0 means armor breaks
        var pierced =  this.amount - this.target.armor
        this.target.stats.armor =  pierced > 0? 0: -pierced
        this.target.stats.power = pierced > 0? this.target.power - pierced: this.target.power
        if(this.target.power<0){
            this.target.dead = true
        }
    }
}

class Attack extends TargetedAction {
    constructor(initiator, target){
        super(initiator, target)
    }

    resolve(){

    }
    
}