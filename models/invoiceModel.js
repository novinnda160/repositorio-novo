import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';
import Client from './clientModel.js';

const Invoice = sequelize.define('Invoice', {
    clientId: {
        type: DataTypes.INTEGER,
        references: {
            model: Client,
            key: 'id'
        }
    },
    value: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending'
    }
});

Invoice.belongsTo(Client, { foreignKey: 'clientId' });

export default Invoice;
