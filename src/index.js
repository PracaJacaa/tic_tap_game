import React from "react";
import  ReactDOM  from "react-dom";


class Game extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
        <div className="Game">
            <div className="Board">
                <Board  value={...} onClick={...} />
            </div>
        </div>
        );
    }
}

class Board extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const emptyboxes = [0,3,6]
        const boxes = Array(3).fill(null);
        return boxes.map((square,usless)=>{
            return(
                <div className="TheBoard" >
                    {boxes.map((emptyboxes, alsousless)=>{
                        let boxindex = emptyboxes + alsousless;
                        return(
                            <Square 
                                value="X" //this.props.boxes[index]
                                boxClick={() => { //this.props.
                                console.log("blabla");
                                }}
                            />
                        )

                    })}
                    
                </div>
            );
            
        })
    }
}


class Square extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return <button>{this.props.value}</button>
    }
}



ReactDOM.render(<Game />, document.getElementById("root"));
