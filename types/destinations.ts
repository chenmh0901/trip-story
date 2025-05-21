import type { Post } from "./post"

export interface Destination {
  id: number
  name: string
  cover: string
  description?: string
}

export interface CityDetail {
  id: number
  name: string
  cover: string
  description: string
  posts: Post[]
  attractions: Destination[]
  travelTips: TravelTipSection[]
}

export interface TravelTipSection {
  title: string; // 如 "Best Time to Visit"
  content: TravelTipItem[];
}

export interface TravelTipItem {
  title?: string;
  content: string | string[];
}
