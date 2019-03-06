import React from 'react';

class SearchItem extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <a href="#" className="search-item" onClick={this.props.onClickItem}>{this.props.title}</a>
        );
    }
}
export default SearchItem;