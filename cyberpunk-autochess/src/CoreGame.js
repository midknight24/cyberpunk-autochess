import { nanoid } from 'nanoid'

class Minion {
    // stats: {'power': 3, 'shield': 4, ...}
    // actions: [MeleeAttackCls, HealCls, ...]
    constructor(player_belong, name, image, stats, actions=[]){
        this.id = nanoid()
        this.name = name
        this.image = image
        this.stats = stats
        this.actions = actions
        this.player_belong = player_belong
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
}

class Game {
    constructor(){
        this.turn = 0
        this.battleGroundA = [0,0,0,0,0,0,0,0,0]
        this.battleGroundB = [0,0,0,0,0,0,0,0,0]
        this.minions = [
            new Minion(
            'A',
            'Cyberthug',
            'images/CyberThug.jpg',
            {
              powerType: 'MELEE',
              power: 3
            }),
            new Minion(
                'B',
                'Cyberthug',
                'images/CyberThug.jpg',
                {
                  powerType: 'MELEE',
                  power: 3
                })
        ]
    }

    // TODO: edit this
    canDrop(slot, minion){
        if(minion.player_belong == 'A'){
            return this.battleGroundA[slot+1]==0
        }else{
            return this.battleGroundB[slot+1]==0
        }
    }

    parseSlotId(slot_str){
        return {
            player_belong: slot_str.split('-')[0],
            slot: slot_str.split('-')[1]
        }
    }

}
export default Game