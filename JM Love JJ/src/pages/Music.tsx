import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setSearchTerm, setSelectedAlbum, toggleFavorite, playMusic } from '../store/slices/musicSlice';
import { Search, Heart, Play, Share2, Filter } from 'lucide-react';

export default function Music() {
  const dispatch = useAppDispatch();
  const { songs, albums, favorites, searchTerm, selectedAlbum } = useAppSelector(state => state.music);

  const filteredSongs = songs.filter(song =>
    song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.album.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePlaySong = (song: typeof songs[0]) => {
    dispatch(playMusic(song));
  };

  const handleToggleFavorite = (songId: number) => {
    dispatch(toggleFavorite(songId));
  };

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900/40 via-slate-950 to-slate-950 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="section-title mb-4">音乐库</h1>
          <p className="section-subtitle">发现JJ所有经典作品，感受音乐的魔力</p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 px-4 border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Bar */}
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="搜索歌曲或专辑..."
                className="input-field w-full pl-10"
                value={searchTerm}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                className="input-field w-full pl-10 appearance-none cursor-pointer"
                value={selectedAlbum}
                onChange={(e) => dispatch(setSelectedAlbum(e.target.value))}
              >
                <option value="all">所有专辑</option>
                {albums.map(album => (
                  <option key={album.id} value={album.id}>
                    {album.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Albums Overview */}
      <section className="py-12 px-4 border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">专辑</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {albums.map(album => (
              <div key={album.id} className="card p-4 cursor-pointer hover:scale-105 transform transition-all">
                <div className="w-full aspect-square bg-gradient-purple rounded-lg flex items-center justify-center mb-4 hover:shadow-glow-purple transition-all">
                  <span className="text-4xl">🎵</span>
                </div>
                <h3 className="font-semibold text-white">{album.name}</h3>
                <p className="text-sm text-gray-400">{album.year} • {album.songs}首歌</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Songs List */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">热门歌曲</h2>
          
          {filteredSongs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">未找到匹配的歌曲</p>
            </div>
          ) : (
            <div className="space-y-2">
              {/* Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 text-gray-400 text-sm font-semibold border-b border-purple-500/10">
                <div className="col-span-1">#</div>
                <div className="col-span-4">歌曲名称</div>
                <div className="col-span-2">专辑</div>
                <div className="col-span-2">播放量</div>
                <div className="col-span-3">操作</div>
              </div>

              {/* Songs */}
              {filteredSongs.map((song, idx) => (
                <div
                  key={song.id}
                  className="card p-4 grid grid-cols-2 md:grid-cols-12 gap-4 items-center hover:bg-purple-600/5"
                >
                  <div className="col-span-1 text-gray-400 font-semibold hidden md:block">{idx + 1}</div>
                  
                  <div className="col-span-2 md:col-span-4">
                    <h3 className="font-semibold text-white truncate">{song.name}</h3>
                    <p className="text-sm text-gray-400 hidden md:block">{song.artist}</p>
                  </div>
                  
                  <div className="col-span-2 md:col-span-2 text-gray-400 text-sm hidden md:block">
                    {song.album}
                  </div>
                  
                  <div className="col-span-2 md:col-span-2 text-gray-400 text-sm">
                    {song.plays}
                  </div>
                  
                  <div className="col-span-2 md:col-span-3 flex items-center gap-2">
                    <button 
                      onClick={() => handlePlaySong(song)}
                      className="btn-icon text-gray-400 hover:text-purple-400"
                    >
                      <Play className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleToggleFavorite(song.id)}
                      className={`btn-icon ${
                        favorites.includes(song.id)
                          ? 'text-red-400'
                          : 'text-gray-400 hover:text-red-400'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${favorites.includes(song.id) ? 'fill-current' : ''}`} />
                    </button>
                    <button className="btn-icon text-gray-400 hover:text-purple-400 hidden md:flex">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
