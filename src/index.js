const { Client, IntentsBitField, EmbedBuilder, ActivityType, ClientUser, messageLink, Embed, Invite, GuildInviteManager } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.DirectMessages,
        IntentsBitField.Flags.GuildEmojisAndStickers,
    ],
});

client.on('ready', (c) => {
    console.warn("The bot is ready, logged in as " + c.user.tag);

    client.user.setActivity({
        type: ActivityType.Watching,
        name: 'for /help',
    });
}); 

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'rr') {
        const embed = new EmbedBuilder()
        .setTitle("Totally not a rickroll")
        .setDescription('[Click to be redirected!](<ttps://www.youtube.com/watch?v=T5pfhvi9eOc>)')
        .setColor(0x11cc0e)
        .setTimestamp();
        interaction.reply({ embeds: [embed] });
    };

    if (interaction.commandName === 'ping') {
        const embed = new EmbedBuilder()
        .setTitle('Bot\'s ping')
        .setDescription(`The bot's ping is ${client.ws.ping}ms`)
        .setTimestamp()
        .setColor(0x11cc0e);
        interaction.reply({ embeds: [embed] });
    };

    if (interaction.commandName === 'hello') {
        interaction.reply('Hello!');
    };

    if (interaction.commandName === 'say') {
        const embed = new EmbedBuilder()
            .setTitle('Anonymous message')
            .setDescription(`**Somebody** sent the following message: \`${interaction.options.getString('message')}\``)
            .setColor(0x11cc0e)
            .setTimestamp();
    
        const user = interaction.options.getUser('user');
        
        if (user === null) {
            interaction.reply({ embeds: [embed] });
        } else {
            client.users.fetch(user.id).then(user => {
                user.send({ embeds: [embed], components:[
                        {
                            type: 1,
                            components: [
                                {
                                    type: 2,
                                    style: 1,
                                    label: `Sent from: ${interaction.guild.name}`,
                                    emoji: "✉",
                                    custom_id: "server",

                                }
                            ]
                        }
                    ], 
                }).catch(error => {
                    console.error('Error sending message:', error);
                });
                interaction.reply({ content: "Message sent succesfully!", ephemeral: true });
            }).catch(error => {
                console.error('Error fetching user:', error);
            });
        }
    };

    if (interaction.commandName === 'help') {
        const embed = new EmbedBuilder()
            .setTitle('Help')
            .setDescription('### Here are the commands you can use:')
            .addFields(
                {
                    name: '`Say`',
                    value: '> Says  smth. anonymously, optional: to a selected user',
                    inline: false
                },
                {
                    name: '`Ping`',
                    value: '> Get the bot\'s ping',
                    inline: false
                },
                {
                    name: '`uwu`',
                    value: '> UwU',
                    inline: false
                },
                {
                    name: '`Hello`',
                    value: '> Replies with "Hello"',
                    inline: false
                },
                {
                    name: '`rr`',
                    value: '> Totally not a rickroll',
                    inline: false
                },
                {
                    name: '`Help`',
                    value: '> Shows this message',
                    inline: false
                },
                {
                    name: '`insult`',
                    value: '> Insults a user',
                    inline: false
                }
            )
            .setColor(0x11cc0e)
            .setTimestamp();
        interaction.reply({ embeds: [embed] });
    };

    if (interaction.commandName === 'uwu') {
        interaction.reply('https://tenor.com/view/uw-u-kawai-pixel-art-gif-18479272');
    };

    if (interaction.commandName === 'insult') {
        const target = interaction.options.getString('target');   

        const responses = [
            `${target} is a fag`,
            `${target} is very dumb. In fact, he is so dumb he jumped off the basement window!`,
            `${target}'s mother so fat, not even Dora could explore her`,
            `Omg omg ${target}'s mama so fat she wakes up on both sided of the bed. Also, both sides of the neighbour's bed. At the same time`,
            `Did you know that the number of brain cells in ${target}'s brain is ten point-three? Now, how many are in the average human's brain? A LOT MORE`
        ]

        const random = Math.floor(Math.random() * responses.length);

        interaction.reply(responses[random]);
    };
});

client.login(process.env.TOKEN);