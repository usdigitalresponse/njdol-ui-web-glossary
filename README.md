# New Jersey Department of Labor Web Glossary

This solution utlizes jQuery and assumes that the page is statically loaded, with no dynamic components added in after page load.

## Setup & Installation

All code is expected to be on the page.

The root html element needs to be marked by the "glossary" class.

You must specify the language of the page on the glossary element with the data-lang attribute:

`<main class="glossary" data-lang="english">`

This will be used to determine the proper language to show. All text variants are present in the html and are toggled on or off based on whatever value is set in that data-lang

## Developing Locally

The project can be run locally by spawning a web server that uses the directory root as a host.

There's various ways to do this like `php -S localhost` or using the Live Preview extension in VSCode.

## Defining Definitions

Every element that is intended to be toggled should have two classes: lang, and the selected language. For example an english language span would look like:

`<span class="lang english">English Description</span>`

Elements with the lang class should not be nested within each other. Doing so will have unpredictable behavior

As delivered there are two languages supported: English (the default), and Spanish.

## Linking to Definitions

Every term definition component should include an anchor element with a unique name, for example:

`<a name="able_to_work"></a>`

This will allow linking directly to the component via url, just append #able_to_work to the end of the glossary page's url.

## Defining Terms

Terms should have the structure of:

```
 <li class="term" data-category="aad">
    <a name="UNIQUE_KEY_FOR_LINKING"></a>
    <ul class="term-name">
        <li class="lang spanish">SPANISH_TERM</li>
        <li class="lang english">ENGLISH_TERM</li>
    </ul>

    <div class="definitions">
        <div class="definition lang english">
        ENGLISH_DEFINITION
        </div>
        <div class="definition lang spanish">
        SPANISH_DEFINITION
        </div>
    </div>
 </li>
```

Important note: while the definitions can be in any order, the English term should be the last element in the ul.term-name tag. This is because the English term name will always be visible.

## Code of Conduct

This repository falls under [U.S. Digital Response’s Code of Conduct](./CODE_OF_CONDUCT.md), and we will hold all participants in issues, pull requests, discussions, and other spaces related to this project to that Code of Conduct. Please see [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) for the full code.

## Contributing

This project wouldn’t exist without the hard work of many people. Thanks to the following for all their contributions! Please see [`CONTRIBUTING.md`](./CONTRIBUTING.md) to find out how you can help.

**Lead Maintainer:** [@cbroome](https://github.com/cbroome)

**Additional Contributors:**

## License & Copyright

Copyright (C) 2022 U.S. Digital Response (USDR)

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this software except in compliance with the License. You may obtain a copy of the License at:

[`LICENSE`](./LICENSE) in this repository or http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
