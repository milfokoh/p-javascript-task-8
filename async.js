'use strict';

/**
 * Сделано задание на звездочку
 * Реализована остановка промиса по таймауту
 */
const isStar = false;

/** Функция паралелльно запускает указанное число промисов
 * @param {Function<Promise>[]} jobs – функции, которые возвращают промисы
 * @param {Number} parallelNum - число одновременно исполняющихся промисов
 * @param {Number} timeout - таймаут работы промиса
 * @returns {Promise<Array>}
 */
function runParallel(jobs, parallelNum, timeout = 1000) {
    // асинхронная магия
    return new Promise((resolve) => {
        if (jobs.length === 0 || parallelNum <= 0) resolve([]);
        const result = [];
        for (let index = 0; index < jobs.length; index += parallelNum) {
            const halfResult = jobs.slice(index, index + parallelNum);
            result.push(Promise.all(halfResult));
        }
        resolve(Promise.all(result));
    });
}

module.exports = {
    runParallel,

    isStar
};
