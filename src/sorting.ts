const data = [
    {"_id": 1, "name": "Central Park Cafe", "borough": "Manhattan"},
    {"_id": 2, "name": "Rock A Feller Bar and Grill", "borough": "Queens"},
    {"_id": 3, "name": "Empire State Pub", "borough": "Brooklyn"},
    {"_id": 4, "name": "Stan's Pizzaria", "borough": "Manhattan"},
    {"_id": 5, "name": "Jane's Deli", "borough": "Brooklyn"},
    {"_id": 5, "name": "Jane's Deli", "borough": "aaaarooklyn"},
    {"_id": 5, "name": "Jane's Deli", "borough": "fdfvdvrooklyn"},
    {"_id": 5, "name": "Jane's Deli", "borough": "vrtvrtr"},
    {"_id": 5, "name": "Jane's Deli", "borough": "Brvbrtbrooklyn"},
    {"_id": 5, "name": "Jane's Deli", "borough": "Brbrtbrooklyn"},
    {"_id": 5, "name": "Jane's Deli", "borough": "brt"},
    {"_id": 5, "name": "Jane's Deli", "borough": "Broobvrbklyn"},
]
data.push({"_id": 6, "name": "Deli", "borough": "borisov"})

type SortedBy<T> = {
    fieldName: keyof T
    direction: 'asc' | 'desc'
}
const getSortedItems = <T>(items: T[], ...sortBy: SortedBy<T>[]) => {

    return [...items].sort((u1, u2) => {

        for(let sortConfig of sortBy){
            if (u1[sortConfig.fieldName] < u2[sortConfig.fieldName]) {
                return sortConfig.direction === 'asc' ? -1 : 1
            }
            if (u1[sortConfig.fieldName] > u2[sortConfig.fieldName]) {
                return sortConfig.direction === 'asc' ? 1 : -1
            }
        }
        return 0
    })
}
console.log(getSortedItems(
    data,
    {fieldName: "name", direction: "desc"},
    {fieldName: "borough", direction: 'desc'}))
