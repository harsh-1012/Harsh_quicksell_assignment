import React from "react"

function Card(props){
    // props.ticket will have all details that needed to be printed on a card
    // for availability status and name of user props.useData is holding that information

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

    // random color which will be used for image and these can be static
    let arr=["#35155D","#512B81","#4477CE","#872341","#F05941","#435585","#3A4D39","#4F4A45","#005B41","#445D48","#352F44"];

    return (
        // a card
        <div id="container" key={props.index}>
            <div className="card">
                <div className="textSpace">
                    <div className="id">{props.ticket.id}</div>
                    {/* If size of title is greater than let say 55 then printing till there then .... or full */}
                    <div className="name">
                        {
                            (props.ticket.title.length<=45?props.ticket.title:props.ticket.title.substring(0,45)+"...")
                        }
                    </div>
                    <div className="cardBottom">
                        <span className="tag">{handlePriorityImage(props.ticket.priority)}</span>
                        {props.ticket.tag.map(createTagCard)}
                    </div>
                </div>

                <div className="imgSpace">
                    {/* for online / offline status */}
                    <div className="dot-container">
                        {/* circular div which will act as an image with first name's first letter and same for last name */}
                        {/* Inline CSS need to be used , Because of varying color */}
                        <div 
                            className="img" 
                            style={{backgroundColor:arr[Math.floor(Math.random()*arr.length)]}}>
                            <span>{props.userData.name[0]}</span>
                        </div>
                        <div className={"status-circle-"+(props.userData.available===false?"grey":"green")}></div>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default Card;