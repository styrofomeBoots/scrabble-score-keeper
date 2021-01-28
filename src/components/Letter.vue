<template>
  <div class="letter-div">
    <div class="tile">
      <span class="letter">{{ letter }}</span>
      <span class="value">{{ value }}</span>
    </div>
    <select>
      <option value="1">x1</option>
      <option value="2">x2</option>
      <option value="1">x3</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "Letter",
  props: ["letter", "id", "value", "index"],
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