<template>
  <div class="card" draggable="true" :class="{playerAColor: card.playerBelong == 'A'}">
    <div class="card_img">
      <img draggable="false" :src="this.img">
    </div>
    <div class="card_stats">{{cardStats}}</div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    card: Object
  },
  data: function(){
    return {
      cardStats: "❓"
    }
  },
  computed: {
    img: function(){
      // return require(this.card.image)
      const  publicPath = process.env.BASE_URL
      return `${publicPath}${this.card.image}`
    }
  },
  mounted(){
    this.cardStats = this.computeCardStat()
  },
  methods: {
    computeCardStat: function(){
      var powerEmoji = '❓'
      if(this.card.powerType == 'MELEE'){
        powerEmoji = '⚔️'
      }
      else if(this.card.powerType == 'RANGED'){
        powerEmoji = '🎯'
      }
      var armorEmoji = "🛡️"
      var armor = this.card.armor? armorEmoji+this.card.armor:""
      var power = this.card.power? powerEmoji+this.card.power:""
      return power+armor
    },

    attacked: function(){
      const div = document.getElementById(this.card.id)
      const styleClass = this.card.playerBelong == 'A'? 'A-attacked': 'B-attacked'
      div.classList.add(styleClass)
      setTimeout(()=>{
        div.classList.remove(styleClass)
        this.cardStats = this.computeCardStat()
      }, 1001)
    },
    attacking: function(){
      const div = document.getElementById(this.card.id)
      const styleClass = this.card.playerBelong == 'A'? 'A-attacking': 'B-attacking'
      div.classList.add(styleClass)
      setTimeout(()=>{
        div.classList.remove(styleClass)
        this.cardStats = this.computeCardStat()
      }, 1001)
    },
    dying: function(){

    }
  },
  watch: {
    card: {
      deep: true,
      handler(card){
        if(card.hasNewEvent){
          while(card.events.length>0){
            const event = card.events.shift()
            switch (event.type) {
              case 'ATTACKED':
                this.attacked()
                break
              case 'ATTACKING':
                this.attacking()
                break
              case 'DYING':
                this.dying()
                break
            }           
          }
          card.hasNewEvent = false
        }
      }
    }
  },
}
</script>

<style>
  img {
    width: 65%;
    height: auto;
    z-index: -5;
  }

  .card_img {
    top: 5px;
    background-color: white;
    height:70%;
    overflow: hidden;
  }

  .card {
    width: 15vw;
    height: 10vh;
    max-width: 153px;
    border-radius: 5%;
    background-color: cornflowerblue;
    margin: auto;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    cursor: grab;
  }

  .card:hover {
    animation: selected 1s; 
    animation-fill-mode: forwards;
  }

  .playerAColor {
    background-color:coral;
  }

  .A-attacking {
    animation: attackingDown 1s;
  }

  .B-attacking {
    animation: attackingUp 1s;
  }

  .A-attacked {
    animation: attackedUp 1s;
  }

  .B-attacked {
    animation: attackedDown 1s;
  }

  @keyframes selected {
    0% {transform: translateY(2px);}
    100% {transform: translateY(5px);}
  }

  @keyframes attackingDown {
    0% {transform: translateY(-2px);}
    50% {transform: translateY(-10px);}
    60% {transform: translateY(8px)}
    100% {transform: translateY(0px);}
  }


  @keyframes attackingUp {
    0% {transform: translateY(2px);}
    50% {transform: translateY(10px);}
    60% {transform: translateY(-8px)}
    100% {transform: translateY(0px);}
  }

  @keyframes attackedUp {
    0% {transform: translateY(-7px);}
    50% {transform: translateY(-4px);}
    70% {transform: translateY(-2px);}
    100% {transform: translateY(0px);}
  }

  @keyframes attackedDown {
    0% {transform: translateY(7px);}
    50% {transform: translateY(4px);}
    70% {transform: translateY(2px);}
    100% {transform: translateY(0px);}
  }

</style>