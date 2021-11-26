import { nanoid } from 'nanoid'
import {shuffle,drawRandom} from './utils.js'
import {Attack} from './Action.js'
class Minion {
    // stats: {'power': 3, 'shield': 4, ...}
    // actions: [MeleeAttackCls, HealCls, ...]

    constructor(playerBelong, name, image, stats, game, actions=[Attack]){
        this.id = nanoid()
        this.name = name
        this.image = image
        this.stats = stats
        this.actions = actions
        this.playerBelong = playerBelong 
        // 0 means not on battleground
        this.location = 0
        this.game = game
        this.actioned = false
        this.dead = false
        this.events = []
        this.hasNewEvent = false
    }

    get powerType(){
        return this.stats.powerType
    }

    get power(){
        return this.stats.power || 0
    }

    get armor(){
        return this.stats.armor || 0
    }

    move(targetSlot){

        if(this.location > 0){
            this.game.battleGround[this.playerBelong][this.location-1] = 0
        }
        // -1 means graveyard
        if(targetSlot <= 0){
            return
        }

        var target = this.game.battleGround[this.playerBelong][targetSlot-1]
        if(target != 0){
            throw 'Slot occupied'
        }

        this.game.battleGround[this.playerBelong][targetSlot-1] = this
        this.location = targetSlot
    }
    takeHit(amount, by){
        // pierced > 0 means armor breaks
        by
        var pierced =  amount - this.armor
        this.stats.armor =  pierced > 0? 0: -pierced
        this.stats.power = pierced > 0? this.power - pierced: this.power
        if(this.stats.power<=0){
            this.dead = true
            this.move(-1)
            // broadcast(dead)
        }
    }

    // forward as far as possible, return new location
    forward(){
        if(this.location<=3){
            return this.location
        }
        const prevLocation = this.location
        var nextSlot = this.location - 3
        while(nextSlot>3 && (this.game.battleGround[this.playerBelong][nextSlot-1] == 0)){
            nextSlot -= 3
        }
        this.move(nextSlot)
        const card = document.getElementById(`${this.id}`)
        const oldParent = document.getElementById(`${this.playerBelong.toLowerCase()}-${prevLocation}`)
        const newParent = document.getElementById(`${this.playerBelong.toLowerCase()}-${this.location}`)
        oldParent.removeChild(card)
        newParent.appendChild(card)
        return nextSlot
    }

    action(){
        return drawRandom(this.actions)
    }


}
class Event {
    constructor(type, targetId, message){
        /*
        type in ['ATTACKED','ATTACKING','DYING']
        */
        this.type = type
        this.targetId = targetId
        this.message = message
    }

}


class Game {
    constructor(){
        this.turn = 0
        this.currentRow = 1
        this.battleGround = {
            'A': [0,0,0,0,0,0,0,0,0],
            'B': [0,0,0,0,0,0,0,0,0]
        }
        this.minionSelected = null
        this.graveyard = []
        this.events = []
        this.newEvent = false
        this.minions = [
            new Minion(
            'A',
            'Cyberthug',
            'images/CyberThug.jpg',
            {
              powerType: 'MELEE',
              power: 3
            },
            this
            ),
            new Minion(
                'B',
                'Cyberthug',
                'images/CyberThug.jpg',
                {
                  powerType: 'MELEE',
                  power: 2
                }, this
                ),
        ]
    }

    canDrop(slot, minion){
        var slot_index = slot.slot
        var slot_belong = slot.playerBelong
        if(minion.playerBelong == slot_belong){
            return this.battleGround[slot_belong][slot_index-1]==0
        }
        return false
    }

    parseSlotId(slot_str){
        return {
            playerBelong: slot_str.split('-')[0].toUpperCase(),
            slot: slot_str.split('-')[1]
        }
    }

    runTurn(){
        console.log("running turn")
        var currentArray = Array.from([1,2,3], x => x+3*(this.currentRow-1))
        var shuffled = shuffle(currentArray)
        shuffled.forEach(i=>{
            var index = i - 1
            var SideOrder = shuffle(['A','B'])
            SideOrder.forEach(s=>{
                var thisMinion = this.battleGround[s][index]
                if(thisMinion){
                    const newSlot = thisMinion.forward()
                    var thatMinion = this.battleGround[s=='A'?'B':'A'][newSlot-1]
                    if(thatMinion){
                        var action = thisMinion.action()
                        action = new action(thisMinion, [thatMinion])
                        action.resolve()
                    }
                }

            })
        })
        this.currentRow = this.currentRow < 3? this.currentRow+1: 1
    }
}
export {Game, Event}