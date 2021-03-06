<template>
  <div class="game-items-list-container">
    <h3 class="header">{{ title }}</h3>
    <ul class="game-items-list">
      <li
        v-for="itemId in this.$parent.gameItemIdsByType[type]"
        v-bind:key="itemId"
        :set="(item = this.$parent.gameItems[itemId])"
        @click="onGameItemClick(itemId)"
      >
        <div class="item-icon"></div>
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ItemList",
  props: {
    type: String,
    title: String,
  },
  methods: {
    onGameItemClick(itemId: string) {
      this.$emit("itemClick", itemId);
    },
  },
});
</script>
