<template>
  <div id="app">
    <md-toolbar>
      <h3 class="md-title">Scrabble Scorer</h3>
    </md-toolbar>
    <br />
    <Players />
  </div>
</template>

<script>
import Players from "./components/Players";
export default {
  name: "App",
  components: {
    Players,
  },
};
</script>

<style>
html,
body {
  background-color: #add8e6;
}
</style>
