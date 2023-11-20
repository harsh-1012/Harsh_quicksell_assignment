import React,{useState,useEffect,useRef} from "react"

function Section(props){
    // props.handleDisplay is the function which need to be trigerred on parent component side
    // props.handleOrdering is the function which need to be trigerred when user select a ordering order
    /*----------------*/
    
    // View State to handle click event of display button
    // If view is 0 then dropdown content will not be shown else content will be shown
    const [view,setView] = useState(0);
    const [grouping,setGrouping] = useState("Status");
    const [ordering,setOrdering] = useState("Priority");
    // these state will help to decide whether we have to show lists or not
    const [groupList,setGroupList] = useState(0);
    const [orderList,setOrderList] = useState(0);

    // for efficient closing of dropdown
    const divRef = useRef();

    useEffect(function(){

        if(localStorage.getItem("key1") !==null){
            const value = localStorage.getItem("key1"); 
            setGrouping(value);
            const obj = {"Status":0,"Priority":1,"User":2}
            props.handleDisplay(obj[value]);
        }
        if(localStorage.getItem("key2") !== null){
            const value = localStorage.getItem("key2"); 
            setOrdering(value);
            const obj = {"Priority":0,"Title":1};
            props.handleOrdering(obj[value]);
        }

        const closeDropDown = function(event){
            if(!divRef.current.contains(event.target)){
                setView(0);
                setGroupList(0);setOrderList(0);
            }
        };

        document.body.addEventListener("click",closeDropDown);
        // during unmounting
        return function(){document.body.removeEventListener("click",closeDropDown)}
    },[props]);

    function handleDisplayClick(){
        setView(function(prev_val){
            if(prev_val===1){
                setGroupList(0);
                setOrderList(0);
                return 0;
            }
            return 1;
        });
    }

    // this function will trigger the show/hide the grouping options
    function handleGroupList(){
        setOrderList(0);
        setGroupList(function(prev_val){
            return (prev_val===1?0:1);
        });
    }
    function handleOrderList(){
        setGroupList(0);
        setOrderList(function(prev_val){
            return (prev_val===1?0:1);
        });
    }

    function handleChoice(event){
        let choice_name = event.target.getAttribute("name");
    
        setGroupList(0);
        setOrderList(0);
        if(choice_name==="status"){
            setGrouping("Status");
            props.handleDisplay(0);
            localStorage.setItem("key1","Status");
        }
        else if(choice_name==="priority"){
            setGrouping("Priority");
            props.handleDisplay(1);
            localStorage.setItem("key1","Priority");
        }
        else if(choice_name==="user"){
            setGrouping("User");
            props.handleDisplay(2);
            localStorage.setItem("key1","User");
        }
        else if(choice_name==="orderpriority"){
            setOrdering("Priority");
            props.handleOrdering(0);
            localStorage.setItem("key2","Priority");
        }else{
            setOrdering("Title");
            props.handleOrdering(1);
            localStorage.setItem("key2","Title");
        }
    }

    return(
        //creating dropdown display feature using react
        <div className="dropdown" ref={divRef}>
        {/*Display named button, which will change its state on click*/}

            <button className="dropdownButton" onClick={handleDisplayClick}>
                {/* used for icon displaying of tune using google fonts*/}
                <span className="material-icons material-symbols-outlined tune">tune</span>
                <h1 className="dropdownText">Display</h1>
                {view===1?<span class="material-symbols-outlined tune">expand_less</span>:
                <span className="material-icons material-symbols-outlined tune">expand_more</span>}
            </button>

            {/* View is state which will change when, onClick event will happen for display button*/}
            {/* conditional rendering of dropdown content*/}
            {view===1 ? 
                <div className="dropdownContent">
                    <div className="grouping">
                        <p>Grouping</p>
                        {/* using html select tag for selecting grouping options */}
                        
                        <button className="gbtn" onClick={handleGroupList}>
                            {grouping}
                            {groupList===1?<span class="material-symbols-outlined tune">expand_less</span>:
                            <span className="material-icons material-symbols-outlined tune">expand_more</span>}
                        </button>
                        {groupList===1?
                            <div className="groupList">
                                <button name="status" onClick={handleChoice}>Status</button>
                                <button name="priority" onClick={handleChoice}>Priority</button>
                                <button name="user" onClick={handleChoice}>User</button>
                            </div>:null
                        }
                    </div>
                    <div className="ordering">
                        <p>Ordering</p>
                        
                        <button className="pbtn" onClick={handleOrderList}>
                            {ordering}
                            {orderList===1?<span class="material-symbols-outlined tune">expand_less</span>:
                            <span className="material-icons material-symbols-outlined tune">expand_more</span>}
                        </button>
                        {orderList===1?
                            <div className="orderList">
                                <button name="orderpriority" onClick={handleChoice}>Priority</button>
                                <button name="title" onClick={handleChoice}>Title</button>
                            </div>:null
                        }
                    </div>
                </div>
                :
                null
            }
        </div>
    );
}

export default Section;

