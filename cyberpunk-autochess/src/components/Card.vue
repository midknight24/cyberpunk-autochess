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
  // data: function(){
  //   return {
  //     img: 
  //   }
  // },
  computed: {
    img: function(){
      // return require(this.card.image)
      const  publicPath = process.env.BASE_URL
      return `${publicPath}${this.card.image}`
    },
    cardStats: function(){
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
    }
  }
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

  .playerAColor {
    background-color:coral;
  }

</style>