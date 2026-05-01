/* 
	Доработайте код для сбора всех ID книг в массив.
	Пример XML в файле saxXML.ts
*/

import { SAXParser } from "sax";

// Исходный код
export function collectBookIds(xml: string): string[] {
  const parser = new SAXParser(true);
  const ids: string[] = [];
  
  parser.onopentag = (tag) => {
    if (tag.name === 'book' && tag.attributes.id) {
      ids.push(tag.attributes.id as string);
    }
  };

  
  parser.write(xml).close();
  return ids;
}
