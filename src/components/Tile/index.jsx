import './Tile.css';

const Tile = (props) => {
  const style = {
    width: props.weight,
    height: props.weight,
  }

  return (
    <div style={style} className="tile">
      <p>{props.name}:{props.value}</p>
    </div>
  );
};

export default Tile