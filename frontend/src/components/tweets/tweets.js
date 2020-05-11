import React from 'react';
import {withRouter} from 'react-router-dom';
import TweetBox from './tweet_box';

class Tweet extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tweets: []
        }
    }

    componentDidMount(){
        this.props.fetchTweets();
    }

    componentWillReceiveProps(newState){
        this.setState({tweets: newState.tweets});
    }

    render(){
        if (this.state.tweets.length === 0){
            return (<div>There are no Tweets</div>);
        } else {
            return (
                <div className="main-list">
                    <h2>All Tweets</h2>
                    {this.state.tweets.map((tweet, idx) => (
                        <TweetBox key={idx} text={tweet.text} />
                    ))}
                </div>
            );
        }
    }
}

export default withRouter(Tweet);