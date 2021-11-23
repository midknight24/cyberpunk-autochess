<template>
  <div class="card" draggable="true">
    <div class="card_img">
      <img draggable="false" src="../assets/CyberThug.jpg">
    </div>
    <div class="card_stats">⚔️1</div>
  </div>
</template>

<script>
export default {
  name: "Minion"
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
    background-color:coral;
    margin: auto;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    cursor: grab;
  }
</style>