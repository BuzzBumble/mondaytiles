import 'monday-ui-react-core/dist/main.css';
import './App.css';
import { useEffect, useState } from 'react';
import { MondayProvider } from 'contexts/mondayContext';
import { SettingsProvider } from 'contexts/settingsContext';
import { BoardProvider } from 'contexts/boardsContext';
import { getItemsForBoard } from 'queries';
import MondayTester from 'components/MondayTester';
import mondaySdk from 'monday-sdk-js';
import { Monday } from 'types/monday';

const monday = mondaySdk();
const token = process.env.REACT_APP_API_TOKEN;
monday.setToken(token);

function App() {
  const [context, setContext] = useState<Monday.Context | undefined>();
  const [settings, setSettings] = useState({});
  const [board, setBoard] = useState<Monday.Board | undefined>();

  useEffect(() => {
    monday.listen(["settings", "context"], (res: any) => {
      if (res.type === "context") {
        setContext(res.data);
      }
      if (res.type === "settings") {
        setSettings(res.data);
      }
    });
  }, []);

  useEffect(() => {
    if (context) {
      monday.api(getItemsForBoard(context.boardIds[0])).then((res:any) => {
        setBoard(res.data.boards[0]);
      });
    }
  }, [context]);

  useEffect(() => {
    console.log(board);
  }, [board]);

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
