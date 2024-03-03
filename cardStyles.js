

export default function handleCard (image, passes, index) {
    
    const screenHeight = window.screen.availHeight;

    function sound(sound){
        var snd = new Audio(`./sounds/${sound}.mp3`)
        snd.play()
    }

    const passesMapping = {
        0: (image) => {
            image.style.left = '-79px';
        },
        1: (image) => {
            image.style.left = '1px';
        },
        2: (image) => {
            image.style.left = '81px';
        },
        3: (image) => {
            image.style.left = '161px';
        },
        4: (image) => {
            image.style.left = '241px';
        },
        5: (image) => {
            image.style.left = '321px';
        },
    };

    image.style.width = '80px';
    sound('card_to_the_table');
    passesMapping[passes](image);
    image.style.top = `-${screenHeight / 2 - 100}px`;
    image.classList.remove(`cards_number-hover`);
    image.style.transform = 'none';
    image.
    players.slice(index, 1);
}



