import { SERVER_URL } from './Common.js'
import { updateCategories } from './Transaction.js'
const CATEGORY_ENDPOINT = SERVER_URL + "categories"

export function showCategories() {

    // Return promise because transaction list requires category data
    return new Promise((resolve, reject) => {
        // Get categories from the server
        $.ajax({
            url: CATEGORY_ENDPOINT,
            type: 'get',
            dataType:'json',
        })
        .done((categories) => {
            // Deploy each category to the pull-down menu
            deployCategories(categories)

            // Pass categories for the transaction section
            updateCategories(categories)

            resolve()
        })
    })
}

export function addNewCategory() {
    const newCategory = $("input[name=new-category-input]").val()
    $.ajax({
        url: CATEGORY_ENDPOINT,
        type: 'post',
        dataType:'json',
        data: { newCategory : newCategory }
    })
    .done((response) => {        
        // Get all the categories again and show them
        showCategories()

        // Show animation that indicates a new category has been added
        // gsap.to("#categories-menu", { scale: 1.2, duration: .08, repeat: 1, yoyo: true })

        // Clear the category text input by the user
        $("input[name=new-category-input]").val("")

        notifyNewCategoryAdded()
    })
}

function deployCategories(categories) {
    // Create HTML of new category options
    let newCategoryOptions = `<option value="">Select Category</option>`
    for(const category of categories) {
        const newCategoryOption = `
            <option id=${category.id}>${category.name}</option>
        `
        newCategoryOptions += newCategoryOption
    }

    // Deploy HTML to each of the account selection menu
    $("#categories-menu").html(newCategoryOptions)
} 

function notifyNewCategoryAdded() {
    // Add animation
    const message = "A new category has been added."

    const animationElement = $(`
        <div class="balloon-down-animation">
            <div class="balloon-down">
                <p>${message}</p>
            </div>
        </div>
    `)

    $("#categories-menu").after(animationElement)

    // Remove the animation so that this animation can work next time
    setTimeout(() => {
        animationElement.remove()
    }, 4000)
}


