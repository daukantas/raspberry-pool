import { readFileSync, writeFileSync } from 'fs';
import type { RaspberryDataType, RaspberryConfigType } from './types';
/* import { slugify as _slugify } from 'transliteration';

function slugify(string) {
    return _slugify(string, { lowercase: true, separator: '-' });
} */

const dataPath = `${__dirname}/../../../data`;
const dataFilename = `${dataPath}/raspberries.json`;

export const items: Array<RaspberryDataType> = JSON.parse(readFileSync(dataFilename));
const map = new Map(items.map(item => [item.id, item]));

if (map.size !== items.length) {
  throw new Error('Duplicated id');
}

function save() {
  writeFileSync(dataFilename, JSON.stringify(items, null, 4));
}

export function getById(id: string): ?RaspberryDataType {
  return map.get(id);
}

export function changeConfig(id: string, config: RaspberryConfigType) {
  if (!map.has(id)) {
    throw new Error('Invalid id');
  }

    // TODO configManager
  config = Object.assign({}, {
    time: Date.now(),
    display: config.display || 'chromium',
    url: config.url.trim(),
  });
  map.get(id).config = config;
  save();

  return config;
}

// ip should not be written
export function addNew(id: string, owner: string, macAddresses: Array<string>, name: string) {
  const newRaspberryItem: RaspberryDataType = {
    id,
    name,
    macAddresses,
    config: {},
    owner,
  };

  if (map.has(newRaspberryItem.id)) {
    throw new Error(`Already has id: ${newRaspberryItem.id}`);
  }

  items.push(newRaspberryItem);
  map.set(newRaspberryItem.id, newRaspberryItem);
  save();

  return newRaspberryItem;
}

export function replaceMacAddresses(id: string, newMacAddresses: Array<string>) {
  if (!map.has(id)) {
    throw new Error(`Invalid id: "${id}"`);
  }

  map.get(id).macAddresses = newMacAddresses;
  save();
}

export function addMacAddress(id: string, newMacAddress: string) {
  if (!map.has(id)) {
    throw new Error(`Invalid id: "${id}"`);
  }

  map.get(id).macAddresses.push(newMacAddress);
  save();
}

export function saveScreenshot(id: string, screenshot: Buffer) {
  writeFileSync(screenshotPath(id), screenshot);
}

export function screenshotPath(id: string): string {
  return `${dataPath}/screenshot-${id}.png`;
}
