/**
 * Custom type
 */
type ParsedObject = {
  [key: string]: any;
  pos: number;
};

/**
 * Returns the array of objects sorted by to 'pos' property
 * @param receivedData
 */
export const sortDataByPos = (receivedData: Array<any>) => {
  return [
    ...receivedData
      .sort((a: ParsedObject, b: ParsedObject) => a.pos.toString()
        .localeCompare(b.pos.toString(), 'en', { numeric: true })
      ),
  ]
}

/**
 * Returns whether the input number (can be a string) is a valid string
 * @param num
 */
export const isNumeric = (num: any) => (typeof(num) === 'number'
  || (typeof(num) === "string" && num.trim() !== '')) && !isNaN(num as number);
