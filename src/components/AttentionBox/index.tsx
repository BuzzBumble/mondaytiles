import { AttentionBox as MAttentionBox} from 'monday-ui-react-core';
import { useContext } from 'react';
import BoardsContext from 'contexts/boardsContext';

const AttentionBox = () => {
  const boards = useContext(BoardsContext);

  return (
    <MAttentionBox
      type='primary'
      title='Untitled'
      text={JSON.stringify(boards)}
    />
  );
};

export default AttentionBox;