// const nearStates = ["سمنان", "مازندران", "البرز", "قم", "قزوین", "مرکزی"];

// const tehranStatePrice = [
//   7139, 8938, 11540, 142790, 17040, 19729, 22454, 25179, 27904, 30629, 33354,
//   36079, 38804, 41529, 44254, 46979, 49704, 52429, 55154, 57879, 60604, 63329,
//   66054, 68779, 71504, 74229, 76954, 79679, 82404, 85129, 87854,
// ];
// const nearStatesPrice = [
//   9374, 11772, 14715, 17440, 20165, 22890, 25615, 28340, 31065, 33790, 36515,
//   39240, 41965, 44690, 47415, 50140, 52865, 55590, 583150, 61040, 63765, 66490,
//   69215, 71940, 74665, 77390, 80115, 82840, 85565, 88290, 91015,
// ];
// const farStatesPrice = [
//   10028, 13080, 16132, 18857, 21582, 24307, 27032, 29757, 32482, 35207, 37932,
//   40657, 43382, 46107, 48832, 51557, 54282, 57007, 59732, 62457, 65182, 67907,
//   70632, 73357, 76082, 78807, 81532, 84257, 86982, 98707, 92432,
// ];
// export const computingPostPrice = (stateName, weight) => {
//   if (weight <= 1000) {
//     if (weight <= 500) {
//       if (stateName === "تهران") {
//         return {
//           price: tehranStatePrice[0] + 1000,
//         };
//       } else if (nearStates.includes(stateName)) {
//         return {
//           price: nearStatesPrice[0] + 1000,
//         };
//       } else {
//         return {
//           price: farStatesPrice[0] + 1000,
//         };
//       }
//     } else {
//       //when weight is between 501 to 1000
//       if (stateName === "تهران") {
//         return {
//           price: tehranStatePrice[1] + 1000,
//         };
//       } else if (nearStates.includes(stateName)) {
//         return {
//           price: nearStatesPrice[1] + 1000,
//         };
//       } else {
//         return {
//           price: farStatesPrice[1] + 1000,
//         };
//       }
//     }
//   } else if (weight <= 30000) {
//     //when weight is more than 1000
//     const index = Math.ceil(weight / 1000);
//     if (stateName === "تهران") {
//       return {
//         price: tehranStatePrice[index] + 1000,
//       };
//     } else if (nearStates.includes(stateName)) {
//       return {
//         price: nearStatesPrice[index] + 1000,
//       };
//     } else {
//       return {
//         price: farStatesPrice[index] + 1000,
//       };
//     }
//   } else {
//     return {
//       error: "وزن سفارش بیشتر از حد مجاز ارسال با پیک است",
//     };
//   }
// };
