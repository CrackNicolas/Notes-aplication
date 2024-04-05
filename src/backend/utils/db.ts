import { connect } from 'mongoose';

const props = {
    isConnected: false
}

export async function Conect_database(): Promise<boolean> {
    try {
        if (props.isConnected) return true;
        const db = await connect('mongodb://localhost/notes_aplication');
        props.isConnected = (db.connections[0].readyState === 1)
        return props.isConnected;
    } catch (error) {
        return false;
    }
}