<template>
  <div>
    <label for="wordMulti">Word Multiplier</label>
    <select name="wordMulti" id="multi" @change="changeMultiplier($event)">
      <option value="1">x1</option>
      <option value="2">x2</option>
      <option value="1">x3</option>
    </select>
    <div class="word">
      <Letter
        v-for="(letter, index) in words[id].word"
        :key="index"
        :id="id"
        :letter="letter"
        :index="index"
        :player="player"
        :value="letters[letter].value"
      />
    </div>
  </div>
</template>

<script>
// ========== IMPORTS ==========
import Letter from "./Letter";
import { mapGetters, mapActions } from "vuex";

// ========== CLASS ==========
export default {
  name: "Word",
  props: ["id", "player"],
  components: {
    Letter,
  },
  methods: {
    ...mapActions(["changeWordMultiplier"]),
    changeMultiplier(event) {
      this.changeWordMultiplier({
        multi: event.target.value,
        id: this.id,
        player: this.player,
      });
    },
  },
  computed: mapGetters(["words", "letters"]),
};
</script>

<style scoped>
.word {
  display: flex;
}

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