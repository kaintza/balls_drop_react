class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            colors: []
        }
    }

    handleClick() {
        const count = this.state.count;
        const colors = this.state.colors;
        console.log(colors);

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
            .then((myJson) => {
                color = myJson.color;
                let currentColor = [];
                currentColor = colors;
                currentColor.push(color);
                this.setState({
                    colors: currentColor
                });
            });
    }

    render() {
        return (
            <div className="main">
                <Header onClick={() => this.handleClick()} colors={this.state.colors} count={this.state.count}/>
                <BallList colors={this.state.colors}/>
            </div>
        );
    }
}

class Header extends React.Component {
    render(props) {
        return (
            <div className="grid-container">
                <Drop onClick={this.props.onClick}/>
                <Counter count={this.props.count}/>
                <Score colors={this.props.colors}/>
            </div>
        );
    }
}

const BallList = (props) => {
    return (
        <div className="ball_list_container">
            <ul className="ball_list">
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
        var X = canvas.width / 2;
        var Y = canvas.height / 2;
        var R = 35;
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
        <p> Count: {props.count} </p>
    );
};

const Score = (props) => {
    let scoreValues = {
        pink: 1,
        green: 3,
        blue: 5,
        purple: 15,
    };
    let score = 0;
    if (props.colors.length > 0) {
        for (var i = 0; i < props.colors.length; i++) {
            score += scoreValues[props.colors[i]];
        }
    }
    return (
        <p> Score: {score}</p>
    );
};

const Drop = (props) => {
    return (
        <button className="item1 button" onClick={props.onClick}>
            Drop
        </button>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));