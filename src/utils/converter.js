export function intlNum(num, ...args) {
  return new Intl.NumberFormat(...args).format(num);
}

export function middleElipsis(text, sliceAt) {
  text = text.toString();
  if (text.length > sliceAt * 2) {
    return `${text.substring(0, sliceAt)}...${text.slice(-sliceAt)}`;
  }
  return text;
}

export function timestampToDate(timestamp) {
  return new Date(timestamp * 1000).toLocaleString();
}

export function timeConverter(UNIX_timestamp) {
  let a = new Date(UNIX_timestamp * 1000);
  let hour = appendZero(a.getHours());
  let min = appendZero(a.getMinutes());
  let sec = appendZero(a.getSeconds());
  return hour + ':' + min + ':' + sec;
}

export function appendZero(num) {
  return num > 9 ? `${num}` : `0${num}`;
}

export function toTitleCase(str) {
  return str.replace('_', ' ').replace(/\w\S*/g, function (txt) {
    return (
      txt.replace('_', ' ').charAt(0).toUpperCase() +
      txt.substr(1).toLowerCase()
    );
  });
}

export function abbreviateNumber(number) {
  let SI_SYMBOL = ['', 'k', 'M', 'G', 'T', 'P', 'E'];
  // what tier? (determines SI symbol)
  let tier = (Math.log10(Math.abs(number)) / 3) | 0;
  // if zero, we don't need a suffix
  if (tier == 0) return number;
  // get suffix and determine scale
  let suffix = SI_SYMBOL[tier];
  let scale = Math.pow(10, tier * 3);
  // scale the number
  let scaled = number / scale;
  // format number and add suffix
  return scaled.toFixed(2) + ' ' + suffix;
}
