import { useContext } from 'react';
import Tile from 'components/Tile';
import { MondayContext } from 'contexts/mondayContext';
import { SettingsContext } from 'contexts/settingsContext';
import { BoardContext } from 'contexts/boardsContext';

const MondayTester = (props) => {
  const board = useContext(BoardContext);
  const settings = useContext(SettingsContext);

  if (settings.column_id) {
    const tiles = board?.items?.map((item) => {
      let name = item.name;
      if (name.length > 15) name = name?.substr(0, 15) + "...";
      return <Tile weight={100} name={item.name} value={item.values.numbers}/>
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

export default MondayTester;