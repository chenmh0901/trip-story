import type { User } from "./user"

export interface Category {
  id: string
  name: string
  value: string
}

export interface Comment {
  id: number | string
  content: string
  author: User
  createdAt: string
}

export interface Post {
  id: number | string
  title: string
  description: string         // 卡片摘要
  content: string             // 详情页正文
  cover: string               // 卡片封面
  images?: string[]           // 详情页图片（可选）
  author: User
  likes: number
  likedByMe?: boolean         // 当前用户是否点赞
  comments: Comment[]
  tags: string[]
  category?: string
  location?: string           // 可选，地理位置
  createdAt: string
  updatedAt?: string
}
