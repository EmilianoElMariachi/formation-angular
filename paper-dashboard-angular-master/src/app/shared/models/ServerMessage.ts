import { Statistique } from './Statistique';

export enum MessageType {
    NEW_DATA,
    UPDATED_DATA,
    DELETED_DATA
};

export interface ServerMessage {
  type: MessageType,
  objectRef: Statistique
}