import { nanoid } from 'nanoid'
import {shuffle,drawRandom} from './utils.js'
import {Attack, DieAction} from './Action.js'
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
        this.hasNewAnimation = false
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

        var target = this.game.battleGround[this.playerBelong][targetSlot-1]
        if(target != 0 && targetSlot != 0){
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
            this.die()
            // broadcast(dead)
        }
    }
    die(){
        this.dead = true
        const d = new DieAction(this)
        this.game.events.unshift(d)
        console.log(this.game.events)
    }

    // forward as far as possible, return new location
    forward(){
        if(this.location<=3){
            return this.location
        }
        const prevLocation = this.location
        var nextSlot = this.location - 3

        if(this.game.battleGround[this.playerBelong][nextSlot-1] != 0) return this.location

        while(nextSlot>3 && (this.game.battleGround[this.playerBelong][nextSlot-1] == 0)){
            nextSlot -= 3
        }
        this.move(nextSlot)
        const anim = new Animation('MOVE', this, {
            from: prevLocation,
            to: nextSlot
        }, 1500)
        this.game.animations.push(anim)
        return nextSlot
    }

    action(){
        return drawRandom(this.actions)
    }


}
class Animation {
    constructor(type, target, message, duration=1000, offset=0){
        /*
        type in ['ATTACKED','ATTACKING','DYING']
        */
        this.type = type
        this.target = target
        this.message = message
        this.duration = duration
        this.offset = offset
    }

    resolve(){
        console.log("type", this.type)
        this.target.events.push({
            type: this.type,
            target: this.target,
            message: this.message
        })
        this.target.hasNewAnimation = true
    }

}

class EndTurnEvent extends Event{
    constructor(game){
        super(
            'ENDTURN',
            null,
            ''
        )
        this.game = game
    }
    resolve(){
        this.game.currentRow = this.game.currentRow < 3? this.game.currentRow+1: 1
        this.game.events = []
        if(this.game.currentRow!=1){
            this.game.runRow()
        }
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
        this.hasNewAnimation = false
        this.minionSelected = null
        this.graveyard = []
        this.events = []
        this.animations = []
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
        this.runRow()
    }

    pushMinions(){
        this.minions.forEach(m=>{
            m.forward()
        })
    }

    runRow(){

        const chanegRowAnim = new Animation('ROW_CHANGED',this,{
            from: this.currentRow==1? 3:this.currentRow-1,
            to: this.currentRow
        })
        this.animations.push(chanegRowAnim)


        var currentArray = Array.from([1,2,3], x => x+3*(this.currentRow-1))
        var shuffled = shuffle(currentArray)
        shuffled.forEach((ind)=>{
            var index = ind - 1
            var SideOrder = shuffle(['A','B'])
            var minions = []
            SideOrder.forEach(s=>{
                var thisMinion = this.battleGround[s][index]
                if(thisMinion){
                    thisMinion.forward()
                    minions.push(thisMinion)
                }
            })
            minions.forEach(minion=>{
                if(minion.location>3 && minion.stats.powerType !='RANGED') return         
                var enemy = this.battleGround[minion.playerBelong=='A'?'B':'A'][(minion.location-1)%3]
                if(enemy){
                    console.log("FOUND enmey")
                    var action = minion.action()
                    action = new action(minion, [enemy])
                    this.events.push(action)
                }


            })
        })
        const endEvent = new EndTurnEvent(this)
        this.events.push(endEvent)
        this.resolveActions()
    }

    resolveActions(){
        console.log('resolving all actions, actions length: ', this.events.length)
        while(this.events.length>0){
            const event = this.events.shift()
            event.resolve()
        }
        console.log("Resolve Finsihed")
        this.resolveAnimations()
    }

    calculateTimestamp(animations){
        if(animations.length == 0) return []
        var timestamps = [0]
        var curTime = animations[0].duration
        for(let i=1;i<animations.length;i++){
            curTime -= animations[i].offset
            timestamps.push(curTime)
            curTime += animations[i].duration
        }
        console.log("CALCULATED ANIM TIMESTAMPS: ", timestamps)
        return timestamps
    }

    resolveAnimations(){
        // duration means the entire animation time needed. The next anim will start immediately
        // once time expired
        console.log('resolving all animations, animations length:', this.animations.length)
        const timestamps = this.calculateTimestamp(this.animations).slice()
        const animations = this.animations.slice()
        for(let i=0;i<animations.length;i++){
            const anim = animations[i]
            setTimeout(()=>{
                anim.resolve()
            }, timestamps[i])
        }
        this.animations = []
    }

}
export {Game, Animation, Minion}