import React from "react";
import { Container, Form, Row, Button } from "react-bootstrap";
import { request } from "../../helper/helper";
import Loading from "../../loading/loading";
import MessagePrompt from "../../prompts/message";
import ConfirmationPromprs from "../../prompts/confirmation";

export default class EstanquesEditar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idEstanque: this.props.getIdEstanque(),
      rediret: false,
      message: {
        text: "",
        show: false,
      },
      confirmation: {
        title: "Modificar estanque",
        text: "¿Deseas modificar el estanque?",
        show: false,
      },
      loading: false,
      estanque: {
        nombre: "",
        fecha_inicial: "",
        costo_peces: "",
        fecha_final: "",
        venta_peces: "",
      },
    };
    this.onExitedMessage = this.onExitedMessage.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  componentDidMount() {
    this.getEstanque();
  }

  getEstanque() {
    this.setState({ loading: true });
    request
      .get(`/estanques/${this.state.idEstanque}`)
      .then((response) => {
        this.setState({
          estanque: response.data,
          loading: false,
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  }

  setValue(index, value) {
    this.setState({
      estanque: {
        ...this.state.estanque,
        [index]: value,
      },
    });
  }

  guardarEstanques() {
    this.setState({ loading: true });
    request
      .put(`/es/${this.state.idEstanque}`, this.state.estanque)
      .then((response) => {
        if (response.data.exito) {
          this.setState({
            rediret: response.data.exito,
            message: {
              text: response.data.msg,
              show: true,
            },
          });
        }
        this.setState({ loading: false });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: true });
      });
  }

  onExitedMessage() {
    if (this.state.rediret) this.props.changeTab("buscar");
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
      this.guardarEstanques()
    );
  }

  render() {
    return (
      <Container id="estanques-crear-container">
        <MessagePrompt
          text={this.state.message.text}
          show={this.state.message.show}
          duration={2500}
          onExited={this.onExitedMessage}
        />

        <ConfirmationPromprs
          show={this.state.confirmation.show}
          title={this.state.confirmation.title}
          text={this.state.confirmation.text}
          onCancel={this.onCancel}
          onConfirm={this.onConfirm}
        />

        <Loading show={this.state.loading} />

        <Row>
          <h1>Editar Estanques</h1>
        </Row>
        <Row>
          <Form>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                value={this.state.estanque.nombre}
                onChange={(e) => this.setValue("nombre", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Fecha Inicial</Form.Label>
              <Form.Control
                value={this.state.estanque.fecha_inicial}
                onChange={(e) => this.setValue("fecha_inicial", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Costo Compra Peces</Form.Label>
              <Form.Control
                value={this.state.estanque.costo_peces}
                onChange={(e) => this.setValue("costo_peces", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Fecha Final de Producción</Form.Label>
              <Form.Control
                value={this.state.estanque.fecha_final}
                onChange={(e) => this.setValue("fecha_final", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Valor Venta de los Peces</Form.Label>
              <Form.Control
                value={this.state.estanque.venta_peces}
                onChange={(e) => this.setValue("venta_peces", e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              onClick={() =>
                this.setState({
                  confirmation: { ...this.state.confirmation, show: true },
                })
              }
            >
              Guardar Estanque
            </Button>
          </Form>
        </Row>
      </Container>
    );
  }
}
