import React from 'react';

class SearchBar extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="search-bar">
                <input placeholder="Buscar por endereço" className="form-control" type="text"
                value={this.props.txtEndereco} onChange={this.props.onChangeEndereco}/>
            </div>
        );
    }
}

export default SearchBar;