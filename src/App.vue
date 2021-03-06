<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=IM+Fell+English+SC&display=swap");
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

$font-color-primary: #f7f7f7;
$font-color-accent: #ffb572;
$card-background-color: rgba(0, 0, 0, 0.6);
$text-shadow: 0.1rem 0.1rem 0.2rem #000;
$nav-height: 10rem;

html {
  font-size: 10px; // Now 1 rem = 10px
}

body {
  background: url("./assets/bg.jpg") no-repeat center center;
  background-size: cover;
  color: $font-color-primary;
  font-family: 'Roboto', serif;
  font-size: 1.5rem;
}

.game-items-list-container {
  display: flex;
  flex-direction: column;
}

.game-items-list {
  list-style-type: none;
  margin: 0 5rem 0 0;
  overflow-y: auto;
  padding: 0 1rem 0 0;

  &::-webkit-scrollbar {
    width: .5rem;
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

#nav {
  box-sizing: border-box;
  height: $nav-height;
  padding: 2rem;

  a {
    color: $font-color-primary;
    font-weight: bold;

    &.router-link-exact-active {
      color: $font-color-primary;
    }
  }
}

.content {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 120rem;
  height: calc(100vh - #{$nav-height});
}

.header {
  color: $font-color-accent;
  font-family: "IM Fell English SC", serif;
  margin: 0;
  text-shadow: $text-shadow;
}

.item-icon {
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

.requirement-name, .requirement-quantity {
  left: 0;
  position: absolute;
  right: 0;
  text-align: center;
  font-size: 1.3rem;
  text-shadow: $text-shadow;
}

.requirement-name {
  top: 0.5rem;
}

.requirement-quantity {
  bottom: 0.5rem;
}

.game-items-container, .selected-game-item-container  {
  background-color: $card-background-color;
  box-sizing: border-box;
  display: flex;
  padding: 3rem;
}

.selected-game-item-container {
  margin-bottom: 4rem;
  justify-content: space-between;

  .game-items-list {
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
    color: #ffce00;
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
