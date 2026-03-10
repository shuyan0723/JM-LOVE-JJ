import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { getSEOData, getPageTitle } from '../utils/seo';

/**
 * SEO 组件 - 自动为每个页面设置 SEO meta 标签
 */
export default function SEO() {
  const location = useLocation();
  const seoData = getSEOData(location.pathname);
  const fullTitle = getPageTitle(seoData.title);

  return (
    <Helmet>
      {/* 基础标签 */}
      <title>{fullTitle}</title>
      <meta name="description" content={seoData.description} />
      <meta name="keywords" content={seoData.keywords} />
      <link rel="canonical" href={seoData.url} />

      {/* Open Graph 标签 - Facebook, LinkedIn 等 */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:image" content={seoData.image} />
      <meta property="og:url" content={seoData.url} />
      <meta property="og:type" content={seoData.type} />
      <meta property="og:site_name" content="JM Love JJ" />

      {/* Twitter Card 标签 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={seoData.description} />
      <meta name="twitter:image" content={seoData.image} />

      {/* 移动端优化 */}
      <meta name="theme-color" content="#a855f7" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="JM Love JJ" />
    </Helmet>
  );
}

