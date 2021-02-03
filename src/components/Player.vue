<template>
  <div>
    <h2>{{ player }}</h2>
    <div class="player-scores">
      <span v-for="(value, name) in playerScore[player]" :key="name">
        {{ name }}: {{ value }}
      </span>
    </div>
    <Word
      v-for="id in playerWords[player]"
      :key="id"
      :id="id"
      :player="player"
    />
    <input type="text" @keyup.enter="submitWord" v-model="word" />
  </div>
</template>

<script>
// ========== IMPORTS ==========
import Word from "./Word";
import { mapGetters, mapActions } from "vuex";

// ========== CLASS ==========
export default {
  name: "Player",
  props: ["player"],
  components: {
    Word,
  },
  data() {
    return {
      word: "",
    };
  },
  methods: {
    ...mapActions(["addWord"]),
    async submitWord() {
      let isWord = await this.addWord({
        player: this.player,
        word: this.word.toUpperCase(),
      });
      if (isWord) {
        this.word = "";
      } else {
        this.word = "";
      }
    },
  },
  computed: { ...mapGetters(["playerWords", "playerScore"]) },
};
</script>

<style scoped>
.player-scores {
  display: flex;
}
</style>
