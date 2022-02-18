const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('orderclaim')
        .setDescription('claim an order that you will deliver!')
        .addIntegerOption(option => option.setName('ordernumber').setDescription('the number of the order to claim').setRequired(true)),
    async execute(interaction, dat) {
        //use interaction.reply("") to say things.
        //always remember to return.

        if (!interaction.member.roles.cache.some(role => role.id == "943979162731966545")) return interaction.reply({ content: "you must have the deliverant role to do this command!" })

        let order = dat.fetchOrder(interaction.options.getInteger('ordernumber')) == undefined ? false : dat.fetchOrder(interaction.options.getInteger('ordernumber'))
        if(order == false) return interaction.reply({ content: "that order doesn't exist!" })
        if(order.status != "pending") return interaction.reply({ content: "that order is already claimed or completed" })

        order.status = "claimed";
        order.claimedby = interaction.user.username;

        await interaction.reply({ content: "got it! claimed order no." + order.id })

        return
    },
};