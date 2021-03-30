import './Tile.css';

const Tile = (props: {
  weight: number,
  color?: string,
  name?: string
}) => {
  const style = {
    width: props.weight,
    height: props.weight,
  }

  return (
    <div style={style} className="tile">
      <p>{props.name}</p>
    </div>
  );
};

export default Tile