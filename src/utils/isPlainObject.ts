import isObject from '@/utils/isObject';

export default (tempObject: object) => {
  const prototypeCopy =
    tempObject.constructor && tempObject.constructor.prototype;

  return (
    isObject(prototypeCopy) && prototypeCopy.hasOwnProperty('isPrototypeOf')
  );
};
