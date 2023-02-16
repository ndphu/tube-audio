import React, {useEffect, useState} from 'react';
import api from '../api/Api';
import Playlist from '../component/Playlist';
import Player from '../component/Player';

export default function HomePage(props) {
  let audioRef = null;
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState();
  const [result, setResult] = useState();
  const [error, setError] = useState();
  const [currentId, setCurrentId] = useState();
  const [playlist, setPlaylist] = useState([]);
  const [playerConfig, setPlayerConfig] = useState({
    loop: false,
  })

  useEffect(() => {

  }, [props])

  const handleKeyUp = (event) => {
    setInput(event.target.value)
  }

  const handleChange = (event) => {
    setInput(event.target.value)
  }

  const callApi = () => {
    const getVideoId = () => {
      try {
        let url = new URL(input);
        const videoId = url.searchParams.get('v')
        if (videoId) {
          return videoId;
        }
        return input;
      } catch (e) {
        return input;
      }
    }
    setResult(null);
    setError(null);
    // setLoading(true);
    let videoId = getVideoId();
    setCurrentId(videoId);
    // api.get(`/video/${videoId}/next`).then(resp => {
    //   setPlaylist(resp.videos)
    // }).catch(err => {
    //   setError(err.error);
    // })
  }

  const onEnded = () => {
    if (playerConfig.loop) {
      audioRef.play();
    }
  }

  return (
    <div>
      <h1>Tube Audio</h1>
      <input
        type={'text'}
        id={'input-url'}
        value={input || ''}
        disabled={loading}
        onKeyUp={handleKeyUp}
        onChange={handleChange}/>
      <br/>
      <button
        className={'get-audio-button'}
        onClick={callApi}
        disabled={loading || !Boolean(input)}
      >
        Get Audio
      </button>
      <br/>
      {loading && <a>Loading...</a>}
      <div>
        {error && <a className={'error'}>{error}</a>}
        {currentId && <Player videoId={currentId}/>}
        {playlist && playlist.length > 0 && <Playlist playlist={playlist}/>}
      </div>
    </div>
  );
}