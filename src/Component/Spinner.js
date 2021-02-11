import { useEffect } from "react";
import "../style/Spinner.css";
const Spinner = (props) => {
  console.log(props.hideTimer);
  useEffect(() => {
    props.hideTimer();
  }, [props]);
  return (
    <div class="loader" onClick={props.hideTimer}>
      Loading...
    </div>
  );
};
export default Spinner;
