/* 
	РНайти все элементы с class="active".
*/

import { select } from 'xpath';

export function findElementsWithExactClass(doc: Document): Node[] {
   	const query = "//*[@class='active']"
  	return select(query, doc) as Node[];
}