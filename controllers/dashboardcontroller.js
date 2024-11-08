import db from '../config/db.js'; // Importar sua conexão com o banco de dados

export const getRevenueData = async () => {
    // Exemplo: obtendo dados do faturamento por mês
    const [rows] = await db.query('SELECT MONTH(data) AS month, SUM(valor) AS total FROM faturamento GROUP BY MONTH(data)');
    
    const months = [];
    const revenue = [];

    for (let i = 0; i < 12; i++) {
        months.push(i + 1); // Adiciona todos os meses
        revenue.push(0); // Inicializa com zero
    }

    rows.forEach(row => {
        months[row.month - 1] = getMonthName(row.month); // Converte o número do mês para nome
        revenue[row.month - 1] = row.total; // Adiciona o total de faturamento para o mês
    });

    return {
        months,
        revenue,
        totalRevenue: revenue.reduce((sum, value) => sum + value, 0), // Total do faturamento
    };
};

// Função para converter mês em nome
const getMonthName = (month) => {
    const monthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return monthNames[month - 1];
};
