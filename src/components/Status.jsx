import React,{useState,useEffect} from "react"
import Card from "./CardStatus.jsx"

function Status(props){
    // props.data is the data which is being received from the API endpoint
    // props.ordering will carry how to order card under each status

    // Normal approach : first figure out how many tickets are todo,inProgress..  . But for each traversing
    // will increase time Complexity = (n * no of tickets) , where n = number of different status like todo.

    // Optimised : we can have 5 arrays of like todo,inProgress.. . 
    // And at the time of rendering of this component itself we will fill these arrays
    // time complexity = (n + no of tickets)
    // an alternative solution could be to use hashmap , Time complexity would rather be same
    const [todo,setTodo]=useState([]);
    const [inProgress,setInProgress]=useState([]);
    const [done,setDone]=useState([]);
    const [cancelled,setCancelled]=useState([]);
    const [backlog,setBacklog]=useState([]);
    
    const [user,setUser]=useState([]);

    useEffect(function(){
        const tickets = props.data.tickets;
        const users = props.data.users;
    
        setTodo([]);setInProgress([]);setDone([]);setCancelled([]);setBacklog([]);

        tickets.forEach(function(ticket){
            // ticket.status will tell either it is in pending,todo.. state
            if(ticket.status==="Todo"){
                setTodo(function(prev_arr){
                    let new_arr = [...prev_arr]; // spread operator has been used to keep previous value as it is
                    return [...new_arr,ticket]; 
                })
            }else if(ticket.status==="In progress"){
                setInProgress(function(prev_arr){
                    let new_arr = [...prev_arr];
                    return [...new_arr,ticket]; 
                });
            }else if(ticket.status==="Backlog"){
                setBacklog(function(prev_arr){
                    let new_arr = [...prev_arr];
                    return [...new_arr,ticket]; 
                });
            }else if(ticket.status==="Done"){
                setDone(function(prev_arr){
                    let new_arr = [...prev_arr];
                    return [...new_arr,ticket]; 
                })
            }else{
                setCancelled(function(prev_arr){
                    let new_arr = [...prev_arr];
                    return [...new_arr,ticket]; 
                });
            }
        });

        // this is done because in order to show availability on each post this array is required
        // will use it optimally
        setUser(users);
    },[props.data.tickets,props.data.users]);

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
        // looping over each to print 
        <div className="print">
            <div>
                <div className="statusDiv">
                    <span className="statusHeadings">
                        <span className="material-symbols-outlined circle">pending</span>
                        Backlog 
                        <span className="statusHeadingLength">{backlog.length}</span>
                    </span>
                    {backlog.length!==0?<div><span className="material-icons add">add</span> <span className="material-icons add">more_horiz</span></div>:null}
                </div>
                {backlog.sort(handleSorting).map(createCard)}
            </div>
            <div>
                <div className="statusDiv">
                    <span className="statusHeadings">
                        <span className="material-symbols-outlined circle">circle</span>
                        Todo 
                        <span className="statusHeadingLength">{todo.length}</span>
                    </span>
                    {todo.length!==0?<div><span className="material-icons add">add</span> <span className="material-icons add">more_horiz</span></div>:null}
                </div>
                {todo.sort(handleSorting).map(createCard)}
            </div>
            <div>
                <div className="statusDiv">
                    <span className="statusHeadings">
                    <span className="material-symbols-outlined halfCircle">radio_button_partial</span>
                        In progress 
                        <span className="statusHeadingLength">{inProgress.length}</span>
                    </span>
                    {inProgress.length!==0?<div><span className="material-icons add">add</span> <span className="material-icons add">more_horiz</span></div>:null}
                </div>
                {inProgress.sort(handleSorting).map(createCard)}
            </div>
            <div>
                <div className="statusDiv">
                    <span className="statusHeadings">
                        <span className="material-icons check">check_circle</span>
                        Done 
                        <span className="statusHeadingLength">{done.length}</span>
                    </span>
                    {done.length!==0?<div><span className="material-icons add">add</span> <span className="material-icons add">more_horiz</span></div>:null}
                </div>
                {done.sort(handleSorting).map(createCard)}
            </div>
            <div>
                <div className="statusDiv">
                  <span className="statusHeadings">
                        <span className="material-icons cancel">cancel</span>
                        Cancelled 
                        <span className="statusHeadingLength">{cancelled.length}</span>
                  </span>
                  {cancelled.length!==0?<div><span className="material-icons add">add</span> <span className="material-icons add">more_horiz</span></div>:null}
                </div>
                {cancelled.sort(handleSorting).map(createCard)}
            </div>
        </div>
    );
}

export default Status;

