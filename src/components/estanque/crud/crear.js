import React from "react";
import { Container, Form, Row, Button } from "react-bootstrap";
import { request } from "../../helper/helper";
import Loading from "../../loading/loading";
import MessagePrompt from "../../prompts/message";

export default class EstanqueCrear extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rediret: false,
      message: {
        text: "",
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
  }

  setValue(index, value) {
    this.setState({
      estanque: {
        ...this.state.estanque,
        [index]: value,
      },
    });
  }

  guardarEstanque() {
    this.setState({ loading: true });
    request
      .post("/estanque", this.state.estanque)
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

  render() {
    return (
      <Container id="estanque-crear-container">
        <MessagePrompt
          text={this.state.message.text}
          show={this.state.message.show}
          duration={2500}
          onExited={this.onExitedMessage}
        />

        <Loading show={this.state.loading} />

        <Row>
          <h1>Crear Estanques</h1>
        </Row>
        <Row>
          <Form>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue("nombre", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Fecha Inicial</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue("fecha_inicial", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Costo de los Peces</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue("costo_peces", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Fecha Final</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue("fecha_final", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Valor Venta de Peces</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue("venta_peces", e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              onClick={() => console.log(this.guardarEstanque())}
            >
              Guardar Estanque
            </Button>
          </Form>
        </Row>
      </Container>
    );
  }
}
