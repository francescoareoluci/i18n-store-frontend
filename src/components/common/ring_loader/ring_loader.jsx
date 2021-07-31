import React from "react";


class RingLoader extends React.Component {
  render() {
    return(
        <div className="table-alternative">
            <div className="lds-ring-wrapper">
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
        </div>
    );
  }
}
  
export default RingLoader;