const { ChatInputCommandInteraction,SlashCommandBuilder,EmbedBuilder } = require("discord.js");
const config = require("../configs/config.json");
const token = (config.token);
const ownerid = (config.ownerid);
const ownername = (config.ownername);
const color = (config.color)


  module.exports = {
    data: new SlashCommandBuilder()
      .setName("avatar")
      .setDescription("Displays Avatar Of You Or Another User.")
      .addUserOption((options) =>
        options.setName("user").setDescription("Select The User.")
      ),
    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
      const user = interaction.options.getMember("user") || interaction.member;
    await user.user.fetch();
      const avatar = new EmbedBuilder()
        .setColor(color)
        .setAuthor({ name: `${interaction.client.user.username} User's avatars `, iconURL:`${interaction.client.user.avatarURL({ dynanic: true })}` })
        .setDescription(`**Look at ${user.user.username} avatar, how cool is that!**`) 
        .setImage(
          user.user.displayAvatarURL({
            dynamic: true,
            size: 2048,
          })
        )
        .setTimestamp()
        .setFooter({ text: `Request by ${interaction.user.username}`, iconURL:`${interaction.user.avatarURL({ dynanic: true},)}` })
  
      interaction.reply({
        embeds: [avatar],
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
  