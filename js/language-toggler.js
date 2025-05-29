$(document).ready(() => {
  // Setup links
  $(".terms li.term").each((_idx, term) => {
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
            <a href="" class="lang-toggle" data-lang="${definition}">${definition}</a>
          </li>
        `;
      });

      term.append(ul);
    }
  });

  $(".apply-lang").click((el) => {
    const selectedLanguage = $(".lang-toggle-global").val();
    $(".definition").hide();
    $(`.definition.${selectedLanguage}`).show();

    $("ul.term-name li").hide();
    $(`ul.term-name li.${selectedLanguage}`).show();
  });

  $(".lang-toggle").click((el) => {
    const lang = el.currentTarget.attributes["data-lang"].nodeValue;

    const $matchedParent = $(el.currentTarget).parents("li.term");

    const $matchedLang = $matchedParent.find(`.definition.${lang}`);

    $matchedParent.find(".definition").hide();
    $matchedLang.show();

    return false;
  });
});
