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
    Whowins(RowArry){
        const winninglines =[
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
      for(let i =0;i<winninglines.length;i++){
            const [a,b,c] = winninglines[i];
            if(RowArry[a] && RowArry[a] === RowArry[b] && RowArry[a] === RowArry[c]){
                return RowArry[a];
            }
        }
        return null;
    }
      
    render(){

        const RowBoxes = [0,3,6];
        const RowArry = Array(3).fill(null);
        const winner = this.Whowins(RowArry);
        let RowArrIndex;
        if(winner){
            RowArrIndex = `Wygrywa ${winner}`;
        }else{
            
        }

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
    constructor(props){                 //Life circle  pamięć odwołuje się do constructora 
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