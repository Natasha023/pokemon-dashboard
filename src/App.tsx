import * as React from 'react';
import './App.css';
import axios from 'axios';
// import PokeList from './components/pokelist/PokeList';
// import { Col } from 'react-bootstrap/lib/';
import { PagingState, CustomPaging, EditingState, ChangeSet } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, TableEditColumn, PagingPanel } from '@devexpress/dx-react-grid-bootstrap3';
// import Command from './components/command/command';
import ViewPopupPlugin from './components/viewPopupPlugin/viewPopupPlugin';
import ViewPopup from './components/viewPopup/viewPopup';

export interface PokeProp {
  baseUrl?: string
}

// const logo = require('./logo.svg');

class App extends React.Component<PokeProp, object> {

  state = {
    columns: [
        {name: 'id', title: 'ID'},
        {name: 'name', title: 'Pokemon Name'},
    ],
    editingStateColumnExtensions: [
      { columnName: 'Action', editingEnabled: true },
    ],
    rows: [],
    totalCount: 0,
    pageSize: 20,
    currentPage: 0,
    loading: true
  };
  
  changeCurrentPage = (currentPage: number) => {
    // debugger;
    const offset = currentPage * this.state.pageSize;
    const url = `${this.props.baseUrl}/pokemon?offset=${offset}`;
    this.loadPokemon(url);
    this.setState ({
      loading: true,
      currentPage,
    })
  }

  changeEditingRowIds = editingRowIds => this.setState({ editingRowIds });

  changeRowChanges = rowChanges => this.setState({ rowChanges });

  commitChanges = (changed: Array<ChangeSet>) => {
    let { rows } = this.state;
    if (changed) {
      rows.map(
        (row: any) => (changed[row.id] ? { ...row, ...changed[row.id] } : row)
      );
    }
    this.setState({ rows });
  }

  parseID = (url: string) => {
    const splitBy = url.split('/');
    return splitBy[splitBy.length - 2];
  }

  loadPokemon = (url: string) => {
    this.setState({loading: true});
    axios.get(url)
    .then((response: any) => {
      console.log(response.data);
      const rows = response.data.results.map((item: any) => {
        return {id: this.parseID(item.url) , name: item.name, url: item.url};
      })
      const totalCount = response.data.count;
      this.setState({rows, totalCount, loading: false});
    }).catch(err => { 
      console.log(err);
      this.setState({loading: false});
    })
  }

  componentDidMount() {
    console.log(this.props.baseUrl);
    this.loadPokemon(`${this.props.baseUrl}/pokemon`);
  }

  render() {
    const { rows, columns, pageSize, currentPage, totalCount, loading, editingStateColumnExtensions} = this.state;
    return (
      <div>
       <Grid rows={rows} columns={columns}>
         <PagingState 
         currentPage={currentPage} 
         onCurrentPageChange={this.changeCurrentPage}
         pageSize={pageSize}
         />
         <CustomPaging totalCount={totalCount}/>
         <EditingState columnExtensions={editingStateColumnExtensions} 
         onCommitChanges={this.commitChanges} />
          <Table />
          <TableHeaderRow />
          <TableEditColumn showEditCommand={true} />
          <ViewPopupPlugin popupComponent={ViewPopup} />
          <PagingPanel />
       </Grid>
       {loading}
      </div>
    );
  }
}

export default App;
