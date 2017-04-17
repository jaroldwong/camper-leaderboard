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
                <table>
                    <thead className="theader">
                        <tr>
                            <th>Rank</th>
                            <th>Username</th>
                            <th id="recent" onClick={this.toggleDisplay}>Points in past 30 days</th>
                            <th id="alltime" onClick={this.toggleDisplay}>All Time Points</th>
                        </tr>
                    </thead>
                    <Camper campers={this.state.campers} />
                </table>
            </div>
        );
    },

    toggleDisplay: function(e) {
        const key = e.target.id;
        const campers = this.state.campers;
        const desc = campers.sort(function(a, b) {
                return b[key] - a[key];
        })

        this.setState({
            campers: desc
        });
    },
});

var Camper = React.createClass({
    render: function() {
        return(
            <tbody>
            {this.props.campers.map(function(camper, index) {
                return (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td><img className="icon" src={camper.img}/>  {camper.username}</td>
                        <td>{camper.recent}</td>
                        <td>{camper.alltime}</td>
                    </tr>
                );
            })}
            </tbody>
        )
    }
});

ReactDOM.render(<BoardComponent />, document.getElementById('root'));