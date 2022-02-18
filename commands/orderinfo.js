const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('orderinfo')
        .setDescription('get info about a specific order')
        .addIntegerOption(option => option.setName('ordernumber').setDescription('the order number to get info about').setRequired(true)),
    async execute(interaction, dat) {
        //use interaction.reply("") to say things.
        //always remember to return.

        if (!interaction.member.roles.cache.some(role => role.id == "943979162731966545")) return interaction.reply({ content: "you must have the deliverant role to do this command!" })

        let embed = dat.fetchOrder(interaction.options.getInteger('ordernumber')) == undefined ? false : dat.fetchOrder(interaction.options.getInteger('ordernumber')).toEmbed()

        if(embed == false) return interaction.reply({ content: "that order number doesn't exist!" });
        await interaction.reply({ content: "found order!", embeds: [embed] })
        
        return
    },
};