const arr = ['abc', 1, true, undefined]

arr.forEach((item, index) => {
    console.log(item)
})

const arrOfObj = [
    {
        id: 1, 
        username: 'ryan'
    },
    {
        id: 2, 
        username: 'rahma'
    }
]

arrOfObj.forEach((item, index) => {
   if(item.id === id) arrOfObj.splice(index, 1)
})