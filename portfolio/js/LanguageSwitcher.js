class LanguageSwitcher {
    constructor(lang) {
        this.currentLanguage = null;
        this.pageTitles = null;

        this.supportedLanguages = ["fi", "en"];
        this.supportedLanguageLabels = { "fi": "FI", "en": "EN" };
        this.supportedLanguageTooltips = { "fi": "Vaihda kieleksi suomi", "en": "Change language to English" };
        this.supportedLanguageFlags  = { "fi": "fi-fi",    "en": "fi-gb"      };
        this.defaultLanguage = this.supportedLanguages[1];

        if (document.location.search !== "") {
            let params = new URLSearchParams(document.location.search);

            let lang = params.get("lang");

            if (this.supportedLanguages.includes(lang)) {
                this.setLanguage(lang);
                this.currentLanguage = this.getLanguage();
            } else {
                console.log("Invalid language: " + lang);
                this.setLanguage(this.defaultLanguage);
                this.currentLanguage = this.defaultLanguage;
            }
        } else if (localStorage.getItem("lang") === null) {
            this.switchLanguage(this.defaultLanguage);
        } else {
            this.switchLanguage(this.getLanguage());
        }

        const languageSelectorDiv = document.querySelector(".language-selection");
        if (languageSelectorDiv !== undefined) {
            const langSwitcher = this;
            for (lang of this.supportedLanguages) {
                console.log(lang);
                if (lang !== this.currentLanguage) {
                    const langButton = document.createElement("button");
                    const langFlag = document.createElement("span");
                    const langText = document.createTextNode(" " + this.supportedLanguageLabels[lang]);

                    langFlag.classList.add("fi", this.supportedLanguageFlags[lang]);

                    langButton.type = "button";
                    langButton.title = this.supportedLanguageTooltips[lang];
                    langButton.addEventListener("click", this.switchLanguage.bind(this, lang));
                    langButton.appendChild(langFlag);
                    langButton.appendChild(langText);
                    languageSelectorDiv.appendChild(langButton);
                    languageSelectorDiv.appendChild(document.createTextNode(" "));
                }
            }
        }
    }

    setPageTitles(titles) {
        this.pageTitles = titles;
        if (this.currentLanguage) {
            document.title = this.pageTitles[this.currentLanguage];
        }
    }

    switchLanguage(lang) {
        document.location.replace(document.location.pathname + "?lang=" + lang);
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
