const Discord = require('discord.js');
const client = new Discord.Client({ disableMentions: 'everyone' });

let ayarlar = {
  "token": "",
  "botVoiceChannelID": "",
  "botOwnerID": "",
  "guildID":"",
  "logChannelID":""
};

const resetChannels = async function(guildID, channelArray) {
  let guild = client.guilds.cache.get(guildID);
  channelArray.forEach(async channel => {
    let channel_old = guild.channels.cache.find(
      i => i.name == channel && i.type == "text"
    );
    if (!channel_old) return;
    let channel_old_position = channel_old.position;
    let channel_new = await channel_old.clone();
    await channel_old.delete();
    await channel_new.setParent(channel_old.parentID);
    await channel_new.setPosition(channel_old_position);
    await channel_new.setTopic(`Bu kanal 15 dakikada bir sıfırlanmaktadır.
    ${client.users.cache.has(ayarlar.botOwner) ? client.users.cache.get(ayarlar.botOwner).tag : "Atakan75"} was here!`);

    const embedMessage = new Discord.MessageEmbed()
        .setColor('#5600df')
        .setTimestamp()
        .setTitle('Kanal Sıfırlandı')
        .setDescription('Bu kanal güvenlik nedeniyle sıfırlanmıştır.')
        .setFooter(`${client.users.cache.has(ayarlar.botOwner) ? client.users.cache.get(ayarlar.botOwner).tag : "Atakan75"} was here!`);

    await channel_new.send(embedMessage);
  });
};

client.on('ready', () => {  
  client.user.setPresence({ activity: { name: "Atakan75 ❤️" }, status: "idle" });
  let botVoiceChannel = client.channels.cache.get(ayarlar.botVoiceChannelID);
  if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot ses kanalına bağlanamadı!"));
  console.log ('_________________________________________');
  console.log (`Bot İsmi           : ${client.user.username}`);
  console.log (`Durum              : Bot Çevrimiçi!`);
  console.log ('_________________________________________');

  const logEmbed = new Discord.MessageEmbed()
  .setColor('#5600df')
  .setTimestamp()
  .setTitle('Kanallar Sıfırlandı.')
  .setDescription('Seçili kanalların tamamı sıfırlandı!')
  .setFooter(`${client.users.cache.has(ayarlar.botOwner) ? client.users.cache.get(ayarlar.botOwner).tag : "Atakan75"} was here!`);

  let kanallar = ["channel1", "channel2", "channel3"];
  setInterval(async () => { 
    console.log('Kanallar başarıyla temizlendi.');
    resetChannels(ayarlar.guildID, kanallar);
    let channel = client.channels.cache.get(ayarlar.logChannelID);
    if (channel) channel.send(logEmbed);
  }, 450000); 
  
});

  
client.login(ayarlar.token);

//Atakan75 tarafından yapılmıştır!
