"use client";

import { io } from "socket.io-client";
//'http://52.15.132.197:3001
//needs to be :3001 for local
export const clientSocket = io();