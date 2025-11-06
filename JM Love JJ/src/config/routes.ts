// 路由配置 - 统一管理所有路由信息

export interface RouteConfig {
  path: string;
  name: string;
  description: string;
  icon?: string;
  requiresAuth: boolean;
  requiredLevel?: number; // 需要的用户等级
}

export const routes: RouteConfig[] = [
  {
    path: '/',
    name: '首页',
    description: '欢迎来到JM Love JJ',
    icon: '🏠',
    requiresAuth: true,
  },
  {
    path: '/music',
    name: '音乐库',
    description: '发现JJ所有经典作品',
    icon: '🎵',
    requiresAuth: true,
  },
  {
    path: '/community',
    name: '粉丝社区',
    description: '与全球粉丝互动',
    icon: '👥',
    requiresAuth: true,
  },
  {
    path: '/concerts',
    name: '演唱会',
    description: '演唱会信息和门票',
    icon: '🎤',
    requiresAuth: true,
  },
  {
    path: '/profile',
    name: '个人中心',
    description: '管理你的档案',
    icon: '👤',
    requiresAuth: true,
  },
  {
    path: '/radio',
    name: '智能电台',
    description: 'AI个性化电台推荐',
    icon: '📻',
    requiresAuth: true,
  },
  {
    path: '/rankings',
    name: '排行榜',
    description: '热门歌曲和粉丝排行',
    icon: '🏆',
    requiresAuth: true,
  },
  {
    path: '/fan-stories',
    name: '粉丝故事',
    description: '分享你与JJ的故事',
    icon: '📖',
    requiresAuth: true,
  },
  {
    path: '/challenge',
    name: '音乐挑战',
    description: '测试你的JJ知识',
    icon: '🎮',
    requiresAuth: true,
    requiredLevel: 2, // 需要2级或以上
  },
  {
    path: '/creative',
    name: '创意墙',
    description: '展示你的创意作品',
    icon: '🎨',
    requiresAuth: true,
  },
  {
    path: '/support',
    name: '应援墙',
    description: '为JJ应援和祝福',
    icon: '💝',
    requiresAuth: true,
  },
];

// 公开路由（不需要认证）
export const publicRoutes = [
  {
    path: '/login',
    name: '登录',
    description: '登录或注册账户',
    requiresAuth: false,
  },
];

// 根据路径获取路由配置
export const getRouteByPath = (path: string): RouteConfig | undefined => {
  return routes.find(route => route.path === path);
};

// 获取所有需要认证的路由
export const getProtectedRoutes = (): RouteConfig[] => {
  return routes.filter(route => route.requiresAuth);
};

// 检查路由是否需要特定等级
export const requiresLevel = (path: string, userLevel: number): boolean => {
  const route = getRouteByPath(path);
  if (!route || !route.requiredLevel) return true;
  return userLevel >= route.requiredLevel;
};

