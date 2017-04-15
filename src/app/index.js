var React = require('react');
var ReactDOM = require('react-dom');

var BoardComponent = React.createClass({
    render: function() {
        return(
            <div>
                <h1>Leaderboard</h1>
            </div>
        )
    },
});

ReactDOM.render(<BoardComponent />, document.getElementById('root'));