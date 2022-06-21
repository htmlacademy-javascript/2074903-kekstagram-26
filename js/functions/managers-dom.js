/**
 * Delete all children of a DOM object from started index
 * @param { object } parentElement psrent element including needed children
 * @param { int } startedIndex index from which we start to delete children
 */
const removeAllAddedChildren = (parentElement, startedIndex) => {
  const addedElements = parentElement.children;
  while (addedElements[startedIndex]) {
    parentElement.removeChild(addedElements[startedIndex]);
  }
};

export { removeAllAddedChildren };
