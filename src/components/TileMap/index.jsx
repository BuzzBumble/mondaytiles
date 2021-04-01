import { useContext } from 'react';
import Tile from 'components/Tile';
import { SettingsContext } from 'contexts/settingsContext';
import { BoardContext } from 'contexts/boardsContext';
import { shortName } from 'helpers/util';
// import PropTypes from 'prop-types';

const TileMap = () => {
  const board = useContext(BoardContext);
  const settings = useContext(SettingsContext);

  if (settings.column_id) {
    const tiles = board?.items?.map((item) => {
      let name = shortName(item.name);
      return (
        <Tile
          weight={100}
          name={name}
          value={item.values.numbers}
         />
      );
    });
    return (
      <div>
        {tiles}
      </div>
    )
  } else {
    return (
      <div>No Items</div>
    )
  }

};

export default TileMap;