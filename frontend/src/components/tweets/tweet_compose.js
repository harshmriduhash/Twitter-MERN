import React from 'react';
import TweetBox from './tweet_box';
import './tweets.css'

class TweetCompose extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text: '',
            newTweet: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({newTweet: nextProps.newTweet.text});
    }

    handleSubmit(e){
        e.preventDefault();
        let tweet = {
            text: this.state.text
        };
        this.props.composeTweet(tweet);
        this.setState({text: ''});
    }

    update(){
        return e => this.setState({text: e.currentTarget.value})
    }

    render(){
        return (
            <div className="tweet-form-container">
                <form onSubmit={this.handleSubmit}>
                    <div className="tweet-form">
                        <input type="textarea"
                            value={this.state.text}
                            onChange={this.update()}
                            placeholder="Write your tweet..."
                        />
                        <input className="button" type="submit"
                            value="Submit"
                        />
                    </div>
                </form>
                <br/>
                <TweetBox text={this.state.newTweet} />
            </div>
        )
    }
}

export default TweetCompose;