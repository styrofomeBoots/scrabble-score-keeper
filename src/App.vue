<template>
  <div id="app">
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
