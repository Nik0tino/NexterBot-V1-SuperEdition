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
        .setName('support')
        .setDescription('Replies with bot zupport server link'),
    async execute(interaction, client) {
        
          let embed = new EmbedBuilder()
            .setColor(color)
            .setAuthor({ name: `${interaction.client.user.username} support server`, iconURL:`${interaction.client.user.avatarURL({ dynanic: true })}` })
            .setDescription(`**\:heart: ${interaction.user.username}, Thanks for join to my server!.**`)
            .setTimestamp()
            .setFooter({ text: `Request by ${interaction.user.username}`, iconURL:`${interaction.user.avatarURL({ dynanic: true })}` })

            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel("Support")
                    .setURL(`https://discord.gg/bKwprVg3WE`)
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