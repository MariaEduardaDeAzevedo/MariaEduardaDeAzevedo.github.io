let $title = document.getElementById("main-title");
let $content = document.getElementById("main-content");
let $resume = document.getElementById("information-resume");
let $language = document.getElementById("language");

const PT_BR_TRANSLATION = "public/i18n/pt-br.json";
const EN_US_TRANSLATION = "public/i18n/en-us.json";

let selectedLanguage = null;

function getTranslation(language) {
  let translation = null;
  let languageLabel = null;

  switch (language) {
    case "PT-BR":
      languageLabel = "Português";
      translation = PT_BR_TRANSLATION;
      break;
    case "EN-US":
    default:
      languageLabel = "English";
      translation = EN_US_TRANSLATION;
      break;
  }

  getFile(translation).then((data) => {
    $title.innerHTML = data.presentation.title;
    $content.innerHTML = data.presentation.content;
    $resume.innerHTML = data.information.resume;
    $language.innerHTML = languageLabel;
    console.log($language, languageLabel);
  });
}

function getFile(url) {
  return fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    });
}
