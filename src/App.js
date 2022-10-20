import { Circle, CircleMarker, MapContainer, Marker, Polyline, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import './App.css';
import 'leaflet/dist/leaflet.css'
import { useState } from 'react';
import AddNodeModal from './components/modals/AddNodeModal';
import EditNodeModal from './components/modals/EditNodeModal';


function AddNodeEvent({ setAdding, setPosition }) {
    useMapEvents({
        click(e) {
            setPosition(e.latlng)
            setAdding()
        },
    })

    return null;
}

function App() {
    const [nodeAdding, setNodeAdding] = useState(false)
    const [position, setPosition] = useState({ lat: 0, lng: 0 })
    const [nodeEditing, setNodeEditing] = useState(false);

    const [nodes, setNodes] = useState([
        { id: 0, lat: 54.515427399355154, lng: 36.24768254508607, property1: '', property2: '', property3: '', linkedWith: [0, 1] },
        { id: 1, lat: 54.51507844132908, lng: 36.25071749461759, property1: '', property2: '', property3: '', linkedWith: [1, 0] },
        { id: 2, lat: 54.5137573589381, lng: 36.24701764448197, property1: '', property2: '', property3: '', linkedWith: [2] },
        { id: 3, lat: 54.51338345993791, lng: 36.24993462777728, property1: '', property2: '', property3: '', linkedWith: [3] },
        { id: 4, lat: 54.51480425793142, lng: 36.25236902192451, property1: '', property2: '', property3: '', linkedWith: [4] },
        { id: 5, lat: 54.51317158231861, lng: 36.25183281175992, property1: '', property2: '', property3: '', linkedWith: [5] },
        { id: 6, lat: 54.51581374226371, lng: 36.2539025829952, property1: '', property2: '', property3: '', linkedWith: [6] },
        { id: 7, lat: 54.5151282926582, lng: 36.252937404698955, property1: '', property2: '', property3: '', linkedWith: [7] },
        { id: 8, lat: 54.515103367001224, lng: 36.253634477912904, property1: '', property2: '', property3: '', linkedWith: [8] },
        { id: 9, lat: 54.51476063767573, lng: 36.25354868428658, property1: '', property2: '', property3: '', linkedWith: [9] }
    ])
    const [currentNode, setCurrentNode] = useState(null);

    const [segments, setSegments] = useState([{
        id: 0,
        beginNode: 0,
        endNode: 1,
        coordinates: [[54.515427399355154, 36.24768254508607], [54.51507844132908, 36.25071749461759]]
    }])

    const addNode = node => {
        setNodes([...nodes, { id: nodes.length, ...node }])
    }

    const editNode = node => {
        setNodes(nodes => nodes.map(n => {
            if (n.id === node.id) {
                return node;
            }
            return n;
        }))
    }

    const addSegment = segment => {
        setSegments([...segments, { id: segments.length, ...segment }]);
    }

    return (
        <div className='App'>
            <MapContainer center={[54.514635, 36.252962]} zoom={16} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {nodes.map(node =>
                    <CircleMarker
                        key={node.id}
                        eventHandlers={{
                            click: (e) => {
                                e.originalEvent.view.L.DomEvent.stopPropagation(e)
                                setCurrentNode(node);
                                setNodeEditing(true);
                            },
                        }}
                        center={[node.lat, node.lng]}
                        pathOptions={{ color: 'green', fillColor: 'green', fillOpacity: 1 }}
                        radius={10} />
                )}
                {segments.map(segment =>
                    <Polyline key={segment.id} pathOptions={{ color: 'green' }} positions={segment.coordinates} />
                )}
                <AddNodeEvent setAdding={() => setNodeAdding(true)} setPosition={setPosition} />
            </MapContainer>
            {nodeAdding &&
                <AddNodeModal
                    onHide={() => setNodeAdding(false)}
                    position={position}
                    addNode={addNode}
                />
            }
            {nodeEditing &&
                <EditNodeModal
                    onHide={() => setNodeEditing(false)}
                    currentNode={currentNode}
                    nodes={nodes}
                    editNode={editNode}
                    addSegment={addSegment}
                />
            }

        </div>
    );
}

export default App;
