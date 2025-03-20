"use client";

import { io } from "socket.io-client";
//'http://52.15.132.197:3001
export const clientSocket = io('ws://52.15.132.197:3001');