const { EmbedBuilder, Client } = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders")
const client = new Client({
    intents: 131071,
});
const config = require("../configs/config.json");
const token = (config.token);
const ownerid = (config.ownerid);
const ownername = (config.ownername);
const color = (config.color)
module.exports = {
	data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with bot ping'),
  async execute(interaction, client) {

    await interaction.reply({ embeds: [
      new EmbedBuilder()
      .setColor(color)
      .setAuthor({ name: `${interaction.client.user.username} Ping`, iconURL:`${interaction.client.user.avatarURL({ dynanic: true })}` })
      .addFields({ name: `\:heart: | Hello My Ping Is`, value: `---> **${interaction.client.ws.ping}ms**` },)
      .setTimestamp()
      .setFooter({ text: `Request by ${interaction.user.username}`, iconURL:`${interaction.user.avatarURL({ dynanic: true })}` })
    
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

