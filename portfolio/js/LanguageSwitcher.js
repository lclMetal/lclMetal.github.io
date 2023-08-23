class LanguageSwitcher {
    constructor(lang) {
        this.supportedLanguages = ["fi", "en", "sve", "den"];
        if (localStorage.getItem("lang") === null) {
            this.setLanguage(this.supportedLanguages[0]); // default to fi
        } else {
            this.setLanguage(this.getLanguage());
        }
    }

    setLanguage(lang) {
        if (this.supportedLanguages.includes(lang)) {
            localStorage.setItem("lang", lang);
        }

        let showLang = "lang-" + lang;
        let showElems = document.getElementsByClassName(showLang);
        Array.prototype.forEach.call(showElems, elem => elem.style.display = "inherit");

        // if (event) {
            // event.target.style.fontSize = "3em";
        // }

        let hideLangs = this.supportedLanguages.filter(language => language !== lang);
        hideLangs.forEach(language => Array.prototype.forEach.call(
            document.getElementsByClassName("lang-" + language), elem => elem.style.display = "none"
        ));

    }

    getLanguage() {
        return localStorage.getItem("lang");
    }
}
