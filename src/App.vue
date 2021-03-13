<template>
  <div id="nav">
    <div class="logo">Valheim Craftbook</div>
    <div class="nav-links">
      <a href="https://github.com/jamiegdsn/valheim-craftbook" target="_blank"
        ><img src="./assets/github-icon.png"
      /></a>
    </div>
  </div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import gameItems from "@/assets/game-items.json";
import {
  GameItem,
  GameItems,
  GameItemRequirement,
  GameItemType,
} from "@/shared-types";

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
  return gameItemA.name > gameItemB.name
    ? 1
    : gameItemB.name > gameItemA.name
    ? -1
    : 0;
});

// Store game items by type
for (const [id, gameItem] of gameItemsSorted) {
  const type = gameItem.type as GameItemType;
  gameItemIdsByType[type].push(id);
}

export default defineComponent({
  name: "App",
  methods: {
    onGameItemClick(itemId: string) {
      const gameItem = gameItems[itemId] as GameItem;
      this.selectedGameItem = gameItem;
    },
    getGameItemIconUrl(itemId: string) {
      if (!itemId) return "";

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
@import url("https://fonts.googleapis.com/css2?family=IM+Fell+English+SC&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

$font-color-primary: #f7f7f7;
$font-color-accent: #ffb572;
$font-color-yellow: #ffce00;
$card-background-color: rgba(0, 0, 0, 0.6);
$text-shadow: 0.1rem 0.1rem 0.2rem #000;
$nav-height: 6rem;
$nav-margin-bottom: 2rem;
$nav-full-height: $nav-height + $nav-margin-bottom;

@font-face {
  font-family: Norse;
  font-weight: bold;
  src: url("./assets/Norsebold.otf");
}

html {
  font-size: 10px; // Now 1 rem = 10px
}

body {
  background: url("./assets/bg.jpg") no-repeat center center;
  background-size: cover;
  color: $font-color-primary;
  font-family: "Roboto", serif;
  font-size: 1.5rem;
}

#nav {
  background-color: #000;
  box-sizing: border-box;
  display: flex;
  font-family: "Norse", "IM Fell English SC", serif;
  font-weight: bold;
  height: $nav-height;
  padding: 1.5rem 2rem 1.5rem 2rem;
  align-items: center;
  margin-bottom: $nav-margin-bottom;
  justify-content: space-between;

  a {
    color: $font-color-primary;
    font-weight: bold;
    text-decoration: none;

    &.router-link-exact-active {
      color: $font-color-primary;
    }

    &:hover {
      text-decoration: underline;
    }
  }
}

.logo {
  font-size: 3rem;
}

.nav-links {
  display: flex;
  height: 100%;
  text-align: right;

  img {
    height: 100%;
  }
}

.game-items-list-container {
  display: flex;
  flex-direction: column;
}

.game-items-list {
  list-style-type: none;
  overflow-y: auto;
  padding: 0 1rem 0 0;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    background-color: none;
  }

  &::-webkit-scrollbar-thumb {
    background-color: none;
  }

  &:hover {
    &::-webkit-scrollbar-thumb {
      background-color: #808080;
    }
  }
}

.content {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 120rem;
  height: calc(100vh - #{$nav-full-height});
}

.header {
  color: $font-color-accent;
  font-family: "IM Fell English SC", serif;
  margin: 0;
  text-shadow: $text-shadow;
}

.item-icon,
.item-tier-icon {
  background-origin: content-box;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  display: inline-block;
  margin-right: 2rem;

  // It looks like the game applies some additional filtering to the icons,
  // so we try to replicate that here
  filter: brightness(1.05) saturate(1.05) contrast(1.05);
}

.item-tier-icon {
  align-items: center;
  background-image: url("./assets/workstation-level-icon.png");
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  padding: 1.5rem;
  text-align: center;
  font-size: 2.5rem;
  color: $font-color-yellow;

  // Adds an outline to the text
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;

  div {
    margin-top: 0.6rem; // Makes the text centered with the background icon
  }
}

.requirement-name,
.requirement-quantity {
  left: 0;
  position: absolute;
  right: 0;
  text-align: center;
  font-size: 1.3rem;
}

.requirement-name {
  top: 0.5rem;
}

.requirement-quantity {
  bottom: 0.5rem;
}

.game-items-container,
.selected-game-item-container {
  background-color: $card-background-color;
  box-sizing: border-box;
  display: flex;
  padding: 3rem;
}

.selected-game-item-container {
  margin-bottom: 4rem;
  justify-content: space-between;

  .game-items-list {
    li {
      margin-right: 1rem;

      &:first-child {
        margin-right: 3rem;
      }
    }

    li.item-icon {
      background-color: rgba(0, 0, 0, 0.8);
      height: 8rem;
      position: relative;
      width: 8rem;
    }

    div.item-icon {
      height: 6rem;
      padding: 1rem;
      width: 6rem;
    }
  }

  .selected-game-item {
    align-items: center;
    display: flex;

    .item-icon {
      height: 6rem;
      margin-right: 4rem;
      width: 6rem;
    }
  }

  .header {
    color: $font-color-yellow;
    font-size: 4rem;
    width: 40rem;
  }

  ul {
    display: flex;
  }
}

.game-items-container {
  margin-bottom: 3rem;
  height: 0;
  flex: 1;
  justify-content: space-between;

  .game-items-list {
    margin: 0 5rem 0 0;
  }

  .item-icon {
    height: 4rem;
    width: 4rem;
  }

  li {
    &:first-child {
      margin: 0 0 2rem 0;
    }

    &:last-child {
      margin: 2rem 0 0 0;
    }

    &:hover {
      background-color: #c1812e;
      border-color: #e69a37;
    }

    align-items: center;
    box-sizing: border-box;
    cursor: default;
    display: flex;
    margin: 2rem 0;
    width: 20rem;
    border: 0.1rem solid rgba(0, 0, 0, 0);
  }

  .header {
    font-size: 3rem;
    margin-bottom: 3rem;
    text-align: center;
  }
}
</style>
