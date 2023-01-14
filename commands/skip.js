const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const config = require("../configs/config.json");
const token = (config.token);
const ownerid = (config.ownerid);
const ownername = (config.ownername);
const color = (config.color)
module.exports = {
    data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skips to the next song")
    .setDMPermission(false),
    async execute(interaction, client) {
        const VoiceChannel = interaction.member.voice.channel;
        if (!VoiceChannel)
            return interaction.reply({
                content: "You must be in a voice channel to use the music commands.",
                ephemeral: true,
            });
            
        const queue = await interaction.client.distube.getQueue(VoiceChannel);

        if (!queue) {
            await interaction.reply({content: "There is nothing in the queue."});
            return;
        }
        try {
            await queue.skip();
            await interaction.reply({content: ":track_next: Song has been skipped."})
        } catch (e) {
            const errorEmbed = new EmbedBuilder()
            .setColor(color)
            .setDescription(`${e} \nNothing to skip to!`);
            await interaction.reply({
                embeds: [errorEmbed],
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
}