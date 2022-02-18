const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('orderlist')
        .setDescription('get a list of all orders')
        .addBooleanOption(option => option.setName('long').setDescription('include failed and successful orders')),
    async execute(interaction, dat) {
        //use interaction.reply("") to say things.
        //always remember to return.

        if (!interaction.member.roles.cache.some(role => role.id == "943979162731966545")) return interaction.reply({ content: "you must have the deliverant role to do this command!" })

        let embedlist = [];

        dat.fetchAllOrders().forEach(Order => {
            if(Order.status == "pending" || Order.status == "claimed" || interaction.options.getBoolean('long') == true) {
                embedlist.push(Order.toEmbed())
            }
        })
        
        await interaction.reply({ content: "here is a list of all orders: ", embeds: [...embedlist] })

        return
    },
};