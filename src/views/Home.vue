<template>
  <div class="content home">
    <div class="selected-game-item-container">
      <div class="selected-game-item">
        <div class="item-icon"></div>
        <h3 class="header">{{ selectedGameItem.name }}</h3>
      </div>
      <div>
        <ul
          class="game-items-list"
          :set="(requirements = selectedGameItem.requirements)"
        >
          <li v-for="(_, index) in 4" v-bind:key="index">
            <div class="item-icon">
              <template v-if="requirements[index]">
                <div :set="(requirement = requirements[index])">
                  <div class="requirement-name">{{ gameItems[requirement.id].name }}</div>
                  <div class="requirement-quantity">{{ requirement.quantity }}</div>
                </div>
              </template>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="game-items-container">
      <GameItemList @itemClick="onGameItemClick" type="armor" title="Armor" />
      <GameItemList @itemClick="onGameItemClick" type="tool" title="Tools" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameItemList from "@/components/GameItemList.vue";
import gameItems from "@/assets/game-items.json";
import { GameItem, GameItems, GameItemRequirement, GameItemType } from "@/shared-types";

const gameItemIdsByType: { [key in GameItemType]: string[] } = {
  [GameItemType.RESOURCE]: [],
  [GameItemType.TOOL]: [],
  [GameItemType.WEAPON]: [],
  [GameItemType.ARMOR]: [],
};

for (const [id, gameItem] of Object.entries(gameItems)) {
  const type = gameItem.type as GameItemType;
  gameItemIdsByType[type].push(id);
}

export default defineComponent({
  name: "Home",
  components: {
    GameItemList,
  },
  methods: {
    onGameItemClick(itemId: string) {
      const gameItem = gameItems[itemId] as GameItem;
      this.selectedGameItem = gameItem;
    },
  },
  data() {
    return {
      gameItems,
      gameItemIdsByType,
      selectedGameItem: {
        requirements: [] as GameItemRequirement[],
      } as GameItem,
    };
  },
});
</script>
