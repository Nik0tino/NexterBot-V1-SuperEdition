const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const superagent = require("superagent");
const config = require("../configs/config.json");
const token = (config.token);
const ownerid = (config.ownerid);
const ownername = (config.ownername);
const color = (config.color)


module.exports = {
    data: new SlashCommandBuilder()
        .setName("ip")
        .setDescription("Displays Info About Given IP")
        .addStringOption((options) =>
            options.setName("ip").setDescription("What's The IP?").setRequired(true)
        ),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const ip = interaction.options.getString("ip");

        let { body } = await superagent.get(`https://ipwhois.app/json/${ip}`);

        const country = body.country_code;

        const error = new EmbedBuilder()
            .setTitle("⛔ Error Executing Command")
            .setColor(color)
            .setFooter({ text: `Request by ${interaction.user.username}`, iconURL: `${interaction.user.avatarURL({ dynanic: true },)}` })
            .setImage("https://media.tenor.com/fzCt8ROqlngAAAAM/error-error404.gif")
            .addFields(
                {
                    name: "User:",
                    value: `\`\`\`${interaction.user.username}\`\`\``,
                },
                {
                    name: "Reason:",
                    value: `\`\`\`${body.message}\`\`\``,
                }
            );

        if (body.success == false)
            return interaction.reply({
                embeds: [error],

            });

        const ipembed = new EmbedBuilder()
            .setTitle(`Here's Your Info On **${ip}**!`)
            .setTimestamp()
            .setFooter({ text: `Request by ${interaction.user.username}`, iconURL: `${interaction.user.avatarURL({ dynanic: true },)}` })
            .setAuthor({ name: `${interaction.client.user.username} Ip's informations `, iconURL:`${interaction.client.user.avatarURL({ dynanic: true })}` })

            .setColor(color)
            .addFields(
                {
                    name: "Type Of IP:",
                    value: `\`\`\`${body.type}\`\`\``,
                },
                {
                    name: "Continent:",
                    value: `\`\`\`${body.continent}\`\`\``,
                },
                {
                    name: "Country:",
                    value: `\`\`\`${body.country}\`\`\``,
                },
                {
                    name: "State:",
                    value: `\`\`\`${body.region}\`\`\``,
                },
                {
                    name: "City:",
                    value: `\`\`\`${body.city}\`\`\``,
                },
                {
                    name: "Timezone:",
                    value: `\`\`\`${body.timezone_name}\`\`\``,
                },
                {
                    name: "ISP:",
                    value: `\`\`\`${body.isp}\`\`\``,
                },
                {
                    name: "Flag:",
                    value: `:flag_${country}:`.toLocaleLowerCase(),
                }
            );
        interaction.reply({
            embeds: [ipembed],

            components: [
                new ActionRowBuilder().setComponents(
                    new ButtonBuilder()
                        .setLabel("IPWHOIS Docs")
                        .setStyle(ButtonStyle.Link)
                        .setURL("https://ipwhois.io/documentation")
                ),
            ],
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
