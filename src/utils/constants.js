export const formatValueWithHyphens = (value) => {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length > 12) {
      return numericValue.substring(0, 12).replace(/(\d{4})(?=\d)/g, '$1-');
    }
    const formattedValue = numericValue.replace(/(\d{4})(?=\d)/g, '$1-');

    return formattedValue;
  };