<template>
    <div>
        <el-header>
            <el-switch
                v-model="playerA"
                active-text="Player A"
                inactive-text="Player B"
                active-color="#13ce66"
                inactive-color="#ff4949"
            ></el-switch>
        </el-header>
        <el-main>
            <div v-if="playerA">Remaining: {{hashcoinA}}🪙</div>
            <div v-else>Remaining: {{hashcoinB}}🪙</div>
            <Card
                class="shopminion"
                :id="minion.id"
                :card="minion"
                :key="minion.id"
                v-for="minion in minionProtos"
                @click.native="buyMinion(minion)">
            </Card>
        </el-main>
    </div>
</template>

<script>
import { Minion } from '../CoreGame'
import Card from '../components/Card.vue'
import {minions} from '../protoMinions.js'
export default {
    name: 'MinionStore',
    components: {Card},
    props: {game: Object},
    data(){
        return {
            playerA: true,
            hashcoinA: 10,
            hashcoinB: 10,
            minionProtos: []
        }
    },
    mounted(){
        console.log(minions)
        this.minionProtos = minions
    },
    methods: {
        buyMinion(minion){
            const cost = minion.stats.cost
            if(this.playerA){
                if(this.hashcoinA-cost>=0){
                    this.hashcoinA -= cost
                }else{
                    return
                }
            }else{
                if(this.hashcoinB-cost>=0){
                    this.hashcoinB -= cost
                }else{
                    return
                }
            }
            console.log("BYING")
            var m = new Minion(
                this.playerA? 'A':'B',
                minion.name,
                minion.image,
                {
                    powerType: minion.stats.powerType,
                    power: minion.stats.power,
                    armor: minion.stats.armor
                },
                this.game
            )
            this.game.minions.push(m)
        }
    }
}
</script>
<style>
    .shopminion {
        display: inline-block;
        margin: 5px;
    }
</style>