import React from "react";
import { Container, Nav, Row } from "react-bootstrap";
import EstanqueBuscar from "./crud/buscar";
import EstanqueCrear from "./crud/crear";
import EstanqueEditar from "./crud/editar";
import "./estanque.css";

export default class Estanque extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: "buscar",
      _id: null,
    };
    this.changeTab = this.changeTab.bind(this);
    this.setIdEstanque = this.setIdEstanque.bind(this);
    this.getIdEstanque = this.getIdEstanque.bind(this);
  }

  changeTab(tab) {
    this.setState({ currentTab: tab });
  }

  setIdEstanque(id) {
    this.setState({ _id: id });
  }

  getIdEstanque() {
    return this.state._id;
  }
  //
  render() {
    return (
      <Container id="estanque-container">
        <Row>
          <Nav
            fill
            variant="tabs"
            defaultActiveKey="buscar"
            onSelect={(eventKey) => this.setState({ currentTab: eventKey })}
          >
            <Nav.Item>
              <Nav.Link eventKey="buscar">Buscar</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="crear">Crear</Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>
        <Row>
          {this.state.currentTab === "buscar" ? (
            <EstanqueBuscar
              changeTab={this.changeTab}
              setIdEstanque={this.setIdEstanque}
            />
          ) : this.state.currentTab === "crear" ? (
            <EstanqueCrear changeTab={this.changeTab} />
          ) : (
            <EstanqueEditar
              changeTab={this.changeTab}
              getIdEstanque={this.getIdEstanque}
            />
          )}
        </Row>
      </Container>
    );
  }
}
