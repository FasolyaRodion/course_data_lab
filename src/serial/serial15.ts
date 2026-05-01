/* 	
	Напишите XPath, который найдет все элементы <title> внутри переданного XML-документа.
*/

import { select } from 'xpath';

export function findAllTitleElements(doc: Document): Node[] {
  const query = "//title"
  return select(query, doc) as Node[];
}