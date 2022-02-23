import "./assets/css/_all.css";
import "./assets/css/_mobile.css";
import "./assets/css/_tablet.css";
import "./assets/css/_desktop.css";
import cityImg from "./assets/img/city.svg";
import axios from 'axios';
import _ from 'lodash';


//Getting data from the document
const searchBar = document.querySelector('[data-text-box]');
const searchButton = document.querySelector('[data-button]');
const summaryElem = document.querySelector('[data-summary');
const totalScoreElem = document.querySelector('[data-teleport-city-score]');
const inputError = document.querySelector('[data-input-error]');
const hiddenElems = document.querySelectorAll('[data-hidden-elements]');
const definitonDiv = document.querySelector('[data-definition]');

const appImg = new Image();
appImg.src = cityImg;
definitonDiv.insertBefore(appImg, definitonDiv.childNodes['0']);
appImg.setAttribute('class', 'image');


//Event functions
function fetchCity(){
    let city = document.querySelector('[data-text-box]').value;
    city = city
            .toLowerCase()
            .replace(/\s+/g, ' ')
            .trim()
            .replace(' ', '-');
                
    axios
        .get(`https://api.teleport.org/api/urban_areas/slug:${city}/scores/`)
        .then(response => {
            const cityData = response.data.categories;
            const citySummary = response.data.summary;
            const cityScore = response.data.teleport_city_score;
            setScores(cityData, citySummary, cityScore, city);
        })
        .catch(error => {
            if (error.response.status === 404) {
              console.log('City not found');
              searchBar.classList.add('invalid-city');
              inputError.style.display = 'block';
            } else if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
        });
};

function setScores(cityData, citySummary, cityScore, city){
    for (let i = 0; i < cityData.length; i++) {
        const score = _.get(cityData, `${i}.score_out_of_10`);
        document.querySelector(`[data-scores-percent-${i}]`).innerText = `${Math.round(score)}/10`;
        document.querySelector(`[data-scores-fill-${i}]`).classList.remove('oto');
        document.querySelector(`[data-scores-fill-${i}]`).classList.add('scores-fill', 'tot');
        document.querySelector(`[data-scores-fill-${i}]`).style.width = `${(Math.round(score) * 10)}%`;
    };
    
    summaryElem.innerText = citySummary
                                    .replace(/(<([^>]+)>)/gi, '')
                                    .replace(/\s\s+/g, ' ')
                                    .trim();
    summaryElem.setAttribute('class', 'summary');
    totalScoreElem.innerText = `${Math.round(cityScore / 10)}/10`;
    document.querySelector(`[data-scores-fill-17]`).classList.remove('oto');
    document.querySelector(`[data-scores-fill-17]`).classList.add('scores-fill', 'tot');
    document.querySelector(`[data-scores-fill-17]`).style.width = `${(Math.round(cityScore))}%`;
    hiddenElems.forEach(element => element.style.display = 'block');

    
    document.querySelector('[data-scores-div]').style.display = 'grid';
    document.querySelector('[data-more-info]').setAttribute('href', `https://teleport.org/cities/${city}/`);
};
    

//Data Events
searchButton.addEventListener('click', () => {
    fetchCity();
});

searchBar.addEventListener('click', () => {
    const scoresFill = document.querySelectorAll('.empty-fill');
    const scoresPerc = document.querySelectorAll('.scores-percent');
    scoresFill.forEach(element => {
        element.classList.remove('tot');
        element.classList.add('oto');
        setTimeout(() => {
            element.classList.remove('scores-fill');
            element.style.width = '0%';
        }, 900);
    });
    scoresPerc.forEach(element => element.innerText = '0/10');
    searchBar.classList.remove('invalid-city');
    hiddenElems.forEach(element => element.style.display = 'none');
    inputError.style.display = 'none';
});


