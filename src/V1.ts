
//import fs from 'fs';
import type { Best, Bm, MatchGame, MatchScore, Recent, RequestNamepsace, Scores, User, V1BeatmapObject, V1MatchObject, V1ScoresBestObject, V1ScoresObject, V1ScoresRecentObject, V1UserObject } from "./types"

import { namespace } from "./get.js";
//import osr from "node-osr";
//import lzma from 'lzma-native';

import { id } from "./mods.js";
import { country, accuracy } from "./tools.js";

export class V1 {
  key: string;
  private api: RequestNamepsace;

  constructor(key: string) {
    this.key = key;
    this.api = namespace("https://osu.ppy.sh", { query: { k: key } });
  }

  /**
   * Get beatmap data
   * @param {Object} obj {\
   * s: "beatmapset id",\
   * b: "beatmap id",\
   * u: "User id or name",\
   * m: "mode (0 = osu!, 1 = Taiko, 2 = CtB, 3 = osu!mania). Optional, default: 0",\
   * a: "0 = not included, 1 = included",\
   * h: "beatmap hash",\
   * mods: "mods id",\
   * since: "return all beatmaps ranked or loved since this date. Must be a MySQL date. In UTC",\
   * type: "specify if u is a user_id or a username",\
   * limit: "0-500",
   * }
   * @description \
   * a: "include converted beatmaps? Only has an effect if m is chosen and not 0. Optional, default: 0"\
   * \
   * h: "example of hash: a5b99395a42bd55bc5eb1d2411cbdf8b" \
   * \
   * mods: "mods that applies to the beatmap requested. Optional, default is 0. (Refer to the Mods section below, note that requesting multiple mods is supported, but it should not contain any non-difficulty-increasing mods or the return value will be invalid.)""\
   * \
   * type: "Use string for usernames or id for user_ids. Optional, default behaviour is automatic recognition (may be problematic for usernames made up of digits only)"
   */
  async beatmap(obj: Bm): Promise<V1BeatmapObject> | null {
    const { data } = await this.api('/get_beatmaps', { params: obj });

    if (data.length > 0) {
      const genres = [
        'any',
        'unspecified',
        'video game',
        'anime',
        'rock',
        'pop',
        'other',
        'novelty',
        'other',
        'hip hop',
        'electronic',
      ];
      const languages = [
        'any',
        'other',
        'english',
        'japanese',
        'chinese',
        'instrumental',
        'korean',
        'french',
        'german',
        'swedish',
        'italian',
      ];
      const modes = ['std', 'taiko', 'ctb', 'mania'];
      const parseStatusById = (statusId: number) => {
        switch (statusId) {
          case -2:
            return 'graveyard';
          case -1:
            return 'WIP';
          case 0:
            return 'pending';
          case 1:
            return 'ranked';
          case 2:
            return 'approved';
          case 3:
            return 'qualified';
          case 4:
            return 'loved';
          default:
            return 'undefined';
        }
      };

      const info: V1BeatmapObject = {
        id: {
          set: +data[0].beatmapset_id,
          diff: +data[0].beatmap_id,
        },
        date: {
          submit: data[0].submit_date,
          approved: data[0].approved_date,
          update: data[0].last_update,
        },
        metadata: {
          artist: {
            original: data[0].artist,
            unicode: data[0].artist_unicode,
          },
          title: {
            original: data[0].title,
            unicode: data[0].title_unicode,
          },
          creator: {
            id: +data[0].creator_id,
            name: data[0].creator,
          },
          favs: +data[0].favourite_count,
          rating: parseFloat(Number(data[0].rating).toFixed(2)),
          source: data[0].source,
          genre_id: {
            id: +data[0].genre_id,
            name: genres[+data[0].genre_id],
          },
          language_id: {
            id: +data[0].language_id,
            name: languages[+data[0].genre_id],
          },
          tags: data[0].tags,
        },
        status: {
          id: +data[0].approved,
          name: parseStatusById(+data[0].approved),
        },
        diff: [],
        misc: {
          download_unavailable: !!data[0].download_unavailable,
          audio_unavailable: !!data[0].audio_unavailable,
          storyboard: !!data[0].storyboard,
          video: !!data[0].video,
          packs: data[0].packs,
          bg: {
            full: `https://assets.ppy.sh/beatmaps/${data[0].beatmapset_id}/covers/fullsize.jpg`,
            raw: `https://assets.ppy.sh/beatmaps/${data[0].beatmapset_id}/covers/raw.jpg`,
            slim: {
              1: `https://assets.ppy.sh/beatmaps/${data[0].beatmapset_id}/covers/slimcover.jpg`,
              2: `https://assets.ppy.sh/beatmaps/${data[0].beatmapset_id}/covers/slimcover@2x.jpg`,
            },
            cover: {
              1: `https://assets.ppy.sh/beatmaps/${data[0].beatmapset_id}/covers/cover.jpg`,
              2: `https://assets.ppy.sh/beatmaps/${data[0].beatmapset_id}/covers/cover@2x.jpg`,
            },
            card: {
              1: `https://assets.ppy.sh/beatmaps/${data[0].beatmapset_id}/covers/card.jpg`,
              2: `https://assets.ppy.sh/beatmaps/${data[0].beatmapset_id}/covers/card@2x.jpg`,
            },
            list: {
              1: `https://assets.ppy.sh/beatmaps/${data[0].beatmapset_id}/covers/list.jpg`,
              2: `https://assets.ppy.sh/beatmaps/${data[0].beatmapset_id}/covers/list@2x.jpg`,
            },
          },
        },
      };

      for (let i = 0; i < data.length; i++) {
        const d = data[i];
        info.diff.push({
          id: +d.beatmap_id,
          diff: d.version,
          mode: {
            id: +d.mode,
            name: modes[+d.mode],
          },
          file_md5: d.file_md5,
          stats: {
            star: {
              pure: parseFloat(Number(d.difficultyrating).toFixed(2)),
              aim: parseFloat(Number(d.diff_aim).toFixed(2)),
              speed: parseFloat(Number(d.diff_speed).toFixed(2)),
            },
            ar: parseFloat(Number(d.diff_approach).toFixed(2)),
            od: parseFloat(Number(d.diff_overall).toFixed(2)),
            cs: parseFloat(Number(d.diff_size).toFixed(2)),
            hp: parseFloat(Number(d.diff_drain).toFixed(2)),
            bpm: {
              avg: +d.bpm,
            },
            combo: +d.max_combo,
            time: {
              full: +d.total_length,
              drain: +d.hit_length,
            },
            objects: {
              all: +d.count_normal + +d.count_slider + +d.count_spinner,
              circles: +d.count_normal,
              sliders: +d.count_slider,
              spinners: +d.count_spinner,
            },
          },
          plays: +d.playcount,
          pass: +d.passcount,
        });
      }

      return info;
    } else return null;
  }

  /**
   * Get user data
   * @param {Object} obj {\
   * u: "User id or name",\
   * m: "mode (0 = osu!, 1 = Taiko, 2 = CtB, 3 = osu!mania). Optional, default: 0",\
   * type: "specify if u is a user_id or a username",\
   * event_days: "1-31. Default: 1",\
   * }
   * @description \
   * type: "Use string for usernames or id for user_ids. Optional, default behaviour is automatic recognition (may be problematic for usernames made up of digits only)"
   */
  async user(obj: User): Promise<V1UserObject> | null {
    const { data } = await this.api('/get_user', { params: obj });
    if (data.length > 0) {
      const events = data[0].events.map((d: any) => {
        return {
          display: {
            html: d.display_html,
            pure: d.display_html.replace(/<[^>]*>?/gm, '').trim(),
          },
          id: {
            diff: +d.beatmap_id,
            set: +d.beatmapset_id,
          },
          date: d.date,
          epicfactor: +d.epicfactor,
        };
      });
      const info: V1UserObject = {
        id: +data[0].user_id,
        name: data[0].username,
        pp: data[0].pp_raw,
        acc: data[0].accuracy,
        lvl: data[0].level,
        join: data[0].join_date,
        country: {
          flag: `https://osu.ppy.sh/images/flags/${data[0].country}.png`,
          short: data[0].country,
          full: country(data[0].country),
        },
        play: {
          count: +data[0].playcount,
          time: +data[0].total_seconds_played,
        },
        hits: {
          300: +data[0].count300,
          100: +data[0].count100,
          50: +data[0].count50,
        },
        score: {
          total: +data[0].total_score,
          ranked: +data[0].ranked_score,
        },
        rank: {
          global: +data[0].pp_rank,
          country: +data[0].pp_country_rank,
        },
        ranks: {
          ssh: +data[0].count_rank_ssh,
          ss: +data[0].count_rank_ss,
          sh: +data[0].count_rank_sh,
          s: +data[0].count_rank_s,
          a: +data[0].count_rank_a,
        },
        events,
      };
      return info;
    } else return null;
  }

  /**
   * Get scores data
   * @param {Object} obj {\
   * b: "beatmap id", \
   * u: "User id or name", \
   * m: "mode (0 = osu!, 1 = Taiko, 2 = CtB, 3 = osu!mania). Optional, default: 0", \
   * mods: "Mods id", \
   * type: "specify if u is a user_id or a username",\
   * limit: "range between 1 and 100 - defaults to 50", \
   * }
   * @description \
   * type: "Use string for usernames or id for user_ids. Optional, default behaviour is automatic recognition (may be problematic for usernames made up of digits only)"
   */
  async scores(obj: Scores): Promise<V1ScoresObject[]> {
    const { data } = await this.api('/get_scores', { params: obj });
    if (data.length > 0) {
      const info = [];
      for (let i = 0; i < data.length; i++) {
        const d = data[i];
        const hits = {
          300: +d.count300,
          geki: +d.countgeki,
          100: +d.count100,
          katu: +d.countkatu,
          50: +d.count50,
          0: +d.countmiss,
        };
        const score: V1ScoresObject = {
          date: d.date,
          rank: d.rank,
          user: {
            id: +d.user_id,
            name: d.username,
          },
          score: {
            id: +d.score_id,
            total: +d.score,
          },
          combo: {
            max: +d.maxcombo,
            full: +d.perfect,
          },
          hits,
          mods: {
            id: +d.enabled_mods,
            name: id(d.enabled_mods),
          },
          accuracy: accuracy(hits, obj.m),
          pp: d.pp,
          replay: +d.replay_available,
        };
        info.push(score);
      }

      return info;
    } else return [];
  }

  /**
   * Get best scores
   * @param {Object} obj {\
   * u: "User id or name",\
   * m: "mode (0 = osu!, 1 = Taiko, 2 = CtB, 3 = osu!mania). Optional, default: 0",\
   * limit: "range between 1 and 100 - defaults to 10",\
   * type: "specify if u is a user_id or a username",\
   * }
   * @description \
   * type: "Use string for usernames or id for user_ids. Optional, default behaviour is automatic recognition (may be problematic for usernames made up of digits only)"
   */
  async best(obj: Best): Promise<V1ScoresBestObject[]> {
    const { data } = await this.api('/get_user_best', { params: obj });
    if (data.length > 0) {
      const info = [];
      for (let i = 0; i < data.length; i++) {
        const d = data[i];
        const hits = {
          300: +d.count300,
          geki: +d.countgeki,
          100: +d.count100,
          katu: +d.countkatu,
          50: +d.count50,
          0: +d.countmiss,
        };
        const score: V1ScoresBestObject = {
          date: d.date,
          beatmap: +d.beatmap_id,
          rank: d.rank,
          user: {
            id: +d.user_id,
          },
          score: {
            id: +d.score_id,
            total: +d.score,
          },
          combo: {
            max: +d.maxcombo,
            full: +d.perfect,
          },
          hits,
          mods: {
            id: +d.enabled_mods,
            name: id(d.enabled_mods),
          },
          accuracy: accuracy(hits, obj.m),
          pp: d.pp,
          replay: +d.replay_available,
        };
        info.push(score);
      }

      return info;
    } else return [];
  }

  /**
   * Get recent scores
   * @param {Object} obj {\
   * u: "User id or name",\
   * m: "mode (0 = osu!, 1 = Taiko, 2 = CtB, 3 = osu!mania). Optional, default: 0",\
   * limit: "range between 1 and 100 - defaults to 10",\
   * type: "specify if u is a user_id or a username",\
   * }
   * @description \
   * type: "Use string for usernames or id for user_ids. Optional, default behaviour is automatic recognition (may be problematic for usernames made up of digits only)"
   */
  async recent(obj: Recent): Promise<V1ScoresRecentObject[]> {
    const { data } = await this.api('/get_user_recent', { params: obj });
    if (data.length > 0) {
      const info = [];
      for (let i = 0; i < data.length; i++) {
        const d = data[i];
        const hits = {
          300: +d.count300,
          geki: +d.countgeki,
          100: +d.count100,
          katu: +d.countkatu,
          50: +d.count50,
          0: +d.countmiss,
        };
        const score: V1ScoresRecentObject = {
          date: d.date,
          beatmap: +d.beatmap_id,
          rank: d.rank,
          user: {
            id: +d.user_id,
          },
          score: {
            total: +d.score,
          },
          combo: {
            max: +d.maxcombo,
            full: +d.perfect,
          },
          hits,
          mods: {
            id: +d.enabled_mods,
            name: id(d.enabled_mods),
          },
          accuracy: accuracy(hits, obj.m),
        };
        info.push(score);
      }

      return info;
    } else return [];
  }

  /**
   * Get match data
   * @param {Object} obj {\
   * mp: "match id to get information from (required).",\
   * }
   */
  async match(mp: number): Promise<V1MatchObject> | null {
    const { data } = await this.api('/get_match', { params: { mp } });

    if (data.games.length > 0) {
      const modes = ['std', 'taiko', 'ctb', 'mania'];
      const scoring = ['Score', 'Accuracy', 'Combo', 'Score v2'];
      const team = ['Head to head', 'Tag Co-op', 'Team vs', 'Tag Team vs'];
      const teams = ['no team', 'blue', 'red'];

      const match: V1MatchObject = {
        match: {
          id: +data.match.match_id,
          name: data.match.name,
          time: {
            start: data.match.start_time,
            end: data.match.end_time,
          },
        },
        games: [],
      };

      for (let i = 0; i < data.games.length; i++) {
        const g = data.games[i];
        const game: MatchGame = {
          id: +g.game_id,
          time: {
            start: g.start_time,
            end: g.end_time,
          },
          beatmap_id: +g.beatmap_id,
          mode: {
            id: +g.play_mode,
            name: modes[+g.play_mode],
          },
          types: {
            match: g.match_type,
            scoring: {
              id: +g.scoring_type,
              name: scoring[+g.scoring_type],
            },
            team: {
              id: +g.team_type,
              name: team[+g.team_type],
            },
          },
          mods: {
            id: +g.mods,
            name: id(g.mods),
          },
          scores: [],
        };

        for (let s = 0; s < g.scores.length; s++) {
          const ss = g.scores[s];

          const score: MatchScore = {
            team: {
              id: +ss.team,
              name: teams[+ss.team],
            },
            slot: +ss.slot,
            user: {
              id: +ss.user_id,
            },
            score: +ss.score,
            combo: {
              max: +ss.maxcombo,
              perfect: +ss.perfect,
            },
            hits: {
              300: +ss.count300,
              geki: +ss.countgeki,
              100: +ss.count100,
              katu: +ss.countkatu,
              50: +ss.count50,
              0: +ss.countmiss,
            },
            mods: {
              id: +ss.enabled_mods,
              name: id(ss.enabled_mods),
            },
            rank: g.rank,
            pass: g.pass,
          };
          game.scores.push(score);
        }

        match.games.push(game);
      }
      return match;
    } else return null;
  }

  /**
   * Get replay
   * @param {Object} obj {\
   * b: "beatmap id",\
   * u: "User id or Username",\
   * m: "mode (0 = osu!, 1 = Taiko, 2 = CtB, 3 = osu!mania). Optional",\
   * mods: "mods id",\
   * type: "specify if u is a user_id or a username",\
   * }
   * @param {String} path path to folder. Optional, example: './replays'
   * @description \
   * mods: "mods that applies to the beatmap requested. Optional, default is 0. (Refer to the Mods section below, note that requesting multiple mods is supported, but it should not contain any non-difficulty-increasing mods or the return value will be invalid.)""\
   * \
   * type: "Use string for usernames or id for user_ids. Optional, default behaviour is automatic recognition (may be problematic for usernames made up of digits only)"
   */
  /*async replay(obj: Replay): Promise<string> {
    let file = '';
    if (obj.path !== undefined) file = `${obj.path}/${obj.b}-${obj.u}_${obj.mods}.osr`;
    else file = `${obj.b}-${obj.u}_${obj.mods}.osr`;
    if (fs.existsSync(file)) return 'replay already exist';
    else {
      const { data } = await this.api('/get_replay', { params: obj });
      if (data.error) return 'replay not founded';
      else {
        const decode = Buffer.from(data.content, data.encoding);
        const replay = new osr.Replay();

        const map = await this.beatmap({ b: obj.b });
        const score = await this.scores({ b: obj.b, u: obj.u, mods: obj.mods });
        if (score === undefined) return 'score not founed';

        replay.replay_data = lzma.decompress(decode);

        replay.beatmapMD5 = map?.diff.filter((m) => m.id === obj.b)[0].file_md5;
        replay.playerName = score[0].user.name;
        replay.number_300s = score[0].hits[300];
        replay.number_100s = score[0].hits[100];
        replay.number_50s = score[0].hits[50];
        replay.gekis = score[0].hits.geki;
        replay.katus = score[0].hits.katu;
        replay.misses = score[0].hits[0];
        replay.score = score[0].score.total;
        replay.max_combo = score[0].combo.max;
        replay.perfect_combo = score[0].combo.full;
        replay.mods = obj.mods;
        replay.timestamp = new Date(score[0].date);

        const replayFile = replay.serializeSync();
        fs.writeFileSync(file, replayFile, data.encoding);
        return 'replay saved';
      }
    }
  }*/
}