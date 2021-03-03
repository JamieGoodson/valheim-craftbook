import csv from 'csv-parser';
import fs from 'fs';
import { GameItem, GameItems, GameItemType, GameItemRequirement } from '../src/shared-types';

type Row = {
  id: string;
  name: string;
  type: string;
  tier: string;
  requirements: string;
}

const gameItemTypeByString: { [key: string]: GameItemType } = {
  'resource': GameItemType.RESOURCE,
  'tool': GameItemType.TOOL,
  'weapon': GameItemType.WEAPON,
  'armor': GameItemType.ARMOR,
}

const OUTPUT_JSON_FILE_PATH = './src/assets/game-items.json';

/**
 * Parses a requirements string into an array of objects.
 * 
 * For example:
 *   "4 Wood, 6 DeerHide" => 
 *    [
 *     {id: "Wood", quantity: 4},
 *     {id: "DeerHide", quantity: 6}
 *   ]
 * 
 * @param requirements The requirements in the form of
 *                     "<quantity itemId>, <quantity itemId>, ..."
 */
function parseRequirements(requirements: string): GameItemRequirement[] {
  const pairs = requirements.split(',');

  return pairs.map(pair => {
    let [ quantity, itemId ] = pair.trim().split(' ');
    return { id: itemId.trim(), quantity: parseInt(quantity.trim(), 10) };
  });
}

/**
 * Converts row from parsed CSV into a game item.
 * 
 * @param row The raw game item (row) from the CSV.
 */
function convertRowToGameItem(row: Row): GameItem | undefined {
  const { id, name, requirements, tier, type } = row;

  if (!id || !name || !type) {
    console.warn(`Skipping item with missing fields`);
    return;
  }

  const convertedType = gameItemTypeByString[type];
  if (!convertedType) {
    throw new Error(`Unkown item type ${type}`);
  }

  const gameItem: GameItem = {
    id,
    name,
    type: convertedType,
  }

  if (requirements) {
    gameItem.requirements = parseRequirements(requirements);
  }

  if (tier) {
    gameItem.tier = parseInt(tier, 10);
  }

  return gameItem;
}

/**
 * Imports game items from a CSV and saves them into a JSON file.
 */
function main() {
  console.log('Parsing CSV');

  let rowCount = 0;
  const gameItems: GameItems = {};
  fs.createReadStream('./scripts/game-items.csv')
  .pipe(csv())
  .on('data', row => {
    rowCount++;
    const gameItem = convertRowToGameItem(row);

    if (gameItem) {
      gameItems[gameItem.id] = gameItem
    };
  })
  .on('end', () => {
    console.log(`\nImported ${gameItems.length}/${rowCount} rows`);
    console.log(`Saving to ${OUTPUT_JSON_FILE_PATH}`);

    fs.writeFileSync(
      OUTPUT_JSON_FILE_PATH, JSON.stringify(gameItems, null, 2));
  });
}

main();