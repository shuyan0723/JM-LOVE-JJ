/**
 * SEO 配置和工具函数
 */

export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

// 默认 SEO 配置
const defaultSEO: SEOData = {
  title: 'JM Love JJ - 林俊杰粉丝互动平台',
  description: '用爱，唱出我的故事。林俊杰粉丝专属互动平台，音乐库、社区互动、演唱会信息、个人中心等一站式服务。',
  keywords: '林俊杰, JJ Lin, 粉丝平台, 音乐, 演唱会, 社区, 粉丝互动',
  image: '/ljj.webp',
  type: 'website',
};

// 各页面的 SEO 配置
export const pageSEO: Record<string, SEOData> = {
  '/': {
    title: '首页 - JM Love JJ',
    description: '欢迎来到林俊杰粉丝互动平台，发现最新音乐、参与社区讨论、了解演唱会信息。',
    keywords: '林俊杰, 首页, 粉丝平台, 音乐推荐',
  },
  '/login': {
    title: '登录/注册 - JM Love JJ',
    description: '登录或注册账号，加入林俊杰粉丝大家庭，享受专属音乐和社区服务。',
    keywords: '登录, 注册, 林俊杰粉丝, 账号',
  },
  '/music': {
    title: '音乐库 - JM Love JJ',
    description: '探索林俊杰的完整音乐作品集，包括最新单曲、经典专辑、热门歌曲等。',
    keywords: '林俊杰音乐, 歌曲, 专辑, 音乐库, 在线播放',
  },
  '/community': {
    title: '粉丝社区 - JM Love JJ',
    description: '与全球林俊杰粉丝交流互动，分享音乐感受、讨论话题、参与活动。',
    keywords: '粉丝社区, 讨论, 分享, 互动, 林俊杰粉丝',
  },
  '/concerts': {
    title: '演唱会 - JM Love JJ',
    description: '获取林俊杰最新演唱会信息、购票指南、演出日程和现场回顾。',
    keywords: '演唱会, 演出, 购票, 林俊杰演唱会, 现场',
  },
  '/profile': {
    title: '个人中心 - JM Love JJ',
    description: '管理您的个人资料、收藏的音乐、发布的动态和关注的好友。',
    keywords: '个人中心, 个人资料, 我的收藏, 我的动态',
  },
  '/radio': {
    title: '智能电台 - JM Love JJ',
    description: '基于您的喜好，智能推荐林俊杰的音乐，发现更多好听的歌曲。',
    keywords: '智能电台, 音乐推荐, 个性化, 林俊杰音乐',
  },
  '/rankings': {
    title: '排行榜 - JM Love JJ',
    description: '查看林俊杰歌曲的热门排行榜，包括播放量、点赞数、收藏数等。',
    keywords: '排行榜, 热门歌曲, 音乐排行, 播放量',
  },
  '/fan-stories': {
    title: '粉丝故事 - JM Love JJ',
    description: '阅读和分享与林俊杰音乐相关的感人故事和美好回忆。',
    keywords: '粉丝故事, 回忆, 分享, 感人故事',
  },
  '/challenge': {
    title: '音乐挑战 - JM Love JJ',
    description: '参与音乐挑战活动，展示您的音乐才华，与其他粉丝互动。',
    keywords: '音乐挑战, 活动, 互动, 才艺展示',
  },
  '/creative': {
    title: '创意墙 - JM Love JJ',
    description: '展示粉丝创作的与林俊杰相关的艺术作品、视频、图片等创意内容。',
    keywords: '创意墙, 艺术作品, 粉丝创作, 创意内容',
  },
  '/support': {
    title: '应援墙 - JM Love JJ',
    description: '为林俊杰送上祝福和支持，展示粉丝的应援作品和留言。',
    keywords: '应援墙, 祝福, 支持, 粉丝应援',
  },
};

/**
 * 获取页面的 SEO 数据
 */
export function getSEOData(pathname: string): SEOData {
  const pageData = pageSEO[pathname] || {};
  return {
    ...defaultSEO,
    ...pageData,
    url: typeof window !== 'undefined' ? `${window.location.origin}${pathname}` : '',
  };
}

/**
 * 生成完整的页面标题
 */
export function getPageTitle(title?: string): string {
  if (!title) return defaultSEO.title || '';
  return `${title} | ${defaultSEO.title}`;
}

