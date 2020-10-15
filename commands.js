const { COMMAND_TERM } = require("./config.json");

let allHelp;
const getAllHelp = () => {
    if(allHelp) {
        return allHelp;
    }

    allHelp = Object.keys(commands).sort().reduce((help, command) => {
        help += `\t\`${command}\` - ${commands[command].desc}\n`;

        return help;
    }, `\`${COMMAND_TERM}\` HELP\n`);

    return allHelp;
};

const commands = {
    help : {
        desc    : `Print all possible commands. Scope to a specific command with \`${COMMAND_TERM} help [command]\``,
        f : ({ message, arguments }) => {
            const [ command = false ] = arguments;

            // `help [command]` will print out just that commands help interface
            if(commands[command]) {
                return message.reply(`\`${command}\` - ${commands[command].desc}`);
            }

            // otherwise just print out the whole help prompt
            message.reply(getAllHelp());
        }
    },

    ping : {
        desc : "pong",
        f    : async ({ message }) => {
            message.reply("pong");
        },
    },

    "name-channel" : {
        desc : "Update name for current channel.",
        f    : async ({ message, body }, client) => {
            const channel = await client.channels.fetch(message.channel.id);

            channel.setName(body);

            const { name } = await client.channels.fetch(message.channel.id);

            return message.reply(`Channel name updated to \`${name}\`!`);
        },
    }
};

module.exports = commands;
