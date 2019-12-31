/** 
 * @function filterStudents
 * @description Affiche uniquement les prénoms (qui sont dans la liste) qui commencent par la lettre souhaitée.
 * @param {string} filteredLetter - La lettre à filtré
 * @param {array} students - La liste des prénoms
 * @returns {string} - Prénoms qui commence par filteredLetter (totalfilteredLetterStudents) : filteredStudents
 * @example filterStudents('P', ['Prénom1', 'Prénom2', 'Divlo']) → Prénoms qui commence par P (2) : Prénom1 et Prénom2.
 */
function filterStudents(filteredLetter, students) {
    let filteredStudents = [];
    for(let i = 0; i < students.length; i++) {
        let studentBoucle = capitalize(students[i]);
        if (studentBoucle[0] === filteredLetter) {
            filteredStudents.push(studentBoucle);
        }
    }
    if (filteredStudents.length === 1) {
        return ("Prénom qui commence par " + filteredLetter + " : " + filteredStudents + '.');
    }
    else if (filteredStudents.length >= 2) {
        // Affiche la liste des prénoms...
        const last = filteredStudents[filteredStudents.length - 1]; // Accéde au dernier élément du tableau
        const totalfilteredLetterStudents = filteredStudents.length;
        filteredStudents.pop(); // Supprime le dernier élément du tableau
        // filteredStudents.join(', ') permet de rajouter un espace entre chaque élément du tableau
        return ("Prénoms qui commence par " + filteredLetter + " (" + totalfilteredLetterStudents + ") : " + filteredStudents.join(', ') + ' et ' + last + '.');
    }
    else {
        return ("Il n'y a pas de prénom commencant par " + filteredLetter + ".");
    }
} 

export { filterStudents };