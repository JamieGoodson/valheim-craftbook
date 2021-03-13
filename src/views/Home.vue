<template>
  <div class="content home">
    <div class="selected-game-item-container">
      <div class="selected-game-item">
        <div
          class="item-icon"
          v-if="this.$root.selectedGameItem.id"
          :style="
            'background-image: url(' +
              this.$root.getGameItemIconUrl(this.$root.selectedGameItem.id) +
              ');'
          "
        ></div>
        <h3 class="header">
          <span v-if="this.$root.selectedGameItem.id">{{
            this.$root.selectedGameItem.name
          }}</span>
          <span v-else>Choose an item, Viking</span>
        </h3>
      </div>
      <div>
        <ul
          class="game-items-list"
          :set="(requirements = this.$root.selectedGameItem.requirements)"
        >
          <li
            class="item-icon item-tier-icon"
            :style="
              this.$root.selectedGameItem.tier ? '' : 'background-image: none'
            "
          >
            <div>{{ this.$root.selectedGameItem.tier }}</div>
          </li>
          <li v-for="(_, index) in 4" v-bind:key="index" class="item-icon">
            <div>
              <template v-if="requirements[index]">
                <div
                  :set="(requirement = requirements[index])"
                  class="item-icon"
                  :style="
                    'background-image: url(' +
                      this.$root.getGameItemIconUrl(requirement.id) +
                      ');'
                  "
                >
                  <div class="requirement-name">
                    {{ this.$root.gameItems[requirement.id].name }}
                  </div>
                  <div class="requirement-quantity">
                    {{ requirement.quantity }}
                  </div>
                </div>
              </template>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="game-items-container">
      <GameItemList
        @itemClick="this.$root.onGameItemClick"
        type="weapon"
        title="Weapons"
      />
      <GameItemList
        @itemClick="this.$root.onGameItemClick"
        type="armor"
        title="Armor"
      />
      <GameItemList
        @itemClick="this.$root.onGameItemClick"
        type="tool"
        title="Tools"
      />
      <GameItemList
        @itemClick="this.$root.onGameItemClick"
        type="ammo"
        title="Ammo"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GameItemList from "@/components/GameItemList.vue";

export default defineComponent({
  name: "Home",
  components: {
    GameItemList,
  },
});
</script>

<style lang="scss">
#app {
  overflow: hidden;
}
</style>
