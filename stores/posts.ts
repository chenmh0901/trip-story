import type { Comment, Post } from '~/types/post'

const POSTS: Post[] = [
  {
    id: 1,
    title: '成都三日游｜探店必吃美食清单',
    cover: '/images/posts/kanzhaixiangzi.jpg',
    images: [
      '/images/posts/chengdu/bg1.jpg',
      '/images/posts/chengdu/bg2.jpg',
      '/images/posts/chengdu/bg3.jpg',
    ],
    description: '整理了成都最地道的美食，从早餐到夜宵，承包你的整个行程',
    likes: 2341,
    comments: [
      {
        id: 1,
        author: {
          id: 1,
          name: '小熊软糖贩卖机',
          avatar: '/images/avatars/user1.png',
        },
        content: '整理了成都最地道的美食，从早餐到夜宵，承包你的整个行程',
        createdAt: '2024-01-01',
      },
      {
        id: 2,
        author: {
          id: 4,
          name: '阿木木',
          avatar: '/images/avatars/user4.png',
        },
        content: '成都这个地方真是太美了',
        createdAt: '2024-01-01',
      },
    ],
    author: {
      id: 7,
      name: '糖霜鸢尾',
      avatar: '/images/avatars/user7.png',
    },
    tags: ['成都', '美食', '探店'],
    category: '美食',
    content: '整理了成都最地道的美食，从早餐到夜宵，承包你的整个行程',
    createdAt: '2024-01-01',
  },
  {
    id: 2,
    title: '香港维多利亚港｜最佳拍摄时间和机位推荐',
    cover: '/images/posts/victoria-harbour.jpg',
    images: ['/images/posts/victoria-harbour.jpg'],
    description: '维多利亚港日落到夜景的完美拍摄攻略，收藏了各个角度的取景位置',
    likes: 1892,
    comments: [
      {
        id: 1,
        author: {
          id: 4,
          name: '阿木木',
          avatar: '/images/avatars/user4.png',
        },
        content: '维多利亚港的日落真是太美丽了',
        createdAt: '2024-01-01',
      },
    ],
    author: {
      id: 6,
      name: '像素游侠',
      avatar: '/images/avatars/user6.png',
    },
    tags: ['香港', '摄影', '风景'],
    category: '风景',
    content: '维多利亚港的日落真是太美丽了',
    createdAt: '2024-01-01',
  },
  {
    id: 3,
    title: '香港迪士尼乐园游玩攻略',
    cover: '/images/posts/hong-kong-disneyland.jpg',
    images: ['/images/posts/hong-kong-disneyland.jpg'],
    description: '迪士尼乐园多个游玩项目推荐，让你玩转迪士尼',
    likes: 1892,
    comments: [
      {
        id: 1,
        author: {
          id: 5,
          name: '桃桃汽水罐',
          avatar: '/images/avatars/user5.png',
        },
        content: '迪士尼乐园的游玩项目真是太有趣了',
        createdAt: '2024-01-01',
      },
    ],
    author: {
      id: 4,
      name: '阿木木',
      avatar: '/images/avatars/user4.png',
    },
    tags: ['游乐园', '迪士尼', '游玩攻略'],
    category: '娱乐',
    content: '迪士尼乐园的游玩项目真是太有趣了',
    createdAt: '2024-01-01',
  },
  {
    id: 4,
    title: '尖沙咀购物体验',
    cover: '/images/posts/tsim-sha-tsui.jpg',
    images: ['/images/posts/tsim-sha-tsui.jpg'],
    description: '尖沙咀购物攻略，让你买到心仪的商品',
    likes: 1892,
    comments: [
      {
        id: 1,
        author: {
          id: 2,
          name: '青禾纪',
          avatar: '/images/avatars/user2.png',
        },
        content: '尖沙咀购物攻略，让你买到心仪的商品',
        createdAt: '2024-01-01',
      },
    ],
    author: {
      id: 3,
      name: '月姐',
      avatar: '/images/avatars/user3.png',
    },
    tags: ['香港', '购物', '尖沙咀'],
    category: '购物',
    content: '尖沙咀购物攻略，让你买到心仪的商品',
    createdAt: '2024-01-01',
  },
  {
    id: 5,
    title: '北京故宫懒人攻略',
    cover: '/images/posts/gugong.jpg',
    images: ['/images/posts/gugong.jpg'],
    description: '故宫游玩攻略，让你轻松逛完故宫',
    likes: 1892,
    comments: [
      {
        id: 1,
        author: {
          id: 1,
          name: '小熊软糖贩卖机',
          avatar: '/images/avatars/user1.png',
        },
        content: '故宫游玩攻略，让你轻松逛完故宫',
        createdAt: '2024-01-01',
      },
    ],
    author: {
      id: 2,
      name: '青禾纪',
      avatar: '/images/avatars/user2.png',
    },
    tags: ['北京', '故宫', '游玩攻略'],
    category: '文化',
    content: '故宫游玩攻略，让你轻松逛完故宫',
    createdAt: '2024-01-01',
  },
  {
    id: 99,
    title: '上海外滩',
    description: '上海外滩是上海的标志性景点，位于黄浦江畔，是上海的象征。',
    cover: '/images/destinations/shanghai.jpg',
    content: '上海外滩是上海的标志性景点，位于黄浦江畔，是上海的象征。',
    author: {
      id: 1,
      avatar: '/images/avatars/user1.png',
      name: '小熊软糖贩卖机',
    },
    images: [
      '/images/posts/shanghai/bg1.jpg',
      '/images/posts/shanghai/bg2.jpg',
    ],
    likes: 100,
    comments: [
      {
        id: '1',
        author: {
          id: 1,
          avatar: '/images/avatars/user1.png',
          name: '小熊软糖贩卖机',
        },
        content: '上海外滩是上海的标志性景点，位于黄浦江畔，是上海的象征。',
        createdAt: '2024-01-01',
      }
    ],
    tags: ['上海', '外滩', '黄浦江', '东方明珠'],
    category: '上海',
    location: '上海',
    createdAt: '2024-01-01',
  }
]

export const usePostsStore = defineStore('posts', () => {
  const posts = ref(POSTS)
  const draft = ref<Post | null>(null)

  const addPost = (post: Post) => {
    posts.value.push(post)
  }

  const saveDraft = (post: Post) => {
    draft.value = post
  }

  const addComment = (postId: number, comment: Comment) => {
    const post = posts.value.find((p) => p.id === postId)
    if (post) {
      post.comments.push(comment)
    }
  }

  const addLike = (postId: number) => {
    const post = posts.value.find((p) => p.id === postId)
    if (post) {
      post.likes++
      post.likedByMe = true
    }
  }

  const removeLike = (postId: number) => {
    const post = posts.value.find((p) => p.id === postId)
    if (post) {
      post.likes--
      post.likedByMe = false
    }
  }

  return {
    posts,
    draft,
    addPost,
    addComment,
    saveDraft,
    addLike,
    removeLike
  }
})
