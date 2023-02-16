import React, {useEffect, useState} from 'react';
import api from '../api/Api';


export default function Player(props) {
  let audioRef = null;
  const [result, setResult] = useState();
  const [currentId, setCurrentId] = useState();
  const [loop, setLoop] = useState(() => {
    return localStorage.getItem("player.loop") === "true"
  });

  const loadData = (id) => {
    api.get(`/video/${id}`).then(resp => {
      setResult(resp);
    }).catch(err => {
    })
  }

  useEffect(() => {
    const {videoId} = props;
    if (currentId !== videoId) {
      setCurrentId(videoId);
      loadData(videoId);
    }
  }, [props])


  const onEnded = () => {
    if (loop) {
      if (isExpireSoon()) {
        loadData(currentId);
      } else {
        audioRef.play();
      }
    } else {
      api.get(`/video/${currentId}/nextList`).then(resp => {
        const {videos} = resp;
        if (videos && videos.length > 0) {
          // const randIdx = Math.floor(Math.random() * videos.length);
          // const nextId = videos[randIdx].id;
          const nextId = videos[1].id;
          setCurrentId(nextId);
          loadData(nextId);
        }
      })
    }
  }

  const isExpireSoon = () => {
    if (result && result.audio) {
      try {
        const u = new URL(result.audio);
        const exp = parseInt(u.searchParams.get("expire"))
        const remaining = exp * 1000 - new Date().getTime();
        console.log("remaining hours: " + remaining / 3600000);
        if (remaining > 1) {
          return false;
        }
      } catch (e) {
        return true
      }
    }
    return true;
  }

  const updateLoop = (e) => {
    let l = e.target.checked;
    setLoop(l);
    localStorage.setItem("player.loop", l ? "true" : "false")
  }

  const onLoadedMetadata = () => {
    audioRef.play();
  }

  return (
    <div>
      {result && (
        <React.Fragment>
          <h3 className={'title'}>{result.title}</h3>
          <audio ref={(ref) => {
            audioRef = ref;
          }} src={result.audio} controls onEnded={onEnded}
                 onLoadedMetadata={onLoadedMetadata}/>
          <br/>
          <label><input type={'checkbox'} name={'loop'} checked={loop || false} onChange={updateLoop}/>Loop</label>
        </React.Fragment>
      )}
    </div>
  );
}