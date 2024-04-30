export const replaceMongoIdInArray = (array) => {
  // const mappedArray = array.map(item => {
  //   return {
  //     id: item._id.toString(),
  //     ...item
  //   }
  // }).map(({_id, ...rest}) => rest);

  const mappedArray = array.map(item => {
    return replaceMongoIdInObject(item);
  });

  return mappedArray;
}

export const replaceMongoIdInObject = (obj) => {
  const { _id, ...updatedObj } = { ...obj, id: obj._id.toString() };
  return updatedObj;
}