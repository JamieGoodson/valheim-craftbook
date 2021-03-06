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
  'ammo': GameItemType.AMMO,
  'armor': GameItemType.ARMOR,
  'resource': GameItemType.RESOURCE,
  'tool': GameItemType.TOOL,
  'trophy': GameItemType.TROPHY,
  'weapon': GameItemType.WEAPON,
}

const OUTPUT_JSON_FILE_PATH = './src/assets/game-items.json';

const gameItems: GameItems = {};

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
    itemId = itemId.trim();

    if (!(itemId in gameItems)) {
      throw new Error(`Item ID not found: ${itemId}`);
    }
    return { id: itemId.trim(), quantity: parseInt(quantity.trim(), 10) };
  });
}

/**
 * Converts row from parsed CSV into a game item.
 * 
 * @param row The raw game item (row) from the CSV.
 */
function convertRowToGameItem(row: Row): GameItem | undefined {
  const { id, name, requirements, tier, type } = sanitizeRow(row);

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

function sanitizeRow(row: Row): Row {
  const sanitizedRow = {} as Row;
  for (const [key, value] of Object.entries(row)) {
    sanitizedRow[key] = value.trim();
  }
  return sanitizedRow;
}

/**
 * Imports game items from a CSV and saves them into a JSON file.
 */
function main() {
  console.log('Parsing CSV');

  let rowCount = 0;
  fs.createReadStream('./scripts/game-items.csv')
  .pipe(csv())
  .on('data', row => {
    rowCount++;
    const gameItem = convertRowToGameItem(row);

    if (gameItem) {
      const itemId = gameItem.id;
      if (itemId in gameItems) {
        throw new Error(`Duplicate item ID: ${itemId}`);
      } 
      gameItems[itemId] = gameItem;
    };
  })
  .on('end', () => {
    console.log(`\nImported ${Object.keys(gameItems).length}/${rowCount} rows`);
    console.log(`Saving to ${OUTPUT_JSON_FILE_PATH}`);

    fs.writeFileSync(
      OUTPUT_JSON_FILE_PATH, JSON.stringify(gameItems, null, 2));
  });
}

main();