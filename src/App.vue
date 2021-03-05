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
$card-background-color: rgba(0, 0, 0, 0.6);
$game-item-background-color: #000;
$text-shadow: 0.1rem 0.1rem 0.2rem #000;

html {
  font-size: 10px; // Now 1 rem = 10px
}

body {
  background: url("./assets/bg.jpg") no-repeat center center;
  background-size: cover;
  height: 100vh;
  color: $font-color-primary;
  font-family: 'Roboto', serif;
  font-size: 1.5rem;
}

ul {
  list-style-type: none;
  margin: 0 5rem 0 0;
  padding: 0;
}

#nav {
  padding: 30px;

  a {
    color: $font-color-primary;
    font-weight: bold;

    &.router-link-exact-active {
      color: $font-color-primary;
    }
  }
}

.content {
  margin: auto;
  width: 120rem;
}

.header {
  color: #ffb572;
  font-family: "IM Fell English SC", serif;
  margin: 0;
  text-shadow: $text-shadow;
}

.item-icon {
  background-color: $game-item-background-color;
  display: inline-block;
  margin-right: 2rem;
}

.item-icon-image {
  border: 0;
  height: 100%;
  width: 100%;
}

.requirement-name, .requirement-quantity {
  left: 0;
  position: absolute;
  right: 0;
  text-align: center;
  font-size: 1.4rem;
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
  margin-bottom: 8rem;
  justify-content: space-between;

  .selected-game-item {
    align-items: center;
    display: flex;
    
    .item-icon {
      height: 10rem;
      width: 10rem;
    }
  }

  .item-icon {
    height: 8rem;
    position: relative;
    width: 8rem;
  }

  .header {
    font-size: 4rem;
    width: 40rem;
  }
  
  ul {
    display: flex;
  }
}

.game-items-container {
  .item-icon {
    height: 4rem;
    width: 4rem;
  }

  li {
    align-items: center;
    display: flex;
    margin: 2rem 0;
    cursor: default;
  }

  .header {
    font-size: 3rem;
    margin-bottom: 3rem;
    text-align: center;
  }
}
</style>
