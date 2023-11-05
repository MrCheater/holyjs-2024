const enum Factorial {
  "(0)" = 1,
  "(1)" = 1,
  "(2)" = 2,
  "(3)" = Factorial["(2)"] * 3,
  "(4)" = Factorial["(3)"] * 4,
  "(5)" = Factorial["(4)"] * 5,
  "(6)" = Factorial["(5)"] * 6,
  "(7)" = Factorial["(6)"] * 7,
  "(8)" = Factorial["(7)"] * 8,
  "(9)" = Factorial["(8)"] * 9,
  "(10)" = Factorial["(9)"] * 10,
  "(11)" = Factorial["(10)"] * 11,
  "(12)" = Factorial["(11)"] * 12,
  "(13)" = Factorial["(12)"] * 13,
  "(14)" = Factorial["(13)"] * 14,
  "(15)" = Factorial["(14)"] * 15,
  "(16)" = Factorial["(15)"] * 16,
  "(17)" = Factorial["(16)"] * 17,
  "(18)" = Factorial["(17)"] * 18,
  "(19)" = Factorial["(18)"] * 19,
  "(20)" = Factorial["(19)"] * 20,
  "(21)" = Factorial["(20)"] * 21
}

const factorial_5 = Factorial["(5)"]
const factorial_21 = Factorial["(21)"]
