import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import OpenAI from "openai";
import { z } from "zod";
import dotenv from 'dotenv';



dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

const server = new McpServer({
    name: 'playwright-ai-server',
    version: '1.0.0'
})

server.registerTool(
    'validate-login',

    {
        description: 'Validate wheather login is succeeded',

        inputSchema: {
            pageText: z.string()
        }
    },

    async ({ pageText }) => {


        try {

            const completion = await openai.chat.completions.create({
                model: 'gpt-4.1-mini',
                messages: [
                    {
                        role: 'system',
                        content: `
                        You are QA automation AI validator.
                        Determine wheather login was successful.
                        Return ONLY:
                        LOGIN_SUCCESS
                        or
                        LOGIN_FAILED`
                    },
                    {
                        role: 'user',
                        content: `
                        Analyze this page content:
                        ${pageText}
                        `
                    }
                ],
                temperature: 0
            })

            const aiResponse = completion.choices[0].message.content?.trim()

            return {
                content: [
                    {
                        type: 'text',
                        text: aiResponse || 'LOGIN_FAILED'
                    }
                ]
            }
        } catch (error) {
            console.error(
                'OpenAI Error:', error
            )
            return {
                content: [{
                    type: 'text',
                    text: 'LOGIN_FAILED'
                }]
            }
        }
    })


async function startServer(){
   const transport= new StdioServerTransport()
   await server.connect(transport);
   console.log('Playwright MCP server is running')
}

startServer().catch(console.error)

