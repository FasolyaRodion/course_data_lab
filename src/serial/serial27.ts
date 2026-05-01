/* 	
	Соберите все названия книг в массив.
	Пример XML в файле saxXML.ts
*/

import { SAXParser } from "sax";

export function extractTitles(xml: string): string[] {
  const parser = new SAXParser(true);
  const titles: string[] = [];
  let currentTitle = "";
  let isTitleTag = false;

  parser.onopentag = (tag) => {
    if (tag.name === 'title') {
      isTitleTag = true;
      currentTitle = "";
    }
  };

  parser.ontext = (text) => {
    if (isTitleTag) {
      currentTitle += text;
    }
  };

  parser.onclosetag = (tagName) => {
    if (tagName === 'title') {
      titles.push(currentTitle);
      isTitleTag = false;
      currentTitle = "";
    }
  };


  parser.write(xml).close();
  return titles;
}
