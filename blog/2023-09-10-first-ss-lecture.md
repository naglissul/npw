---
tags: [activities, lt]
---

# Pirmoji SS matematikos paskaita

```
Planuoju daryti 19 d. O štai čia pilnas paskaitos planelis:

SS MPS PIRMA PASKAITA
Turinys: 0. MPS medis 1. Įrodymai 2. Logika 3. Aibės 4. Abstrakti algebra <!-- truncate -->

## 0. MPS MEDIS

1. Linijinė algebra: 0. Tiesinės lygtys
   1. Matricos
   2. Vektoriai
   3. Determinantai (su kėliniais, keitiniais)
2. Analitinė geometrija:
   1. Vektoriai
   2. Tiesės, plokštumos (lygtimis)
3. Abstrakti algebra:
   1. Ring, group, field
   2. Kompleksiniai skaičiai
   3. Vektoriai

## 1. Įrodymai

Matkė, tai įrodymai.

1. Konstruktyvus: Paprasčiausias (dažniausias). Sukonstruktinam. Every integer >1 can be prime factored.

   1. Primes arba composite.
      1. p = p
      2. c -> /p -> /p2 …
   2. Prieštaros: -p -> p (galiu but -p -> q -> -q). There are infinite amount of primes.
      1. Finite number of primes and only primes.
      2. Make a number p1\*p2\*p3\*p4...\*pn +1. Dalinant bus visada liekana 1. Reiskias pirminis
      3. Prie fully defined primes radom dar vieną prime.
      4. Reiskias nebuvo visi primes ten apibrezti. Priestara. Reiskias yra infinite primes.
   3. Indukcijos: Yra visokių (bus strong induction), imam paprastą. Base case, Inductive hypothesis, Inductive step. 2n ≥ n + 5 for n ≥ 3.
      1. BC. n=3. 2^3 >= 3 + 5 TRUE
      2. IH. n=k >= 3. 2^k >= k + 5 LET‘S SAY TRUE (strong induction. With n less or equal k let‘s say true)
      3. IS. THEN n=k+1. 2^(k+1) = 2^k \* 2^1 = 2 \* 2^k >= 2 \* (k + 5) = 2k + 10 > k + 10 > (k + 1) + 5 ALSO HOLDS. Proved.
   4. Bus dar kontrapozicijos

2. Logika (Boolean algebra)

   1. Tai va kaip matot atsiranda mąstymas. Tai ko ne suformalizavus ir sugalvojus taisykles, kad lengviau būtų suprasti.
   2. p, q – TEIGINYS = T arba F. p => q = p -> q is TRUE (jei; tada; išplaukia; implikacija; nebutinai priesinga puse). p double-arrow q = p -> q is TRUE AND q -> p is TRUE (tada ir tik tada; jei ir tik jei; ekvivalentumas)
   3. kaip p -> q gali būti true, taip pat gali būti false. Ir turim daugiau tokiu operatorių. Pagrindiniai: AND OR NOT (parodysiu vėliau kur kompiuteriuose pritaikoma, gal kita karta).
   4. AND OR NOT IMPL zymejimai, pavadinimai ir lentutės. Ir tada p -> q = -p V q. Yra ir daugiau desniu ekvivalentumo, kurie parodo, kaip kokionors irodymo teigini galima pakeisti ekvivalenciu.
   5. Kontrapozicija. p -> q = -p V q = q V -p = -(-q) V -p = -q -> -p
   6. Kontrapozicijos įrodymas. Jei n^2 is even, then n is even
      1. KP change: If n is odd, then n^2 is odd
      2. n is odd = E k e N: (ivadas i aibes) 2k+1 = n
      3. n^2 = (2k+1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1. Exists j that 2j+1 = n^2 (j = 2k^2 + 2k)
      4. n^2 is odd. Proved.

## 3. Aibės

1. Galiausiai prieinam prie tokių gilių matematikos šaknų ir esminių klausimų, kaip kad „kas yra skaičius“. Ir čia šitam klausimui atsakyti turim arti su logika susietą aibių teoriją. Sugalvotas abstraktus conceptas.
2. Aibė = {a, b, c, c} elementai gali kartotis, tvarka nesvarbi. Sankirta (konjunkcija), sąjunga (disjunkcija), complement (neigimas).
3. Universal quantifier = a galioja savybe ir b galioja savybe ir c galioja savybe…visoje aibeje. Existential quantifier = a galioja savybe arba b galioja savybe arba c galioja savybe …visoje aibeje. (pries tai mineta E k e N).
4. Ir taip su aibėm galim VISKA aprasyti formaliai. Tai ir naudojama matematikoj. PVZ.

   1. Funkcija – tai aibė, kur kiekvienam x priskirtas y. F = `\{(1, 1), (2, 4), (3, 9), ...\}`.
   2. Sąryšis. „lygu“ = `{(2, 1+1), (3, 4-1), (1+1, 2), (3+1, 4), …}`. Kadangi du elementai tuple’e (eil tvarka svarbi) - dvinaris relation. Atsakymas gali buti tik lygu arba nelygu. Kaip ir tuple gali priklausyti arba nepriklausyti aibei. Kaip teiginys gali būti T arba F.
   3. Sąryšiai taip gali turėti savo yptumus. Gali būti:
      1. Transitive. a >= b ir b >= c išplaukia a >= c
      2. Symmetric. NOT: a >= b neišplaukia b >= a
      3. Reflexive. a >= a

## 4. Abstrakti algebra

1. Taigi. Viskas tiksliai apibrėžta. Tai galim dabar ir pasakyti kas yra skaičiai ir kokios jiems taisyklės galioja.
2. Yra ivairių algebrinių struktūrų. Pradėkim nuo jum pažįstamos: Racionaliųjų skaičių FIELD (Kūnas :D – čia reklamikė apie sci-dict.lt):
   Field is a set together with two operations (F, +, \*), where: 1. Closure. + and \* uniquely define an element of F.
   2 + 3 = 5 (and always only 5) (2, 3, 5 in R) 2. Associativity for + and \*. a + (b + c) = (a + b) + c
   2 + (3 + 4) = (2 + 3) + 4 3. Commutativity for + and \*. a + b = b + a
   2 + 3 = 3 + 2 4. Identities for + and \*. exists e in F such that e + a = a and a + e = a
   2 + 0 = 2 5. Iverses for + and \*. exists a^-1 in F such that a^-1 + a = e and a + a^-1 = e
   8 + -8 = 0 6. Distributivity of \* over +. a \* (b + c) = a \* b + a \* c
   3 \* (2 + 3) = 3 \* 2 + 3 \* 3
3. Galim apriboti, ir neduoti visų savybių. PVZ Z skaičiam negalios viskas. Bus abelian grupe (Z, +): tik closure, associativity, identity, inverse, \*komutatyvi\* (ir kad visa savo moksla turi – group theory).
4. ...Bet sitai galioja ne tik skaiciam. Ne veltui abstrakti algebra – t.y. cia a ir b gali buti drambliai arba parašiutai. Šitam kurse tai bus Matricos, Kėliniai, Vektoriai, Kompleksiniai skaičiai.

   1. Bet tarkim dramblys yra sitas uniquely defined apibrezimas: `S = R \ {-1} su a \* b = a + b + ab`
      1. Closure. `a + b + ab = -1  `
         `b + ab = -1 - a  `
         `b (1 + a) = -1 - a `
         `b = -1 (can‘t be)`
      2. Associativity. `(a \* b) \* c = a \* (b \* c)  `
         `(a+b+ab) \* c = a \* (b+c+bc)  `
         `a+b+ab+c+ac+bc+abc = a+b+c+bc+ab+ac+abc`
      3. Identity. `a \* e = a (e \* a = a same)  `
         `a + e + ae = a`
         `e + ae = 0  `
         `e (1 + a) = 0  `
         `e = 0 (nes a != -1)`
      4. Inverse. `a \* b = 0  `
         `a + b + ab = 0  `
         `b + ab = -a  `
         `b (1 + a) = -a `
         `b = -a / 1+a  `
         ` a^-1 = b = -a / 1+a`

5. Matricos RING:
   Not commuative multiplication.((( (M, +) is abelian group. \* associativity. \* over + distributivity. Identity for \*)))
   Identity matrix. ... Matrix multiplication.
```
