/* 
	Найти первый элемент <p> в документе.
*/

import { select } from 'xpath';

export function findFirstParagraph(doc: Document): Node | null {
  const query = "//p"; // Тут нужно написать XPath запрос
  const result = select(query, doc) as Node[];
  return result.length > 0 ? result[0] : null;
}
