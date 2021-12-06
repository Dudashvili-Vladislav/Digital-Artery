export const generateCategories = (length) => {
    const arr = []
    
    for(let i = 1; i<length+ 1; i++){
        arr.push(
            {
                title: `category ${i}`,
                id: i,
                img: `../../../../../assets/trash/${i<10? '0':''}${i}.jpg`
            }
        )
    }
    return arr
}