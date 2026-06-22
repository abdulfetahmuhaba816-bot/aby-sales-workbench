export function numberToWords(num: number): string {
  const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const scales = ['', 'Thousand', 'Million', 'Billion'];

  function convertChunk(n: number): string {
    let chunk = '';
    if (n >= 100) {
      chunk += units[Math.floor(n / 100)] + ' Hundred ';
      n %= 100;
    }
    if (n >= 10 && n < 20) {
      chunk += teens[n - 10] + ' ';
    } else {
      if (n >= 20) {
        chunk += tens[Math.floor(n / 10)] + ' ';
        n %= 10;
      }
      if (n > 0) {
        chunk += units[n] + ' ';
      }
    }
    return chunk.trim();
  }

  if (num === 0) return 'Zero Birr only';

  let [integerPart, decimalPart] = num.toFixed(2).split('.').map(Number);
  let words = '';
  let scaleIndex = 0;

  if (integerPart === 0) {
    words = 'Zero';
  } else {
    while (integerPart > 0) {
      const chunk = integerPart % 1000;
      if (chunk > 0) {
        const chunkWords = convertChunk(chunk);
        words = chunkWords + (scales[scaleIndex] ? ' ' + scales[scaleIndex] : '') + (words ? ' ' + words : '');
      }
      integerPart = Math.floor(integerPart / 1000);
      scaleIndex++;
    }
  }

  words = words.trim() + ' Birr';

  if (decimalPart > 0) {
    words += ' and ' + convertChunk(decimalPart) + ' Cents';
  }

  return words + ' only';
}
