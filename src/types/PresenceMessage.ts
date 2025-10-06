export interface PresenceMessage {
  type: 'USER_ONLINE' | 'USER_OFFLINE' | 'ONLINE_USERS_LIST';
  user?: string;
  users?: string[];
}
