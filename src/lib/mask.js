const mask = {
  apply: (maskPattern, value) => {
    let toRet = "";
    for (let maskCounter = 0, valueCounter = 0; maskCounter < maskPattern.length && valueCounter < value.length; maskCounter++) {
      const checkVal = mask.check(maskPattern[maskCounter], value[valueCounter]);
      if (checkVal.chr) {
        toRet = toRet + checkVal.chr;
        valueCounter += checkVal.inc;
      } else {
        break;
      }
    }
    return toRet;
  },
  check: (patternChr, chr) => {
    switch (patternChr) {
      case '_'://character
        return { chr, inc: 1 };
      case '#'://digit
        {
          if (/\d/.test(chr))
            return { chr, inc: 1 };
          else
            return { chr: '', inc: 0 };
        }
      default://others
        return { chr: patternChr, inc: patternChr == chr ? 1 : 0 };
    }
  },
  getValue: (maskPattern, value) => {
    let toRet = "";
    for (let i = 0; i < maskPattern.length && i < value.length; i++) {
      if (maskPattern[i] == '_' || maskPattern[i] == '#') {
        toRet += value[i];
      }
    }
    return toRet;
  }
};

export default mask;
