import * as React from 'react';
import '../App.css';
import axios from 'axios';
import { Table, Modal } from 'antd';
import PokemonInfo from './pokemonInfo/pokemonInfo';

export interface PokeProp {
  baseUrl?: string
}

// const logo = require('./logo.svg');

class PokeGrid extends React.Component<PokeProp, object> {
columns = [
        {title: 'ID', dataIndex: 'id', },
        {title: 'Pokemon Name', dataIndex: 'name'},
        {
            title: 'Action',
            dataIndex: 'url',
            render: (text, record) => <a onClick={() => this.pokemonInfo(record)}>View</a>,
          },
    ];

  state = { 
    data: [],
    pagination: {current: 1, pageSize: 10, total: 0},
    loading: false,
    visible: false,
    pokemon: null,
  };

  componentDidMount() {
    console.log(this.props.baseUrl);
    this.loadPokemon(`${this.props.baseUrl}/pokemon?limit=${this.state.pagination.pageSize}`);
  }

  loadPokemon = (url: string) => {
    this.setState({loading: true});
    axios.get(url)
    .then((response: any) => {
      console.log(response.data);
      const data = response.data.results.map((item: any) => {
        return {id: this.parseID(item.url) , name: item.name, url: item.url};
      })
      const total = response.data.count;
      let pager = {...this.state.pagination};
      pager.total = total;
      this.setState({data, loading: false, pagination: pager});
    }).catch(err => { 
      console.log(err);
      this.setState({loading: false});
    })
  }

  parseID = (url: string) => {
    const splitBy = url.split('/');
    return splitBy[splitBy.length - 2];
  } 

  handleTableChange = (pagination, filters, sorter) => {
  const pager = { ...this.state.pagination };
  pager.current = pagination.current;
  const offset = (pager.current - 1) * pager.pageSize;
  const url = `${this.props.baseUrl}/pokemon?limit=${this.state.pagination.pageSize}&offset=${offset}`;
  this.loadPokemon(url);
  this.setState({
      pagination: pager,
      loading: true
    });
 }

  pokemonInfo = (record) => {
    this.loadSinglePokemon(record.url);
 
  };

  showModal = (record) => {
      debugger;
    this.setState({visible: true});
    return (<Modal title="Basic Modal" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>show modal</Modal>)
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  loadSinglePokemon = (url: string) => {
    this.setState({loading: true});
    axios.get(url)
    .then((response: any) => {
      console.log(response.data);
      Modal.success({
        title: response.data.name,
        content: <PokemonInfo pokemon={response.data}/>,
        okText: 'OK',
        cancelText: 'Cancel',
      });
      this.setState({pokemon: response.data, loading: false});
    }).catch(err => { 
      console.log(err);
      this.setState({loading: false});
    })
  }

  render() {
    const { data, pagination} = this.state;
    return (
      <div>
       <Table columns={this.columns} dataSource={data} pagination={pagination} loading={this.state.loading}
        onChange={this.handleTableChange}/>
      </div>
    );
  }
}

export default PokeGrid;
