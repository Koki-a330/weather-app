"use strict";
document.addEventListener("DOMContentLoaded", function () {
  let apiKey = "ca93fd5ab0712775957213696d550d58"; // OpenWeatherMapのAPIキー
  const weatherInfo = document.getElementById("weather-info");
  const dateInfo = document.getElementById("date-info");
  const weatherImage = document.getElementById("weather-image");
  const fetchWeatherBtn = document.getElementById("fetch-weather");

  // 現在の日付を表示
  function updateDate() {
    const today = new Date();
    dateInfo.textContent = `日付: ${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  }

  // 緯度・経度をもとに天気情報を取得する関数
  async function fetchWeatherByCoords(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ja`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("天気情報の取得に失敗しました");
      }
      const data = await response.json();

      const weatherDescription = data.weather[0].description;
      const temperature = data.main.temp;
      const weatherIcon = data.weather[0].icon;

      weatherInfo.textContent = `現在地の天気: ${weatherDescription}（${temperature}℃）`;
      weatherImage.src = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
      weatherImage.alt = weatherDescription;
    } catch (error) {
      weatherInfo.textContent = "天気情報を取得できませんでした";
      console.error(error);
    }
  }

  // 現在地（GPS）を取得して天気情報を取りにいく関数
  function fetchWeather() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          // デバッグ：緯度・経度の出力
          console.log("取得した緯度 (latitude):", lat);
          console.log("取得した経度 (longitude):", lon);

          fetchWeatherByCoords(lat, lon);
        },
        (error) => {
          weatherInfo.textContent = "現在地の取得に失敗しました。位置情報が許可されていないか、取得できません。";
          console.error(error);
        }
      );
    } else {
      weatherInfo.textContent = "このブラウザはGPSに対応していません。";
    }
  }

  // ボタンをクリックしたら天気を取得
  fetchWeatherBtn.addEventListener("click", fetchWeather);

  // 初期表示
  updateDate();
});
