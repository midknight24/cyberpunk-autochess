class Action {
    constructor(initiator){
        this.initiator = initiator
    }
}

class TargetedAction extends Action {
    constructor(initiator, targets){
        super(initiator)
        this.targets = targets
    }
}


class Attack extends TargetedAction {

    constructor(initiator, targets){
        super(initiator, targets)
    }

    resolve(){

        if(this.initiator.dead){
            return
        }
        this.targets.forEach(target=>{
            if(this.initiator.powerType == 'RANGED'){
                target.takeHit(this.initiator.power, this.initiator)
            }else if(this.initiator.powerType == 'MELEE'){
                const bounceDamage = target.power
                target.takeHit(this.initiator.power, this.initiator)
                this.initiator.takeHit(bounceDamage, target)
            }
        })


        this.initiator.actioned = true
    }
    
}

export {Attack}