const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const config = require("../configs/config.json");
const token = (config.token);
const ownerid = (config.ownerid);
const ownername = (config.ownername);
const color = (config.color)
module.exports = {
    data: new SlashCommandBuilder()
    .setName("resume")
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
            await interaction.reply({content: "There is nothing to resume!"});
            return;
        }
        try {
            queue.resume();
            await interaction.reply({content: ":play_pause: Song has been resumed."})
        } catch (e) {
            const errorEmbed = new EmbedBuilder()
            .setColor(color)
            .setDescription(`${e} \nUnable to resume a song that isn't paused.`)
            .setFooter({ text: `Request by ${interaction.user.username}`, iconURL:`${interaction.user.avatarURL({ dynanic: true })}` })
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