//packages
const express = require("express");
const app = express();
const { Client, GatewayIntentBits, Collection, Partials, EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const client = new Client({
  intents: 131071,
  partials: [
    Partials.User,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Message
  ]
});
const { REST } = require('@discordjs/rest')
const moment = require("moment")
const { Routes } = require('discord-api-types/v9')
const path = require("path")
const axios = require("axios");
const fs = require("fs");
const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const ejs = require("ejs");
const config = require("./configs/config.json");
const { on } = require("events");
const clientId = (config.clientid)
const ownerid = (config.ownerid);
const ownername = (config.ownername);
const color = (config.color)
const PORT = process.env.PORT || 3000
const token = process.env.token || config.token

//music
client.distube = new DisTube(client, {
  leaveOnStop: true,
  emitNewSongOnly: true,
  emitAddListWhenCreatingQueue: false,
  plugins: [new SpotifyPlugin()],
});

//ready
client.on("ready", () => {

  client.user.setActivity("/help 🌠")
  console.log(`Bot Name : ${client.user.username}`)
  console.log(`Bot ID : ${client.user.id}`)
  console.log(`Bot Owner : ${ownername}`)
  console.log(`Users : ${client.users.cache.size}`)
  console.log(`Servers : ${client.guilds.cache.size}`)
  console.log(`Client ready; logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);

});
//Fixers & Debugers
setTimeout(() => {
  if (!client || !client.user) {
    console.log("Client Not Login, Process Kill")
    process.kill(1);
  } else {
    console.log("Client Login")
  }
}, 9 * 1000);
client.on("debug", (e) => console.log(e));


//slash loader

client.commands = new Collection();

//interactionCreate
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: '**- There was an error while executing this command!**\n**- حدث خطأ أثناء تنفيذ هذا الأمر!**', ephemeral: true });
  }
});


const commands = [];

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON())
  client.commands.set(command.data.name, command);
}

//


//creater

const rest = new REST({
  version: '9'
}).setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');

  } catch (error) {
    console.error(error);
  }
})();

//Music Event
client.distube
  .on("playSong", (queue, song) =>
    queue.textChannel.send({
      embeds: [
        new EmbedBuilder()
          .setColor(color)
          .setDescription(
            `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`
          ),
      ],
    })
  )
  .on("addSong", (queue, song) =>
    queue.textChannel.send({
      embeds: [
        new EmbedBuilder()
          .setColor(color)
          .setDescription(
            `Added \`${song.name}\` - \`${song.formattedDuration}\` to the queue by ${song.user}`
          ),
      ],
    })
  )
  .on("addList", (queue, playlist) =>
    queue.textChannel.send({
      embeds: [
        new EmbedBuilder().setDescription(
          `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue`
        ),
      ],
    })
  )
  .on("error", (channel, e) => {
    if (channel)
      channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(color)
            .setDescription(
              `An error encountered: ${e.toString().slice(0, 1974)}`
            ),
        ],
      });
    else console.error(e);
  })
  .on("empty", (channel) =>
    channel.send("Voice channel is empty! Leaving the channel...")
  )
  .on("searchNoResult", (message, query) =>
    message.channel.send({
      embeds: [
        new EmbedBuilder().setDescription(`No result found for \`${query}\`!`),
      ],
    })
  )
  .on("finish", (queue) => queue.textChannel.send("Finished!"));

// //Logs

client.on('guildCreate', (guild) => {
  let logchannel = client.channels.cache.find(c => c.id === '1094510122165870692');
  logchannel.send(`Joined **${guild.name}** Guild Id **${guild.id}** Owned By **<@${guild.ownerId}> ( ${guild.memberCount} Member )**`).catch(err => {
    console.log('Err In Guild Create')
  })

})
//Fake Leave
client.on("guildCreate", guild => {
  if (guild.memberCount < 10) {
    guild.leave()
  }
})

//Logs Leave

client.on('guildDelete', (guild) => {
  let logchannel = client.channels.cache.find(c => c.id === '1094510123281547285');
  logchannel.send(`Leaved **${guild.name}** Owned By **<@${guild.ownerId}> ( ${guild.memberCount} Member )**`).catch(err => {
    console.log('Err In Guild Delete')
  })

})


// //express loader
// //Express Ready

app.listen(PORT, () => {
  console.log(`Express App Is Ready On Port ${PORT}`)
})


//Express Settings
app.locals.domain = 'http://localhost:3000';
const https = require('https');
app.use(express.static("public"));
app.set('view engine', 'ejs');
//Pages

app.get('/', (req, res) => {

  let servers = (client.guilds.cache.size)
  let users = (client.users.cache.size)
  let emojis = (client.emojis.cache.size)
  let commands = (client.commands.size)


  res.render('index', {
    servers: servers,
    users: users,
    commands: commands,
    emojis: emojis
  }
  )

})

app.get('/embed', (req, res) => {
  res.render('embed')

})

app.get('/commands', (req, res) => {
  res.render('commands')
})

app.get('/termes-of-use', (req, res) => {
  res.render('termes-of-use')
})

app.get('/privacy-policy', (req, res) => {
  res.render('privacy-policy')
})

app.all('*', (req, res) => {
  res.render('404')
})
//Links
app.get('/support', (req, res) => {
  res.redirect('https://discord.gg/bKwprVg3WE')
})

app.get('/invite', (req, res) => {
  res.redirect('https://discord.com/api/oauth2/authorize?client_id=1034849748995297330&permissions=2184310032&scope=bot%20applications.commands')
})

app.get('/vote', (req, res) => {
  res.redirect('https://top.gg/bot/1034849748995297330/vote')
})


app.get("/status", (req, res) => {
  res.redirect("https://app.pulsetic.com/status/z8ugxxpJ")
})

//login
client.login(token).catch(err => {
  console.log("error in token")
})
