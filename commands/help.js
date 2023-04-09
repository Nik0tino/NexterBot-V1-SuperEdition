const { EmbedBuilder, Client, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders");
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
    .setName('help')
    .setDescription('Replies with commands list'),
  async execute(interaction, client) {
    const members = (interaction.guild.members.cache)
    const online = members.filter(member => member.presence?.status == "online").size + members.filter(member => member.presence?.status == "dnd").size + members.filter(member => member.presence?.status == "idle").size
    const offline = interaction.guild.memberCount - online

    const row1 = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel("Support")
          .setURL(`https://discord.com/invite/sa2V8xBNFa`)
          .setEmoji("🔗")
          .setStyle(ButtonStyle.Link)
      )
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setAuthor({ name: `${interaction.client.user.username} Commands List`, iconURL: `${interaction.client.user.avatarURL({ dynanic: true })}` })

          .setColor(color)

          .addFields(

            { name: '> **Public**', value: `** \`avatar\` \`ping\` \`userid\` \`servericon\` \`serverid\` \`server\` \`ip\` \`bot\` \`user\` \`invite\` **`, inline: true },

            { name: '> **Moderation**', value: `** \`ban\` \`kick\` \`clear\` \`unban\` \`lock\` \`unlock\` \`hide\` \`unhide\` **`, inline: true },

            { name: '> **Music**', value: `** \`play\` \`stop\` \`pause\` \`resume\` \`skip\` \`activities\` \`queue\` **`, inline: true })

          .setTimestamp()
          .setFooter({ text: `Request by ${interaction.user.username}`, iconURL: `${interaction.user.avatarURL({ dynanic: true })}` })
      ]
      , components: [row1]
    })
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

  },
};

