import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class ConfirmationPromprs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      title: '',
      text: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      show: nextProps.show,
      title: nextProps.title,
      text: nextProps.text,
    });
  }

  render() {
    return (
      <Modal
        show={this.state.show}
        centered
        onHide={() => this.props.onCancel()}
      >
        <Modal.Header closeButton>
          <Modal.Title>{this.state.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{this.state.text}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.props.onCancel()}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={() => this.props.onConfirm()}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
