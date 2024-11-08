document.addEventListener('DOMContentLoaded', function () {
    const deliveryForm = document.getElementById('deliveryCalculationForm');

    deliveryForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio do formulário

        const distance = parseFloat(document.getElementById('deliveryDistance').value);
        const length = parseFloat(document.getElementById('boxLength').value);
        const width = parseFloat(document.getElementById('boxWidth').value);
        const height = parseFloat(document.getElementById('boxHeight').value);

        const baseRate = 4.00; // Taxa base de R$4,00 por km
        let deliveryValue = distance * baseRate;

        // Calcular a taxa adicional com base nas dimensões da caixa
        const size = length + width + height;
        const extraFee = Math.floor(size / 15) * 5.00; // Taxa de R$5 a cada 15 cm
        deliveryValue += extraFee;

        // Exibir o valor calculado na tela
        document.getElementById('deliveryValue').textContent = deliveryValue.toFixed(2);
    });
});
