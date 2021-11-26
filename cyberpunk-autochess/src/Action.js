import {Event} from './CoreGame.js'

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

    emitAttackEvent(target){
        const e = new Event('ATTACKED', target.id, "")
        target.events.push(e)
        target.hasNewEvent = true
    }

    resolve(){

        if(this.initiator.dead){
            return
        }

        const e = new Event('ATTACKING',this.initiator.id,"")
        this.initiator.events.push(e)
        this.initiator.hasNewEvent = true
        
        this.targets.forEach(target=>{

            if(target.dead) return

            if(this.initiator.powerType == 'RANGED'){
                target.takeHit(this.initiator.power, this.initiator)
                setTimeout(()=>{
                    this.emitAttackEvent(target)
                }, 800)

            }
            else if(this.initiator.powerType == 'MELEE'){

                const bounceDamage = target.power
                target.takeHit(this.initiator.power, this.initiator)
                setTimeout(()=>{
                    this.emitAttackEvent(target)
                }, 800)

                this.initiator.takeHit(bounceDamage, target)
            }
        })


        this.initiator.actioned = true
    }
    
}

export {Attack}