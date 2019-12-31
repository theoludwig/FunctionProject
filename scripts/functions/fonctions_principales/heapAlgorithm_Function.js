/** 
 * @function heapAlgorithm
 * @description Retourne un tableau contenant toutes les possibilités d'anagramme d'un mot.
 * @param {string} string - La chaîne de caractère à permuter
 * @returns {array}
 * @example heapAlgorithm('abc') → ["abc", "acb", "bac", "bca", "cab", "cba"]
 */
function heapAlgorithm(string) {
    let results = [];
  
    if (string.length === 1) {
      results.push(string);
      return results;
    }
  
    for (let i = 0; i < string.length; i++) {
      let firstChar = string[i];
      let charsLeft = string.substring(0, i) + string.substring(i + 1);
      let innerPermutations = heapAlgorithm(charsLeft);
      for (let i = 0; i < innerPermutations.length; i++) {
        results.push(firstChar + innerPermutations[i]);
      }
    }
    return results;
} 

/* Exports */
export { heapAlgorithm };