import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { Row, Col, Button } from 'react-bootstrap';
import { request } from '../helper/helper';
import Loading from '../loading/loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { isUndefined } from 'util';

const { SearchBar } = Search;

export default class DataGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Loading: false,
      rows: [],
    };

    if (this.props.showEditButton && !this.existsColumn('Editar'))
      this.props.columns.push(this.getEditButton());

    if (this.props.showDeleteButton && !this.existsColumn('Eliminar'))
      this.props.columns.push(this.getDeleteButton());
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    this.setState({ loading: true });
    request
      .get(this.props.url)
      .then((response) => {
        this.setState({
          rows: response.data,
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.error(err);
      });
  }

  existsColumn(colText) {
    let col = this.props.columns.find((column) => column.text === colText);
    return !isUndefined(col);
  }

  getEditButton() {
    return {
      text: 'Editar',
      formatter: (cell, row) => {
        //console.log(row);

        return (
          <Button onClick={() => this.props.onClickEditButton(row)}>
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        );
      },
    };
  }

  getDeleteButton() {
    return {
      text: 'Eliminar',
      formatter: (cell, row) => {
        return (
          <Button onClick={() => this.props.onClickDeleteButton(row)}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        );
      },
    };
  }

  render() {
    const options = {
      custom: true,
      totalSize: this.state.rows.length,
    };

    return (
      <>
        <Loading show={this.state.loading} />
        <ToolkitProvider
          keyField="tp"
          data={this.state.rows}
          columns={this.props.columns}
          search
        >
          {(props) => (
            <>
              <PaginationProvider pagination={paginationFactory(options)}>
                {({ paginationProps, paginationTableProps }) => (
                  <>
                    <Row>
                      <Col>
                        <SizePerPageDropdownStandalone {...paginationProps} />
                      </Col>
                      <Col>
                        <SearchBar {...props.searchProps} />
                      </Col>
                    </Row>

                    <BootstrapTable
                      keyField="bt"
                      data={this.state.rows}
                      columns={this.props.columns}
                      {...paginationTableProps}
                      {...props.baseProps}
                    />
                    <PaginationListStandalone {...paginationProps} />
                  </>
                )}
              </PaginationProvider>
            </>
          )}
        </ToolkitProvider>
      </>
    );
  }
}
