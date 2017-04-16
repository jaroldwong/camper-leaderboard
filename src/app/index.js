var React = require('react');
var ReactDOM = require('react-dom');

require('./css/index.css');

var BoardComponent = React.createClass({
    getInitialState: function () {
        return {
            campers: []
        }
    },
    componentDidMount: function() {
        var that = this;

        fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                that.setState({
                    campers: json
                });
            })
    },
    render: function() {
        return(
            <div>
                <h1>Camper Leaderboard</h1>
                <Camper campers={this.state.campers} />
            </div>
        );
    },
});

var Camper = React.createClass({
    render: function() {
        return(
            <table>
                <tbody>
                    <tr>
                        <td>Rank</td>
                        <td>Username</td>
                        <td>Points in past 30 days</td>
                        <td>All Time Points</td>
                    </tr>
                </tbody>
            {this.props.campers.map(function(camper, index) {
                return (
                    <tbody key={index}>
                        <tr>
                            <td>{index + 1}</td>
                            <td><img className="icon" src={camper.img}/>  {camper.username}</td>
                            <td>{camper.recent}</td>
                            <td>{camper.alltime}</td>
                        </tr>
                    </tbody>
                );
            })}
            </table>
        )
    }
});

ReactDOM.render(<BoardComponent />, document.getElementById('root'));