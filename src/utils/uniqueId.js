let count = 0;

const uniqueId = (prefix = 'unique') => `${prefix}-${count++}`;

export default uniqueId;
