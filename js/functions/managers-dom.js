const removeAllAddedChildren = (parentElement, startedIndex) => {
  const addedElements = parentElement.children;
  while (addedElements[startedIndex]) {
    parentElement.removeChild(addedElements[startedIndex]);
  }
};

export { removeAllAddedChildren };
