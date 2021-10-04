const { Op, Sequelize, DataTypes } = require('sequelize');

const db = require('../db');

const Groups = db.define("group", {
    groudId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    uuid: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

Groups.findConversation = async function (gids) {
    try {
        const group = await Groups.findOne({
            where: {
                userId: {
                    [Op.or]: gids
                }
            }
        });

        return group;
    } catch (err) {
        console.error(err);
    }
};


module.exports = Groups;