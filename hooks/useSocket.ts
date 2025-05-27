import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export default function useSocket(userId: string) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!userId) return;

    const socket = io("http://localhost:3000", {
      auth: { id: userId },
      transports: ["websocket"],
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  return socketRef;
}
