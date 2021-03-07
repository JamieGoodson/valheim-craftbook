# Valheim Craftbook

A Valheim recipe book for all your crafting needs.

Currently only optimized for desktop and Chrome.

## Future plans
* Add building items (walls, furniture, etc)
* Add food/cooking items
* Add item stats (damage, weight, etc)
* Add details for upgrades

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

## Import game items
```
./scrips/import-game-items.sh
```
This will convert game items from the CSV file at `./scripts/game-items.csv`
into a JSON file in `./src/assets/game-items.json`.

[Google Sheet link](https://docs.google.com/spreadsheets/d/1Zxi1O4QtnVXN6azM_WQPlbEOAT-FfkD7Lleer0weTkM/edit#gid=0)