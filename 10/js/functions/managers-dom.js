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

/**
 * Remove eventListeners
 * @param {object} button with push on which we remove eventListeners
 * @param {callback} onPush function with actions when we push come key
 * @param {callback} onClick function with actions when we click some button
 */
const removeEventListeners = (button, onPush, onClick) => {
  document.removeEventListener('keydown', onPush);
  button.removeEventListener('click', onClick);
};

export { removeAllAddedChildren, removeEventListeners };
