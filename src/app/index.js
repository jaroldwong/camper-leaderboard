var React = require('react');
var ReactDOM = require('react-dom');

var BoardComponent = React.createClass({
    getInitialState: function () {
        return { campers: [] }
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
            .catch(function(err) {
                // catch errors
            });
    },
    render: function() {
        return(
            <div>
                <h1>Leaderboard</h1>
            </div>
        )
    },
});

ReactDOM.render(<BoardComponent />, document.getElementById('root'));