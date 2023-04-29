export function showCategories() {
    $.ajax({
        url: "http://localhost:3000/categories",
        type: 'get',
        dataType:'json',
    }).done((categories) => {
        for(const category of categories) {
            deployCategory(category.name)
        }
    })
}

function deployCategory(category) {
    $("#categories-menu").append(`
        <option>${category}</option>
    `)
}