import React from "react";
import ReactDOM from "react-dom";
//https://www.bing.com/search?q=function+calculateWinner(squares)+%7B+const+lines+%3D+%5B+%5B0%2C+1%2C+2%5D%2C+%5B3%2C+4%2C+5%5D%2C+%5B6%2C+7%2C+8%5D%2C+%5B0%2C+3%2C+6%5D%2C+%5B1%2C+4%2C+7%5D%2C+%5B2%2C+5%2C+8%5D%2C+%5B0%2C+4%2C+8%5D%2C+%5B2%2C+4%2C+6%5D%2C+%5D%3B+for+(let+i+%3D+0%3B+i+%3C+lines.length%3B+i%2B%2B)+%7B+const+%5Ba%2C+b%2C+c%5D+%3D+lines%5Bi%5D%3B+if+(squares%5Ba%5D+%26%26+squares%5Ba%5D+%3D%3D%3D+squares%5Bb%5D+%26%26+squares%5Ba%5D+%3D%3D%3D+squares%5Bc%5D)+%7B+return+squares%5Ba%5D%3B+%7D+%7D+return+null%3B+%7D&cvid=df1672d60d6b4ec69a6cf74919644157&aqs=edge..69i57.681j0j1&FORM=ANNTA1&PC=U531
// https://github.com/itsrave/tictactoe-react/blob/01f696da87a86bf38befb571a81b0a8781b73568/src/index.js#L182
class Square extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <button  
            onClick={() => this.props.handleboxClick()}>
                {this.props.value || <div>&nbsp;</div>}
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
        // const winner = this.Whowins(RowArry);
        // let status;
        // if(winner){
        //     status = `Wygrywa ${winner}`;
        // }else{
            
        // }

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
            gameWon: false,
        };
    this.handleboxClick = this.handleboxClick.bind(this);
    }
    /*
      handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
    */
    handleboxClick(index,){
        console.log(`User clicked ${index}`);
        const RowArry = this.state.RowArry; 

        if (RowArry[index] !== null || this.state.gameWon){
            return;
        }

        // Update the grid
        RowArry[index]= this.state.nextSymbol;

        // Check for winner with updated grid data
        const winningCombination = this.Whowins(RowArry);
        if (winningCombination) {
            console.log(`Winning ${winningCombination}`);  
            this.setState({gameWon: true});         
        }        
        
        this.setState({
            RowArry: RowArry,
            nextSymbol: this.state.nextSymbol === "X" ? "O" : "X",
        });
    }

    Whowins(RowArry){
        // Define winning combinations
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
        // One on this winning combination is actually present in your grid
        // and your grid is the RowArray
        for(let index =0;index<winninglines.length;index++){
            const [a,b,c] = winninglines[index];
            if(RowArry[a] && RowArry[a] === RowArry[b] && RowArry[a] === RowArry[c]){
                return winninglines[index];
            }
        }
        return null;
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