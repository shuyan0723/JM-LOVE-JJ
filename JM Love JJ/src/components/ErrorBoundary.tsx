import { 
  Component, 
  ErrorInfo, 
  ReactNode 
} from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-red-900/20 to-slate-950 px-4">
          <div className="text-center max-w-2xl">
            <div className="mb-8">
              <AlertCircle className="w-20 h-20 text-red-400 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-white mb-4">出错了</h1>
              <p className="text-gray-400 mb-4">
                页面遇到了一些问题，但我们正在努力修复。
              </p>
              {this.state.error && (
                <p className="text-sm text-red-400 bg-red-900/20 p-4 rounded-lg mb-4 text-left">
                  {this.state.error.message}
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="btn-primary flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                刷新页面
              </button>
              <Link to="/" className="btn-secondary flex items-center justify-center gap-2">
                <Home className="w-4 h-4" />
                返回首页
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

