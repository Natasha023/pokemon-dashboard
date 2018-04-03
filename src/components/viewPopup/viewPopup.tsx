import * as React from 'react';
import { Modal, Button } from 'react-bootstrap/lib/';
// import PokemonInfo from '../pokemonInfo/pokemonInfo';
import axios from 'axios';
// import { Radar } from 'react-chartjs';

export interface ViewPopupProp {
  row: any,
  open: boolean,
  openModal: any,
  pokemon: any,
  onApplyChanges: () => void,
  onCancelChanges: () => void,
}
export default class ViewPopup extends React.PureComponent<ViewPopupProp, object>{
  state = {
    pokemon: {}
  }

  componentDidMount(){
  
  }

  componentWillUpdate(){
    if (this.props.row) {
      this.loadPokemon(this.props.row.url);
    }
  }

  loadPokemon = (url: string) => {
    this.setState({loading: true});
    axios.get(url)
    .then((response: any) => {
        // debugger;
     let pokemon = response.data;
      console.log(pokemon);
      // debugger;
      let labels = this.getLabels(pokemon);
      let data = this.getData(pokemon);
      let pokemonChart = [{
                labels: labels,
                datasets: [
                    {
                        data: data,
                        fillColor: 'rgba(255,99,132,0.2',
                        strokeColor: 'rgba(255,99,132,1',
                        pointColor: 'rgba(255,99,132,1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(255,99,132,1)'
                    },
                ]
            }];
      
   this.setState({pokemon: pokemonChart, open: true})
    }).catch(err => { 
      console.log(err);
      this.setState({loading: false});
    })
  }
  getLabels = (pokemon) => pokemon.stats.map((info) => {
    return info.stat.name;
})

getData = (pokemon) => pokemon.stats.map((info) => {
    return info.base_stat;
})

  render() {
    const {row, open, onCancelChanges} = this.props;
     return (
     <Modal
          show={open}
          onHide={onCancelChanges}
          container={this}
          aria-labelledby="contained-modal-title">
          <Modal.Header closeButton={true}>
            <Modal.Title id="contained-modal-title">
              {row ? row.name : ''}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {row ? row.url : null}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={onCancelChanges}>Close</Button>
          </Modal.Footer>
        </Modal> );
}
}