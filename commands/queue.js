const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const config = require("../configs/config.json");
const token = (config.token);
const ownerid = (config.ownerid);
const ownername = (config.ownername);
const color = (config.color)

module.exports = {
    data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Displays the list of songs that have been added to the queue.")
    .setDMPermission(false),
    async execute(interaction, client) {
        const VoiceChannel = interaction.member.voice.channel;

        if (!VoiceChannel)
            return interaction.reply({
                content: "You must be in a voice channel to use the music commands.",
                ephemeral: true,
            });

        const queue = await interaction.client.distube.getQueue(VoiceChannel);
        
        if (!queue) return interaction.reply({ content: "There is no queue." });

        try {
            const queueEmbed = new EmbedBuilder()
            .setColor(color)
            .setDescription(`${queue.songs.map((song, id) =>
                    `\n**${id + 1}**. ${song.name} = \`${song.formattedDuration}\``)}`);

            await interaction.reply({
            embeds: [queueEmbed]
            })
        } catch (e) {
            const errorEmbed = new EmbedBuilder()
            .setColor(color)
            .setDescription(`${e} \nThe queue is probably too large to display right now. \n I will try to fix this eventually.`)
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