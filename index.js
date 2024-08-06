'use strict';

const async = require('./async');

const API_KEY = 'AQVN3inFAohwk9SfyOdT53ma_5rQo2K0fl3HF_dh';
const folderId = 'b1gi7eo3n939krujvjvn';

/**
 * Возвращает функцию, которая возвращает промис
 * @param {String} lang - язык на который нужно перевести
 * @param {String} text - переводимый текст
 * @returns {Function<Promise>}
 */
function createTranslationJob(lang, text) {
    const body = {
        targetLanguageCode: lang,
        texts: text,
        folderId: folderId,
    };
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Api-Key ${API_KEY}`,
    };
    
    return fetch('https://translate.api.cloud.yandex.net/translate/v2/translate', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(result => result.translations[0].text)
    .catch(error => {
        console.error('Error:', error);
    });

}

const languages = ['be', 'uk', 'en', 'fr', 'de', 'it', 'pl', 'tr', 'th', 'ja'];
const text = 'дайте мне воды';

const jobs = languages.map(language => createTranslationJob(language, text));

async
    .runParallel(jobs, 2)
    .then(result => console.log(result.flat()));

/*
    дайце мне вады
    дайте мені води
    give me water
    donnez-moi de l'eau
    gib mir Wasser
    dammi dell'acqua
    daj mi wody
    verin bana su
    ให้ฉัน้ำ
    い水
*/