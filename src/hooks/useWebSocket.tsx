import { Client, type IMessage, type StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import type { IChatMessage } from "../types/ChatMessage";
import { useCallback, useRef, useState } from "react";

interface UseWebSocketProps {
	url: string;
	topics: string[];
	onMessage: (topic: string, msg: IChatMessage) => void;
	username?: string;
}

export const UseWebSocket = ({
	url,
	topics,
	onMessage,
	username,
}: UseWebSocketProps) => {
	const clientRef = useRef<Client | null>(null);
	const subsRef = useRef<Record<string, StompSubscription | null>>({});
	const [connected, setConnected] = useState(false);

	const connect = useCallback(() => {
		if (clientRef.current) return;
		const connectUrl = username
			? `${url}?username=${encodeURIComponent(username)}`
			: url;

		const client = new Client({
			webSocketFactory: () => new SockJS(connectUrl),
			reconnectDelay: 5000,
			onConnect: () => {
				setConnected(true);
				topics.forEach((topic) => {
					const sub = client.subscribe(topic, (message: IMessage) => {
						try {
							const payload: IChatMessage = JSON.parse(message.body);
							onMessage(topic, payload);
						} catch (err) {
							console.error("failed parse", err);
						}
					});
					subsRef.current[topic] = sub;
				});
			},
			onDisconnect: () => setConnected(false),
			onStompError: (frame) => console.error("stomp error", frame),
			onWebSocketError: (ev) => console.error("ws error", ev),
		});

		client.activate();
		clientRef.current = client;
	}, [topics, onMessage, url, username]);

	const disconnected = useCallback(() => {
		if (!clientRef.current) return;
		Object.values(subsRef.current).forEach((s) => s?.unsubscribe());
		subsRef.current = {};
		clientRef.current.deactivate();
		clientRef.current = null;
		setConnected(false);
	}, []);

	const sendMessage = useCallback((destination: string, body: JSON) => {
		if (!clientRef.current || !clientRef.current.connected) {
			console.warn("not connected");
			return;
		}
		clientRef.current.publish({ destination, body: JSON.stringify(body) });
	}, []);

	return { sendMessage, connect, connected, disconnected };
};
