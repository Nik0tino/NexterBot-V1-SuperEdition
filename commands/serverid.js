const { SlashCommandBuilder, EmbedBuilder, Client } = require('discord.js');
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
    .setName('serverid')
    .setDescription('Replies with serverid'),
  async execute(interaction, client) {
   
    await interaction.reply(`Server ID : ${interaction.guild.id}`)
    
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

