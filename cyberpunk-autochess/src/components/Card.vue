<template>
  <div class="card" draggable="false" :class="{playerAColor: card.playerBelong == 'A'}">
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
    this.cardStats = this.computeCardStat(this.card.stats)
  },
  methods: {
    computeCardStat: function(stats){
      var powerEmoji = '❓'
      if(stats.powerType == 'MELEE'){
        powerEmoji = '⚔️'
      }
      else if(stats.powerType == 'RANGED'){
        powerEmoji = '🎯'
      }
      if(stats.power<=0){
        powerEmoji = '💀'
      }
      var armorEmoji = "🛡️"
      var armor = stats.armor>0? armorEmoji+stats.armor:""
      var power = powerEmoji+stats.power
      var cost = stats.cost? `(🪙${stats.cost})`:""
      const total = power+armor+cost
      return total
    },

    addAnimation: function(animationClass, duration, callback=null){
      const div = document.getElementById(this.card.id)
      div.classList.add(animationClass)
      setTimeout(()=>{
        div.classList.remove(animationClass)
        if(callback) callback()
      }, duration)
    },


    attacked: function(stats){
      const styleClass = this.card.playerBelong == 'A'? 'A-attacked': 'B-attacked'
      this.addAnimation(styleClass, 1001, ()=>{this.cardStats = this.computeCardStat(stats)})
    },
    attacking: function(stats){
      const styleClass = this.card.playerBelong == 'A'? 'A-attacking': 'B-attacking'
      this.addAnimation(styleClass, 1001, ()=>{this.cardStats = this.computeCardStat(stats)})
    },
    dying: function(){
      const styleClass = this.card.playerBelong == 'A'? 'A-dying': 'B-dying'
      this.addAnimation(styleClass, 1001, ()=>{
        const div = document.getElementById(this.card.id)
        div.style.display = "none"
      })
    },
    move: function(fromLoc, toLoc){
      const card = document.getElementById(`${this.card.id}`)
      const oldParent = document.getElementById(`${this.card.playerBelong.toLowerCase()}-${fromLoc}`)
      const newParent = document.getElementById(`${this.card.playerBelong.toLowerCase()}-${toLoc}`)
      oldParent.removeChild(card)
      newParent.appendChild(card)
    }
  },
  watch: {
    card: {
      deep: true,
      handler(card){
        if(card.hasNewAnimation){
          while(card.events.length>0){
            const event = card.events.shift()
            switch (event.type) {
              case 'ATTACKED':
                this.attacked(event.message)
                break
              case 'ATTACKING':
                this.attacking(event.message)
                break
              case 'DYING':
                this.dying()
                break
              case 'MOVE':
                this.move(event.message.from, event.message.to)
                break
            }           
          }
          card.hasNewAnimation = false
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

  .moving {
    box-shadow: 0 4px 8px 0 rgba(114, 45, 132, 0.2), 0 6px 20px 0 rgba(98, 169, 243, 1);
  }


  .card:hover {
    animation: selected 1s; 
    animation-fill-mode: forwards;
    box-shadow: 0 4px 8px 0 rgba(114, 45, 132, 0.2), 0 6px 20px 0 rgba(98, 169, 243, 1);
  }

  .playerAColor {
    background-color:coral;
  }

  .A-attacking {
    animation: attackingDown 1s;
    box-shadow: 0 4px 8px 0 rgba(255, 0, 0, 0.2), 0 6px 20px 0 rgb(167, 1, 1);
  }

  .B-attacking {
    animation: attackingUp 1s;
    box-shadow: 0 4px 8px 0 rgba(255, 0, 0, 0.2), 0 6px 20px 0 rgb(167, 1, 1);
  }

  .A-attacked {
    animation: attackedUp 1s, blink 0.3s infinite;
    box-shadow: 0 4px 8px 0 rgba(255, 0, 0, 0.2), 0 6px 20px 0 rgb(167, 1, 1);
  }

  .B-attacked {
    animation: attackedDown 1s, blink 0.4s infinite;
    box-shadow: 0 4px 8px 0 rgba(255, 0, 0, 0.2), 0 6px 20px 0 rgb(167, 1, 1);
  }

  .A-dying {
    animation: fadeOutUp 2s;
  }

  .B-dying {
    animation: fadeOutDown 2s;
  }

  /* .damageMask {
    background-color: crimson;
    animation: blink 0.2s infinite;
    opacity: 0.5;
  } */

  @keyframes blink {
    0% { opacity: 0.8; color: crimson; }
    50% { opacity: 0.7; color: crimson; }
    100% { opacity: 0.4; color: crimson;}
  }

  @keyframes selected {
    0% {transform: translateY(2px);}
    100% {transform: translateY(5px);}
  }

  @keyframes attackingDown {
    0% {transform: translateY(-2px);}
    50% {transform: translateY(-20px);}
    60% {transform: translateY(8px)}
    100% {transform: translateY(0px);}
  }


  @keyframes attackingUp {
    0% {transform: translateY(2px);}
    50% {transform: translateY(20px);}
    60% {transform: translateY(-8px)}
    100% {transform: translateY(0px);}
  }

  @keyframes attackedUp {
    0% {transform: translateY(-25px);}
    50% {transform: translateY(-4px);}
    70% {transform: translateY(-2px);}
    100% {transform: translateY(0px);}
  }

  @keyframes attackedDown {
    0% {transform: translateY(25px);}
    50% {transform: translateY(4px);}
    70% {transform: translateY(2px);}
    100% {transform: translateY(0px);}
  }

</style>