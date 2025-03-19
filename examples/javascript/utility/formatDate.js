/**
 * Formats a date string or Date object into a human-readable format
 * @param {string|Date} date - The date to format
 * @param {string} format - Optional format string (defaults to 'MM/DD/YYYY')
 * @returns {string} Formatted date string
 */
function formatDate(date, format = 'MM/DD/YYYY') {
  const d = date instanceof Date ? date : new Date(date);
  
  if (isNaN(d.getTime())) {
    throw new Error('Invalid date provided');
  }
  
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  
  let result = format;
  result = result.replace('YYYY', year);
  result = result.replace('MM', month);
  result = result.replace('DD', day);
  
  return result;
}

module.exports = formatDate;
