import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import './App.css';
import 'leaflet/dist/leaflet.css'

function App() {

    return (
        <div className='App'>
            <MapContainer center={[54.514635, 36.252962]} zoom={16} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[54.514635, 36.252962]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>

    );
}

export default App;
