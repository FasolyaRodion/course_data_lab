/* 
	Найдите книгу с ID=2 и верните её название.
	Пример XML в файле saxXML.ts
*/

import { SAXParser, type QualifiedAttribute } from "sax";


export function findBookById(xml: string, targetId: string): string | null {
  const parser = new SAXParser(true);
  let currentId:string | QualifiedAttribute = '';
  let currentTitle = '';
  let foundBook = false;
  let isTargetBook = false;
  let isTitleTag = false;

  parser.onopentag = (tag) => {
    if (tag.name === 'book') {
      if (tag.attributes.id === targetId) {
        isTargetBook = true;
      }
    }
    if (isTargetBook && tag.name === 'title') {
      isTitleTag = true;
      currentTitle = '';
    }
  };

  parser.ontext = (text) => {
    if (isTitleTag) {
      currentTitle += text;
    }
  };

  parser.onclosetag = (tagName) => {
    if (tagName === 'title' && isTargetBook) {
      isTitleTag = false;
      foundBook = true;
    }
    if (tagName === 'book') {
      isTargetBook = false;
    }
  };
  
  parser.write(xml).close();
  return foundBook ? currentTitle.trim() : null;
}