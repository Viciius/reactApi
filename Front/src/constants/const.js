import socketIOClient from "socket.io-client";

export const socket = socketIOClient('http://localhost:3300');
export const API = "http://localhost:3300/api";
export const headers = {
    
};