const { EmbedBuilder, Client } = require('discord.js');
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
    .setName('server')
    .setDescription('Replies with server informations'),
  async execute(interaction, client) {
    const members = (interaction.guild.members.cache)
    const online = members.filter(member => member.presence?.status == "online").size + members.filter(member => member.presence?.status == "dnd").size + members.filter(member => member.presence?.status == "idle").size
    const offline = interaction.guild.memberCount - online
      await interaction.reply({ embeds: [
        new EmbedBuilder()
        .setColor(color)
        .setAuthor({ name: `${interaction.client.user.username} Server's info`, iconURL:`${interaction.client.user.avatarURL({ dynanic: true })}` })
        .setDescription(`**\🌐 Server name : ${interaction.guild.name}

        \🆔 Server ID: ${interaction.guild.id}

        \:green_circle: Members online: ${online}

        \:red_circle:  Members offline: ${offline}

        \:busts_in_silhouette: Total Members : ${interaction.guild.memberCount}

        \#️⃣ Channels count : ${interaction.guild.channels.cache.size}

        \🧪 Roles count : ${interaction.guild.roles.cache.size}

        \:crown: Server owner : <@${interaction.guild.ownerId}>**`)
        .setTimestamp()
        .setFooter({ text: `Request by ${interaction.user.username}`, iconURL:`${interaction.user.avatarURL({ dynanic: true })}` })
      ]})

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

