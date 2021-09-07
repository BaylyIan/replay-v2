export const addTag = (arr) => {
    arr.map((obj, index) => {
    Object.assign({}, obj, { id: index });
      });
}