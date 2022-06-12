import loading from "../assets/loading.svg";
const img = (props: any) => {
  if (props.onlyImage) {
    return <img src={loading} alt="..." width={props.width} />;
  } else {
    return (
      <div className="text-center m-1 p-1">
        <img src={loading} alt="..." width={props.width} />
      </div>
    );
  }
};
export default img;
