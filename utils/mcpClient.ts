import { Client } from "@modelcontextprotocol/sdk/client";

export async function initializeMCP(){
    const client = new Client({
        name:'playwright-client',
        version:'1.0.0'
    })

    return client
}