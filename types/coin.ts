export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: any;
  last_updated: string;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
}

export interface CoinDetail {
  additional_notices: any[];
  asset_platform_id: string | null;
  block_time_in_minutes: number;
  categories: string[];
  community_data: CommunityData;
  country_origin: string;
  description: Description;
  detail_platforms: { [key: string]: any };
  developer_data: DeveloperData;
  genesis_date: string;
  hashing_algorithm: string;
  id: string;
  image: ImageData;
  last_updated: string;
  links: Links;
  localization: Localization;
  market_cap_rank: number;
  market_data: MarketData;
  name: string;
  platforms: { [key: string]: string };
  preview_listing: boolean;
  public_notice: string | null;
  sentiment_votes_down_percentage: number;
  sentiment_votes_up_percentage: number;
  status_updates: any[];
  symbol: string;
  tickers: Ticker[];
  watchlist_portfolio_users: number;
  web_slug: string;
}

interface CommunityData {
  facebook_likes: number | null;
  twitter_followers: number;
  reddit_average_posts_48h: number;
  reddit_average_comments_48h: number;
  reddit_subscribers: number;
}

interface Description {
  en: string;
  ko: string;
}

interface DeveloperData {
  forks: number;
  stars: number;
  subscribers: number;
  total_issues: number;
  closed_issues: number;
}

interface ImageData {
  thumb: string;
  small: string;
  large: string;
}

interface Links {
  homepage: string[];
  whitepaper: string;
  blockchain_site: string[];
  official_forum_url: string[];
  chat_url: string[];
}

interface Localization {
  en: string;
  ko: string;
}

interface MarketData {
  current_price: { [currency: string]: number };
  total_value_locked: number | null;
  mcap_to_tvl_ratio: number | null;
  fdv_to_tvl_ratio: number | null;
  price_change_percentage_24h: number;
  price_change_percentage_24h_in_currency: { [currency: string]: number };
  roi: number | null;
}

interface Ticker {
  base: string;
  target: string;
  market: { name: string; identifier: string };
  last: number;
  volume: number;
}
