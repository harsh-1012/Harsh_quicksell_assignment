import React,{useState} from "react"
import Top from "./Top"
import Bottom from "./Bottom"

function Dashboard() {
  // display state will change according to the click event made by user in Display button
  const [grouping,setGrouping] = useState(0);
  const [ordering,setOrdering] = useState(0);
  // this function will be triggered by the component TOP, based on view they want
  // and due to its trigerring display state will change,
  // accordingly Bottom component will render that component
  function handleGrouping(state){
    setGrouping(state);
  }
  function handleOrdering(state){
    setOrdering(state);
  }

  return (
    <div className="Dashboard">

      {/* First Section of Dashboard */}
      <div className="top"><Top handleDisplay={handleGrouping} handleOrdering={handleOrdering}/></div>

      {/* Second Section of Dashboard*/}
      <div className="bottom"><Bottom display={grouping} ordering={ordering}/></div>
    
    </div>
  );
}

export default Dashboard;