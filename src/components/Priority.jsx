import React,{useState,useEffect} from "react"
import Card from "./CardPriority.jsx"

function Priority(props){
    // props.data is the data which is being received from the API endpoint
    // props.ordering will carry how to order card under each status

    const [urgent,setUrgent] = useState([]);
    const [high,setHigh] = useState([]);
    const [medium,setMedium] = useState([]);
    const [low,setLow] = useState([]);
    const [no,setNo] = useState([]);

    const [user,setUser]=useState([]);
    useEffect(function(){
        const tickets = props.data.tickets;
        const users = props.data.users;

        setUrgent([]);setHigh([]);setMedium([]);setLow([]);setNo([]);

        tickets.forEach(function(ticket){
            // ticket.priority will tell the priority of ticket
            
            if(ticket.priority===4){
                setUrgent(function(prev_arr){
                    let new_arr = [...prev_arr];
                    return [...new_arr,ticket]; 
                });
            }else if(ticket.priority===3){
                setHigh(function(prev_arr){
                    let new_arr = [...prev_arr];
                    return [...new_arr,ticket]; 
                });
            }else if(ticket.priority===2){
                setMedium(function(prev_arr){
                    let new_arr = [...prev_arr];
                    return [...new_arr,ticket]; 
                });
            }else if(ticket.priority===1){
                setLow(function(prev_arr){
                    let new_arr = [...prev_arr];
                    return [...new_arr,ticket]; 
                });
            }else{
                setNo(function(prev_arr){
                    let new_arr = [...prev_arr];
                    return [...new_arr,ticket]; 
                });
            }
        });
        // this is done because in order to show availability on each post this array is required
        // will use it optimally
        setUser(users);
    },[props.data]);

    // this function creates card which will be shown under each section
    // map will create new array of these cards and will print
   
    // we should be very conscious about KEY prop because it is very important for react
    function createCard(ticket,index){
        // this is how we are fetching user who has writtern this ticket/post
        const userData = user[(ticket.userId[4]-'0')-1];

        return (
            <div key={index}>
                <Card ticket={ticket} userData={userData} index={index}/>
            </div>
        );
    }

    function handleSorting(ticket1,ticket2){
        if(props.ordering===0){
            //ordering based on priority
            return ticket2.priority-ticket1.priority;
        }else{
            // ordering based on title
            return ticket1.title.localeCompare(ticket2.title);
        }
    }

    return (
        //looping over each to print
        <div className="print">
            <div>
                <div className="statusDiv">
                    <span className="statusHeadings">
                        <span className="material-icons circle">more_horiz</span>
                        No priority
                        <span className="statusHeadingLength">{no.length}</span>
                    </span>
                    {no.length!==0?<div><span className="material-icons add">add</span> <span className="material-icons add">more_horiz</span></div>:null}
                </div>
                {no.sort(handleSorting).map(createCard)}
            </div>
            <div>
                <div className="statusDiv">
                    <span className="statusHeadings">
                    <span className="material-icons urgent">assignment_late</span>
                        Urgent
                        <span className="statusHeadingLength">{urgent.length}</span>
                    </span>
                    {urgent.length!==0?<div><span className="material-icons add">add</span> <span className="material-icons add">more_horiz</span></div>:null}
                </div>
                {urgent.sort(handleSorting).map(createCard)}
            </div>
            <div>
                <div className="statusDiv">
                    <span className="statusHeadings">
                        <span className="material-symbols-outlined high">signal_cellular_3_bar</span>
                        High
                        <span className="statusHeadingLength">{high.length}</span>
                    </span>
                    {high.length!==0?<div><span className="material-icons add">add</span> <span className="material-icons add">more_horiz</span></div>:null}
                </div>
                {high.sort(handleSorting).map(createCard)}
            </div>
            <div>
                <div className="statusDiv">
                    <span className="statusHeadings">
                        <span className="material-symbols-outlined high">signal_cellular_2_bar</span>
                        Medium
                        <span className="statusHeadingLength">{medium.length}</span>
                    </span>
                    {medium.length!==0?<div><span className="material-icons add">add</span> <span className="material-icons add">more_horiz</span></div>:null}
                </div>
                {medium.sort(handleSorting).map(createCard)}
            </div>
            <div>
                <div className="statusDiv">
                    <span className="statusHeadings">
                        <span className="material-symbols-outlined high">signal_cellular_1_bar</span>
                        Low
                        <span className="statusHeadingLength">{low.length}</span>
                    </span>
                    {low.length!==0?<div><span className="material-icons add">add</span> <span className="material-icons add">more_horiz</span></div>:null}
                </div>
                {low.sort(handleSorting).map(createCard)}
            </div>
        </div>
    );
}

export default Priority;