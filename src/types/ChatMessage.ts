export type MessageType = "CHAT" | "JOIN" | "LEAVE" | "PRIVATE";

export interface IChatMessage {
	id?: number;
	sender: string;
	content: string;
	timestamp: string; // ISO format
	type: MessageType;
	roomId?: string;
}
