import { connect } from 'mongoose';

const props = {
    isConnected: false
}

export async function Conect_database() {
    try {
        if (props.isConnected) return;
        const db = await connect('mongodb://localhost/notes_aplication');
        props.isConnected = (db.connections[0].readyState === 1)
        return db.connections[0].readyState;
    } catch (error) {
        return false;
    }
}