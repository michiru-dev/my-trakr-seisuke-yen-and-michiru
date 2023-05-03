//common functions that can be used in different cases

export const SERVER_URL = "http://localhost:3000/"

export function createBaloonAnimation() {
    const animationElement = $(`
        <div class="balloon-animation">
            <div class="balloon">
                <p>A New Category is added.</p>
            </div>
        </div>
    `)
    return animationElement
}