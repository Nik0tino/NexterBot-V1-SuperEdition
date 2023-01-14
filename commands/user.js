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
    .setName('user')
    .setDescription('Replies with user informations')
      .addUserOption((options) =>
        options.setName("user").setDescription("Select The User.")
      ),
  async execute(interaction, client) {
         const user = interaction.options.getMember("user") || interaction.member;

          try {
      await interaction.reply({ embeds: [
        new EmbedBuilder()
        .setColor(color)
        .setAuthor({ name: `${interaction.client.user.username} User's info`, iconURL:`${interaction.client.user.avatarURL({ dynanic: true })}` })
        .setTitle(`Checking \`${user.user.tag}\` Informations`)
        .setDescription(`**\<:heart:1034129561975259316> UserName: ${user.user.username}

        \🆔 UserID: ${user.id}

        \⌛ Joined Discord: <t:${parseInt(user.user.createdTimestamp / 1000)}:R>

        \⌛ Joined Server: <t:${parseInt(user.joinedTimestamp / 1000)}:R>
        **`)
        .setTimestamp()
        .setFooter({ text: `Request by ${interaction.user.username}`, iconURL:`${interaction.user.avatarURL({ dynanic: true })}` })
      ]})
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

