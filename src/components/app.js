import React from 'react';
import '../sass/main.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import SearchBar from './search-bar';
import SearchItem from './search-item';
import MapComponent from './MapComponent';

library.add({faDollarSign})

class App extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            txtEnderecoFrom: '',
            txtEnderecoTo: '',
            timeout: 0,
            adressResultFrom: [],
            adressResultTo: [],
            positionFrom: {
                Latitude: '',
                Longitude: ''
            },
            positionTo: {
                Latitude: '',
                Longitude: ''
            },
            fromFilled: false,
            toFilled: false
        }

        this.onChangeEnderecoFrom = this.onChangeEnderecoFrom.bind(this);
        this.onChangeEnderecoTo = this.onChangeEnderecoTo.bind(this);
    }

    onChangeEnderecoFrom(event){
        this.setState({txtEnderecoFrom: event.target.value});

        if(this.timeout) clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
            //search function
            if(this.state.txtEnderecoFrom === ''){
                this.setState({adressResultFrom: []});
                return;
            }
            fetch(this.makeUrl(this.state.txtEnderecoFrom))
            .then(data => data.json())
            .then((text) => {
              console.log(text);
              let listAdress = text.Response.View[0].Result;
              this.setState({adressResultFrom: listAdress});
            }).catch(function (error) {
              console.log('request failed', error);
              this.setState({adressResultFrom: []});
            })
        }, 600);
    }
    onChangeEnderecoTo(event){
        this.setState({txtEnderecoTo: event.target.value});

        if(this.timeout) clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
            //search function
            if(this.state.txtEnderecoTo === ''){
                this.setState({adressResultTo: []});
                return;
            }
            fetch(this.makeUrl(this.state.txtEnderecoTo))
            .then(data => data.json())
            .then((text) => {
              console.log(text);
              let listAdress = text.Response.View[0].Result;
              this.setState({adressResultTo: listAdress});
            }).catch(function (error) {
              console.log('request failed', error);
            })
        }, 600);
    }
    onClickItemFrom(item){
        console.log(item);
        this.setState({positionFrom: item.Location.DisplayPosition});
        this.setState({txtEnderecoFrom: item.Location.Address.Label});
        this.setState({adressResultFrom: []});
        this.setState({fromFilled: true});
    }
    onClickItemTo(item){
        console.log(item);
        this.setState({positionTo: item.Location.DisplayPosition});
        this.setState({txtEnderecoTo: item.Location.Address.Label});
        this.setState({adressResultTo: []});
        this.setState({toFilled: true});
    }
    makeUrl(searchtext){
        let params = {
          "searchtext": searchtext,
          "app_id": "SWAWb4iZRcDL67GhgzOv",
          "app_code": "EivZ9LG4Cap-XPFVpUcFkg"
        }
        
        let query = Object.keys(params)
                     .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                     .join('&');
        
        let url = 'https://geocoder.api.here.com/6.2/geocode.json?' + query;
        return url;
    }

    render(){
        const position = [-23.50489, -47.44863]
        return(
            <div className="container app">
            {/* <FontAwesomeIcon className="icon" icon={faDollarSign} /> */}
                <label>De:</label>
                <SearchBar txtEndereco={this.state.txtEnderecoFrom} onChangeEndereco={this.onChangeEnderecoFrom}/>
                <label>Para:</label>
                <SearchBar txtEndereco={this.state.txtEnderecoTo} onChangeEndereco={this.onChangeEnderecoTo} />
                <div className="app--list-search-items">
                    {this.state.adressResultFrom.map((item, i) => <SearchItem key={i} title={item.Location.Address.Label}
                                                                                  onClickItem={()=>{this.onClickItemFrom(item)}}/>)}
                    {this.state.adressResultTo.map((item, i) => <SearchItem key={i} title={item.Location.Address.Label}
                                                                                  onClickItem={()=>{this.onClickItemTo(item)}}/>)}
                </div>
                <div className="map">
                {this.state.fromFilled && this.state.toFilled ? <MapComponent from={this.state.positionFrom} to={this.state.positionTo}/> : null}
                </div>
            </div>
        );
    }
}

export default App;