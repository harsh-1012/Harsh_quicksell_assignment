import React from "react"

function Card(props) {
    // props.ticket will have all details that needed to be printed on a card

    // now as there can be many tags which can be there in one card so looping is necessary
    function createTagCard(tag,index){
        return (
            <span className="tag" key={index}>
                <span className="material-icons dot">fiber_manual_record</span>
                {tag}
            </span>
        );
    }

    function handlePriorityImage(priority){
        return (
            <span>
                {priority===0?<span className="material-icons network">more_horiz</span>:null}
                {priority===1?<span className="material-symbols-outlined network">signal_cellular_1_bar</span>:null}
                {priority===2?<span className="material-symbols-outlined network">signal_cellular_2_bar</span>:null}
                {priority===3?<span className="material-symbols-outlined network">signal_cellular_3_bar</span>:null}
                {priority===4?<span className="material-icons network">signal_cellular_4_bar</span>:null}
            </span>
        );
    }

    function handleStatus(status){
        // status will be like inprogress , done ....
        return (
            <span>
                {status==="Todo"?<span className="material-symbols-outlined circle">circle</span>:null}
                {status==="In progress"?<span className="material-symbols-outlined halfCircle">radio_button_partial</span>:null}
                {status==="Backlog"?<span className="material-symbols-outlined circle">pending</span>:null}
                {status==="Done"?<span className="material-icons check">check_circle</span>:null}
                {status==="Cancel"?<span className="material-icons cancel">cancel</span>:null}
            </span>
        );
    }
    
    return (
        <div id="container" key={props.index}>
            <div className="card">
                <div>
                    <div className="id">{props.ticket.id}</div>
                    {/* If size of title is greater than let say 55 then printing till there then .... or full */}
                    <div className="name2">
                        <span>{handleStatus(props.ticket.status)}</span>
                        {
                            (props.ticket.title.length<=30?props.ticket.title:props.ticket.title.substring(0,30)+"...")
                        }
                    </div>
                    <div className="cardBottom">
                        <span className="tag">{handlePriorityImage(props.ticket.priority)}</span>
                        {props.ticket.tag.map(createTagCard)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;