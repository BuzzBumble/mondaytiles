import { useContext } from 'react';
import Tile from 'components/Tile';
import { MondayContext } from 'contexts/mondayContext';
import { SettingsContext } from 'contexts/settingsContext';
import { BoardContext } from 'contexts/boardsContext';

const MondayTester = () => {
  const board = useContext(BoardContext);

  if (board) {
    const boards = board?.items.map((item) => {
      let name = item.name;
      if (name.length > 15) name = name?.substr(0, 15) + "...";
      return <Tile weight={100} name={name}/>
    });
    return (
      <div>
        {boards}
      </div>
    )
  } else {
    return (
      <div>No Items</div>
    )
  }

};

export default MondayTester;