const { ChatInputCommandInteraction,SlashCommandBuilder,EmbedBuilder } = require("discord.js");
const config = require("../configs/config.json");
const token = (config.token);
const ownerid = (config.ownerid);
const ownername = (config.ownername);
const color = (config.color)


  module.exports = {
    data: new SlashCommandBuilder()
      .setName("servericon")
      .setDescription("Displays Avatar Of You Or Another User."),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
  
      const servericon = new EmbedBuilder()
        .setColor(color)
        .setAuthor({ name: `${interaction.client.user.username} Server's icons `, iconURL:`${interaction.client.user.avatarURL({ dynanic: true })}` })
        .setDescription(`**Look at ${interaction.guild.name} icon, how cool is that!**`)
        .setImage(interaction.guild.iconURL({dynanic: true,size: 2048}))
        .setTimestamp()
        .setFooter({ text: `Request by ${interaction.user.username}`, iconURL:`${interaction.user.avatarURL({ dynanic: true},)}` })
      interaction.reply({
        embeds: [servericon],
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
  