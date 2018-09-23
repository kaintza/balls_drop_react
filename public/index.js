class App extends React.Component {
    render(props) {
        return (
            <BallGame/>
        );
    }
}

class BallGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            count: 0,
            colors: []
        }
    }

    getBallFromServer() {
        let currentCount = this.state.count + 1;
        this.setState({
            count: currentCount
        });

        let obj = new Object();
        obj.count = currentCount;
        let jsonString = JSON.stringify(obj);

        fetch('/ball', {
            method: 'POST',
            body: jsonString,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(ball => {
            this.addColor(ball);
        });
    }

    addColor(ball) {
        let color = ball.color;
        let currentColors = this.state.colors;
        currentColors.push(color);
        this.setState({
            colors: currentColors,
            score: this.state.score + this.calculateScore(color),
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
                <Header onClick={() => this.getBallFromServer()} score={this.state.score} count={this.state.count}/>
                <BallList colors={this.state.colors}/>
            </div>
        );
    }
}

const Header = (props) => {
    return (
        <div className="header shadow">
            <Drop onClick={props.onClick}/>
            <Counter count={props.count}/>
            <Score score={props.score}/>
        </div>
    );
};

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
        this.drawCircle()
    }

    drawCircle() {
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