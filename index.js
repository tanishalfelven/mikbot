const { Client : DiscordClient } = require("discord.js");
const { parse } = require("discord-command-parser");

const commands = require("./commands.js");
const { COMMAND_TERM, DISCORD_TOKEN } = require("./config.json");

const client = new DiscordClient();

client.login(DISCORD_TOKEN);

client.on("message", async (message) => {
    const parsed = parse(message, COMMAND_TERM, { allowSpaceBeforeCommand : true });

    if(!parsed.success) {
        return;
    }

    if(commands[parsed.command]) {
        return commands[parsed.command].f(parsed, client);
    }

    message.reply(`I'm not familiar with this one, \`${parsed.command}\`. Use \`help\` to view all availabe commands!`);
});
