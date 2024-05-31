require('dotenv').config();
const { REST, Routes } = require('discord.js');

const commands = [
    {
        name: 'hello',
        description: "replies with 'Hello'",
    },
    {
        name: 'ping',
        description: "Get the bot's ping",
    },
    {
        name: 'channel',
        description: "Get the link to Ivan Law's channel on YouTube",
    },
    {
        name: 'say',
        description: "Send a message anonimously, to a selected user.",
        options: [
            {
                name: 'message',
                description: 'The message to send',
                type: 3,
                required: true,
            },
            {
                name: 'user',
                description: 'The user whom to send the provided message',
                type: 6,
                required: false,
            }
        ],
    },
    {
        'name': 'help',
        'description': 'List of commands with descriptions',
    },
    {
        name: 'uwu',
        description: 'UwU',
    },
    {
        name: 'insult',
        description: 'Insults someone.',
        options: [
            {
                name: 'target',
                description: 'whom to insult',
                type: 3,
                required: true,
            }
        ]
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async  () => {
    try {
        console.log(`Registering ${commands.length} commands...`);

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.BOT_ID, 
                process.env.GUILD_ID
            ),
            { body: commands },

        console.log('Successfully registered the slash commands!')
        )
    } catch (error) {
        console.log(`There was an error: ${error}`)
    }
})();

