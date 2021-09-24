
import fs from 'fs';
import path from 'path';
import { get } from './get.js';
import { AccObject, PpCalc, PpCalcObject } from './types';

/**
 * @param id Country code
 * @description Return country name from country code
 */
export function country(id: string): string {
  const countrys: { flag: string; country: string }[] = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../flags.json'), 'utf-8'),
  );
  const find = countrys.filter((r) => r.flag === id);

  if (find.length > 0) return find[0].country;
  else return `This country is not supported`;
}

/**
 * @param obj 300: Hit 300\
 * geki: Hit Geku\
 * 100: Hit 100\
 * katu: Hit Katu\
 * 50: Hit 50\
 * 0: Hit 0
 * @param mode 0 = osu!\
 * 1 = Taiko\
 * 2 = CtB\
 * 3 = osu!mania
 * @description Calculating accuracy from hits array
 */
export function accuracy(obj: AccObject, mode?: number): number {
  let acc = 0.0;

  switch (mode) {
    case 1:
      acc = (100.0 * (2 * obj[300] + obj[100])) / (2 * (obj[300] + obj[100] + obj[0]));
      break;
    case 2:
      acc = (100.0 * (obj[300] + obj[100] + obj[50])) / (obj[300] + obj[100] + obj[50] + obj.katu + obj[0]);
      break;
    case 3:
      acc =
        (100.0 * (6 * obj.geki + 6 * obj[300] + 4 * obj.katu + 2 * obj[100] + obj[50])) /
        (6 * (obj[50] + obj[100] + obj[300] + obj[0] + obj.geki + obj.katu));
      break;
    default:
      acc = (100.0 * (6 * obj[300] + 2 * obj[100] + obj[50])) / (6 * (obj[50] + obj[100] + obj[300] + obj[0]));
      break;
  }

  return parseFloat(acc.toFixed(2));
}

/**
 * @param id beatmap id
 * @param path Path to replays folder
 * @param name File name
 * @description Download .osu file of beatmap by id
 */
export async function diffFile(id: number, path: string, name: string | number): Promise<boolean> {
  let file = '';
  if (name === undefined) name = id;
  if (path !== undefined) file = `${path}/${name}.osu`;
  else file = `${name}.osu`;
  if (fs.existsSync(file)) return false;
  else {
    const { data } = await get(`https://osu.ppy.sh/osu/${id}`);
    fs.writeFileSync(file, data, 'utf-8');
    return true;
  }
}

/**
 * @param id beatmap id
 * @param mods Number of the mods
 * @param combo Max combo of the play
 * @param miss Misses of the play
 * @param acc Accuracy of the play
 * @description Rest api for caclculating pp & beatmap stats
 */
export async function calc(obj: PpCalc): Promise<PpCalcObject> | undefined {
  const { data } = await get('https://pp.osuck.net/pp', { params: obj });
  if (data.id !== undefined) return data;
  else return undefined;
}

/**
 * Calculate mods
 * @param {Object} hits { geki, katu, 300, 100, 50, 0 }
 * @param {Number|String} m Mods name
 * @param mode 0 = osu!\
 * 1 = Taiko\
 * 2 = CtB\
 * 3 = osu!mania
 */
export function rank(
  hits: {
    300: number;
    geki: number;
    100: number;
    katu: number;
    50: number;
    0: number;
  },
  m: string,
  mode: number,
): string {
  const hdfl = m.toLowerCase().indexOf('hd') > -1 ? true : m.toLowerCase().indexOf('fl') > -1 ? true : false;
  const params = {
    totalHits: 0,
    acc: 0.0,
    ratio300: 0,
    ratio50: 0,
    rank: '',
  };
  switch (mode) {
    case 0:
      params.totalHits = +hits[50] + +hits[100] + +hits[300] + +hits[0];
      params.acc =
        params.totalHits > 0 ? (+hits[50] * 50 + +hits[100] * 100 + +hits[300] * 300) / (params.totalHits * 300) : 1;
      (params.ratio300 = +hits[300] / params.totalHits), (params.ratio50 = +hits[50] / params.totalHits);

      if (params.ratio300 === 1) params.rank = hdfl === true ? 'XH' : 'X';
      else if (params.ratio300 > 0.9 && params.ratio50 <= 0.01 && hits[0] === 0)
        params.rank = hdfl === true ? 'SH' : 'S';
      else if ((params.ratio300 > 0.8 && hits[0] === 0) || params.ratio300 > 0.9) params.rank = 'A';
      else if ((params.ratio300 > 0.7 && hits[0] === 0) || params.ratio300 > 0.8) params.rank = 'B';
      else if (params.ratio300 > 0.6) params.rank = 'C';
      else params.rank = 'D';

      break;

    case 1:
      params.totalHits = +hits[50] + +hits[100] + +hits[300] + +hits[0];
      params.acc = params.totalHits > 0 ? (+hits[100] * 150 + +hits[300] * 300) / (params.totalHits * 300) : 1;
      (params.ratio300 = +hits[300] / params.totalHits), (params.ratio50 = +hits[50] / params.totalHits);

      if (params.ratio300 === 1) params.rank = hdfl === true ? 'XH' : 'X';
      else if (params.ratio300 > 0.9 && params.ratio50 <= 0.01 && hits[0] === 0)
        params.rank = hdfl === true ? 'SH' : 'S';
      else if ((params.ratio300 > 0.8 && hits[0] === 0) || params.ratio300 > 0.9) params.rank = 'A';
      else if ((params.ratio300 > 0.7 && hits[0] === 0) || params.ratio300 > 0.8) params.rank = 'B';
      else if (params.ratio300 > 0.6) params.rank = 'C';
      else params.rank = 'D';

      break;

    case 2:
      params.totalHits = +hits[50] + +hits[100] + +hits[300] + +hits[0] + +hits.katu;
      params.acc = params.totalHits > 0 ? (+hits[50] + +hits[100] + +hits[300]) / params.totalHits : 1;

      if (params.acc === 1) params.rank = hdfl === true ? 'XH' : 'X';
      else if (params.acc > 0.98) params.rank = hdfl === true ? 'SH' : 'S';
      else if (params.acc > 0.94) params.rank = 'A';
      else if (params.acc > 0.9) params.rank = 'B';
      else if (params.acc > 0.85) params.rank = 'C';
      else params.rank = 'D';

      break;

    case 3:
      params.totalHits = +hits[50] + +hits[100] + +hits[300] + +hits[0] + +hits.geki + +hits.katu;
      params.acc =
        params.totalHits > 0
          ? (+hits[50] * 50 + +hits[100] * 100 + +hits.katu * 200 + (+hits[300] + hits.geki) * 300) /
            (params.totalHits * 300)
          : 1;

      if (params.acc === 1) params.rank = hdfl === true ? 'XH' : 'X';
      else if (params.acc > 0.95) params.rank = hdfl === true ? 'SH' : 'S';
      else if (params.acc > 0.9) params.rank = 'A';
      else if (params.acc > 0.8) params.rank = 'B';
      else if (params.acc > 0.7) params.rank = 'C';
      else params.rank = 'D';

      break;
  }
  return params.rank;
}