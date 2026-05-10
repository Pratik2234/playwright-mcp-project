import { Client } from "@modelcontextprotocol/sdk/client";

import {
  StdioClientTransport
} from '@modelcontextprotocol/sdk/client/stdio.js';

export async function initializeMCP(){

    const transport= new StdioClientTransport({
        command:'node',
        args:[
            './dist/mcp-server/server.js'
        ]
    })
    const client = new Client({
        name:'playwright-client',
        version:'1.0.0'
    })

    await client.connect(transport)

    return client
}