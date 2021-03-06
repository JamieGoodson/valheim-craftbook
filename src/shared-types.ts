export type GameItemRequirement = { id: string, quantity: number };

export type GameItem = {
  id: string;
  name: string;
  type: GameItemType;
  tier?: number;
  requirements?: GameItemRequirement[];
}

export type GameItems = { [key: string]: GameItem };

export enum GameItemType {
  AMMO = "ammo",
  ARMOR = "armor",
  RESOURCE = "resource",
  TOOL = "tool",
  TROPHY = "trophy",
  WEAPON = "weapon",
}