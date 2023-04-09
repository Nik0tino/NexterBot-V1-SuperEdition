const { SlashCommandBuilder, EmbedBuilder, Client } = require('discord.js');
const client = new Client({
    intents: 131071,
});
const config = require("../configs/config.json");
const moment = require("moment")
const token = (config.token);
const ownerid = (config.ownerid);
const ownername = (config.ownername);
const color = (config.color)
module.exports = {
  data: new SlashCommandBuilder()
    .setName('userid')
    .setDescription('Replies with user id')
      .addUserOption((options) =>
        options.setName("user").setDescription("Select The User.")
      ),
  async execute(interaction, client) {
         const user = interaction.options.getMember("user") || interaction.member;

          try {
            await interaction.reply(`User ID : ${user.id}`)

   } catch (err) {
        const errorEmbed = new EmbedBuilder()
          .setTitle("⛔ Error Executing Command")
          .setColor(color)
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
      }
  },
};

