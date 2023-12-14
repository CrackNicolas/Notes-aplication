import { UUID } from "crypto";

export default interface Notes {
    id: UUID,
    name: string,
    description: string,
    date: Date
}