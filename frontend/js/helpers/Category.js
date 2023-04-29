export function showCategories() {
    $.ajax({
        url: "http://localhost:3000/categories",
        type: 'get',
        dataType:'json',
    }).done((categories) => {
        
        for(const category of categories) {
            console.log(category.id, category.name)
        }
    })
}