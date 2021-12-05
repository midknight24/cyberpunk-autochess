import { Minion } from "./CoreGame";

var minions = [
    new Minion('A','下街暴徒','images/CyberThug.jpg',{
        powerType: 'MELEE',
        armor: 0,
        power: 2,
        cost: 1

    },null),
    new Minion('A','酒保机器人','images/Bobtender.jpg',{
        powerType: 'MELEE',
        armor: 4,
        power: 1,
        cost: 2
    },null),
    new Minion('A','业余狙击手','images/CyberSniper.jpg',{
        powerType:'RANGED',
        armor:0,
        power: 2,
        cost: 2
    })
]


export {minions}