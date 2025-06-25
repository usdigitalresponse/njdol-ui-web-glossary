# Language Toggle

This solution

## Using

All code is expected to be on the page.

The root html element needs to be marked by the "glossary" class.

You must specify the language of the page on the glossary element with the data-lang attribute:

```
    <main class="glossary" data-lang="english">
```

This will be used to determine the proper language to show. All text variants are present
in the html and are toggled on or off based on whatever value is set in that data-lang
