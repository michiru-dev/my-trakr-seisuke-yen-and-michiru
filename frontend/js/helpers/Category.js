export function showCategories() {
    // Even if there are already some categories, delete them to get and show again
    clearCategories()

    // Get categories from the server
    $.ajax({
        url: "http://localhost:3000/categories",
        type: 'get',
        dataType:'json',
    }).done((categories) => {
        // Deploy each category to the pull-down menu
        for(const category of categories) {
            deployCategory(category.name)
        }
    })
}

export function addNewCategory() {
    const newCategory = $("input[name=new-category-input]").val()
    $.ajax({
        url: "http://localhost:3000/categories",
        type: 'post',
        dataType:'json',
        data: { newCategory : newCategory }
    }).done((response) => {        
        // Get all the categories again and show them
        showCategories()

        // Clear the category text input by the user
        $("input[name=new-category-input]").val("")
    })
}

function clearCategories() {
    // Delete all the category options except the first element which is "Select Category"
    $("#categories-menu").children().each((index, categoryOption) => {
        if($(categoryOption).val() !== "") {
            categoryOption.remove()
        }
    })
}

function deployCategory(category) {
    // Add an option to the pull-down menu in the New Transfer section
    $("#categories-menu").append(`
        <option value=${category}>${category}</option>
    `)

    // Maybe deploy to the filter here?
} 



