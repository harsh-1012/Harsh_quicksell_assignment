import React,{useState,useEffect} from "react"
import Status from "./Status.jsx"
import User from "./User.jsx"
import Priority from "./Priority.jsx"

// Botton cards displaying 
function Section(props){
    // props.display will carry the change in state like, now it status or user or priority ?
    // props.ordering will carry the ordering order of card whether according to priority of title

    // data object is storing the response in JSON format which we get from API of quicksell
    const [data,setData] = useState({tickets:[],users:[]});

    // this hook is used to get the data at the time of rendering of component only
    useEffect(function(){
        async function api(){
            const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment"); // promise will be received
            const response_json = await response.json();
            setData(response_json);
        }
        api();
    },[]);

    return (
        // props.display = 0 = status based ordering, props.display = 1 = user based, props.display = 2 = priority based
        <div>
            {props.display===0?<Status data={data} ordering={props.ordering}/>:null}
            {props.display===1?<Priority data={data} ordering={props.ordering}/>:null}
            {props.display===2?<User data={data} ordering={props.ordering}/>:null}
        </div>
    );
}

export default Section;






