import { connect } from 'mongoose';

const props = {
    isConnected: 0
}

export async function Conect_db() {
    if (props.isConnected) return;
    const db = await connect('mongodb://localhost/notes_aplication');
    props.isConnected = db.connections[0].readyState;
}