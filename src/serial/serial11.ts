/* 
	Реализовать функцию getAllUserEmails(xmlDoc), которая принимает XML-документ xmlDoc и возвращает массив email-адресов всех пользователей в нем.

	Пример XML:
<users>
  <user id="1">
    <personalInfo>
      <email>alice@example.com</email>
      <phone>+123456789</phone>
    </personalInfo>
  </user>
  <user id="2">
    <personalInfo>
      <email>bob@example.com</email>
      <phone>+987654321</phone>
    </personalInfo>
  </user>
</users>	
*/


export interface User {
  id: string;
  personalInfo: {
    email: string;
    phone: string;
  };
}

export function getAllUserEmails(xmlDoc: Document): string[] {
	const emailElements = xmlDoc.getElementsByTagName('email');
	return Array.from(emailElements).map(el => el.textContent || '');
}