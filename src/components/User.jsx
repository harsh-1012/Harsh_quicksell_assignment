import React,{useState,useEffect} from "react"
import Card from "./CardUser.jsx"

function User(props){
    // props.data is the data which is being received from the API endpoint
    // props.data.tickets = all tickets array
    // props.data.users = all users present [array]
    // props.ordering will carry how to order card under each status

    // first Idea for ith user traverse over tickets and if ticket[i].userId is same then print 
    // again the time complexity for this approach will be (no of users*no of tickets)
    
    // another optimised approach with (no of users + no of tickets time complexity) but some space
    // for particular ticket store it into userID array

    // now we can maintain 2array of users.length size , Because while traversing over tickets and with some
    // space time complexity will be less
    // approach : traversing over tickets and printing by looking who has written it, will put there
    const [arr,setArr] = useState([[]]);
    const [user,setUser] = useState([]);

    useEffect(function(){
        const tickets = props.data.tickets;
        const users = props.data.users;

        // refreshing array
        setArr([[]]);

        tickets.forEach(function(ticket){
            let index = ((ticket.userId[4]-'0')-1);
            
            setArr(function(prev_arr){
                let new_arr = [...prev_arr];

                if(!new_arr[index]){
                    new_arr[index]=[];
                }
                new_arr[index].push(ticket);
                return new_arr;
            });
        });
        setUser(users);
    },[props.data]);


    function createCard(ticket,index){
        return (
            <div key={ticket.id}>
                <Card ticket={ticket} index={index}/>
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

    // random color which will be used for image and these can be static
    let arrCol=["#35155D","#512B81","#4477CE","#872341","#F05941","#435585","#3A4D39","#4F4A45","#005B41","#445D48","#352F44"];

    function PrintUser(tickets,index){
        // tickets are all posts written by user (index+1) due to 0 based indexing
        return (
            <div key={index}>
                <div className="statusDiv">
                    <span className="new-statusHeadings">

                        <div className="imgSpace">
                            {/* for online / offline status */}
                            <div className="dot-container-new">
                                {/* circular div which will act as an image with first name's first letter and same for last name */}
                                {/* Inline CSS need to be used , Because of varying color */}
                                <div 
                                    className="img" 
                                    style={{backgroundColor:arrCol[Math.floor(Math.random()*arrCol.length)]}}>
                                    <span>{typeof(user[index])!="undefined"?user[index].name[0]:null}</span>
                                </div>
                                <div className={"new-status-circle-"+(typeof(user[index])!="undefined"?user[index].available===false?"grey":"green":null)}></div>
                            </div>
                        </div>
                        {typeof(user[index])!="undefined"?user[index].name:null}
                        <span className="statusHeadingLength">{tickets.length}</span>

                    </span>
                    {tickets.length!==0?<div><span className="material-icons add">add</span> <span className="material-icons add">more_horiz</span></div>:null}
                </div>
                {tickets.sort(handleSorting).map(createCard)}
            </div>
        );
    }

    return (
        <div className="print">
            {arr.map(PrintUser)}
        </div>
    );
}

export default User;