//packages
const express = require("express");
const app = express();
const { Client, GatewayIntentBits, PermissionFlagsBits, Collection, Partials, EmbedBuilder, SlashCommandBuilder, PermissionsBitField } = require("discord.js");
const client = new Client({
  intents: 131071,
  partials: [
    Partials.User,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Message
  ]
});
const config = require("../configs/config.json");
const token = (config.token);
const ownerid = (config.ownerid);
const ownername = (config.ownername);
const color = (config.color)
module.exports = {
  data: new SlashCommandBuilder()
    .setName("hide")
    .setDescription("hide the channel u specify.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .setDMPermission(false)
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel u want to hide.")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const channel = interaction.options.getChannel("channel");
   const { options, member } = interaction;
  
  
      try {

   await channel.permissionOverwrites.set([
      {
        id: interaction.guild.id,
        deny: [PermissionsBitField.Flags.ViewChannel],
    
      },
    ])
  
        console.log(`Channel hide By User ${member.user.username}`);
  
        const successEmbed = new EmbedBuilder()
          .setTimestamp()
          .setFooter({ text: `Request by ${interaction.user.username}`, iconURL:`${interaction.user.avatarURL({ dynanic: true},)}` })
          .setColor(color)
          .addFields(
            {
              name: "Channel hide:",
              value: `\`\`\`${channel}\`\`\``,
            },

            {
              name: "Moderator:",
              value: `\`\`\`${member.user.username}\`\`\``,
            }
          );
        await interaction.reply({
          embeds: [successEmbed],
        });
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
  