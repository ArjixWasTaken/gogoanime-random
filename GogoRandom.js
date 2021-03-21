// ==UserScript==
// @name         GogoRandom
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  fuck
// @author       You
// @match        *://*.gogoanime.vc/*
// @match        *://*.gogoanime.tv/*
// @match        *://*.gogoanime.io/*
// @match        *://*.gogoanime.in/*
// @match        *://*.gogoanime.se/*
// @match        *://*.gogoanime.sh/*
// @match        *://*.gogoanime.video/*
// @match        *://*.gogoanime.movie/*
// @match        *://*.gogoanime.so/*
// @match        *://*.gogoanimes.co/*
// @match        *://*.animego.to/*
// @grant        GM_xmlhttpRequest
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// ==/UserScript==

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

(function() {
    'use strict';
    const link = "https://raw.githubusercontent.com/ArjixGamer/gogoanime-random/main/all_anime.json"
    GM_xmlhttpRequest({
            method: "GET",
            url: link,
            onload: function(res) {
                const ALL_ANIME = JSON.parse(res.response)
                const getDomainLink = () => {
                    return document.location.href.match(/https\:\/\/.*?\.(?:movie|video|io|vc|so|co|to|sh|se|tv|in)/)[0]
                }
                const getRandomAnime = () => {
                    const index = getRandomInt(1, ALL_ANIME.length-1)
                    document.location.href = getDomainLink() + ALL_ANIME[index]
                }
                const button = `<li class="movies"><a title="Random Anime" href="#" class="random ads-evt">Random</a></li>`
                $("nav.menu_top > ul > li").last().after(button)
                document.querySelector("li.movies > a.random").onclick = getRandomAnime
            }
    })
})();
