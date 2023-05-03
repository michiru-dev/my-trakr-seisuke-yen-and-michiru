//common functions that can be used in different cases

export const SERVER_URL = "http://localhost:3000/"

export function showBaloonAnimation(parent, message) {
    const animationElement = $(`
        <div class="balloon-animation">
            <div class="balloon">
                <p>${message}</p>
            </div>
        </div>
    `)

    parent.append(animationElement)

    // Remove the animation so that this animation can work next time
    setTimeout(() => {
        animationElement.remove()
    }, 4000)
}