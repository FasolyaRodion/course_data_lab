/* 	
	Проверьте, что каждый тег <book> имеет атрибут id.
	Пример XML в файле saxXML.ts
*/

import { SAXParser } from "sax";

// Исходный код
export function validateBookStructure(xml: string): boolean {
  const parser = new SAXParser(true);
  let isValid = true;

  parser.onopentag = (tag) => {
    if (tag.name === 'book' && !tag.attributes.id) {
      isValid = false;
    }
  };

  parser.write(xml).close();
  return isValid;
}
