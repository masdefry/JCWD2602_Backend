// + V A R I A B L E
let myName: string = 'Defryan'
console.log(myName)

const myAge: number = 30


let input: number | string | boolean 
input = false
input = 100
input = 'Hello'

// Array Biasa
// ['Apple', 'Orange', 'Mango']
let products: string[]
products = ['Apple', 'Orange', 'Mango']

// Array Tupple
// ['Apple', 10000, true]
let dataProducts: [string, number, boolean]
dataProducts = ['Jeruk', 15000, true]

// Object
let myObj: {
    name: string , 
    age: number, 
    isMarried: boolean 
}

myObj = {
    name: 'Defryan', 
    age: 100, 
    isMarried: true
}


type programPwdType = {
    name: string, 
    batch: number, 
    campus: string
}

let programPwd: programPwdType = {
    name: 'Web Dev', 
    batch: 2602, 
    campus: 'BSD'
}
console.log(programPwd)



// + F U N C T I O N
// Function Without Return
function Hello(): void{
    console.log('Hello, World!')
}
Hello()

// Function With Return
function Result(): string{
    return 'Hello, JCWD!'
}
const ResultNew = (): string => {
    console.log('Bebas')
    return 'Hello, JCWD!'
}
console.log(Result())

// Function With Param
const MyFunction = (x: number, y: number): number => {
    return x * y 
}
console.log(MyFunction(100, 10))

// + T Y P E & I N T E R F A C E
// Type: Untuk Pendeklarasian Tipe Data
// Interface: Untuk Pendeklarasian Struktur Object
type Program = 'JCWD' | 'JCDM' | 'JCUI/UX' | 'JCDS'

interface IStudents{
    name: string, 
    address: string, 
    program: Program
}

let students: IStudents

students = {
    name: 'Defryan', 
    address: 'Bogor', 
    program: 'JCWD'
}







let count: number = 1;
let sum: number = 0;

while(count <= 5){
    sum += 5;
    
    if(sum <= 10) break;

    count++;
}

console.log(`Sum = ${sum}`)