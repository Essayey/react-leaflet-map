import React, { useState } from 'react'
import { Form, Button, Modal, Col, Row } from 'react-bootstrap'

const AddNodeModal = ({ onHide, position, addNode }) => {
    const [lat, setLat] = useState(position.lat);
    const [lng, setLng] = useState(position.lng);
    const [property1, setProperty1] = useState('');
    const [property2, setProperty2] = useState('');
    const [property3, setProperty3] = useState('');


    const handleAdd = () => {
        addNode({ lat, lng, property1, property2, property3, linkedWith: [] });
        onHide();
    }


    return (
        <div>
            <Modal show={true} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавить узел</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="4">
                                Координаты
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    placeholder="Широта"
                                    value={lat}
                                    onChange={e => setLat(e.target.value)} />
                            </Col>

                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="4">
                                Долгота
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    placeholder="Долгота"
                                    value={lng}
                                    onChange={e => setLng(e.target.value)}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="4">
                                Свойство 1
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    value={property1}
                                    onChange={e => setProperty1(e.target.value)}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="4">
                                Свойство 2
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    value={property2}
                                    onChange={e => setProperty2(e.target.value)}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="4">
                                Свойство 3
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    value={property3}
                                    onChange={e => setProperty3(e.target.value)}
                                />
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type='sumbit' onClick={handleAdd}>
                        Добавить узел
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddNodeModal