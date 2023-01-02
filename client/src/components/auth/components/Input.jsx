
function Input(props) {
  return (
      <input onChange={props.onChange} className="form-control" type={props.type} id={props.id} name={props.name} value={props.value} placeholder={props.placeholder} />
  );
}

export default Input;