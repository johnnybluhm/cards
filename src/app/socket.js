"use client";

import { io } from "socket.io-client";

export const clientSocket = io('http://52.15.132.197:3001');