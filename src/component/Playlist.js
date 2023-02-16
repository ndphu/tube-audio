import React, {useEffect} from 'react';

export default function Playlist(props) {
  const {playlist} = props;
  console.log(playlist);
  useEffect(() => {
  }, [props])

  return (
    <div className={'table-container'}>
      <table className={'playlist-table'}>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Play</th>
        </tr>
        {playlist && playlist.map((e) => {
          return (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.title}</td>
              <td>Play</td>
            </tr>
          )
        })}
      </table>
    </div>
  );
}