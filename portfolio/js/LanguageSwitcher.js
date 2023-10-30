class LanguageSwitcher {
    constructor(lang) {
        this.currentLanguage = null;
        this.pageTitles = null;
        this.supportedLanguages = ["fi", "en"];
        this.supportedLanguageTitles = { "fi": "Suomeksi", "en": "In English" };
        if (localStorage.getItem("lang") === null) {
            this.setLanguage(this.supportedLanguages[1]); // default to en
            this.currentLanguage = this.supportedLanguages[1];
        } else {
            this.setLanguage(this.getLanguage());
            this.currentLanguage = this.getLanguage();
        }

        const languageSelectorDiv = document.querySelector(".language-selection");
        if (languageSelectorDiv !== undefined) {
            const langSwitcher = this;
            for (lang of this.supportedLanguages) {
                console.log(lang);
                const langButton = document.createElement("button");
                langButton.type = "button";
                langButton.addEventListener("click", this.setLanguage.bind(this, lang));
                langButton.textContent = this.supportedLanguageTitles[lang];
                languageSelectorDiv.appendChild(langButton);
                languageSelectorDiv.appendChild(document.createTextNode(" "));
            }
        }
    }

    setPageTitles(titles) {
        this.pageTitles = titles;
        if (this.currentLanguage) {
            document.title = this.pageTitles[this.currentLanguage];
        }
    }

    setLanguage(lang) {
        const hideClass = "hidden";

        if (this.supportedLanguages.includes(lang)) {
            localStorage.setItem("lang", lang);
            this.currentLanguage = lang;
        }

        const showLang = "lang-" + lang;
        const langElems = document.querySelectorAll("." + showLang);

        langElems.forEach((elem) => {
            elem.classList.remove(hideClass);
        });

        const hideLangs = this.supportedLanguages.filter(language => language !== lang);
        hideLangs.forEach((language) => {
            const langElems = document.querySelectorAll(".lang-" + language);
            langElems.forEach((elem) => {
                elem.classList.add(hideClass);
            });
        });

        if (this.pageTitles) {
            this.setPageTitles(this.pageTitles);
        }
    }

    getLanguage() {
        return localStorage.getItem("lang");
    }
}
