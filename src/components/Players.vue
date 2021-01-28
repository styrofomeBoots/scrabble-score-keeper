<template>
  <div>
    <input @keyup.enter="addName" v-model="playerName" type="text" />
    <div class="players">
      <Player
        class="player"
        v-for="player in allPlayers"
        :key="player"
        :player="player"
      />
    </div>
  </div>
</template>

<script>
// ========== IMPORTS ==========
import Player from "./Player";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Players",
  components: {
    Player,
  },
  data() {
    return {
      playerName: "",
    };
  },
  methods: {
    ...mapActions(["addPlayer"]),
    addName() {
      this.addPlayer(this.playerName);
      this.playerName = "";
    },
  },
  computed: mapGetters(["allPlayers"]),
  created() {},
};
</script>

<style scoped>
.players {
  display: flex;
}

.player {
  border: 1px;
  border-color: black;
  border-style: solid;
  flex-grow: 1;
}
</style>