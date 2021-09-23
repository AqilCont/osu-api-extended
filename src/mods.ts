
/**
 * @param mod Number of the mods
 * @description Return mods name
 */
export function id(mod: number): string {
  const codes: { [key: string]: string } = {
      1: 'NF',
      2: 'EZ',
      4: 'TD',
      8: 'HD',
      16: 'HR',
      32: 'SD',
      64: 'DT',
      128: 'RX',
      256: 'HT',
      576: 'NC',
      1024: 'FL',
      2048: 'AT',
      4096: 'SO',
      8192: 'AP',
      16416: 'PF',
      32768: '4K',
      65536: '5K',
      131072: '6K',
      262144: '7K',
      524288: '8K',
      1048576: 'Fl',
      2097152: 'RD',
      4194304: 'LM',
      8388608: 'Target',
      16777216: '9K',
      33554432: 'KeyCoop',
      67108864: '1K',
      134217728: '3K',
      268435456: '2K',
      536870912: 'ScoreV2',
      1073741824: 'LastMod',
    },
    allMods: { [key: string]: number } = {
      ez: 0,
      hd: 1,
      dt: 2,
      nc: 2,
      ht: 2,
      hr: 3,
      so: 4,
      sd: 5,
      pf: 5,
      fl: 6,
      nf: 7,
    };

  let enabled = [];
  let cache = mod;
  let text = '';

  const values = Object.keys(codes).map((a) => Number(a));

  for (let i = values.length - 1; i >= 0; i--) {
    const v = values[i];
    if (cache >= v) {
      const mode = codes[v];
      enabled.push({ i: allMods[mode.toLowerCase()], n: mode });
      cache -= v;
    }
  }
  enabled = enabled.sort((a, b) => (a.i > b.i ? 1 : b.i > a.i ? -1 : 0));
  enabled.filter((r) => (text += r.n));

  if (text === '') text = 'NM';
  return text;
}

/**
 * @param mod Name of the mods
 * @description Return mods number
 */
export function name(mod: string): number | undefined {
  let modNumber = 0;

  const codes: { [key: string]: number } = {
    NF: 1,
    EZ: 2,
    TD: 4,
    HD: 8,
    HR: 16,
    SD: 32,
    DT: 64,
    RX: 128,
    HT: 256,
    NC: 576,
    FL: 1024,
    AT: 2048,
    SO: 4096,
    AP: 8192,
    PF: 16416,
    '4K': 32768,
    '5K': 65536,
    '6K': 131072,
    '7K': 262144,
    '8K': 524288,
    FI: 1048576,
    RD: 2097152,
    LM: 4194304,
    Target: 8388608,
    '9K': 16777216,
    KeyCoop: 33554432,
    '1K': 67108864,
    '3K': 134217728,
    '2K': 268435456,
    ScoreV2: 536870912,
    LastMod: 107374182,
  };
  const name: RegExpMatchArray | null = mod.match(/.{1,2}/g);
  if (name == null) return undefined;

  const values: string[] = Object.keys(codes).map((a) => a);
  for (let i = 0; i < name.length; i++) {
    const find: any = values.filter((v) => (name != null ? v.toLowerCase() === name[i].toLowerCase() : false));
    modNumber += codes[find[0]];
  }

  return modNumber;
}