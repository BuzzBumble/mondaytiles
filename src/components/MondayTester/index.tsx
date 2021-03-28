import React, {useEffect, useState} from 'react';
import mondaySdk from 'monday-sdk-js';
import {BoardsProvider} from 'contexts/boardsContext';
import AttentionBox from 'components/AttentionBox';

const monday = mondaySdk();
const token = process.env.REACT_APP_API_TOKEN;
monday.setToken(token);

const MondayTester = () => {
  const [boards, setBoards] = useState([]);

  // useEffect(() => {
  //   const query: string = `
  //   query {
  //     boards {
  //       id
  //       name
  //       items {
  //         name
  //       }
  //     }
  //   }
  //   `
  //   monday.api(query).then((res: any) => {
  //     setBoards(res.data.boards);
  //   });
  // }, []);

  return (
    <div>
      <BoardsProvider value={boards}>
        <AttentionBox/>
      </BoardsProvider>
    </div>
  )
};

export default MondayTester;