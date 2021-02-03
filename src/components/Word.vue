<template>
  <div>
    <label for="wordMulti">Word Multiplier</label>
    <select name="wordMulti" id="multi" @change="changeMultiplier($event)">
      <option value="1">x1</option>
      <option value="2">x2</option>
      <option value="3">x3</option>
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
</style>