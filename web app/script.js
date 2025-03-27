"use strict";
document.addEventListener("DOMContentLoaded", function () {
    let apiKey = "ca93fd5ab0712775957213696d550d58"; // OpenWeatherMapのAPIキー
    const city = "Tokyo"; // 取得する都市
    const weatherInfo = document.getElementById("weather-info");
    const dateInfo = document.getElementById("date-info");
    const weatherImage = document.getElementById("weather-image");
    const fetchWeatherBtn = document.getElementById("fetch-weather");

    // 現在の日付を表示
    function updateDate() {
        const today = new Date();
        dateInfo.textContent = `日付: ${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    }

    // 天気情報を取得する関数
    async function fetchWeather() {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ja`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("天気情報の取得に失敗しました");
            const data = await response.json();

            // 天気の説明を取得
            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;
            const weatherIcon = data.weather[0].icon;

            // HTML にデータを反映
            weatherInfo.textContent = `今日の天気: ${weatherDescription}（${temperature}℃）`;
            weatherImage.src = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
            weatherImage.alt = weatherDescription;

        } catch (error) {
            weatherInfo.textContent = "天気情報を取得できませんでした";
            console.error(error);
        }
    }

    // ボタンをクリックしたら天気を取得
    fetchWeatherBtn.addEventListener("click", function () {
        fetchWeather();
    });

    // 初期表示
    updateDate();
});