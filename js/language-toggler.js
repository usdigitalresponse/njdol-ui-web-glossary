$(document).ready(() => {
  $(".lang-toggle").click((el) => {
    //console.log("clicked", $el.currentTarget.attributes["data-lang"].nodeValue);

    const lang = el.currentTarget.attributes["data-lang"].nodeValue;

    const $matchedParent = $(el.currentTarget).parents("li.term");

    const $matchedLang = $matchedParent.find(`.definition.${lang}`);

    console.log({ $matchedLang, $matchedParent });

    $matchedParent.find(".definition").hide();
    $matchedLang.show();

    //console.log({ $matchedLang });

    return false;
  });
});
