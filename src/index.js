import React from "react";
import ReactDOM from "react-dom";

class Square extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <button  
            onClick={() => this.props.handleboxClick()}>
                {this.props.value}
            </button>     //later add some onchange 
        );
    }
}

class Board extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const RowBoxes = [0,3,6];
        const RowArry = Array(3).fill(null);

        return RowBoxes.map((RowBoxe, emptyindex) =>{
            return(
                <div className="rowindex">
                    {RowArry.map((RowArr,anotherEmptyIndex)=>{
                        let RowArrIndex = RowBoxe + anotherEmptyIndex;
                        return(
                            <Square 
                            value={this.props.RowArry[RowArrIndex]}
                            handleboxClick={() => {
                                this.props.handleboxClick(RowArrIndex);
                            }}
                            />
                        );
                    })}
                </div>
                );
        });
    }
}

class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = { 
            RowArry: Array(9).fill(null),
            nextSymbol: "X",
        };
    this.handleboxClick = this.handleboxClick.bind(this);
    }

    handleboxClick(index){
        console.log(`User clicked ${index}`);
        const RowArry = this.state.RowArry;

        if (RowArry[index] !== null){
            return;
        }

        RowArry[index]= this.state.nextSymbol;

        this.setState({
            RowArry: RowArry,
            nextSymbol: this.state.nextSymbol === "X" ? "O" : "X",
        });

    }
    render(){
        return(
        <div className="game">
            <div className="board">
                <Board   
                handleboxClick={this.handleboxClick}
                RowArry={this.state.RowArry}
                />
            </div>
        </div>
        );
    }
}

ReactDOM.render(<Game/>, document.getElementById("root"));