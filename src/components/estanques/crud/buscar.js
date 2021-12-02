import React from "react";
import { request } from "../../helper/helper";
import { Container, Row, Col } from "react-bootstrap";
//import './estanques.css';
import DataGrid from "../../grid/grid";
import ConfirmationPromprs from "../../prompts/confirmation";
import Loading from "../../loading/loading";
import MessagePrompt from "../../prompts/message";

const columns = [
  {
    dataField: "_id",
    text: "Product ID",
    hidden: true,
  },
  {
    dataField: "nombre",
    text: "Nombre",
  },
  {
    dataField: "fecha_inicial",
    text: "Fecha Inicial",
  },
  {
    dataField: "costo_peces",
    text: "Costo Peces",
  },
  {
    dataField: "fecha_final",
    text: "Fecha Final",
  },
  {
    dataField: "venta_peces",
    text: "Venta Peces",
  },
];

export default class EstanquesBuscar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      idEstanque: null,
      confirmation: {
        title: "Eliminar el estanque",
        text: "¿Deseas eliminar el estanque?",
        show: false,
      },
      message: {
        text: "",
        show: false,
      },
    };

    this.onClickEditButton = this.onClickEditButton.bind(this);
    this.onClickDeleteButton = this.onClickDeleteButton.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  onClickEditButton(row) {
    this.props.setIdEstanque(row._id);

    this.props.changeTab("editar");
  }

  onClickDeleteButton(row) {
    this.setState({
      idEstanque: row._id,
      confirmation: {
        ...this.state.confirmation,
        show: true,
      },
    });
  }

  onCancel() {
    this.setState({
      confirmation: {
        ...this.state.confirmation,
        show: false,
      },
    });
  }

  onConfirm() {
    this.setState(
      {
        confirmation: {
          ...this.state.confirmation,
          show: false,
        },
      },
      this.eliminarEstanque()
    );
  }

  eliminarEstanque() {
    this.setState({ loading: true });
    request
      .delete(`/estanques/${this.state.idEstanque}`)
      .then((response) => {
        this.setState({
          loading: false,
          message: {
            text: response.data.msg,
            show: true,
          },
        });
        if (response.data.exito) this.reloadPage();
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  }

  reloadPage() {
    setTimeout(() => {
      window.location.reload();
    }, 2500);
  }

  render() {
    return (
      <Container id="estanques-buscar-container">
        <ConfirmationPromprs
          show={this.state.confirmation.show}
          title={this.state.confirmation.title}
          text={this.state.confirmation.text}
          onCancel={this.onCancel}
          onConfirm={this.onConfirm}
        />

        <MessagePrompt
          text={this.state.message.text}
          show={this.state.message.show}
          duration={2500}
          onExited={this.onExitedMessage}
        />

        <Loading show={this.state.loading} />

        <Row>
          <h1>Buscar estanques</h1>
        </Row>
        <Row>
          <DataGrid
            url="/estanques"
            columns={columns}
            showEditButton={true}
            showDeleteButton={true}
            onClickEditButton={this.onClickEditButton}
            onClickDeleteButton={this.onClickDeleteButton}
          />
        </Row>
      </Container>
    );
  }
}
