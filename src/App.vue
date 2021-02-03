<template>
  <div id="app">
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
@font-face {
  font-family: "Eurostile";
  src: local("Eurostile"),
    url("./assets/fonts/Eurostile.ttf") format("truetype");
}

html,
body {
  background-color: #add8e6;
  font-family: "Eurostile", Helvetica, Arial;
}
</style>
