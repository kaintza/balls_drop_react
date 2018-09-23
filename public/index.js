class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            count: 0,
            colors: []
        }
    }

    handleClick() {
        const count = this.state.count;
        const colors = this.state.colors;
        this.setState({
            count: count + 1
        });

        let color = "undefined";
        let obj = new Object();
        obj.count = count + 1;
        let jsonString = JSON.stringify(obj);

        fetch('/ball', {
            method: 'POST',
            body: jsonString,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                color = json.color;
                let currentColor = [];
                currentColor = colors;
                currentColor.push(color);
                this.setState({
                    colors: currentColor,
                    score: this.state.score += this.calculateScore(color)
                });
            });
    }

    calculateScore(color) {
        let scoreValues = {
            pink: 1,
            green: 3,
            blue: 5,
            purple: 15,
        };
        return scoreValues[color];
    }

    render() {
        return (
            <div className="app shadow">
                <Header onClick={() => this.handleClick()} score={this.state.score} count={this.state.count}/>
                <BallList colors={this.state.colors}/>
            </div>
        );
    }
}

class Header extends React.Component {
    render(props) {
        return (
            <div className="header shadow">
                <Drop onClick={this.props.onClick}/>
                <Counter count={this.props.count}/>
                <Score score={this.props.score}/>
            </div>
        );
    }
}

const BallList = (props) => {
    return (
        <div className="ball-list-container">
            <ul className="ball-list">
                {props.colors.map(color => <Ball color={color}/>)}
            </ul>
        </div>
    );
};

class Ball extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        let X = canvas.width / 2;
        let Y = canvas.height / 2;
        let R = 35;
        ctx.beginPath();
        ctx.arc(X, Y, R, 0, 2 * Math.PI, false);
        ctx.strokeStyle = this.props.color;
        ctx.fillStyle = this.props.color;
        ctx.fill();
        ctx.stroke();
        this.refs.canvas.scrollIntoView();
    }

    render() {
        return (
            <canvas ref="canvas" className="canvas"/>
        );
    }
}

const Counter = (props) => {
    return (
        <p>Sum: {props.count}</p>
    );
};

const Score = (props) => {
    return (
        <p>Score: {props.score}</p>
    );
};

const Drop = (props) => {
    return (
        <button className="grid-item1 button" onClick={props.onClick}>
            Drop
        </button>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));