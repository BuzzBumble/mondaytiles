import 'monday-ui-react-core/dist/main.css';
import './App.css';
import { useEffect, useState } from 'react';
import { MondayProvider } from 'contexts/mondayContext';
import { SettingsProvider } from 'contexts/settingsContext';
import { BoardProvider } from 'contexts/boardsContext';
import { getBoard } from 'queries';
import TileMap from 'components/TileMap';
import mondaySdk from 'monday-sdk-js';
import { mapBoard, mapSettings } from 'helpers/mapMondayObjects';
import { devSettings, devContext } from 'helpers/dev';

const monday = mondaySdk();

function App() {
  const [context, setContext] = useState({});
  const [settings, setSettings] = useState({});
  const [board, setBoard] = useState({});

  // On initial render, set monday listener for context and settings
  useEffect(() => {
    monday.listen(['settings', 'context'], res => {
      if (res.type === 'context') {
        setContext(res.data);
      }
      if (res.type === 'settings') {
        setSettings(mapSettings(res.data));
      }
    });
    if (
      window.location.hostname === 'localhost' ||
      window.location.hostname.includes('ngrok')
    ) {
      setContext(devContext);
      setSettings(devSettings);
    }
  }, []);

  // When context or settings change, remap board
  useEffect(() => {
    if (context.boardIds && settings.weight_column_id) {
      // console.log(settings);
      const board_id = context.boardIds[0];
      getBoard(board_id).then(res => {
        let b = mapBoard(res.data.boards[0]);
        setBoard(b);
      });
    }
  }, [context, settings]);

  // useEffect(() => {
  //   console.log(settings);
  //   console.log(board);
  // }, [settings, board]);

  if (settings.group_column_id && settings.weight_column_id) {
    return (
      <div className="App">
        <SettingsProvider value={settings}>
          <MondayProvider value={context}>
            <BoardProvider value={board}>
              <TileMap />
            </BoardProvider>
          </MondayProvider>
        </SettingsProvider>
      </div>
    );
  } else {
    return (
      <div className="App">
        <h1>Please select columns in the settings</h1>
      </div>
    );
  }
}

export default App;
