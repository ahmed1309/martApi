const numbers = [
    {comment: 'bla bla bla', rating: 1},
    {comment: 'bla bla bla', rating: 2},
    {comment: 'bla bla bla'},
    {comment: 'bla bla bla', rating: 3},
    {comment: 'bla bla bla', rating: 4},
    {comment: 'bla bla bla'},
    {comment: 'bla bla bla', rating: 5},
];

const totalRating = numbers.reduce((sum, currentValue) => {
    if (currentValue.rating) {
        return sum + currentValue.rating;
    } else {
        return sum;
    }
}, 0);

const numberOfRatings = numbers.filter(item => item.rating).length;
const averageRating = totalRating / numberOfRatings;

console.log(averageRating);

// const x 
// =22
// const y
// =22

// console.log(x
//     +y);

// console.log("jshf gafs jhas \
// ksaj");


// const abc = function(n){
//     let a = n -1;
//     return function(){
//         a +=1
//         return a;
//     }
// }

// const abc1 = abc(10);

// console.log(abc());
// console.log(abc1());
// console.log(abc1());


// /**
//  * @param {string} val
//  * @return {Object}
//  */
// var expect = function(val) {
//     // throw new Error("bla bla bla bla");
//     return {
//         notToBe: function(val2) {
//             if (val !== val2) {
//                 return true;
//             } else {
//                 throw new Error("Equal");
//             }
//         },
//         toBe: function(val1) {
//             if (val === val1) {
//                 return true;
//             } else {
//                 throw new Error("Not Equal");
//             }
//         }
//     };
// };


//    // true
//   console.log(expect(5).toBe(5));
//     // expect(5).toBe(3);
//   expect(5).notToBe(5); // throws "Equal"