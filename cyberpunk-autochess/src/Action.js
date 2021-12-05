import {Animation} from './CoreGame.js'

class Action {
    constructor(initiator){
        this.initiator = initiator
    }
}

class PushBoardAction extends Action {
    resolve(){
        this.initiator.pushMinions()
    }
}

class TargetedAction extends Action {
    constructor(initiator, targets){
        super(initiator)
        this.targets = targets
    }
}

class DieAction extends Action {

    constructor(initiator){
        super(initiator)
    }

    emitDieAnimation(){
        const e = new Animation('DYING', this.initiator, "")
        this.initiator.game.animations.push(e)
    }


    resolve(){
        this.emitDieAnimation()
        this.initiator.move(0)
    }
}

class AttemptAttack extends Action {
    resolve(){
        const minion = this.initiator
        if(minion.location>3 && minion.stats.powerType !='RANGED') return         
        var enemy = minion.game.battleGround[minion.playerBelong=='A'?'B':'A'][(minion.location-1)%3]
        if(enemy){
            const action = new Attack(minion, [enemy])
            minion.game.events.unshift(action)
        }

    }
}


class Attack extends TargetedAction {

    constructor(initiator, targets){
        super(initiator, targets)
    }

    emitAttackedAnimation(target){
        const e = new Animation('ATTACKED', target, {
            powerType: target.powerType,
            power: target.power,
            armor: target.armor
        }, 1500, 250)
        target.game.animations.push(e)
    }

    resolve(){
        console.log("resolving attack")
        if(this.initiator.dead){
            return
        }
        const targets = this.targets.filter(t=>!t.dead)
        if(targets.length == 0) return
        
        const target = targets[0]

        if(target.dead){
            console.log('already dead')
            return
        }

        if(this.initiator.powerType == 'RANGED'){
            target.takeHit(this.initiator.power, this.initiator)
        }
        else if(this.initiator.powerType == 'MELEE'){
            const bounceDamage = target.power
            target.takeHit(this.initiator.power, this.initiator)

            this.initiator.takeHit(bounceDamage, target)
        }

        const e = new Animation('ATTACKING',this.initiator,{
            powerType: this.initiator.powerType,
            power: this.initiator.power,
            armor: this.initiator.armor
        })
        this.initiator.game.animations.push(e)
        this.emitAttackedAnimation(target)

        this.initiator.actioned = true
    }
    
}

export {AttemptAttack, DieAction, PushBoardAction}