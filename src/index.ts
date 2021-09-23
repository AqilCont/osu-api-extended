//import { AxiosInstance } from 'axios';
//import "./types.ts";

export { V1 } from "./V1.js"
export * from "./mods.js"
export * from "./tools.js"

// @minhducsun2002/node-osr-parser
// lzma-native


// const modesType: string[] = ['osu', 'taiko', 'fruits', 'mania'];
// const rankingType: string[] = ['performance', 'country', 'score', 'charts'];
// const scoresType: string[] = ['best', 'firsts', 'recent'];
// const userBmType: string[] = ['favourite', 'graveyard', 'loved', 'most_played', 'ranked_and_approved', 'unranked'];

// export class V2 {
//   clientId: number;
//   clientSecret: string;
//   accessToken: string;
//   api: AxiosInstance;
//   oauth: AxiosInstance;

//   constructor(clientId: number, clientSecret: string) {
//     this.clientId = clientId;
//     this.clientSecret = clientSecret;

//     this.accessToken = '';

//     this.api = axios.create({
//       baseURL: 'https://osu.ppy.sh/api/v2/',
//       headers: {
//         Authorization: `Bearer ${this.accessToken}`,
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       timeout: 7e3,
//     });
//     this.oauth = axios.create({
//       baseURL: 'https://osu.ppy.sh/oauth/',
//       timeout: 7e3,
//     });
//   }

//   async login(): Promise<boolean> {
//     const {
//       data: { access_token },
//     } = await this.oauth.post('token', {
//       grant_type: 'client_credentials',
//       client_id: this.clientId,
//       client_secret: this.clientSecret,
//       scope: 'public',
//       code: 'code',
//     });

//     this.accessToken = access_token;

//     this.api = axios.create({
//       baseURL: 'https://osu.ppy.sh/api/v2/',
//       headers: {
//         Authorization: `Bearer ${this.accessToken}`,
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       timeout: 7e3,
//     });
//     return true;
//   }

//   async news(limit?: number, cursorPublished?: string, cursorId?: number): Promise<V2NewsObject> {
//     const { data } = await this.api.get(`/news`, {
//       params: {
//         limit,
//         'cursor[published_at]': cursorPublished,
//         'cursor[_id]': cursorId,
//       },
//     });
//     return data;
//   }

//   async changelog(maxId?: number): Promise<V2ChangelogObject> {
//     const { data } = await this.api.get(`/changelog`, { params: { max_id: maxId } });
//     return data;
//   }

//   /**
//    * @param mode 0 - 'osu'\
//    * 1 - 'taiko'\
//    * 2 - 'fruits'\
//    * 3 - 'mania'
//    * @param type 0 - 'performance'\
//    * 1 - 'country'\
//    * 2 - 'score'\
//    * 3 - 'charts'
//    * @param obj country - Filter ranking by country code. Only available for type of performance\
//    * filter - Either all (default) or friends\
//    * cursor - null\
//    * spotlight - The id of the spotlight if type is charts. Ranking for latest spotlight will be returned if not specified\
//    * variant - Filter ranking to specified mode variant. For mode of mania, it's either 4k or 7k. Only available for type of performance.
//    */
//   async rankings(
//     mode: number,
//     type: number,
//     page: number,
//     obj?: {
//       country?: string;
//       cursor?: string;
//       filter?: string;
//       spotlight?: string;
//       variant?: string;
//     },
//   ): Promise<V2RankingsObject> {
//     const params = Object.assign({ 'cursor[page]': page }, obj);
//     const { data } = await this.api.get(`/rankings/${modesType[mode]}/${rankingType[type]}`, { params });
//     return data;
//   }

//   async spotlights(): Promise<V2SpotlightsObject> {
//     const { data } = await this.api.get(`/spotlights`);
//     return data;
//   }

//   async seasonal_backgrounds(): Promise<V2SeasonalBackgroundsObject> {
//     const { data } = await this.api.get(`/seasonal-backgrounds`);
//     return data;
//   }

//   /**
//    * @param id beatmap id
//    */
//   async beatmap(id: number): Promise<V2BeatmapObject> {
//     const { data } = await this.api.get(`/beatmaps/${id}`);
//     return data;
//   }

//   /**
//    * @param id beatmap id
//    */
//   async beatmap_scores(id: number): Promise<V2BeatmapScoresObject> {
//     const { data } = await this.api.get(`/beatmaps/${id}/scores`);
//     return data;
//   }

//   /**
//    * @param id beatmapset id
//    */
//   async beatmapset(id: number): Promise<V2BeatmapSetObject> {
//     const { data } = await this.api.get(`/beatmapsets/${id}`);
//     return data;
//   }

//   async beatmaps_events(types: string[]): Promise<V2BeatmapsEventsObject> {
//     let params: string = '';
//     const array = [];
//     array.push(types);
//     array.filter((r, i) => (i === array.length - 1 ? (params += `types[]=${r}`) : (params += `types[]=${r}&`)));

//     const { data } = await this.api.get(`/beatmapsets/events${params !== '' ? `?${params}` : ''}`);
//     return data;
//   }

//   async beatmaps_search(approvedDate: string, id: string): Promise<V2BeatmapsSearchObject> {
//     const { data } = await this.api.get(`/beatmapsets/search/`, {
//       params: {
//         'cursor[approved_date]': approvedDate,
//         'cursor[_id]': id,
//       },
//     });
//     return data;
//   }

//   /**
//    * @param id User id
//    * @param mode 0 - 'osu'\
//    * 1 - 'taiko'\
//    * 2 - 'fruits'\
//    * 3 - 'mania'
//    */
//   async user(id: number, mode: number): Promise<V2UserObject> {
//     const { data } = await this.api.get(`/users/${id}${mode ? `/${modesType[mode]}` : ''}`);
//     return data;
//   }

//   /**
//    * @param id User id
//    * @param obj limit - Maximum number of results\
//    * offset - Result offset for pagination
//    */
//   async user_recent_activity(
//     id: number,
//     obj: { limit: number; offset: number },
//   ): Promise<V2UserRecentActivityObject[]> {
//     const { data } = await this.api.get(`/users/${id}/recent_activity`, { params: obj });
//     return data;
//   }

//   /**
//    * @param id User id
//    * @param type 0 - 'best'\
//    * 1 - 'firsts'\
//    * 2 - 'recent'
//    * @param obj include_fails - Only for recent scores, include scores of failed plays. Set to 1 to include them. Defaults to 0\
//    * mode - GameMode (osu, fruits, mania, taiko) of the scores to be returned. Defaults to the specified user's mode\
//    * limit - Maximum number of results\
//    * offset - Result offset for pagination\
//    */
//   async user_scores(
//     id: number,
//     type: number,
//     obj: { include_fails: number; mode: string; limit: number; offset: number },
//   ): Promise<V2UserScoresObject[]> {
//     const { data } = await this.api.get(`/users/${id}/scores/${scoresType[type]}`, { params: obj });
//     return data;
//   }

//   /**
//    * @param id User id
//    * @param type 0 - 'favourite'\
//    * 1 - 'graveyard'\
//    * 2 - 'loved'\
//    * 3 - 'most_played'\
//    * 4 - 'ranked_and_approved'\
//    * 5 - 'unranked'
//    * @param obj limit - Maximum number of results\
//    * offset - Result offset for pagination\
//    */
//   async user_beatmaps(
//     id: number,
//     type: number,
//     obj: { limit: number; offset: number },
//   ): Promise<V2UserBeatmapsObject[]> {
//     const { data } = await this.api.get(`/users/${id}/beatmapsets/${userBmType[type]}`, { params: obj });
//     return data;
//   }

//   /**
//    * @param id User id
//    */
//   async user_kudosu(id: number): Promise<V2UserKudosuObject[]> {
//     const { data } = await this.api.get(`/users/${id}/kudosu`);
//     return data;
//   }
// }