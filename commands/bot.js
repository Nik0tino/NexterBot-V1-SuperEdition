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
        { name : '<:icon_goodping:1034855192757284975> | WebSocket Ping', value: `${interaction.client.ws.ping}ms`, inline: true},
        { name : '<:icon_yes:1034855222436180028> | Memory', value: `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB Heap`, inline : true},
        { name : '<:icon_exlamation:1034855189125017620> | Guilds Count', value: `${interaction.client.guilds.cache.size} guilds`, inline : true},
        { name : '<:icon_stars:1034855211698753607> | Users Count', value: `${interaction.client.users.cache.size} users`, inline : true},
        { name : '<:icon_bot:1034129563682361395> | Commands size', value: `${interaction.client.commands.size} cmds`, inline : true},
        { name : '<:js:1034515744739823696> | NodeJs Version', value: `${process.version} on ${process.platform} ${process.arch}`, inline : true},
        { name : '<:icon_verified:1034855218069913600> | Discord.js', value: `${discordjsVersion}`, inline : true},
        { name : '<:icon_mongodb:1034516655193210900> | Database', value: `MongoDB`, inline : true},
        { name : '<:icon_tube:1034517294895874048> | Bot Version', value: `2.0`, inline : true},
        { name : '<:icon_dev:1034855180493148210> | Bot Developer', value: `Bilestox#2713`, inline : true},
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
  
  