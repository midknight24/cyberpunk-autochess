class Minion {
    // stats: {'power': 3, 'shield': 4, ...}
    // actions: [MeleeAttackCls, HealCls, ...]
    constructor(name, image, stats, actions){
        this.name = name
        this.image = image
        this.stats = stats
        this.actions = actions
    }

    get powerType(){
        return this.stats.powerType
    }

    get power(){
        return this.stats.power
    }
}

export default Minion