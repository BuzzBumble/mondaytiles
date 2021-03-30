import 'monday-ui-react-core/dist/main.css';
import './App.css';
import { useEffect, useState } from 'react';
import { MondayProvider } from 'contexts/mondayContext';
import { SettingsProvider } from 'contexts/settingsContext';
import { BoardProvider } from 'contexts/boardsContext';
import { getBoard } from 'queries';
import MondayTester from 'components/MondayTester';
import mondaySdk from 'monday-sdk-js';
import { mapBoard } from 'helpers/mapMondayObjects';

const monday = mondaySdk();
const token = process.env.REACT_APP_API_TOKEN;
monday.setToken(token);

function App() {
  const [context, setContext] = useState({});
  const [settings, setSettings] = useState({});
  const [board, setBoard] = useState({});

  useEffect(() => {
    monday.listen(["settings", "context"], (res) => {
      if (res.type === "context") {
        setContext(res.data);
      }
      if (res.type === "settings") {
        setSettings(res.data);
      }
    });
  }, []);

  useEffect(() => {
    if (context.boardIds && settings.column_id) {
      console.log(settings);
      getBoard(context.boardIds[0]).then((res) => {
        let b = mapBoard(res.data.boards[0]);
        setBoard(b);
      });
    }
  }, [context, settings]);

  return (
    <div className="App">
      <SettingsProvider value={settings}>
        <MondayProvider value={context}>
          <BoardProvider value={board}>
            <MondayTester/>
          </BoardProvider>
        </MondayProvider>
      </SettingsProvider>
    </div>
  );
}

export default App;
