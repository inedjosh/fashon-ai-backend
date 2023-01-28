interface MyType  {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    age: number
}

const users: Array<MyType> = []

users.push({
    id: '123',
    first_name: 'inedu',
    last_name: 'josh',
    email: 'josh@gmail.com',
    age: 36
})

function returnRandomElement<T = MyType>(element: T): T{
    return element
} 
