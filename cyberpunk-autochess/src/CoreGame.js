import { nanoid } from 'nanoid'

class Minion {
    // stats: {'power': 3, 'shield': 4, ...}
    // actions: [MeleeAttackCls, HealCls, ...]

    constructor(playerBelong, name, image, stats, game, actions=[]){
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
        var target = this.game.battleGround[this.playerBelong][targetSlot-1]
        if(target != 0){
            throw 'Slot occupied'
        }
        if(this.location > 0){
            this.game.battleGround[this.playerBelong][this.location-1] = 0
        }
        this.game.battleGround[this.playerBelong][targetSlot-1] = this
        this.location = targetSlot
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



}
export default Game