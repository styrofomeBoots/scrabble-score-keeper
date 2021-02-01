<template>
  <div class="letter-div">
    <div class="tile">
      <span class="letter">{{ letter }}</span>
      <span class="value">{{ value }}</span>
    </div>
    <select @change="changeMultiplier($event)">
      <option value="1">x1</option>
      <option value="2">x2</option>
      <option value="3">x3</option>
    </select>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Letter",
  props: ["letter", "id", "index", "player", "value"],
  methods: {
    ...mapActions(["changeLetterMultiplier", "changeScore", "changeStats"]),
    changeMultiplier(event) {
      this.changeLetterMultiplier({
        multi: event.target.value,
        id: this.id,
        letter: this.letter,
        index: this.index,
        player: this.player,
      });
      this.changeScore(this.id);
      this.changeStats(this.player);
    },
  },
  created() {},
};
</script>

<style scoped>
.tile {
  display: flex;
  background-color: #dcb88b;
  height: 50px;
  width: 50px;
  border-radius: 5px;
  border-color: #d0a97d;
  border-style: solid;
  border-width: 2px;
  justify-content: center;
  align-items: center;
  position: relative;
}

.letter {
  font-size: 30px;
}

.value {
  font-size: 10px;
  position: absolute;
  bottom: 8px;
  right: 8px;
}
</style>