
export async function wrapApiResponse<T>(responseJson: any): Promise<T | null> {
  return await responseJson.json();
}


export function flipBirthDate(birthday: string): string {
  const [year, month, day] = birthday.split('-');
  const flippedBirthdate = `${day}/${month}/${year}`;
  return flippedBirthdate;
}


export function pricesplit(price: string): number {
  return parseFloat(price.split(" ")[0])
}

export function areListsEqual<T>(list1: T[], list2: T[]): boolean {
  if (list1.length !== list2.length) {
    return false;
  }

  for (let i = 0; i < list1.length; i++) {
    if (list1[i] !== list2[i]) {
      return false;
    }
  }

  return true;
}

