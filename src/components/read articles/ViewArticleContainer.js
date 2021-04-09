import React, { Component } from 'react'
import { ViewArticle } from './ViewArticle';

export default class ViewArticleContainer extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            article : ''
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        console.log(id);
        //API call
    }
    
    render() {
        return (
            <div>
                <ViewArticle
                    article={this.state.article}
                />
            </div>
        )
    }
}
