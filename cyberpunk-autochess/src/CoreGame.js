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
        if(targetSlot == -1){
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
        console.log("hitted by",by)
        var pierced =  amount - this.armor
        this.stats.armor =  pierced > 0? 0: -pierced
        this.stats.power = pierced > 0? this.power - pierced: this.power
        if(this.stats.power<=0){
            this.dead = true
            this.move(-1)
            // broadcast(dead)
        }
    }

    // forward as far as possible
    forward(){
        var nextSlot = this.location-3
        while(nextSlot>=1 && this.game.battleGround[this.playerBelong][nextSlot-1] == 0){
            this.move(nextSlot)
        }
    }

    action(){
        return drawRandom(this.actions)
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
                  power: 3
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
        var currentArray = Array.from([1,2,3], x => x+x*(this.currentRow-1))
        var shuffled = shuffle(currentArray)
        shuffled.forEach(i=>{
            var index = i - 1
            var SideOrder = shuffle(['A','B'])
            console.log(SideOrder)
            SideOrder.forEach(s=>{
                var thisMinion = this.battleGround[s][index]
                var thatMinion = this.battleGround[s=='A'?'B':'A'][index]
                if(thisMinion){
                    thisMinion.forward()
                    if(thatMinion){
                        var action = thisMinion.action()
                        action = new action(thisMinion, [thatMinion])
                        action.resolve()
                    }
                }

            })
        })
        
    }
}
export default Game