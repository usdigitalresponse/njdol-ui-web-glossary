// @ts-nocheck

/**
 *
 * TODO:
 *
 * - toggle all elements by language, not just the glossary terms.
 */
$(document).ready(() => {
  const $glossary = $("main.glossary");
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

  let selectedLanguage = $glossary.attr("data-lang");

  if (!selectedLanguage) {
    console.error("No selected language set on main.glossary");
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

  $glossary.find(".lang").hide();
  $glossary.find(`.lang.${selectedLanguage}`).show();

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

    // The generic toggle...
    $glossary.find(".lang").hide();
    $glossary.find(`.lang.${selectedLanguage}`).show();

    $glossary.attr("data-lang", selectedLanguage);

    const $termNames = $("ul.term-name");
    // Always show the English term label option regardless of
    // selected language
    $termNames.find(`li.lang.english`).show();

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
    $glossary.find(".filter-tab").removeClass("selected");
  });

  /*
   *
   */
  $glossary.find(".filter-tab").click((el) => {
    const category = el.currentTarget.dataset.category;
    const selectedCategory = $terms.attr("data-category");
    $glossary.find(".filter-tab").removeClass("selected");

    if (selectedCategory === category) {
      // Reset filter, show all terms
      $terms.find("li.term").show();
      $glossarySearchSummary.hide();
      $terms.attr("data-category", "");
    } else {
      // apply new category filter
      $terms.attr("data-category", category);
      $terms.find("li.term").hide();

      const $categoryTerms = $terms.find(
        `li.term[data-category*="${category}"]`
      );

      $categoryTerms.show();
      const matched = $categoryTerms.length;

      $glossarySearchSummary.show();
      $glossarySearchMatchCount.text(matched);
      $(el.currentTarget).addClass("selected");
    }
  });
});
