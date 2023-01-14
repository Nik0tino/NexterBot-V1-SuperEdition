const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const queue = require("./queue");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Plays a song from a query")
        .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("Provide a name or url for the song")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const { options, member, channel } = interaction;
    const VoiceChannel = member.voice.channel;
    const vcId = member.voice.channelId;

    if (!VoiceChannel)
      return interaction.reply({
        content: "You must be in a voice channel to use the music commands.",
        ephemeral: true,
      });

    if (interaction.client.voice.channelId && vcId !== interaction.client.voice.channelId)
      return interaction.reply({
        content: `I am already playing music in <#${interaction.client.voice.channelId}>`,
        ephemeral: true,
      });

    interaction.client.distube.play(VoiceChannel, options.getString("query"), {
      textChannel: channel,
      member: member,
    });
    await interaction.reply({
      content: ":thumbsup::skin-tone-3:  Request recieved."
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
  }
}
