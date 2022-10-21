import React, { useMemo, useState } from 'react'
import { Form, Button, Modal, Col, Row, DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap'

const EditNodeModal = ({ onHide, currentNode, nodes, editNode, deleteNode, addSegment }) => {
    const [lat, setLat] = useState(currentNode.lat);
    const [lng, setLng] = useState(currentNode.lng);
    const [property1, setProperty1] = useState(currentNode.property1);
    const [property2, setProperty2] = useState(currentNode.property2);
    const [property3, setProperty3] = useState(currentNode.property3);

    const [segmentNodeId, setSegmentNodeId] = useState();

    const handleEdit = () => {
        editNode({ ...currentNode, lat, lng, property1, property2, property3 });
        onHide();
    }

    const handleDelete = () => {
        deleteNode(currentNode.id);
        onHide();
    }

    const handleAddSegment = () => {
        if (!segmentNodeId) return;

        editNode({
            ...currentNode,
            linkedWith: [...currentNode.linkedWith, segmentNodeId]
        });

        editNode({
            ...nodes.find(node => node.id === segmentNodeId),
            linkedWith: [...nodes.find(node => node.id === segmentNodeId).linkedWith, currentNode.id]
        })

        addSegment({
            beginNode: currentNode.id,
            endNode: segmentNodeId,
            coordinates: [
                [currentNode.lat, currentNode.lng],
                [nodes.find(node => node.id === segmentNodeId).lat, nodes.find(node => node.id === segmentNodeId).lng
                ]]
        })
        onHide();
    }

    return (
        <div>
            <Modal show={true} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Редактировать узел {currentNode.id}</Modal.Title>
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
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="4">
                                Добавить отрезок
                            </Form.Label>
                            <Col sm="4">
                                <DropdownButton
                                    as={ButtonGroup}
                                    variant={'secondary'}
                                    title={segmentNodeId ? 'Отрезок к узлу ' + segmentNodeId : 'Выберите узел'}
                                >
                                    {nodes.map(node => {
                                        if (currentNode.linkedWith.find(id => id === node.id) !== undefined) return null;
                                        return <Dropdown.Item
                                            key={node.id}
                                            onClick={() => setSegmentNodeId(node.id)}
                                            active={node.id === segmentNodeId}
                                        >
                                            {'Отрезок к узлу ' + node.id}
                                        </Dropdown.Item>
                                    }
                                    )}
                                </DropdownButton>
                            </Col>
                            <Col sm="4">
                                <Button variant="primary" onClick={handleAddSegment}>
                                    Добавить
                                </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleDelete}>
                        Удалить узел
                    </Button>
                    <Button variant="primary" type='sumbit' onClick={handleEdit}>
                        Редактировать узел
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EditNodeModal