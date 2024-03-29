const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const config = require("../configs/config.json");
const token = (config.token);
const ownerid = (config.ownerid);
const ownername = (config.ownername);
const color = (config.color)
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("unban")
      .setDescription("Unbans User From Server.")
      .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
      .setDMPermission(false)
      .addStringOption((options) =>
        options
          .setName("userid")
          .setDescription("Provide The ID Of The User.")
          .setRequired(true)
      )
      .addStringOption((options) =>
        options
          .setName("reason")
          .setDescription("Provide A Reason For The Unban.")
          .setMaxLength(512)
      ),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
      const { options, member } = interaction;
  
      const user = options.getString("userid");
      const reason = options.getString("reason") || "Not Specified.";
  
      try {
        await interaction.guild.members.unban(user);
  
        console.log(`
        \nWarning: Moderator Unbanned A User - Look Above For User Who Executed The Ban.
        \nID Of User Who Was Banned:\n${user}
        \nReason For Unban:\n${reason}
        `);
  
        const successEmbed = new EmbedBuilder()
          .setTimestamp()
          .setFooter({ text: `Request by ${interaction.user.username}`, iconURL:`${interaction.user.avatarURL({ dynanic: true},)}` })
          .setColor(color)
          .addFields(
            {
              name: "User Unbanned:",
              value: `\`\`\`${user}\`\`\``,
            },
            {
              name: "Reason:",
              value: `\`\`\`${reason}\`\`\``,
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
  