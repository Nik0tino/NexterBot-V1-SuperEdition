const { EmbedBuilder, Client } = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders")
const client = new Client({
    intents: 131071,
});
const { version: discordjsVersion } = require('discord.js');

const config = require("../configs/config.json");
const token = (config.token);
const ownerid = (config.ownerid);
const ownername = (config.ownername);
const color = (config.color)

module.exports = {
	data: new SlashCommandBuilder()
    .setName('bot')
    .setDescription('Replies with bot informations'),
    async execute(interaction, client) {

      await interaction.reply({ embeds: [
        new EmbedBuilder()
        .setColor(color)
        .setAuthor({ name: `${interaction.client.user.username} Informations`, iconURL:`${interaction.client.user.avatarURL({ dynanic: true},)}` })
        .addFields(
        { name : 'WebSocket Ping', value: `${interaction.client.ws.ping}ms`, inline: true},
        { name : 'Memory', value: `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB Heap`, inline : true},
        { name : 'Guilds Count', value: `${interaction.client.guilds.cache.size} guilds`, inline : true},
        { name : 'Users Count', value: `${interaction.client.users.cache.size} users`, inline : true},
        { name : 'Commands size', value: `${interaction.client.commands.size} cmds`, inline : true},
        { name : 'NodeJs Version', value: `${process.version} on ${process.platform} ${process.arch}`, inline : true},
        { name : 'Discord.js', value: `${discordjsVersion}`, inline : true},
        { name : 'Database', value: `MongoDB`, inline : true},
        { name : 'Bot Version', value: `2.0`, inline : true},
        { name : 'Bot Developer', value: `MikroBoX#2713`, inline : true},
         )
         .setFooter({ text: `Request by ${interaction.user.username}`, iconURL:`${interaction.user.avatarURL({ dynanic: true},)}` })
         .setTimestamp()
      
      ]})
      
.catch(err => {
      
            const errorEmbed = new EmbedBuilder()
              .setTitle("⛔ Error Executing Command")
             // .setColor(color)
              .setImage(
                "https://media.tenor.com/fzCt8ROqlngAAAAM/error-error404.gif"
              );
      
            return interaction.reply({
              embeds: [
                errorEmbed.addFields(
                  {
                    name: "User:",
                    value: `\`\`\`${interaction.user.username}\`\`\``,
                  },
                  {
                    name: "Reasons:",
                    value: `\`\`\`${err}\`\`\``,
                  }
                ),
              ],
              ephemeral: true,
            });
        })


    
    }

  }
  
  