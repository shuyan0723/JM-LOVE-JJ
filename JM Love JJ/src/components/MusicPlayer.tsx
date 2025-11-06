import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { pauseMusic, resumeMusic } from '../store/slices/musicSlice';
import { Play, Pause, SkipBack, SkipForward, Volume2, X } from 'lucide-react';

export default function MusicPlayer() {
  const dispatch = useAppDispatch();
  const { currentPlayingSong, isPlaying } = useAppSelector(state => state.music);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);

  if (!currentPlayingSong) {
    return null;
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      dispatch(pauseMusic());
    } else {
      dispatch(resumeMusic());
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-purple-500/20 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Progress Bar */}
        <div className="mb-4">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="w-full h-1 bg-slate-700 rounded-lg cursor-pointer appearance-none"
            style={{
              background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${progress}%, #334155 ${progress}%, #334155 100%)`
            }}
          />
        </div>

        {/* Player Controls */}
        <div className="flex items-center justify-between gap-4">
          {/* Song Info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-12 h-12 bg-gradient-purple rounded-lg flex-shrink-0 flex items-center justify-center text-white font-bold">
              🎵
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white truncate">{currentPlayingSong.name}</p>
              <p className="text-sm text-gray-400 truncate">{currentPlayingSong.artist}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button className="btn-icon text-gray-400 hover:text-purple-400">
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={handlePlayPause}
              className="w-12 h-12 rounded-full bg-gradient-purple flex items-center justify-center text-white hover:shadow-glow-purple transition-all"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </button>
            <button className="btn-icon text-gray-400 hover:text-purple-400">
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* Volume & Duration */}
          <div className="flex items-center gap-3 flex-1 justify-end">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-gray-400" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-24 h-1 bg-slate-700 rounded-lg cursor-pointer appearance-none"
                style={{
                  background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${volume}%, #334155 ${volume}%, #334155 100%)`
                }}
              />
              <span className="text-xs text-gray-400 w-6">{volume}%</span>
            </div>
            <button className="btn-icon text-gray-400 hover:text-red-400">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
