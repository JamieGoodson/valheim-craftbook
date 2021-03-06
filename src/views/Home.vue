<template>
  <div class="content home">
    <div class="selected-game-item-container">
      <div class="selected-game-item">
        <div
          class="item-icon"
          :style="
            'background-image: url(' + getGameItemIconUrl(selectedGameItem.id) + ');'
          "
        ></div>
        <h3 class="header">
          <span v-if="selectedGameItem.id">{{ selectedGameItem.name }}</span>
          <span v-else>Choose an item, Viking</span>
        </h3>
      </div>
      <div>
        <ul class="game-items-list" :set="(requirements = selectedGameItem.requirements)">
          <li v-for="(_, index) in 4" v-bind:key="index" class="item-icon">
            <div>
              <template v-if="requirements[index]">
                <div
                  :set="(requirement = requirements[index])"
                  class="item-icon"
                  :style="
                    'background-image: url(' + getGameItemIconUrl(requirement.id) + ');'
                  "
                >
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
      <GameItemList @itemClick="onGameItemClick" type="weapon" title="Weapons" />
      <GameItemList @itemClick="onGameItemClick" type="armor" title="Armor" />
      <GameItemList @itemClick="onGameItemClick" type="tool" title="Tools" />
      <GameItemList @itemClick="onGameItemClick" type="ammo" title="Ammo" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameItemList from "@/components/GameItemList.vue";
import gameItems from "@/assets/game-items.json";
import { GameItem, GameItems, GameItemRequirement, GameItemType } from "@/shared-types";

const gameItemIdsByType: { [key in GameItemType]: string[] } = {
  [GameItemType.AMMO]: [],
  [GameItemType.ARMOR]: [],
  [GameItemType.RESOURCE]: [],
  [GameItemType.TOOL]: [],
  [GameItemType.TROPHY]: [],
  [GameItemType.WEAPON]: [],
};

const gameItemsSorted = Object.entries(gameItems).sort((a, b) => {
  const gameItemA = a[1] as GameItem;
  const gameItemB = b[1] as GameItem;
  return gameItemA.name > gameItemB.name ? 1 : gameItemB.name > gameItemA.name ? -1 : 0;
});

// Store game items by type
for (const [id, gameItem] of gameItemsSorted) {
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
    getGameItemIconUrl(itemId: string) {
      if (!itemId) return '';

      return require(`@/assets/game-item-icons/${itemId}.png`);
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

<style lang="scss">
#app {
  overflow: hidden;
}
</style>
