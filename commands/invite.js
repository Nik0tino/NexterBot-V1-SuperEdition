const { EmbedBuilder, Client, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
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
        .setName('invite')
        .setDescription('Replies with bot invite link'),
    async execute(interaction, client) {
        
          let embed = new EmbedBuilder()
            .setColor(color)
            .setAuthor({ name: `${interaction.client.user.username} Invite Link`, iconURL:`${interaction.client.user.avatarURL({ dynanic: true })}` })
            .setDescription(`**\<:heart:1034129561975259316> ${interaction.user.username}, Thanks for adding me!.**`)
            .setTimestamp()
            .setFooter({ text: `Request by ${interaction.user.username}`, iconURL:`${interaction.user.avatarURL({ dynanic: true })}` })

            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel("Invite")
                    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${interaction.client.user.id}&permissions=2184310032&scope=bot%20applications.commands`)
                    .setEmoji("🔗")
                    .setStyle(ButtonStyle.Link)
            )

            interaction.reply({ embeds: [embed], components: [row] })

          
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