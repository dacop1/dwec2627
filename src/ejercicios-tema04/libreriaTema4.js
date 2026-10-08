/*
 * PROGRAMA JAVASCRIPT: Calculadora de Media, Rango y Moda.
 * Usa solo prompt() para la entrada y alert() para la salida.
 */

// --- MÓDULO DE ENTRADA DE DATOS ---
/**
 * Solicita al usuario una serie de valores enteros positivos (o cero)
 * y devuelve un array de números.
 * @returns {number[]} Array de valores numéricos introducidos por el usuario.
 */
function solicitarValores() {
    const valores = [];
    let entrada = '';

    alert(
        "🚀 Calculadora Estadística 📊\n\nIntroduce valores enteros positivos (o cero) uno por uno.\nPulsa 'Cancelar' o deja el campo vacío y pulsa 'Aceptar' para finalizar la entrada.",
    );

    while (true) {
        entrada = prompt(
            `Valor #${valores.length + 1} (o pulsa Cancelar/Aceptar sin valor para finalizar):`,
        );

        // Si el usuario pulsa Cancelar o Aceptar con cadena vacía (o null/undefined)
        if (entrada === null || entrada.trim() === '') {
            if (valores.length === 0) {
                alert('⚠️ Debes introducir al menos un valor para continuar.');
                continue; // Volver a pedir
            }
            break; // Termina la entrada
        }

        const numero = parseInt(entrada.trim(), 10);

        // Validación: es un número, no es NaN, es entero y es no negativo (>= 0)
        if (!isNaN(numero) && Number.isInteger(numero) && numero >= 0) {
            valores.push(numero);
        } else {
            alert(
                `⛔ Error: "${entrada}" no es un entero positivo (o cero) válido. Inténtalo de nuevo.`,
            );
        }
    }

    return valores;
}

// --- MÓDULOS DE CÁLCULO ESTADÍSTICO ---

/**
 * Calcula la Media (Promedio) de un array de números.
 * @param {number[]} arr El array de números.
 * @returns {number} La Media.
 */
function calcularMedia(arr) {
    if (arr.length === 0) return 0;

    let suma = 0;
    for (const valor of arr) {
        suma += valor;
    }
    return suma / arr.length;
}

/**
 * Calcula el Rango de un array de números.
 * (Diferencia entre el valor máximo y el valor mínimo).
 * @param {number[]} arr El array de números.
 * @returns {number} El Rango.
 */
function calcularRango(arr) {
    if (arr.length === 0) return 0;

    let min = arr[0];
    let max = arr[0];

    for (const valor of arr) {
        if (valor < min) {
            min = valor;
        }
        if (valor > max) {
            max = valor;
        }
    }
    return max - min;
}

/**
 * Calcula la Moda y maneja los casos especiales según la especificación.
 * @param {number[]} arr El array de números.
 * @returns {string} El resultado de la Moda.
 */
function calcularModa(arr) {
    if (arr.length === 0) return 'No aplicable (serie vacía)';

    const frecuencias = {}; // { valor: frecuencia }
    let maxFrecuencia = 0;

    // 1. Contar frecuencias y encontrar la máxima frecuencia
    for (const valor of arr) {
        frecuencias[valor] = (frecuencias[valor] || 0) + 1;
        if (frecuencias[valor] > maxFrecuencia) {
            maxFrecuencia = frecuencias[valor];
        }
    }

    // Si la máxima frecuencia es 1, todos los valores son únicos.
    if (maxFrecuencia <= 1) {
        return 'No tiene moda.';
    }

    // 2. Encontrar los valores (candidatos a moda) con la frecuencia máxima
    const candidatosModa = [];
    for (const valorStr in frecuencias) {
        if (frecuencias[valorStr] === maxFrecuencia) {
            // Convertir la clave (string) a número para el cálculo
            candidatosModa.push(parseInt(valorStr, 10));
        }
    }

    // 3. Evaluar los casos de la Moda

    // Caso 1: Un único valor con mayor frecuencia
    if (candidatosModa.length === 1) {
        return candidatosModa[0].toString(); // Moda = Valor
    }

    // Caso 2: Existen dos valores con mayor frecuencia
    if (candidatosModa.length === 2) {
        // Ordenar numéricamente para evaluar adyacencia
        candidatosModa.sort((a, b) => a - b);
        const [valor1, valor2] = candidatosModa;

        // Si son adyacentes (consecutivos)
        if (valor2 === valor1 + 1) {
            const modaCalculada = (valor1 + valor2) / 2;
            // Uso de toFixed(1) para mostrar al menos un decimal en el promedio
            return `${valor1}, ${valor2} (adyacentes) -> Media: ${modaCalculada.toFixed(1)}`;
        }
        // Si no son adyacentes
        else {
            return `${valor1}, ${valor2}`;
        }
    }

    // Caso 3: Existen más de dos valores con mayor frecuencia (Multimodal)
    if (candidatosModa.length > 2) {
        return `Multimodal (más de 2 valores): ${candidatosModa.join(', ')}`;
    }

    return `Error en el cálculo de la moda (${candidatosModa.length} candidatos).`;
}



// --- FUNCIÓN PRINCIPAL DE EJECUCIÓN ---

/**
 * Función principal que orquesta la solicitud, el cálculo y la presentación de resultados.
 */
function ejecutarAnalisisEstadistico() {
    const valores = solicitarValores();

    if (valores.length === 0) {
        alert('Programa finalizado sin datos para analizar.');
        return;
    }

    // Realizar los cálculos
    const media = calcularMedia(valores).toFixed(2);
    const rango = calcularRango(valores);
    const modaResultado = calcularModa(valores);
    //const mediana = calcularMediana(valores);

    // Construir el mensaje de resultados
    const resultados = `
    ✅ Análisis Estadístico Finalizado ✅
    -------------------------------------------
    Serie de Valores (${valores.length} en total):
    [${valores.join(', ')}]
    -------------------------------------------
    1. Media (Promedio): 
       👉 ${media}

    2. Rango (Máx - Mín): 
       👉 ${rango}

    3. Moda: 
       👉 ${modaResultado}

    4. Mediana:
       👉 ${mediana}
    -------------------------------------------
    `;

    // Mostrar los resultados
    alert(resultados);
}
