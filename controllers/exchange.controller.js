const db = require('../models/index')
const Exchange = db.exchange
const bcrypt = require('bcryptjs')

// Desc    Add new exchange
// Route   POST / 
// Access  Public
const addNewExchange = async ( req, res) => {
    try {
        const {
            name, 
            lastName,
            phone,
            giveValue,
            removeValue,
            giveValueCard,
            removeValueCard
        } = req.body
        if (name, lastName, phone, giveValue, removeValue, giveValueCard, removeValueCard === '') {
            req.flash('error', 'Bo`sh maydon qolib ketdi! ')
        }
        // const salt = await bcrypt.genSalt(10)
        // const hashedGiveValueCard = await bcrypt.hash(giveValueCard, salt)
        // const hashedRemoveValueCard = await bcrypt.hash(removeValueCard, salt)
        await Exchange.create({
            name, 
            lastName,
            phone,
            giveValue,
            removeValue,
            giveValueCard,
            removeValueCard,
        })
        req.flash('success', 'Arizangiz muvaffaqiyatli jo`natildi! ')
        // const matchGiveCard = await bcrypt.compare(req.body.giveValueCard, hashedGiveValueCard)
        // const matchRemoveCard = await bcrypt.compare(req.body.removeValueCard, hashedRemoveValueCard)
        res.redirect('/')

    } catch (err) {
        console.log(err);
    }
  }

  module.exports = {addNewExchange}
