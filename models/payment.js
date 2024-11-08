import { Sequelize } from 'sequelize';
import db from '../config/database.js';

const Payment = db.define('payments', {
    deliveryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'deliveries',
            key: 'id',
        },
    },
    amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    method: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pending',
    },
});

export default Payment;
