// @ts-nocheck
$(document).ready(() => {
  const $terms = $("ul.glossary-terms");
  const $glossarySearchMatchCount = $(".glossary-search-match-count");
  const $glossarySearchSummary = $(".glossary-search-summary");
  const $glossarySearchReset = $(".glossary-search-reset");
  const $glossarySearchInput = $(".glossary-search-input");
  const scrollToTop = () =>
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

  let selectedLanguage = $terms.attr("data-lang");

  if (!selectedLanguage) {
    console.error("No selected language set on ul.glossary-terms");
  }

  /**
   * Set the correct data-lang on every definition to denote the
   * current language.
   */
  const setLangAttrOnTerms = () => {
    $terms.find("li.term").attr("data-lang", selectedLanguage);
  };

  /*
   *
   * Setup
   *
   */

  setLangAttrOnTerms();

  /**
   * Add the "scroll to head" links
   */
  $terms.find("li.section-head").each((_idx, head) => {
    const anchor = document.createElement("a");
    anchor.className = "return-to-top";
    anchor.innerText = "Scroll to top";
    anchor.addEventListener("click", scrollToTop);

    head.appendChild(anchor);
  });

  /**
   * Setup links on the individual glossary term definitions
   */
  $terms.find("li.term").each((_idx, term) => {
    const definitions = $(term)
      .find(".definition")
      .map((idx, definition) => {
        const classNames = definition.className.split(" ");
        // Fragile code, assumes the language will be the last class name
        return classNames[classNames.length - 1];
      })
      .get();

    if (definitions) {
      const ul = document.createElement("ul");
      ul.className = "language-select";

      definitions.forEach((definition) => {
        ul.innerHTML += `
          <li>
            <a href="#" class="lang-toggle" data-lang="${definition}">${definition}</a>
          </li>
        `;
      });

      term.append(ul);
    }
  });

  /*
   *
   * Click and event handlers
   *
   */

  /**
   * Toggle all definitions at once.
   */
  $(".apply-lang").click((el) => {
    selectedLanguage = $(".lang-toggle-global").val();

    $(".definition").hide();
    $(`.definition.${selectedLanguage}`).show();

    const $termNames = $("ul.term-name");

    $terms.attr("data-lang", selectedLanguage);

    $termNames.find("li").hide();
    $termNames.find(`li.${selectedLanguage}`).show();
    // Always show the English option
    $termNames.find(`li.english`).show();

    setLangAttrOnTerms();
  });

  /**
   * Toggle the language within an individual definition
   */
  $(".lang-toggle").click((el) => {
    const lang = el.currentTarget.attributes["data-lang"].nodeValue;
    const $matchedParent = $(el.currentTarget).parents("li.term");
    const $matchedLang = $matchedParent.find(`.definition.${lang}`);

    $matchedParent.attr("data-lang", lang);

    $matchedParent.find(".definition").hide();

    $matchedParent.find("ul.term-name li").hide();
    $matchedParent.find(`ul.term-name li.${lang}`).show();
    // always show the English option
    $matchedParent.find(`li.english`).show();
    $matchedLang.show();

    return false;
  });

  /**
   * Search functionality
   */
  $(".glossary-search-button").click(() => {
    const searchTerm = $glossarySearchInput.val();
    let matches = 0;

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLocaleLowerCase();
      $terms.find("li.term").each((_idx, term) => {
        const $term = $(term);
        let matched = false;
        $term
          .find(`.term-name .${selectedLanguage}, .term-name .english`)
          .each((_idx, termNameEl) => {
            const termName = termNameEl.innerHTML?.toLocaleLowerCase();
            if (termName.includes(lowerCaseSearchTerm)) {
              matched = true;
            }
          });

        if (matched) {
          matches++;
        } else {
          $term.hide();
        }
      });

      $glossarySearchSummary.show();
      $glossarySearchMatchCount.html(matches);
    } else {
      matches = 0;
    }
  });

  /**
   * Reset search functionality
   */
  $glossarySearchReset.click(() => {
    $glossarySearchSummary.hide();
    $terms.find("li.term").show();
    $glossarySearchInput.val("");
  });
});
