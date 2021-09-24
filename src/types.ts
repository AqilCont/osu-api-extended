export type NulledString = string | null;

export interface O<T> { [key: string]: T };

export interface AccObject {
  300: number;
  geki: number;
  100: number;
  katu: number;
  50: number;
  0: number;
}

export interface DefaultObj {
  u?: number;
  m?: number;
  type?: string;
}

export interface Bm extends DefaultObj {
  s?: number;
  b?: number;
  a?: number;
  h?: string;
  mods?: number;
  since?: string;
  limit?: number;
}

export interface User extends DefaultObj {
  event_days?: number;
}

export interface Scores extends DefaultObj {
  b?: number;
  mods?: number;
  limit?: number;
}

export interface Best extends DefaultObj {
  limit?: number;
  u: number;
}

export interface Recent extends DefaultObj {
  limit?: number;
}

export interface Replay {
  b: number;
  u: number;
  m?: number;
  s?: number;
  mods: number;
  path?: string;
  type?: string;
}

export interface PpCalc {
  id: number;
  mods?: number;
  combo?: number;
  miss?: number;
  acc?: number;
}

export interface IdNamed {
  id: number;
  name: string;
}

export interface ScoreObject {
  date: string;
  combo: {
    max: number;
    full: number;
  };
  hits: {
    300: number;
    geki: number;
    100: number;
    katu: number;
    50: number;
    0: number;
  };
  mods: IdNamed;
  rank: string;
  accuracy: number;
}

export interface MatchGame {
  id: number;
  time: {
    start: string;
    end: string;
  };
  beatmap_id: number;
  mode: IdNamed;
  types: {
    match: string;
    scoring: IdNamed;
    team: IdNamed;
  };
  mods: IdNamed;
  scores: MatchScore[];
}

export interface MatchScore {
  team: IdNamed;
  slot: number;
  user: {
    id: number;
  };
  score: number;
  combo: {
    max: number;
    perfect: number;
  };
  hits: {
    300: number;
    geki: number;
    100: number;
    katu: number;
    50: number;
    0: number;
  };
  mods: IdNamed;
  rank: string;
  pass: string;
}

export interface DiffObject {
  id: number;
  diff: string;
  mode: IdNamed;
  file_md5: string;
  stats: {
    star: {
      pure: number;
      aim: number;
      speed: number;
    };
    ar: number;
    od: number;
    cs: number;
    hp: number;
    bpm: {
      avg: number;
    };
    combo: number;
    time: {
      full: number;
      drain: number;
    };
    objects: {
      all: number;
      circles: number;
      sliders: number;
      spinners: number;
    };
  };
  plays: number;
  pass: number;
}

export interface Events {
  id: {
    diff: number;
    set: number;
  };
  display: {
    html: string;
    pure: string;
  };
  date: string;
  epicfactor: number;
}

export interface RanksGrades {
  ssh: number;
  ss: number;
  sh: number;
  s: number;
  a: number;
}

export interface BeatmapCoversObj {
  cover: string;
  'cover@2x': string;
  card: string;
  'card@2x': string;
  list: string;
  'list@2x': string;
  slimcover: string;
  'slimcover@2x': string;
}

export interface NewsPosts {
  id: number;
  author: string;
  edit_url: string;
  first_image: string;
  published_at: string;
  updated_at: string;
  slug: string;
  title: string;
  preview: string;
}

export interface StreamsObject {
  id: number;
  name: string;
  display_name: string;
  is_featured: boolean;
  latest_build: {
    id: number;
    version: string;
    display_version: string;
    users: number;
    created_at: string;
    update_stream: {
      id: number;
      name: string;
      display_name: string;
      is_featured: boolean;
    };
  };
  user_count: number;
}

export interface BuildsObject {
  id: number;
  version: string;
  display_version: string;
  users: number;
  created_at: string;
  update_stream: {
    id: number;
    name: string;
    display_name: string;
    is_featured: boolean;
  };
  changelog_entries: ChangelogEntries[];
}

export interface ChangelogEntries {
  id: number;
  repository: string;
  github_pull_request_id: number;
  github_url: string;
  url: null | string;
  type: string;
  category: string;
  title: string;
  message_html: string;
  major: boolean;
  created_at: string;
  github_user: {
    id: number;
    display_name: string;
    github_url: string;
    osu_username: null;
    user_id: null;
    user_url: null;
  };
}

export interface UserSmall {
  avatar_url: string;
  country_code: string;
  default_group: string;
  id: number;
  is_active: boolean;
  is_bot: boolean;
  is_online: boolean;
  is_supporter: boolean;
  last_visit: string;
  pm_friends_only: boolean;
  profile_colour: NulledString;
  username: string;
}

export interface UserSmallGroups extends UserSmall {
  groups: {
    id: number;
    identifier: string;
    name: string;
    short_name: string;
    description: string;
    colour: string;
    playmodes: null;
    is_probationary: boolean;
  }[];
}

export interface UserShort {
  avatar_url: string;
  country_code: string;
  default_group: string;
  id: number;
  is_active: boolean;
  is_bot: boolean;
  is_online: boolean;
  is_supporter: boolean;
  last_visit: string;
  pm_friends_only: boolean;
  profile_colour: NulledString;
  username: string;
  country: {
    code: string;
    name: string;
  };
  cover: {
    custom_url: string;
    url: string;
    id: null | number;
  };
}

export interface BmSetShort {
  artist: string;
  artist_unicode: string;
  covers: BeatmapCoversObj;
  creator: string;
  favourite_count: number;
  hype: null;
  id: number;
  play_count: number;
  preview_url: string;
  source: string;
  status: string;
  title: string;
  title_unicode: string;
  user_id: number;
  video: boolean;
}
export interface BmSetShortUser extends BmSetShort {
  user: UserSmall;
}

export interface BmSetFull {
  artist: string;
  artist_unicode: string;
  covers: BeatmapCoversObj;
  creator: string;
  favourite_count: number;
  hype: null;
  id: number;
  play_count: number;
  preview_url: string;
  source: string;
  status: string;
  title: string;
  title_unicode: string;
  user_id: number;
  video: boolean;
  availability: {
    download_disabled: boolean;
    more_information: null;
  };
  bpm: number;
  can_be_hyped: boolean;
  discussion_enabled: boolean;
  discussion_locked: boolean;
  is_scoreable: boolean;
  last_updated: string;
  legacy_thread_url: string;
  nominations_summary: {
    current: number;
    required: number;
  };
  ranked: number;
  ranked_date: null | string;
  storyboard: boolean;
  submitted_date: string;
  tags: string;
}
export interface BmSetFullRatings extends BmSetFull {
  ratings: number[];
}
export interface BmSetFullBm extends BmSetFull {
  beatmaps: BmShort[];
}

export interface BmShort {
  difficulty_rating: number;
  id: number;
  mode: string;
  total_length: number;
  version: string;
  accuracy: number;
  ar: number;
  beatmapset_id: number;
  bpm: number;
  convert: boolean;
  count_circles: number;
  count_sliders: number;
  count_spinners: number;
  cs: number;
  deleted_at: null | string;
  drain: number;
  hit_length: number;
  is_scoreable: boolean;
  last_updated: string;
  mode_int: number;
  passcount: number;
  playcount: number;
  ranked: number;
  status: string;
  url: string;
}
export interface BmShortCombo extends BmShort {
  max_combo: number;
}
export interface BmShortComboFails extends BmShort {
  failtimes: {
    fail: number[];
    exit: number[];
  };
  max_combo: number;
}

export interface RankingObject {
  level: {
    current: number;
    progress: number;
  };
  pp: null | number;
  pp_rank: null | number;
  ranked_score: number;
  hit_accuracy: number;
  play_count: number;
  play_time: null | number;
  total_score: number;
  total_hits: number;
  maximum_combo: number;
  replays_watched_by_others: number;
  is_ranked: boolean;
  grade_counts: RanksGrades;
  user: UserShort;
}

export interface RankingObjectCountry {
  code: string;
  active_users: number;
  play_count: number;
  ranked_score: number;
  performance: number;
  country: {
    code: string;
    name: string;
  };
}

export interface PpCalcObject {
  id: {
    set: number;
    diff: number;
  };
  mods: IdNamed;
  status: IdNamed;
  stats: {
    star: {
      pure: number;
      aim: number;
      speed: number;
    };
    ar: number;
    od: number;
    cs: number;
    hp: number;
    bpm: {
      api: number;
      min: number;
      max: number;
    };
    combo: number;
    time: {
      full: number;
      drain: number;
    };
  };
  pp: {
    current: number;
    fc: number;
    acc: {
      80: number;
      81: number;
      82: number;
      83: number;
      84: number;
      85: number;
      86: number;
      87: number;
      88: number;
      89: number;
      90: number;
      91: number;
      92: number;
      93: number;
      94: number;
      95: number;
      96: number;
      97: number;
      98: number;
      99: number;
      100: number;
    };
  };
  data: {
    artist: string;
    title: string;
    creator: IdNamed;
    favs: number;
    rating: number;
    source: string;
    genre_id: IdNamed;
    language_id: IdNamed;
    tags: string;
    diff: string;
  };
  other: {
    download_unavailable: boolean;
    audio_unavailable: boolean;
    storyboard: boolean;
    video: boolean;
    packs: string;
    bg: {
      full: string;
      raw: string;
      slim: {
        1: string;
        2: string;
      };
      cover: {
        1: string;
        2: string;
      };
      card: {
        1: string;
        2: string;
      };
      list: {
        1: string;
        2: string;
      };
    };
  };
  req: {
    id: number;
    combo: number;
    mods: number;
    acc: number;
    miss: number;
  };
}

/**
 * ---- ==== V1 api
 */

export interface V1BeatmapObject {
  id: {
    set: number;
    diff: number;
  };
  date: {
    submit: string;
    update: string;
    approved: string;
  };
  metadata: {
    artist: {
      original: string;
      unicode: string;
    };
    title: {
      original: string;
      unicode: string;
    };
    creator: IdNamed;
    favs: number;
    rating: number;
    source: string;
    genre_id: IdNamed;
    language_id: IdNamed;
    tags: string;
  };
  status: IdNamed;
  diff: DiffObject[];
  misc: {
    download_unavailable: boolean;
    audio_unavailable: boolean;
    storyboard: boolean;
    video: boolean;
    packs: string;
    bg: {
      full: string;
      raw: string;
      slim: {
        1: string;
        2: string;
      };
      cover: {
        1: string;
        2: string;
      };
      card: {
        1: string;
        2: string;
      };
      list: {
        1: string;
        2: string;
      };
    };
  };
}

export interface V1UserObject {
  id: number;
  name: string;
  pp: number;
  acc: number;
  lvl: number;
  join: string;
  country: {
    flag: string;
    short: string;
    full: string;
  };
  play: {
    count: number;
    time: number;
  };
  hits: {
    300: number;
    100: number;
    50: number;
  };
  score: {
    total: number;
    ranked: number;
  };
  rank: {
    global: number;
    country: number;
  };
  ranks: {
    ssh: number;
    ss: number;
    sh: number;
    s: number;
    a: number;
  };
  events: Events[];
}

export interface V1ScoresObject extends ScoreObject {
  user: IdNamed;
  score: {
    total: number;
    id: number;
  };
  pp: number;
  replay: number;
}

export interface V1ScoresBestObject extends ScoreObject {
  beatmap: number;
  user: {
    id: number;
  };
  score: {
    total: number;
    id: number;
  };
  pp: number;
  replay: number;
}

export interface V1ScoresRecentObject extends ScoreObject {
  beatmap: number;
  user: {
    id: number;
  };
  score: {
    total: number;
  };
}

export interface V1MatchObject {
  match: {
    id: number;
    name: string;
    time: {
      start: string;
      end: string;
    };
  };
  games: MatchGame[];
}

/**
 * ---- ==== V2 api
 */

export interface V2NewsObject {
  news_posts: NewsPosts[];
  search: {
    cursor: string | null;
    limit: number;
  };
  cursor: {
    published_at: string;
    id: number;
  };
}

export interface V2ChangelogObject {
  streams: StreamsObject[];
  builds: BuildsObject[];
  search: {
    stream: null;
    from: null;
    to: null;
    max_id: null;
    limit: number;
  };
}

export interface V2RankingsObject {
  beatmapsets?: BmSetFullBm;
  cursor?: {
    page: number;
  };
  ranking: RankingObject[] | RankingObjectCountry;
  total?: number;
}

export interface V2SpotlightsObject {
  spotlights: {
    id: boolean;
    name: string;
    type: string;
    start_date: string;
    end_date: string;
    mode_specific: boolean;
  }[];
}

export interface V2SeasonalBackgroundsObject {
  ends_at: string;
  backgrounds: {
    url: string;
    user: UserSmall;
  }[];
}

export interface V2BeatmapObject extends BmShortComboFails {
  beatmapset: BmSetFullRatings;
}

export interface V2BeatmapScoresObject {
  id: number;
  best_id: number;
  user_id: number;
  accuracy: number;
  mods: string[];
  score: number;
  max_combo: number;
  perfect: boolean;
  statistics: {
    count_50: number;
    count_100: number;
    count_300: number;
    count_geki: number;
    count_katu: number;
    count_miss: number;
  };
  pp: number;
  rank: string;
  created_at: string;
  mode: string;
  mode_int: number;
  replay: boolean;
  beatmap: BmShort;
  user: UserShort;
}

export interface V2BeatmapSetObject extends BmSetFull {
  beatmaps: BmShortComboFails[];
  converts: BmShortComboFails[];
  description: {
    description: string;
  };
  genre: IdNamed;
  language: IdNamed;
  ratings: number[];
  recent_favourites: UserSmall[];
  user: UserSmall;
}

export interface V2BeatmapsEventsObject {
  events: EventsObject[];
  reviewsConfig: {
    max_blocks: number;
  };
  users: UserSmallGroups[];
}

export interface EventsObject {
  id: number;
  type: string;
  comment: {
    beatmap_discussion_id: number;
    beatmap_discussion_post_id: null | number;
    new_vote: {
      user_id: number;
      score: number;
    };
    votes: {
      user_id: number;
      score: number;
    }[];
  };
  created_at: string;
  user_id: number;
  beatmapset: BmSetShortUser;
  discussion?: {
    id: number;
    beatmapset_id: number;
    beatmap_id: null | number;
    user_id: number;
    deleted_by_id: null | number;
    message_type: string;
    parent_id: null | number;
    timestamp: NulledString;
    resolved: boolean;
    can_be_resolved: boolean;
    can_grant_kudosu: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: NulledString;
    last_post_at: string;
    kudosu_denied: boolean;
    starting_post: {
      id: number;
      beatmap_discussion_id: number;
      user_id: number;
      last_editor_id: number;
      deleted_by_id: null | number;
      system: boolean;
      message: string;
      created_at: string;
      updated_at: string;
      deleted_at: NulledString;
    };
  };
}

export interface V2BeatmapsSearchObject extends BmSetFull {
  beatmaps: BmShortCombo[];
}

export interface V2UserObject {
  avatar_url: string;
  country_code: string;
  default_group: string;
  id: number;
  is_active: boolean;
  is_bot: boolean;
  is_online: boolean;
  is_supporter: boolean;
  last_visit: string;
  pm_friends_only: boolean;
  profile_colour: null | string;
  username: string;
  comments_count: number;
  cover_url: string;
  discord: null | string;
  has_supported: boolean;
  interests: null | string;
  join_date: string;
  kudosu: {
    total: number;
    available: number;
  };
  location: null | string;
  max_blocks: number;
  max_friends: number;
  occupation: null | string;
  playmode: string;
  playstyle: string[];
  post_count: number;
  profile_order: string[];
  skype: null | string;
  title: null | string;
  title_url: null | string;
  twitter: null | string;
  website: null | string;
  country: {
    code: string;
    name: string;
  };
  cover: {
    custom_url: null | string;
    url: string;
    id: string;
  };
  account_history: [];
  active_tournament_banner: [];
  badges: {
    awarded_at: string;
    description: string;
    image_url: string;
    url: string;
  }[];
  beatmap_playcounts_count: number;
  favourite_beatmapset_count: number;
  follower_count: number;
  graveyard_beatmapset_count: number;
  groups: {
    id: number;
    identifier: string;
    name: string;
    short_name: string;
    description: string;
    colour: string;
    playmodes: null;
    is_probationary: boolean;
  }[];
  loved_beatmapset_count: number;
  monthly_playcounts: {
    start_date: string;
    count: number;
  }[];
  page: {
    html: string;
    raw: string;
  };
  previous_usernames: string[];
  ranked_and_approved_beatmapset_count: number;
  replays_watched_counts: {
    start_date: string;
    count: number;
  }[];
  scores_best_count: number;
  scores_first_count: number;
  scores_recent_count: number;
  statistics: {
    level: {
      current: number;
      progress: number;
    };
    pp: number;
    pp_rank: number;
    ranked_score: number;
    hit_accuracy: number;
    play_count: number;
    play_time: number;
    total_score: number;
    total_hits: number;
    maximum_combo: number;
    replays_watched_by_others: number;
    is_ranked: boolean;
    grade_counts: RanksGrades;
    rank: {
      global: number;
      country: number;
    };
    variants?: {
      mode: string;
      variant: string;
      country_rank: number;
      global_rank: number;
      pp: number;
    }[];
  };
  support_level: number;
  unranked_beatmapset_count: number;
  user_achievements: {
    achieved_at: string;
    achievement_id: number;
  }[];
  rankHistory: {
    mode: string;
    data: number[];
  };
  rank_history: {
    mode: string;
    data: number[];
  };
}

export interface V2UserRecentActivityObject {
  created_at: string;
  id: number;
  type: string;
  approval?: string;
  count?: number;
  scoreRank?: string;
  rank?: number;
  mode?: string;
  achievement?: {
    icon_url: string;
    id: number;
    name: string;
    grouping: string;
    ordering: number;
    slug: string;
    description: string;
    mode: null | string;
    instructions: null | string;
  };
  beatmap?: {
    title: string;
    url: string;
  };
  beatmapset?: {
    title: string;
    url: string;
  };
  user: {
    previousUsername?: string;
    username: string;
    url: string;
  };
}

export interface V2UserScoresObject {
  id: number;
  best_id: null | number;
  user_id: number;
  accuracy: number;
  mods: string[];
  score: number;
  max_combo: number;
  perfect: boolean;
  statistics: {
    count_50: number;
    count_100: number;
    count_300: number;
    count_geki: number;
    count_katu: number;
    count_miss: number;
  };
  pp: null | number;
  rank: string;
  created_at: string;
  mode: string;
  mode_int: number;
  replay: boolean;
  beatmap: BmShort;
  beatmapset: BmSetShort;
  weight?: {
    percentage: number;
    pp: number;
  };
  user: UserSmall;
}

export interface V2UserBeatmapsObject extends BmSetFull {
  beatmaps: BmShort[];
}

export interface V2UserKudosuObject {
  id: number;
  action: string;
  amount: number;
  model: string;
  created_at: string;
  giver: null | object;
  post: {
    url: string;
    title: string;
  };
  details: {
    event: string;
  };
}

export interface RequestParams {
  method?: string,
  headers?: { [key: string]: string },
  data?: string,
  params?: object | [object, ...object[]] // any | [any, ...any]
}


export interface RequestNamepsace {
  (url: string, { params }: { params?: object }): Promise<any>
}