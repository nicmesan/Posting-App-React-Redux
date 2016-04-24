import React, { Component, PropTypes } from 'react';
import {fetchPost, deletePost } from '../actions/index';
import { connect } from 'react-redux';
import { Link } from 'react-router';


class PostsShow extends Component {
    componentWillMount(){
        this.props.fetchPost(this.props.params.id);
    }
    
    static contextTypes = {
        router: PropTypes.object
    };
    
    onDelete(){
        this.props.deletePost(this.props.params.id).then(() => {this.context.router.push('/');});
    }
    
    render() {    
        if (!this.props.post){
            return <div>Loading...</div>
        }
        return <div>
        <h3>{this.props.post.title}</h3>
        <h6>Categories: {this.props.post.categories}</h6>
        <p>{this.props.post.content}</p>
        <Link to="/">Back to index</Link>
        <button onClick={this.onDelete.bind(this)} className="btn btn-danger pull-xs-right">Delete Post</button> 
        </div>
    }
}

function mapStateToProps(state){
    return {post: state.posts.post}
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostsShow);