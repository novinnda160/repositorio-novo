let clients = [];
let currentId = 1;

const Client = {
    getAll: () => clients,

    getById: (id) => clients.find(client => client.id === id),

    create: (data) => {
        const newClient = { id: currentId++, ...data };
        clients.push(newClient);
        return newClient;
    },

    update: (id, data) => {
        const index = clients.findIndex(client => client.id === id);
        if (index !== -1) {
            clients[index] = { ...clients[index], ...data };
            return clients[index];
        }
        return null;
    },

    delete: (id) => {
        const index = clients.findIndex(client => client.id === id);
        if (index !== -1) {
            return clients.splice(index, 1)[0]; // Remove e retorna o cliente deletado
        }
        return null;
    }
};

// Exporte o objeto Client usando a sintaxe ES Modules
export default Client;
