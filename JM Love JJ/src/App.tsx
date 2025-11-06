import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { useAppSelector } from './store/hooks';
import Header from './components/Header';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import PageLoader from './components/PageLoader';
import NotFound from './pages/NotFound';

// 懒加载路由组件 - 优化首屏加载速度
const Login = lazy(() => import('./pages/Login'));
const Home = lazy(() => import('./pages/Home'));
const Music = lazy(() => import('./pages/Music'));
const Community = lazy(() => import('./pages/Community'));
const Concerts = lazy(() => import('./pages/Concerts'));
const Profile = lazy(() => import('./pages/Profile'));
const Radio = lazy(() => import('./pages/Radio'));
const Rankings = lazy(() => import('./pages/Rankings'));
const FanStories = lazy(() => import('./pages/FanStories'));
const MusicChallenge = lazy(() => import('./pages/MusicChallenge'));
const CreativeWall = lazy(() => import('./pages/CreativeWall'));
const SupportWall = lazy(() => import('./pages/SupportWall'));

function AppContent() {
  const { isAuthenticated } = useAppSelector(state => state.auth);

  return (
    <Router>
      <ErrorBoundary>
        <div className="min-h-screen bg-slate-950 flex flex-col pb-24">
          {isAuthenticated && <Header />}
          <main className="flex-1">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* 登录路由 */}
                <Route 
                  path="/login" 
                  element={
                    <Suspense fallback={<PageLoader />}>
                      <Login />
                    </Suspense>
                  } 
                />

                {/* 受保护的路由 */}
                <Route 
                  path="/" 
                  element={
                    <ProtectedRoute element={
                      <Suspense fallback={<PageLoader />}>
                        <Home />
                      </Suspense>
                    } /> 
                  } 
                />
                <Route 
                  path="/music" 
                  element={
                    <ProtectedRoute element={
                      <Suspense fallback={<PageLoader />}>
                        <Music />
                      </Suspense>
                    } /> 
                  } 
                />
                <Route 
                  path="/community" 
                  element={
                    <ProtectedRoute element={
                      <Suspense fallback={<PageLoader />}>
                        <Community />
                      </Suspense>
                    } /> 
                  } 
                />
                <Route 
                  path="/concerts" 
                  element={
                    <ProtectedRoute element={
                      <Suspense fallback={<PageLoader />}>
                        <Concerts />
                      </Suspense>
                    } /> 
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute element={
                      <Suspense fallback={<PageLoader />}>
                        <Profile />
                      </Suspense>
                    } /> 
                  } 
                />
                <Route 
                  path="/radio" 
                  element={
                    <ProtectedRoute element={
                      <Suspense fallback={<PageLoader />}>
                        <Radio />
                      </Suspense>
                    } /> 
                  } 
                />
                <Route 
                  path="/rankings" 
                  element={
                    <ProtectedRoute element={
                      <Suspense fallback={<PageLoader />}>
                        <Rankings />
                      </Suspense>
                    } /> 
                  } 
                />
                <Route 
                  path="/fan-stories" 
                  element={
                    <ProtectedRoute element={
                      <Suspense fallback={<PageLoader />}>
                        <FanStories />
                      </Suspense>
                    } /> 
                  } 
                />
                <Route 
                  path="/challenge" 
                  element={
                    <ProtectedRoute element={
                      <Suspense fallback={<PageLoader />}>
                        <MusicChallenge />
                      </Suspense>
                    } /> 
                  } 
                />
                <Route 
                  path="/creative" 
                  element={
                    <ProtectedRoute element={
                      <Suspense fallback={<PageLoader />}>
                        <CreativeWall />
                      </Suspense>
                    } /> 
                  } 
                />
                <Route 
                  path="/support" 
                  element={
                    <ProtectedRoute element={
                      <Suspense fallback={<PageLoader />}>
                        <SupportWall />
                      </Suspense>
                    } /> 
                  } 
                />

                {/* 404 页面 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          {isAuthenticated && <Footer />}
          {isAuthenticated && <MusicPlayer />}
        </div>
      </ErrorBoundary>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
